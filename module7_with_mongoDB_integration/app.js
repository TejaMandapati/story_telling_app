//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const {MongoClient} = require('mongodb');
const storyRoutes = require('./routes/storyRoutes');
const {initCollection} = require('./models/story');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://127.0.0.1:27017';
app.set('view engine', 'ejs');

//mount middlware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//connect to database
/*MongoClient.connect(url, {useUnifiedTopology: true}, (err,client)=> {
    if(err){
        console.log(err.message);
    }else{
        db = client.db('demos');
        //start the server
        app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
});
    }
}); */

MongoClient.connect(url, {useUnifiedTopology: true})
.then(client => {
    db = client.db('demos');
    initCollection(db);
        //start the server
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
});
})
.catch(err=>console.log(err.message))



//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/stories', storyRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

