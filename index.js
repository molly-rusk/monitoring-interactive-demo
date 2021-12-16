const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'c6b906940147493b9ac5b5b0ae33b5ed',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

const app = express()
app.use(express.json())



app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req,res) => {
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added sucessfully', {author: "Molly", type: "manual"})

    res.status(200).send(students)
})


app.use(rollbar.errorHandler())
const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}`))
