const mongoose = require("mongoose")
require("dotenv").config()
const mongoDBErrors = require("mongoose-mongodb-errorS")
mongoose.plugin(mongoDBErrors)
mongoose.connect(process.env.MONURL ? process.env.MONURL: `mongodb://hardik:admin123456@ds161497.mlab.com:61497/gim`,{ useNewUrlParser: true })

