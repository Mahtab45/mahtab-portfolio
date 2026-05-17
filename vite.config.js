import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Simple manual .env parser to load env variables into process.env during local dev
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const index = trimmed.indexOf('=');
        if (index !== -1) {
          const key = trimmed.substring(0, index).trim();
          let value = trimmed.substring(index + 1).trim();
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1);
          }
          process.env[key] = value;
        }
      }
    });
  }
} catch (e) {
  console.error('Failed to load local .env:', e);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-contact-handler',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/contact' && req.method === 'POST') {
            try {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', async () => {
                try {
                  const payload = JSON.parse(body);
                  
                  // Dynamically import the handler to ensure it resolves correctly in ES context
                  const { default: handler } = await import('./api/contact.js');
                  
                  // Mock res object
                  const mockRes = {
                    status(code) {
                      res.statusCode = code;
                      return this;
                    },
                    json(data) {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify(data));
                    },
                    setHeader(name, value) {
                      res.setHeader(name, value);
                    }
                  };
                  
                  const mockReq = {
                    method: 'POST',
                    body: payload
                  };
                  
                  await handler(mockReq, mockRes);
                } catch (err) {
                  console.error('Local API Error:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
                }
              });
            } catch (err) {
              console.error('Middleware Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to process request' }));
            }
          } else {
            next();
          }
        });
      }
    }
  ],
})
