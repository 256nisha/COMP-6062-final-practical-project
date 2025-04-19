const { createApp } = Vue

createApp({
    data() {
        return{
            isGetRandomUserError: false,
            isGetWeatherError: false,
            isGetDefinitionError: false,  
            user: {
                firstName: '',
                lastName: '',
                age: '',
                picture: ''
            },
            weather: {
                city: 'London',
                province: 'Ontario',
                country: 'Canada'
            },
            weatherData: {
                temp: '',
                wind: '',
                description: ''
            },
            cityPhotos: {
                image: '',
            },
            word: '',
            definition: {
                word: '',
                phonetic: '',
                meaning: ''
            }
        }
    },
    methods: {
        getRandomUser() {
            fetch('https://comp6062.liamstewart.ca/random-user-profile')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log('An Error Occured in fetching Random User Data. Please Try Again')
                    this.isGetRandomUserError = true;
                }
            })
            .then( receieved_data => {
            this.user.firstName = receieved_data.first_name;
            this.user.lastName = receieved_data.last_name;
            this.user.age = receieved_data.age;
            this.user.picture = receieved_data.profile_picture;
            })
            .catch(error => console.error("Encountered error getting the Random User data",error))
        },
        getWeather() {
            fetch(`https://comp6062.liamstewart.ca/weather-information?city=${this.weather.city}&province=${this.weather.province}&country=${this.weather.country}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log('An Error Occured in fetching Weather Data. Please Try Again')
                    this.isGetWeatherError = true;
                }
            })
            .then( receieved_data => {
                this.weatherData.temp = receieved_data.temperature;
                this.weatherData.wind = receieved_data.wind_speed;
                this.weatherData.description = receieved_data.weather_description;
            })
            .catch(error => console.error("Encountered error getting the weather data",error))
        },
        getDefinition() {
            fetch(`https://comp6062.liamstewart.ca/define?word=${this.word}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log('An Error Occured in fetching Definition Data. Please Try Again')
                    this.isGetDefinitionError = true;
                }
            })
            .then( receieved_data => {
            this.definition.word = receieved_data[0].word;
            this.definition.phonetic = receieved_data[0].phonetic;
            this.definition.meaning = receieved_data[0].definition;
            })
            .catch(error => console.error("Encountered error getting the definition data",error))
        },
    },
    mounted() {
      this.getRandomUser();
      this.getWeather();
    }
  }).mount('#app');
  