const http = require('http')

const todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Learn React', completed: false },
  { id: 3, title: 'Learn Angular', completed: false }
]
//404 staus code get request
// const server = http.createServer((req, res) => {
//   res.statusCode = 404
//   res.setHeader('content-type', 'application/json')
//   res.setHeader('X-Powered-By', 'Node.js')
//   res.end(
//     JSON.stringify({
//       success: false,
//       data: {}
//     })
//   )
// })

//200 status code GET request
const server = http.createServer((req, res) => {
  //res.writeHead(404,{
  // 'Content-Type': 'application/json',
  // 'X-Powered-By': 'Node.js'
  //   })

  // getting the send  data from client
  const { method, url } = req
  let body = []
  req
    .on('data', chunk => body.push(chunk))
    .on('end', () => {
      body = Buffer.concat(body).toString()
      let status = 404

      const response = {
        success: false,
        data: null
      }

      if (method === 'GET' && url === '/todos') {
        status = 200
        response.success = true
        response.data = todos
      } else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body)

        if (!id || !text) {
          status = 400
          response.data = 'Invalid request'
        } else {
          todos.push({ id, text })
          status = 201
          response.success = true
          response.data = todos
        }
      }

      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('X-Powered-By', 'Node.js')
      res.end(JSON.stringify(response))
    })
})

const PORT = 3000

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
