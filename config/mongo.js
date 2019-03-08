const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONURL ? process.env.MONURL: `mongodb://hardik:admin123456@ds161497.mlab.com:61497/gim`,{ useNewUrlParser: true })

