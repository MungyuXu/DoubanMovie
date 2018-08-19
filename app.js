/* created at 2018/7/12 by BlueSky @client */
const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 80
// const proxy = require('http-proxy-middleware')



app.use(express.static('static'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html')
});
http.listen(port, () => {
  console.log(`[client] [started]:[http://localhost:${port}]`)
})