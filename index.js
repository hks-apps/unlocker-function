const config = require('config')

const Unlocker = require('./lib/unlocker')

exports.unlock = function unlock (req, res) {
  console.log('waiting...')

  if (req.method === 'POST') {
    const unlocker = new Unlocker(config)

    console.log(req.body)
    if (req.body.token !== config.secret.token) {
      return res.status(401).send('我唔識你！')
    }

    unlocker.unlockDoor().then(() => {
      res.send('攪掂！')
    }).catch(err => {
      console.error(err.stack)
      res.send('攪唔撚掂！')
    })
  } else {
    res.status(501).send('你嗡乜？')
  }
}
