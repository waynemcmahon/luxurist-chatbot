module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/',     // the path to match
        destination: 'https://www.theluxurist.com/discover', // the path to redirect to
        permanent: true,          // if true, sends 308 Permanent Redirect
      },
    ];
  },
};