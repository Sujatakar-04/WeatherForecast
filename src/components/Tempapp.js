import React, { useEffect, useState } from "react";
import "./css/style.css";

function Tempapp()
{
    var currname="";
 
const [city,setCity]=useState("mumbai");
const [search, setSearch]=useState("mumbai");
const [weather_img_src, setWeatherImgSrc] = useState("");
const [climate,setClimate]=useState("Not Found");
useEffect(
    ()=>{
        const fetchApi=async ()=>{
const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=efb081fea808f355e5690496986f2d09 `;
const response=await fetch(url);
const resjson=await response.json();
// console.log(resjson);
setCity(resjson);
        };
    
    fetchApi();
    },[search]
)
useEffect(() => {
    // Update weather image source based on current weather condition
    switch (city.weather?.[0]?.main) {
        case 'Clouds':
            setClimate(city.weather[0].description);
            setWeatherImgSrc("cloud.png");
            break;
            case 'Rain':
                setClimate(city.weather[0].description);
                setWeatherImgSrc("rain.png");
                break;
                case 'Clear':
                    setClimate(city.weather[0].description);
                    setWeatherImgSrc("clear.png");
                    break;
            case 'Mist':
                setClimate(city.weather[0].description);
                        setWeatherImgSrc("mist.png");
                        break;
            case 'Snow':
                setClimate(city.weather[0].description);
                            setWeatherImgSrc("snow.png");
                            break;
        default:
            setClimate("Not Found");
            setWeatherImgSrc("default.png");
            break;
    }
}, [city]);


return(
<>
<div className="Box">
    <div className="Inputdata">
<input
type="search"
className="inputfield"
placeholder="Enter Your Location"
// value={search}

onChange={(event)=>{
     currname=event.target.value;
// setSearch(event.target.value)
}}
/>
<button className="fas fa-search" onClick={(event)=>{
    setSearch(currname)
}}></button>
<div className="weather-body">

    <img src={weather_img_src} alt="default.png" className="weather-img"/>
</div>
<div>
    <h3>{climate}</h3>
</div>
    </div>

{ 
    !city.name ? (
        <h3>No Data Found</h3>
    ) :(
<div>
<div className="info">
    <h2 className="location">
<i className="fas fa-street-view"></i>{search}

</h2>
<h1 className="temp">
{city.main.temp}<sup>°C </sup>
</h1>
<div className="hum_wind">
    <i className="fa-sharp fa-solid fa-droplet">
    </i>
    <h4><span>{city.main.humidity}%</span> Humidity</h4>

</div>
<div className="tempmin_max"><h4>Min : <span>{city.main.temp_min}<sup>°C</sup></span></h4><h4> Max : <span>{city.main.temp_max}<sup>°C</sup></span></h4></div>
</div>

</div>
    )
}
</div>
</>
)
}
export default Tempapp;