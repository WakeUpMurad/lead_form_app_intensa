'use strict'

document
  .getElementById('leadForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    var fullName = document.getElementById('fullName').value.trim()
    var email = document.getElementById('email').value.trim()
    var phone = document.getElementById('phone').value.trim()
    var city = document.getElementById('city').value

    // Простая валидация ФИО: должно быть не менее 3 символов
    if (fullName.length < 3) {
      alert('Пожалуйста, введите корректное ФИО.')
      event.preventDefault() // Остановка отправки формы
      return
    }

    // Валидация email с помощью регулярного выражения
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      alert('Пожалуйста, введите корректный email.')
      event.preventDefault()
      return
    }

    // Простая валидация телефона: должно быть не менее 10 цифр
    if (phone.length < 10 || isNaN(phone)) {
      alert('Пожалуйста, введите корректный телефонный номер.')
      event.preventDefault()
      return
    }

    // Валидация выбора города
    if (city === '') {
      alert('Пожалуйста, выберите город.')
      event.preventDefault()
      return
    }

    // Если все данные прошли валидацию, форма будет отправлена
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
