'use strict'

document
  .getElementById('leadForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    let formData = new FormData(this)
    fetch('backend.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        window.location.href = 'leads.php'
      })
      .catch((error) => console.error('Ошибка:', error))
  })
