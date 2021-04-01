const { Router } = require("express");
const router = Router();
const { verification } = require("../controllers");

router.get("/:verificationToken", verification);

module.exports = router;
