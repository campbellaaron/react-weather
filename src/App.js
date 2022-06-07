import React, {useState} from "react";
import axios from "axios";
import Geocode from "react-geocode";

function App() {

  Geocode.setApiKey("AIzaSyB_YQUlh0rGU_aioENUqaW3hQkPbVO_eiE");
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();
  

const [data,setData] = useState({})
const [location, setLocation] = useState('')
const imgPath = `http://openweathermap.org/img/wn/{data.weather[0].icon}@2x.png`

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location},us&appid=&units=imperial`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(apiUrl).then((response) => {
        setData(response.data)
        console.log(response.data)
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
          {data.weather ? <img src={imgPath} alt=""/> : null}
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
      </div>
    </div>
  );
}

export default App;
