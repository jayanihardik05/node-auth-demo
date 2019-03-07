const mongoose = require("mongoose")
require("dotenv").config()
const mongoDBErrors = require("mongoose-mongodb-errorS")
mongoose.plugin(mongoDBErrors)
mongoose.connect(process.env.MONURL,{ useNewUrlParser: true })

