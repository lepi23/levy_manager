const recordsRouter = require('express').Router()
const Record = require('../models/record')

//get

recordsRouter.get('/', async (request, response) => {
    const records = await Record
        .find({})
    response.json(records)    
})

//post
recordsRouter.post('/', async (request, response) => {
    const body = request.body
    const record = new Record({
        artist: body.artist,
        name: body.name,
        price: body.price,
        info: body.info,
        recordType: user.recordType
    })

    const savedRecord = await record.save()
    response.json(savedRecord.toJSON())
})