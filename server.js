const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost/test';

mongoose.connect("mongodb://localhost:27017/shuibiosolution", { useNewUrlParser: true });

const messageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    message: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Message", messageSchema);

const message = new Message()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/build/index.min.html");
})

app.get('/water', (req, res) => {
    res.sendFile(__dirname + "/build/water.min.html");
})

app.get('/earth', (req, res) => {
    res.sendFile(__dirname + "/build/earth.min.html");
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + "/build/about.min.html");
})

// const now = new Date();
// let postBody = [];

app.post("/contact", (req, res) => {
    // for (const item in req.body) {
    //     postBody.push(req.body[item]);
    // }
    // var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    // var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    // postBody.push(date + " " + time)
    console.log(req.body);
    Message.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });
})

app.listen(port, () => {
    console.log(`Web app listening at http://localhost:${port}`)
})