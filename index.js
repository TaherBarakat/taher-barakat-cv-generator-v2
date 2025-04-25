const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

function render(resume) {
  const templatePath = path.join(__dirname, "template.hbs");
  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(templateSource);
  return template(resume);
}

module.exports = {
  render: render,
  pdfRenderOptions: {
    format: "A4",
    printBackground: true,
    margin: {
      top: "15mm",
      right: "20mm",
      bottom: "15mm",
      left: "20mm",
    },
  },
  name: "Taher CV Theme",
};
