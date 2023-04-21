const express = require("express");
const router = express.Router();

const { ensureLoggedIn } = require("connect-ensure-login");

const {
  listAction,
  removeAction,
  editAction,
  saveAction,
  importAction,
  importFormAction,
  dbErrorAction,
} = require("./movie.controller");

router.get("/", listAction);
router.get("/view/:id?", editAction);
router.get("/remove/:id", ensureLoggedIn("/login"), removeAction);
router.get("/edit/:id?", ensureLoggedIn("/login"), editAction);
router.get("/import", ensureLoggedIn("/login"), importFormAction);
router.get("/error", dbErrorAction);
router.post("/save", ensureLoggedIn("/login"), saveAction);
router.post("/import", ensureLoggedIn("/login"), importAction);

module.exports = router;
