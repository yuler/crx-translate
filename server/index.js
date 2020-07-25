const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer()
server.on('request', (request, response) => {
  const { searchParams } = new URL(request.url, `http://${request.headers.host}`)
  const word = searchParams.get('word')
  if (word) {
    fs.appendFileSync(path.join(__dirname, 'words.md'), `${word}\n`);
    response.writeHead(201, { 'Content-Type': 'text/plain' })
    response.end('Created')
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('Not Found')
  }
})

server.listen(3000, () => {
  console.log('server start at http://localhost:3000')
})