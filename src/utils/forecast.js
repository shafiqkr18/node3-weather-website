const request = require("request")

const forecast = (lat,lon, callback) => {
 const url = "http://api.weatherstack.com/current?access_key=016d134040b82f87d2ed3151284c09a1&query="+lon+","+lat+""

    request({url,json:true},(error,{body}) =>{
        if(error)
         {
             callback("unable to connect to server",  undefined)
         }else if(body.error)
         {
            callback("unable to find loc ",  undefined)
         }else{
             
             callback(undefined,{
                 temprature:body.current.temperature
             })
         }
    })

}

module.exports = forecast