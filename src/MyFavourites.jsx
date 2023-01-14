import { useEffect, useState } from "react";
import NavBar from "./NavBar";

function MyFavourites() {
  const [cities, setCities] = useState(null);
  useEffect(()=>{
    let cities = JSON.parse(localStorage.getItem('cities'));
    setCities(cities)
  },[])
  const removeBookmark = (index) => {
    let cities = JSON.parse(localStorage.getItem('cities'));
    cities.splice(index, 1);
    localStorage.setItem("cities", JSON.stringify(cities))
    setCities(cities)
  }
  return (
    <div>
      <NavBar/>
      {cities ? 
      <>
      {cities?.map((data,index)=>
      <div className="cityCard favourite" key={index}>
        <div>City: {data?.name}</div>
        <div>Coords: lat: {data?.coord?.lat}{' '}lon: {data?.coord?.lon}</div>
        <div>Current Temperature: {data?.main?.temp} C</div>
        <div>Max Temperature: {data?.main?.temp_max} C</div>
        <div>Min Temperature: {data?.main?.temp_min} C</div>
        <div>Humidity: {data?.main?.humidity}</div>
        <div>Country: {data?.sys?.country}</div>
        <button className="bookmark remove" onClick={()=>removeBookmark(index)}>Remove from Favourite</button>
      </div>
      )}
      </>
      :
      <div className="cityCard favourite">
        <div>No Data Found</div>
      </div>
      }
    </div>
  );
}

export default MyFavourites;
