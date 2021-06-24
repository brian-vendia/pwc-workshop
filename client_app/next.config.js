module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/heroes',
          permanent: true,
        },
      ]
    },
  }