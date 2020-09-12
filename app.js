const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
    res.status(200).send('api server is running.')
})

app.listen(3000, () => {
    console.log('App is running at port 3000')
})