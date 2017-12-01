const PubSub = require('@google-cloud/pubsub')
const crypto = require('crypto')

class Unlocker {
  constructor (config) {
    const { topicName } = config.googleCloud.pubsub
    const { secret } = config

    // const pathname = path.resolve(keyFilename.replace('~/', process.env.HOME + '/'))

    const pubsub = PubSub()

    Object.assign(this, {
      secret,
      topicName,
      pubsub
    })
  }
  unlockDoor () {
    const { pubsub, secret, topicName } = this
    const topic = pubsub.topic(topicName)
    const publisher = topic.publisher()

    const payload = {
      type: 'open-door',
      salt: secret.salt,
      time: Date.now()
    }

    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secret.apiKey, 'hex'), Buffer.from(secret.iv, 'hex'))
    let data = cipher.update(JSON.stringify(payload), 'utf8', 'hex')

    data += cipher.final('hex')

    return publisher.publish(Buffer.from(data, 'hex'))
  }
}

module.exports = Unlocker
