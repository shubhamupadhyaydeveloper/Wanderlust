const joi = require('joi')

const ListSchema = joi.object({
    list : joi.object({
        title : joi.string().required() ,
        description : joi.string().required() ,
        image : joi.string().required() ,
        price : joi.number().required() ,
        location : joi.string().required() ,
        country : joi.string().required()

    }).required()
})

module.exports = ListSchema;