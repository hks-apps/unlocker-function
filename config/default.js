module.exports = {
  googleCloud: {
    pubsub: {
      topicName: process.env.GOOGLE_CLOUD_PUBSUB_TOPIC
    }
  },
  secret: {
    apiKey: process.env.API_KEY,
    salt: process.env.SALT,
    iv: process.env.IV
  }
}
