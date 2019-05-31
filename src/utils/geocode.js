const request = require('request')

const geocode = (address,  callback) => {

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFtaXp4IiwiYSI6ImNqdmt5cHRxeDBiZ2c0M211dmwzbmJ5ZDUifQ.DuQ0ggl3qtBjphdrXS1_fQ'

    request({url, json:true},(error,{body})=>{
       if(error){
           callback('Unavle connect to weather', undefined)
       }else if(body.features.length === 0) {
           callback('Unable to find location',undefined)
        } else{
           callback(undefined, {
               latitude: body.features[0].center[1],
               longtitude: body.features[0].center[0],
               location: body.features[0].place_name
           })

        }


    })
}

module.exports =geocode