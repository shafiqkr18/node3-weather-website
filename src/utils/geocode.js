const request = require("request")

const geocode = (address , callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2hhZmlxa3IxOCIsImEiOiJja2dnYnh0ZTIwdmhvMzRrZmpnOG5xc3lvIn0.n4mMMg2D-vrerxLx5_QEOA&limit=1'

    request({url, json:true},(error ,  {body}) => {
        //console.log(body.features[0].center[1])
         if(error)
         {
             callback("unable to connect to server",  undefined)
         }else if(body.error)
         {
            callback("unable to find loc ",  undefined)
         }else{
             callback(undefined,{
                 lat:body.features[0].center[1],
                 lon:body.features[0].center[0],
                 name:body.features[0].place_name
             })
         }
    })
}

module.exports = geocode