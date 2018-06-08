const http = require('http')
const { generateBars } = require('./utils')
const port = 6060

const routes = {
  GET: {
    '/bars': function (req, res) {
      sendJSON(res, generateBars())
    }
  }
}

function getRoute (req, routes) {
  return (routes[req.method] && routes[req.method][req.url]) || null
}

function sendJSON (res, payload) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(payload))
}

function notFound (req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('404 Unavailable')
}

const requestHandler = (req, res) => {
  const handler = getRoute(req, routes) || notFound
  handler(req, res)
}

const server = http.createServer(requestHandler)

server.listen(port, (error) => {
  if (error) {
    return console.log(`Error connecting to node server on port ${port}: `, error)
  }
  console.log(`Node server running on port ${port}`)
})