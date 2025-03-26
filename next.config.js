module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/((?!embed|_next/image|images).*)',
        destination: 'https://www.theluxurist.com/magic-quote',
        permanent: true,
      },
    ];
  },
};