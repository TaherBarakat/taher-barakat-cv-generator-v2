const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

// 1. Load resume data
const resumeData = require("./resume-software.json");

// 2. Load and compile template
const templatePath = path.join(__dirname, "template.hbs");
const templateSource = fs.readFileSync(templatePath, "utf-8");
const template = Handlebars.compile(templateSource);

// 3. Generate HTML
const htmlContent = template(resumeData);

// 4. Configure PDF generation
async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  await page.pdf({
    path: "taher-barakat-software-developer-cv.pdf",
    format: "A4",
    printBackground: true,
    margin: {
      top: "1in", // Reduced from 1in
      right: "1in", // Reduced from 1in
      bottom: "1in", // Reduced from 1in
      left: "1in", // Reduced from 1in
    },
    preferCSSPageSize: true,
  });

  console.log("PDF generated successfully!");
  await browser.close();
}

generatePDF().catch((err) => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
