/**
 * api/contact.js — Vercel Serverless Function
 *
 * WHY NO EXPRESS?
 * ───────────────
 * In a traditional Node.js app, Express creates a long-running HTTP server
 * (app.listen) that stays alive on a dedicated port. Vercel's serverless
 * model works differently: each file inside the /api directory is
 * automatically turned into an isolated, stateless HTTP endpoint. Vercel
 * spins the function up on demand and shuts it down after the request
 * completes — no persistent server, no port management needed.
 *
 * HOW VERCEL API ROUTES WORK:
 * ───────────────────────────
 * • Every file in /api becomes a route automatically.
 *   e.g. api/contact.js  →  https://yourdomain.com/api/contact
 * • The default export must be an async function named `handler`.
 * • Vercel injects the standard Node.js IncomingMessage (req) and
 *   ServerResponse (res) objects — the same interface you already know.
 * • No need to import express, cors, or body-parser; Vercel parses
 *   JSON bodies natively and handles CORS for same-origin requests.
 *
 * ENVIRONMENT VARIABLES:
 * ──────────────────────
 * Set EMAIL_USER and EMAIL_PASS in:
 *   Vercel Dashboard → Your Project → Settings → Environment Variables
 * They are injected at runtime — never exposed to the client.
 *
 * COLD START OPTIMISATION:
 * ────────────────────────
 * • nodemailer transporter is created once at module scope (outside the
 *   handler). On warm invocations Vercel reuses the same module instance,
 *   so the transporter is not re-created on every request.
 * • No heavy framework (Express) is loaded, keeping the bundle tiny.
 */

import nodemailer from 'nodemailer';

// ─── Nodemailer Transporter ───────────────────────────────────────────────────
// Defined at module scope so it is reused across warm serverless invocations,
// avoiding the overhead of creating a new SMTP connection every request.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Set in Vercel → Settings → Env Variables
    pass: process.env.EMAIL_PASS, // Use a Gmail App Password, NOT your login password
  },
});

// ─── Handler ─────────────────────────────────────────────────────────────────
// Vercel calls this function for every request to /api/contact.
export default async function handler(req, res) {

  // ── Method Guard ────────────────────────────────────────────────────────────
  // Only allow POST requests. Any other HTTP method (GET, PUT, DELETE, etc.)
  // receives a 405 Method Not Allowed response.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method "${req.method}" not allowed. Use POST.` });
  }

  // ── Parse Body ──────────────────────────────────────────────────────────────
  // Vercel automatically parses JSON bodies — req.body is ready to use.
  const { name, email, message } = req.body;

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  // ── Send Email ──────────────────────────────────────────────────────────────
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,       // Sender (your Gmail address)
      to: process.env.EMAIL_USER,         // Recipient — sends to yourself
      replyTo: email,                     // Clicking "Reply" goes to the visitor
      subject: `New Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">New Form Submission</h2>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">You have received a new message from your portfolio contact form.</p>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555; width: 120px;">Name</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; color: #333333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Email</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; color: #333333;"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; font-weight: bold; color: #555555; vertical-align: top;">Message</td>
                <td style="padding: 12px 15px; color: #333333; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 12px; color: #888888; margin: 0;">This email was sent automatically from your Portfolio Website.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
