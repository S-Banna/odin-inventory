const { Router } = require("express");
const controller = require("../controllers/controller.js");
const router = Router();

router.get("/", controller.getIndex);
router.get("/view", controller.getView);
router.get("/addGame", controller.getAddGame);
router.post("/addGame", controller.postAddGame);
router.get("/addPlatform", controller.getAddPlatform);
router.post("/addPlatform", controller.postAddPlatform);
router.get("/deleteGame", controller.getDeleteGame);
router.post("/deleteGame", controller.postDeleteGame);

module.exports = router;