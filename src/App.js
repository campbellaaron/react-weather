import React, {useState} from "react";
import axios from "axios";

function App() {

const [data,setData] = useState({})
const [location, setLocation] = useState('')
// const owmIcon = data.weather[0].icon;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},us&appid=e92afa1b3e33cd2a6597f1733680f8df&units=imperial`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(apiUrl).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter location as City, St"
        type="text"/>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.name ? <p>{data.name}, US</p> : null}
          </div>
          <div className="icons">
          {data.weather ? <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt=""/>  : null}
          </div>
          <div className="temp">
            {data.main ? <h2>{data.main.temp.toFixed()}&deg; F</h2> : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && 
        <div className="bottom">
          <div className="feels">
            <p>Feels Like:</p>
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}&deg;</p> : <p className="bold">--</p>}
          </div>
          <div className="humidity">
            <p>Humidity:</p>
            {data.main ? <p className="bold">{data.main.humidity}%</p> : <p className="bold">--</p>}
          </div>
          <div className="wind">
            <p>Wind Speed:</p>
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()} mph</p> : <p className="bold">--</p>}
          </div>
        </div>
        }
        <div className="footer">
          <p>Copyright &copy; 2022 <a href="https://campbellaaron.github.io">Aaron Campbell</a>. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
