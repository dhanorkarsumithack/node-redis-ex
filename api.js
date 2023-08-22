import axios from "axios";
import Redis from "ioredis"
import dotenv from 'dotenv';
dotenv.config(); 

const redis = new Redis({
    'port':6379,
    'host':'127.0.0.1'
})



const cityEndPoint = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.MYAPIKEY}`

const getWeather = async (city) => {

    let cacheEntry= await redis.get(`weather:${city}`);

    if(cacheEntry){
        cacheEntry = JSON.parse(cacheEntry);
        return {...cacheEntry, 'source':'cache'};
    }



    let apiResponse = await axios.get(cityEndPoint(city)) 

    redis.set(`weather:${city}`, JSON.stringify(apiResponse.data),'EX',3600);

    return {...apiResponse.data,"source":'API'};
}

const city = "Seattle"
const t0= new Date().getTime();
let weather = await getWeather(city)
const t1= new Date().getTime();

weather.responseTime=`${t1-t0}ms`


console.log(weather);

process.exit();
