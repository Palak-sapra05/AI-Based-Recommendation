const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 8080;

// Route to Auth Service
app.use('/auth', createProxyMiddleware({
  target: 'http://auth-service:3001',
  changeOrigin: true,
  pathRewrite: { '^/auth': '' }
}));

// Route to Profile Service
app.use('/profile', createProxyMiddleware({
  target: 'http://profile-service:3002',
  changeOrigin: true,
  pathRewrite: { '^/profile': '' }
}));

// Route to Recommendation Service
app.use('/recommendation', createProxyMiddleware({
  target: 'http://recommendation-service:8000',
  changeOrigin: true,
  pathRewrite: { '^/recommendation': '' }
}));

// Route to Resume Analysis Service
app.use('/resume', createProxyMiddleware({
  target: 'http://resume-analysis-service:8001',
  changeOrigin: true,
  pathRewrite: { '^/resume': '' }
}));

// Route to Notification Service
app.use('/notification', createProxyMiddleware({
  target: 'http://notification-service:3003',
  changeOrigin: true,
  pathRewrite: { '^/notification': '' }
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
