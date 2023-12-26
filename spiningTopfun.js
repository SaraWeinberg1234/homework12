
const bcrypt = require('bcryptjs');
const { default: mongoose } = require("mongoose");
const spiningTop = require("../models/spiningTopTable");
const spiningValidator=require("../models/spiningTopTable");//‹– Ÿ”’‚ –Ÿ⁄ ‹‘“Ÿ‚ ‹‰’‡ÁÊŸ‘ ‚Êﬁ‘
module.exports.getAllSpinings= async (req, res) => {
    try {

        let allSpining = await spiningTop.find({})
        res.json(allSpining);
    }
    catch (err) {
        res.status(400).send("problem in getting all spining")

    }
}
module.exports.getAllSpiningById= async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("invalid paramter id");
    try {
        let oneSpining = await spiningTop.findOne({ _id: req.params.id })

        if (!oneSpining)
            return res.status(404).send("no spining with such id");
        res.json(oneSpining);
    }
    catch (err) {
        res.status(400).send("problem im getting spining id " + req.params.id)

    }
}
// module.exports.addSpining=async (req, res) => {
//     if (!req.body.name || !req.body.price) {
//         res.status(404);
//         throw new Error("missing paramters")
        
//     }
//     let mySpining = new spiningTop({
//         name: req.body.name
//         , price: req.body.price
//         ,color:req.body.color


//     })
//     try {
//         await mySpining.save();
//         res.status(201).json(mySpining);
//     } catch (err) {
//         res.status(400).send("cannot create this spining")
//     }


// }


module.exports.addSpining = async (req, res) => {
    let { name, price, color,password  } = req.body;
    let validate = spiningValidator(req.body);
    if (validate.error)
        return res.status(400).send(validate.error[0])

    try {

        let sameSpining  = await spiningTop.find({ name, price, color,password  });
        if (sameSpining .length > 0)
            return res.status(409).send("€—Ë ÁŸŸ› ·‰Ë —È› €÷‘ ‚› –’Í ’ﬁ·‰Ë ‚ﬁ’”Ÿ›")

        let newSpining  = await spiningTop.create({ name, price, color,password  });


        return res.status(201).json(newSpining)
    }
    catch (err) {
        res.status(400).send("–– ‹‘’·Ÿ„" + err)
    }
}



module.exports.deleteSpining = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("Á’” ‹– ÍÁŸﬂ");
    let deletedSpining = await spiningTop.findByIdAndDelete(id)
    if (!deletedSpining)
        return res.status(404).send("‹– ‡ﬁÊ– ·—Ÿ—’ﬂ ‚› €÷‘ Á’” ‹ﬁ◊ŸÁ‘")
    return res.json(deletedSpining);

}
module.exports.updateSpining = async (req, res) => {
    let { spiningid } = req.params;
    if (!mongoose.isValidObjectId(spiningid))
        return res.status(400).send("Á’” ‹– ÍÁŸﬂ");
    try {
        let spiningToUpdate = await Book.findById(spiningid);
        if (!spiningToUpdate)
            return res.status(404).send("‹– ‡ﬁÊ– ·—Ÿ—’ﬂ ‚› Á’” €÷‘")
        spiningToUpdate.name = req.body.name || spiningToUpdate.name;
        spiningToUpdate.color = req.body.color || spiningToUpdate.color;
        spiningToUpdate.price = req.body.price || spiningToUpdate.price;
        await spiningToUpdate.save();
        res.json(spiningToUpdate);
    } catch (err) {
        res.status(400).send("–– ‹‚”€ﬂ" + err)
    }

}
module.exports.login = async (req, res) => {
    try {
        let { name, password } = req.body;
        if (!name || !password)
            return res.status(404).send("missing required paramters username or password")
        if (!/[A-Za-z]{5}[0-9]{2}/.test(password))
            return res.status(400).send('password not valid')



        let loggedInUser = await spiningTop.findOne({name });
        if (!loggedInUser)
            return res.status(404).send("no spining with such credentials")

        if (!await bcrypt.compare(password, loggedInUser.password))
            return res.status(404).send("no spining with such credentials")
        let { name: u, _id, price,color } = loggedInUser;
        res.json({ name: u, _id,price ,color});
    }
    catch (err) {
        res.status(500).send("an error occured in....")
    }

}

module.exports.priceBetween = async (req, res) => {

    let { from, to, perPage, page } = req.query;
    try {
        let serachObject = {};
        if (from)
            serachObject.price = { $gte: from }
        if (to)
            serachObject.price = { $lte: to }

        let allSpinings = await spiningTop.find(serachObject)
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(allSpinings)
    }
    catch (err) {
        res.status(400).send("‹– ‡ŸÍﬂ ‹Á—‹ –Í €‹ ‘·—Ÿ—’‡Ÿ›" + err.message)
    }
}

