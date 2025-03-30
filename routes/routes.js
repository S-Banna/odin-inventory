const { Router } = require("express");
const controller = require("../controllers/controller.js");
const router = Router();

router.get("/", controller.getIndex);
router.get("/view", controller.getView);

module.exports = router;