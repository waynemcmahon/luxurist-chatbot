module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/((?!embed).*)',
        destination: 'https://www.theluxurist.com/magic-quote',
        permanent: true,
      },
    ];
  },
};