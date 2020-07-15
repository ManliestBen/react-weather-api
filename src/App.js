import React, { Component } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard/WeatherCard';
import InputForm from './components/InputForm/InputForm';
import { getWeatherData, getWindDirection, getTimeFromTimestamp } from './services/utils';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    weatherData: [],
    windDirection: '',
    sunrise: '',
    sunset: ''
  }

  handleGetWeatherData = async formData => {
    const weatherData = await getWeatherData(formData);
    const windDirection = await getWindDirection(weatherData.wind.deg);
    const sunrise = await getTimeFromTimestamp(weatherData.sys.sunrise);
    const sunset = await getTimeFromTimestamp(weatherData.sys.sunset);
    this.props.history.push('/weather');
    this.setState({weatherData, windDirection, sunrise, sunset})
  }

  render() {
    return (
      <>
        <h3>React Weather API</h3><i className="owi owi-01d"></i><br></br>
        <Route  path='/' render={(history) => 
          <InputForm
            history={history} 
            handleGetWeatherData={this.handleGetWeatherData}
          />
        }/>
        <Route path='/weather' render={(history) =>
          <WeatherCard 
            weatherData={this.state.weatherData}
            windDirection={this.state.windDirection}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}            
            history={history}
          />
        }/>
      </>
    )
  }
}

export default App;
