const joi = require('joi')

module.exports.Listschema = joi.object({
    list : joi.object({
        title : joi.string().required() ,
        description : joi.string().required() ,
        image : {
            url : joi.string(),
            filename : joi.string()
        } ,
        price : joi.number().required() ,
        location : joi.string().required() ,
        country : joi.string().required() ,
        category : joi.string().required()

    }).required()
})

module.exports.Reviewschema = joi.object({
    review : joi.object({
        star : joi.number(),
        comment : joi.string().required()
    }).required()
})