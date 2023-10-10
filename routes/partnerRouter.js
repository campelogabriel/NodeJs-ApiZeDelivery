const express = require("express");
const partnerController = require("../controllers/partnerController");
const router = express.Router();

router.route("/partner").get(partnerController.getAllPartners);

router.route("/partner/:id").get(partnerController.getPartner);

router.route("/partner/nearPartner").post(partnerController.getNearestPartner);

module.exports = router;
