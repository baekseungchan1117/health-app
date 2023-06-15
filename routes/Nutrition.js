const express = require("express");
const controller = require("../controllers/Nutrition");
const router = express.Router();

router.get("/", controller.commomPageController);
router.get("/reactiveModifyTodayGoals", controller.reactiveModifyTodayGoals);
router.post("/searchResult", controller.searchResultController);
router.patch("/modifyEats", controller.modifyEats);
router.delete("/delEats", controller.delGoals);
router.post("/modifyGoals", controller.modifyGoals);

module.exports = router;
