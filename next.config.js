// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'live.staticflickr.com',
          port: '',
          pathname: '**',
        },
      ],
    },
  }