const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const recordSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    info: {
        type: String
    },
    recordType: {
        type: String,
        required: true
    }
    

})
recordSchema
    .set('toJSON', {
        transform: (document, returnObject => {
            returnedObject.id = returnedObject._id-toString()
            delete returnedObject._id
            delete returnedObject.__v
        })
    })
    
module.exports = mongoose.model('Record', recordSchema)