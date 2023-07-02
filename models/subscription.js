const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const subscriptionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A name is required. Enter a name'],
    minlength: [5, 'Name must be at least 5 characters long'],
    unique: [true, 'Name must be unique, this name is already taken'],
  },
  price: {
    type: Number,
    required: [true, 'A price is required. Enter a price'],
    min: [0, 'Price must be at least 0'],
  },
  billingPeriod: {
    type: String,
    required: [true, 'A billing period is required. Enter a billing period'],
    enum: {
      values: ['day', 'week', 'month', 'year'],
      message: 'Billing period must be day, week, month, or year',
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

subscriptionSchema.plugin(uniqueValidator)
subscriptionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

module.exports = Subscription