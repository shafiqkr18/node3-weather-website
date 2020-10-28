
const path = require('path')

const express = require('express')

const hbs = require('hbs')

const geocode = require('./utils/geocode')

 const forecast = require('./utils/forecast')

// console.log(__dirname)

// console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//define handlebars engine and views
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to
app.use(express.static(publicDirectoryPath))



app.get('' , (req,res) => {
    res.render('index' , {
        title: 'weather app',
        name : 'shafiq'
    })
})

app.get('/about', (req , res) => {
    res.render('about',{
        title: 'about me',
        name:'shafiq'
    })
})

app.get('/help', (req , res) => {
    res.render('help' , {
        message: 'this is help page message',
        title: 'Help',
        name: 'shafiq'
    })
})


app.get('/weather', (req ,  res) => {

    if(!req.query.address)
    {
        return res.send({
            error: 'You need to pass address!'
        })
    }

    //call function now
    geocode(req.query.address, (error , {lat,lon,name} = {}) => {
            if(error)
            {
                return res.send({error:error})
            }
            //forcast
            forecast(lon,lat , (error,  data) => {
               if(error)
               {
                   res.send(error) //shorthand format 
               }

               res.send({
                forecast: data,
                location: name,
                address: req.query.address
            })

            })
        })

   
})

app.get('/help/*', (req , res) =>{
    res.render('404-page' , {
        message: 'Help article not found',
        title: '404',
        name: 'shafiq'
        
    })
})


app.get('*', (req , res) =>{
    res.render('404-page' , {
        message: 'Page not found',
        title: '404',
        name: 'shafiq'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+port)
})

