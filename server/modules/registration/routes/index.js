const { Router } = require("express");
const router = Router();
const { createUser } = require("../controllers");

router.post("/", createUser);

module.exports = router;
