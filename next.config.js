module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',     // matches all routes
        destination: 'https://www.theluxurist.com/discover', // all routes go to discover
        permanent: true,
      },
    ];
  },
};