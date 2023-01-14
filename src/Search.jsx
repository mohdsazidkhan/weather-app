import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";

function Search() {

  const [searchQuery, setSearcQuery] = useState('Delhi')
  const [cityName, setCityName] = useState(null);
  const [data, setData] = useState(null);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const API_KEY  = process.env.REACT_APP_WEATHER_API_KEY;

  const handleChange = (event) => {
    if(event.target.value.trim().length !== 0){
      setSearcQuery(event.target.value)
    axios.get(`${BASE_URL}/geo/1.0/direct?q=${event.target.value}&appid=${API_KEY}`).then((response) => {
      if(response.data){
        var lat = response?.data?.[0].lat;
        var lon = response?.data?.[0].lon;
        setCityName(response?.data?.[0].name);
        axios.get(`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((response) => {
          if(response?.data){
            console.log(response?.data, ' response.data')
            setData(response?.data);
          }
        });
      }
    });
    }else{
      setSearcQuery('Delhi')
    }
  }

  useEffect(()=>{
    axios.get(`${BASE_URL}/geo/1.0/direct?q=${searchQuery}&appid=${API_KEY}`).then((response) => {
      if(response.data){
        var lat = response?.data?.[0].lat;
        var lon = response?.data?.[0].lon;
        setCityName(response?.data?.[0].name);
        axios.get(`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((response) => {
          if(response?.data){
            setData(response?.data);
            console.log(response?.data, ' response.data')
          }
        });
      }
    });
  },[])

  const handleBookmark = () => {
    var cities = [];
    var stored = JSON.parse(localStorage.getItem("cities"));
    if(stored?.length > 0){
      stored.push(data);
      localStorage.setItem("cities", JSON.stringify(stored))
    }else{
      cities.push(data);
      localStorage.setItem("cities", JSON.stringify(cities))
    }
  }

  return (
    <div>
      <NavBar/>
      <div className="searchInput">
        <input type='text' defaultValue={searchQuery} name="search" placeholder="Enter City Name" onChange={(event)=> handleChange(event)}/>
      </div>
      <div className="cityCard">
        <div>City: {cityName}</div>
        <div>Coords: lat: {data?.coord?.lat}{' '}lon: {data?.coord?.lon}</div>
        <div>Current Temperature: {data?.main?.temp} C</div>
        <div>Max Temperature: {data?.main?.temp_max} C</div>
        <div>Min Temperature: {data?.main?.temp_min} C</div>
        <div>Humidity: {data?.main?.humidity}</div>
        <div>Country: {data?.sys?.country}</div>
        <button className="bookmark" onClick={()=>handleBookmark()}>Add to Favourite</button>
      </div>
    </div>
  );
}

export default Search;
