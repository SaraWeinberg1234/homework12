const mongoose = require("mongoose");
const Joi = require("Joi");



const spiningTopSchema = mongoose.Schema({
    name: { type: String, required: true },
    color: String,
    price: Number,
    password:String
})

const SpiningTop = mongoose.model("spining", spiningTopSchema);
module.exports = SpiningTop;

module.exports. spiningValidator = (_bookToValidate) => {

    let spiningJoi = Joi.object({
        name: Joi.string().min(5).max(8),
        price: Joi.number().min(0).max(50),
    })

    return spiningJoi.validate(_spinigToValidate);
}