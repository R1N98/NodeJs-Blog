const express =require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes/blogRoutes')

const app= express()

//mongoDB connection string
const uri ='mongodb://hydra:palki3998@nodeblog-shard-00-00.2uptk.mongodb.net:27017,nodeblog-shard-00-01.2uptk.mongodb.net:27017,nodeblog-shard-00-02.2uptk.mongodb.net:27017/Node-Blog?ssl=true&replicaSet=atlas-1uecfp-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true})
  .then((result) => {
      app.listen(3000)
      console.log('connected to db')
    })
  .catch((err) => console.log(err))

//register views
app.set('view engine','ejs')
app.set('views','myviews')

//middlewares and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))  //for accepting form data
app.use(morgan('dev'))                       //3rd party middleware to log details

app.get('/',(req,res)=> {
    res.redirect('/blogs')
})

app.get('/about',(req,res)=> {
    res.render('about', { title: 'About' })
})

app.use('/blogs',routes)

//404 error
app.use((req,res) => {
    res.status(404).render('404', { title: 'Error' })
})
