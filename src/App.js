import React, { Component } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard/WeatherCard';
import InputForm from './components/InputForm/InputForm';
import { getWindDirection, getTimeFromTimestamp } from './services/utils';
import { Route } from 'react-router-dom';
import { getWeatherDataFromBackEnd } from './services/api-calls';

class App extends Component {
  state = {
    weatherData: [],
    windDirection: '',
    sunrise: '',
    sunset: ''
  }

  handleGetWeatherDataFromBackEnd = async formData => {
    const weatherData = await getWeatherDataFromBackEnd(formData);
    const windDirection = await getWindDirection(weatherData.wind.deg);
    const sunrise = await getTimeFromTimestamp(weatherData.sys.sunrise);
    const sunset = await getTimeFromTimestamp(weatherData.sys.sunset);
    this.props.history.push('/weather');
    this.setState({weatherData, windDirection, sunrise, sunset})
  }

  render() {
    return (
      <>
        <h3>React Weather API</h3><br></br>
        <Route  path='/' render={(history) => 
          <InputForm
            history={history} 
            handleGetWeatherDataFromBackEnd={this.handleGetWeatherDataFromBackEnd}
          />
        }/>
        <Route path='/weather' render={() =>
          <WeatherCard 
            weatherData={this.state.weatherData}
            windDirection={this.state.windDirection}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}            
          />
        }/>
      </>
    )
  }
}

export default App;
