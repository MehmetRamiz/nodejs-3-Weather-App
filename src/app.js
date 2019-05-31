const express = require('express')
const path =require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express()
//dosyaların yolları express yardımıyla belirtiliyor
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//handlbars engine ve views yerleri belli ediliyor
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//css ve js dosyaları sabit olarak belli ediliyor
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index', {
        title:'Weather',
        name:'Ramiz Tas'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title:'about me',
        name:'Ramiz Tas'
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        helptext:'this is some helpfulltext',
        title:'Help ',
        name:'Message'
    })
})
  


 

app.get('/weather', (req,res)=>{
  if(!req.query.address) {
      return res.send({
          error:'No addres'
      })
  }

  geocode(req.query.address,(error, {latitude, longtitude,location} = {} )=>{
      if(error) {
          return res.send({error:error})
      }
      forecast(latitude, longtitude,(error,forecastData)=>{
      
      res.send({
          forecast: forecastData,
          location,
          address:req.query.address
          })
       })
    })

  })
 

app.get('/products',(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search terms'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ramiz',
        errormessage:'help article not found'
    })
})


app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ramiz',
        errormessage:'page not found'
    })
})


app.listen(3000, () => {
    console.log('server is up on port 3000')
})