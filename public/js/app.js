console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = ''
  messageTwo.textContent = ''
  const location = search.value


  fetch('http://localhost:3000/weather?address=' + location)
    .then((response) => {
      response.json().then(data => {
        console.log(data)
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecastData
      })
    })
    .catch(err => {
      messageOne.textContent = err.error
    })

  console.log(location)
})