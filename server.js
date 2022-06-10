const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const PORT = 3001
const url = "#"

//Connect to DB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')


    //set template engine
    app.set('view engine', 'ejs')
    //Middleware
    app.use(bodyParser.urlencoded({extended: true}))
    app.listen(process.env.PORT || PORT, (req, res) => {
    console.log(`Server is now running on port ${PORT}`)
    })

    //CRUD handlers
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
          .then(results => {
            res.render('index.ejs', { quotes: results })
          })
          .catch(/* ... */)
      })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(err => console.log(err))
    })
  })



