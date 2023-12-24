module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.airtableusercontent.com',
      },
    ],
  },
  // Error on build. TypeError: Expected signal to be an instanceof AbortSignal
  // See: https://github.com/triggerdotdev/trigger.dev/issues/806
  experimental: {
    serverMinification: false,
  },
  // =======================================================
}
