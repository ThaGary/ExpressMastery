const express = require('express')
const app = express()
const port = 3004
const bodyParser = require('body-parser')
var data = require('./data.json')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({ data })
})

app.get('/:id', (req, res, next) => {
    var { id } = req.params
    var filtered = data.filter(obj => {
        return obj.id == id
    })
    res.send({ filtered })
})

app.post('/', (req, res, next) => {
    var { body } = req
    var obj = {
        id: data.length + 1,
        ideas: body.ideas
    }
    data.push(obj)
    res.send({ data: obj })
})

app.put('/:id', (req, res, next) => {
    var { body } = req
    var { id } = req.params
    var mapped = data.map(obj => {
        if (id == obj.id){
            obj.ideas = body.ideas
            obj = {
                id: obj.id,
                ...body
            }
        }
        return obj
    })
    data = mapped
    res.send({ data })
})

app.delete('/:id', (req, res, next) => {
    var { id } = req.params
    var mapped = data.filter(obj => {
        return obj.id != id
    })
    data = mapped
    res.send({ data })
})

app.use(function(req, res, next) {
    res.status(404).sendfile('index.html')
  })
  
  app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })  

app.listen(port)