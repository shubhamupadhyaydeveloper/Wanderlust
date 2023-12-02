const mongoose = require('mongoose')
const Listing = require('../models/Listing.js')
const initdata = require('./data.js')

async function calldb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    } catch (error) {
        console.log(error.message)
    }
}
calldb()

async function startdata() {
    try {
        await   Listing.deleteMany({})
       initdata.data = initdata.data.map((obj) => ({...obj , owner : '65604e471f38f167d625a1ad'}))
        await  Listing.insertMany(initdata.data)
        console.log('Yes all right here')
        
    } catch (error) {
        console.log(error.message)
    }
}

startdata()
