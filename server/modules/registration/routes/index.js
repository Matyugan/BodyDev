const { Router } = require("express");
const router = Router();
const createUser = require("../../registration/controller");

router.post("/", createUser);

module.exports = router;
