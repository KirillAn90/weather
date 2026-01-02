// config.js
module.exports = {
  WEATHER_API_URL: process.env.WEATHER_API_URL || 'http://api.weatherstack.com/current',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY || 'e7e6d5f6a1c3b8076ff61e34fd4a46bb', // готовый ключ
  DEFAULT_CITY: process.env.DEFAULT_CITY || 'Moscow',
  UNITS: process.env.UNITS || 'm' // 'm' = metric (Цельсий), 'f' = imperial (Фаренгейт)
};
