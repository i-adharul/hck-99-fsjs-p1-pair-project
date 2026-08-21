const express = require('express');
const Controller = require('./controllers/controller');
const app = express()
const session = require('express-session')
const port = 3000
const router = require('./routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'kupota-secret',
    resave: false, //tidak menyimpan sesi selama tidak ada perubahan
    saveUninitialized: false, //objek sesi kosong tidak disimpan
    cookie: {
        secure: false, // allow html
        sameSite: true // secure from csrf attack
    }
}))

app.use("/", router)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})