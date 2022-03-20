const request = require('request')
const forecast = (lat, lng, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=fadc1843b30aaef6fe41dd8923bc9dd2&query=" + lat + ',' + lng;



  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to get data', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined,
        console.log(body),
        body.current.weather_descriptions[0] + ". It is currently" + body.current.temperature + " degrees out. It feels like"
        + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%"
      )
    }

  })
}

module.exports = forecast;