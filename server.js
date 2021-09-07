const express = require('express');
const bcrypt = require('bcrypt');
const userController = require('./controller/usercontroller');
const mongoose = require('mongoose');



const app = express();
const PORT = 3000;
app.use(express.json());
app.set('view engine', 'ejs');

const MONGO_URL = "mongodb+srv://shubham:qwer1234@cluster0.uiklt.mongodb.net/logintest?retryWrites=true&w=majority"

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
try {
    console.log('mongodb connected')
} catch (error) {
    console.log(error)
}

app.post('/login', userController.login_post)
app.post('/signup', userController.signup_post)

app.get('/', (req, res) => {
    res.render('home');
})
app.listen(PORT, () => {
    console.log(`server started at PORT  ${PORT}`)
});