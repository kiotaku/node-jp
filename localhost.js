const https = require('https')
const fs = require('fs')
const http = require('http')

const sslkey = fs.readFileSync('../ssl-key.pem')
const sslcert = fs.readFileSync('../ssl-cert.pem')

const options = {
      key: sslkey,
      cert: sslcert
}

module.exports = (app, httpsPort, httpPort) => {
  https.createServer(options, app).listen(httpsPort)
  http.createServer((req, res) => {
        res.writeHead(301, { 'Location': `https://localhost:${httpsPort}${req.url}` })
        res.end()
  }).listen(httpPort)
}
