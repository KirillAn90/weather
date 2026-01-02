#!/usr/bin/env node

const axios = require('axios');
const config = require('./config');

// Парсинг аргумента (название города)
const city = process.argv[2];
if (!city) {
  console.error('Ошибка: укажите город как аргумент. Пример: node index.js "London"');
  process.exit(1);
}

// Формирование URL запроса
const url = `${config.WEATHER_API_URL}?access_key=${config.WEATHER_API_KEY}&query=${encodeURIComponent(city)}&units=${config.UNITS}`;

// Выполнение запроса
axios.get(url)
  .then(response => {
    const data = response.data;

    // Проверка на ошибку от API
    if (data.error) {
      console.error(`Ошибка API: ${data.error.code} ${data.error.info}`);
      return;
    }

    // Вывод данных
    console.log(`Погода в ${data.location.name} (${data.location.country}):`);
    console.log(`Температура: ${data.current.temperature} °${config.UNITS === 'm' ? 'C' : 'F'}`);
    console.log(`Ощущается как: ${data.current.feelslike} °${config.UNITS === 'm' ? 'C' : 'F'}`);
    console.log(`Влажность: ${data.current.humidity}%`);
    console.log(`Давление: ${data.current.pressure} гПа`);
    console.log(`Скорость ветра: ${data.current.wind_speed} км/ч`);
    console.log(`Описание: ${data.current.weather_descriptions[0]}`);
    console.log(`Время наблюдения: ${data.current.observation_time}`);
  })
  .catch(error => {
    if (error.response) {
      console.error(`Ошибка API: ${error.response.status} ${error.response.data.error?.info || 'Неизвестная ошибка'}`);
    } else {
      console.error(`Ошибка сети: ${error.message}`);
    }
  });
