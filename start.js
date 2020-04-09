
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection
    .on('open', () => {
        console.log('Mongodb conection Success');
    })
    .on('error', (err) => {
        console.log(`Error In Connecting mongodb : ${err.message}`)
    });

require('./models/Registration')

const app = require('./app')
const server =  app.listen(3000, ()=> {
    console.log(`Express is running on port ${server.address().port}`);
});