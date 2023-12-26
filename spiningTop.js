const router = require("express").Router();
const spiningController = require('./controlers/spiningTopfun');

router.get("/",spiningController.getAllSpinings)
router.get("/:id",spiningController.getAllSpiningById)
router.post("/",spiningController.addSpining )
router.delete("/:id", spiningController.deleteSpining)
router.put("/:spiningid", spiningController.updateSpining)
router.post("/login", spiningController.login)
router.get("/between", spiningController.priceBetween)


module.exports = router;