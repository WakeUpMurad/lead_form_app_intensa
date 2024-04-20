'use strict'

document
  .getElementById('leadForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    let fullName = document.getElementById('fullName').value.trim()
    let email = document.getElementById('email').value.trim()
    let phone = document.getElementById('phone').value.trim()
    let city = document.getElementById('city').value

    if (fullName.length < 3) {
      alert('Пожалуйста, введите корректное ФИО.')
      event.preventDefault()
      return
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      alert('Пожалуйста, введите корректный email.')
      event.preventDefault()
      return
    }

    if (phone.length < 10 || isNaN(phone)) {
      alert('Пожалуйста, введите корректный телефонный номер.')
      event.preventDefault()
      return
    }

    if (city === '') {
      alert('Пожалуйста, выберите город.')
      event.preventDefault()
      return
    }

    let formData = new FormData(this)
    fetch('../backend/save_lead.php', {
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
