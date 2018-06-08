const http = require('http')
const path = require('path')
const fs = require('fs')
const { generateBars } = require('./utils')
const port = 6060

const staticFiledirectory = path.join(__dirname, '../build')

const routes = {
  GET: {
    '/': process.env.NODE_ENV === 'production'
      ? function (req, res) {
        sendFile('index.html', 'text/html', res)
      }
      : null,
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

function sendFile (filename, contentType, res) {
  const filePath = path.join(staticFiledirectory, filename)

  fs.readFile(filePath, function (error, file){
    if (error){
      res.status = 500
      res.end(error);
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(file)
    };
  });
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