const bcrypt = require('bcrypt');
const User = require('../models/user')

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body
    const hashedPass = await bcrypt.hash(password, 10);
    // console.log(req.body)
    // console.log(hashedUser, email)
    if (!name || !email || !password) {
        res.status(422).json({ message: 'enter all fields.' })
    }
    // else {
    //     res.json({ message: `username : ${name}, email : ${email}, pass : ${hashedPass}` })
    //     // res.render('home', { title: user })
    //     // res.redirect('/')
    // }

    const userExits = await User.findOne({ email });
    if (userExits) {
        res.status(422).json("A user with that email already exits please try another one!");
        return;
    }

    const newUser = new User({ name, email, password: hashedPass });
    newUser.save()
        .then(() => {
            // console.log(newUser);
            res.status(200).json({ message: 'user added succesfully' })
        })
        .catch((err) => console.log(err));
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        res.status(422).json({ message: "user with this email does not exist" })
    }
    const matchPass = await bcrypt.compare(password, existingUser.password)
    // .then((matchPass) => {
    //     res.status(200).json({ message: "hello user" })
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
    if (!matchPass) {
        res.status(422).json({ message: "incorrect password" })
    }
    else {
        res.status(200).json({ message: "hello user" })
    }
}