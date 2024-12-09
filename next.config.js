module.exports = {
    images: {
      localPatterns: [
        {
          pathname: '/assets/**',
          search: '',
        },
      ],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'valentin-room-for-you.s3.us-east-1.amazonaws.com',
        }
      ]
    },
  }