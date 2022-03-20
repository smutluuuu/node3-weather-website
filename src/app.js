const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'süleyman mutlu'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Süleyman Mutlu',
    title: 'About Me'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'Save me from this situation',
    title: 'Help',
    name: 'SMutlu'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.log(error)

    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        console.log(error)
      }
      res.send({
        forecastData: forecastData,
        location,
        address: req.query.address
      })
    })
  })

})

app.get('/help/*', (req, res) => {
  res.send('Help article not')
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })


})

app.get('*', (req, res) => {
  res.send('My 404 page')
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
});
