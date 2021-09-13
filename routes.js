const { Router } = require("express");
const Document = require("./models/Document");

const router = Router();

router.get("/", (req, res) => {
  const code = `Welcome to WasteBin!

Use the commands in the top right corner
to create a new file to share with others.`;

  res.render("code-display", { code, language: "plaintext" });
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/save", async (req, res) => {
  const { value } = req.body;
  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (err) {
    res.render("new", { value });
  }
});

router.get("/:id/duplicate", async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);

    res.render("new", { value: document.value });
  } catch (err) {
    res.redirect(`/${id}`);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Document.findById(id);

    res.render(`code-display`, { code: document.value, id });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
