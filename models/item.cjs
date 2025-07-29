const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
     name: {
    type: String,
    required: true,
  },
     email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^03\d{9}$/, 'Please enter a valid 11-digit Pakistani number'],

  },
  comment: {
    type: String,
    default: '',
  },
   
})

const itemModel = mongoose.model("item",itemSchema)



module.exports=itemModel