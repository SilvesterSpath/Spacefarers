// config.js
const config = {
  apiUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:4004/spacefarers'
      : 'https://spacefarers.onrender.com/spacefarers',
};

export default config;
