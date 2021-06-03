let projectData = {};

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8000;

// MiddleWare
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

// Routes
// [!]: GET route
app.get('/all',(req,res)=>{
    res.send(projectData);
});

// POST route
app.post('/addAllWeatherData',(req,res)=>{
    projectData = req.body;
    res.send(projectData);
})




app.listen(PORT,()=>{
    console.log(`[!]: Server is running on PORT ${PORT}`);
})