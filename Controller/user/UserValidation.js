const Joi = require('joi');

exports.UserCreateValidation = (data) =>{
    const schema = Joi.object().keys({
        name: Joi.string().min(4).required(),
        username: Joi.string().email().required(),
        password: Joi.string() .min(6) .required(),
        position: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        role: Joi.string().valid('admin', 'user').required()   
    })
    return schema.validate(data)
}

exports.UserUpdateValidation = (data) =>{
    const schema = Joi.object().keys({
        name: Joi.string().min(4).required(),
        username: Joi.string().email().required(),
        position: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        role: Joi.string().valid('admin', 'user').required()
        
    })
    return schema.validate(data)
}