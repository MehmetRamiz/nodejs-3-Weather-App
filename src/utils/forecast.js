const request = require('request')

const forecast = (lat, long, callback)=> {
    const url ='https://api.darksky.net/forecast/8cc93163c833626cfcc2cb0a8d1ec56f/' +lat +','+ long + ''
    
    request({url , json:true}, (error,{body})=>{
        if(error){
            callback('low level error',undefined)
        }else if(body.error){
            callback('coordinate error',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary , {
               
            

            } )
        }
    })
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon} 

   // https://api.darksky.net/forecast/8cc93163c833626cfcc2cb0a8d1ec56f/' +lat +','+ long + ''
}

module.exports =forecast