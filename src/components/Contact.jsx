import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Auto hide success message after 4 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please check your connection.');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 px-3 sm:px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">

        {/* Toast Notification */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-[#10b981]/10 border border-[#10b981]/20 backdrop-blur-md text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)]"
              >
                <div className="bg-[#10b981]/20 p-2 rounded-full text-[#10b981]">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Success!</h4>
                  <p className="text-sm text-gray-300">Your form has been submitted successfully. Our team will contact you shortly.</p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="bg-red-500/10 border border-red-500/20 backdrop-blur-md text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-[0_10px_40px_-10px_rgba(239,68,68,0.3)]"
              >
                <div className="bg-red-500/20 p-2 rounded-full text-red-500">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Error</h4>
                  <p className="text-sm text-gray-300">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <SectionHeading
          firstWord="Get In"
          secondWord="Touch"
          subtitle="Have a project in mind or just want to say hi?"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-6 w-full max-w-sm md:max-w-xl mx-auto lg:mx-0">
              {/* Email Card */}
              <motion.a
                href="mailto:mahtabalam2896@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="bg-white/5 p-5 sm:p-6 rounded-3xl border border-white/5 flex items-center gap-4 sm:gap-6 group cursor-pointer hover:bg-white/10 hover:border-primary/40 transition-all duration-300 ease-in-out active:scale-95 no-underline"
                aria-label="Send an email to mahtabalam2896@gmail.com"
              >
                <div className="p-3 sm:p-4 glass rounded-2xl text-white/40 group-hover:text-primary group-hover:shadow-[0_0_20px] group-hover:shadow-primary/40 transition-all duration-300 ease-in-out shrink-0">
                  <Mail size={24} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-white uppercase tracking-wider font-semibold group-hover:text-primary transition-colors duration-300">Email Me</p>
                  <p className="text-gray-400 font-medium break-all group-hover:text-gray-300 transition-colors duration-300">mahtabalam2896@gmail.com</p>
                </div>
              </motion.a>
              {/* Phone Card */}
              <motion.a
                href="tel:+919113130267"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-5 sm:p-6 rounded-3xl border border-white/5 flex items-center gap-4 sm:gap-6 group cursor-pointer hover:bg-white/10 hover:border-primary/40 transition-all duration-300 ease-in-out active:scale-95 no-underline"
                aria-label="Call +91 9113130267"
              >
                <div className="p-3 sm:p-4 glass rounded-2xl text-white/40 group-hover:text-primary group-hover:shadow-[0_0_20px] group-hover:shadow-primary/40 transition-all duration-300 ease-in-out shrink-0">
                  <Phone size={24} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-white uppercase tracking-wider font-semibold group-hover:text-primary transition-colors duration-300">Call Me</p>
                  <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">+91 9113130267</p>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 p-5 sm:p-6 rounded-3xl border border-white/5 flex items-center gap-4 sm:gap-6 group cursor-pointer hover:bg-white/10 hover:border-primary/40 transition-all duration-300 ease-in-out active:scale-95"
              >
                <div className="p-3 sm:p-4 glass rounded-2xl text-white/40 group-hover:text-primary group-hover:shadow-[0_0_20px] group-hover:shadow-primary/40 transition-all duration-300 ease-in-out shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-white uppercase tracking-wider font-semibold group-hover:text-primary transition-colors duration-300">Location</p>
                  <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">Delhi, India</p>
                </div>
              </motion.div>
            </div>

            {/* Availability Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 p-4 sm:p-6 rounded-3xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full max-w-sm md:max-w-xl mx-auto lg:mx-0 group cursor-pointer hover:bg-white/10 hover:border-primary/40 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px] shadow-primary/50 group-hover:shadow-[0_0_15px] group-hover:shadow-primary/70 transition-all duration-300"></div>
                <span className="text-white font-medium group-hover:text-primary transition-colors duration-300">Available for projects</span>
              </div>
              <span className="text-gray-400 text-sm italic group-hover:text-gray-300 transition-colors duration-300">Remote & Hybrid</span>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:col-span-3 bg-white/5 p-4 sm:p-6 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden w-full max-w-sm md:max-w-xl mx-auto lg:mx-0 group hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_20px] hover:shadow-primary/40 transition-all duration-300 ease-in-out active:scale-95"
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <User size={16} /> Your Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 focus:shadow-[0_0_15px] focus:shadow-primary/30 hover:border-white/20 transition-all text-white"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <AtSign size={16} /> Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 focus:shadow-[0_0_15px] focus:shadow-primary/30 hover:border-white/20 transition-all text-white"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <MessageSquare size={16} /> Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="How can I help you?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 py-4 outline-none focus:border-primary/50 focus:shadow-[0_0_15px] focus:shadow-primary/30 hover:border-white/20 transition-all text-white resize-none"
                ></motion.textarea>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: status !== 'loading' ? 1.03 : 1 }}
                  whileTap={{ scale: status !== 'loading' ? 0.97 : 1 }}
                  transition={{ duration: 0.3 }}
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      Sending <Loader2 size={20} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
