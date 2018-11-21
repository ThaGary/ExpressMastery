const express = require('express')
const app = express()
const port = 3004
const bodyParser = require('body-parser')
var data = require('./data.json')

app.use(bodyParser.json())

app.get('/overwatch', (req, res) => {
    res.send({
        data
    })
})

app.get('/overwatch/:id', (req, res, next) => {
    let { id } = req.params
    let filtered = data.filter(obj => {
        return obj.id == id
    })
    res.send({
        filtered
    })
})

app.post('/overwatch', (req, res, next) => {
    let { body } = req
    let obj = {
        id: data.length + 1,
        hero: body.hero
    }
    data.push(obj)
    res.send({
        data: obj
    })
})

app.put('/overwatch/:id', (req, res, next) => {
    let { body } = req
    let {
        id
    } = req.params
    let mapped = data.map(obj => {
        if (id == obj.id) {
            obj.hero = body.hero
            obj = {
                id: obj.id,
                ...body
            }
        }
        return obj
    })
    data = mapped
    res.send({
        data
    })
})

app.delete('/overwatch/:id', (req, res, next) => {
    let { id } = req.params
    let mapped = data.filter(obj => {
        return obj.id != id
    })
    data = mapped
    res.send({ data })
})

app.use(function (req, res, next) {
    res.status(404).sendfile('index.html')
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port)