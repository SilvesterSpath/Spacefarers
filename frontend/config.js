// config.js
const config = {
  apiUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:4004/spacefarers'
      : 'https://your-production-api.com/api',
};

export default config;
