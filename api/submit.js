import { Resend } from "resend";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

import buildRetirementBudget from "../templates/retirement-budget.js";
import buildRiskTolerance from "../templates/risk-tolerance-assessment.js";
import buildIncomeFactFinder from "../templates/retirement-income-fact-finder.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ===============================
    // SAFE BODY PARSE
    // ===============================
    const payload =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    const { formId, meta } = payload;

    if (!formId) {
      return res.status(400).json({ error: "Missing formId" });
    }

    // ===============================
    // TEMPLATE SELECTION
    // ===============================
    let html;

    switch (formId) {
      case "retirement-budget":
        html = buildRetirementBudget(payload);
        break;

      case "risk-tolerance-assessment":
        html = buildRiskTolerance(payload);
        break;

      case "retirement-income-fact-finder":
        html = buildIncomeFactFinder(payload);
        break;

      default:
        return res.status(400).json({ error: "Invalid formId" });
    }

    // ===============================
    // PUPPETEER LAUNCH
    // ===============================
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath:
        (await chromium.executablePath()) ||
        undefined,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
    });

    await browser.close();

    console.log("PDF size:", pdfBuffer.length);

    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "inline; filename=test.pdf");
    // return res.status(200).send(pdfBuffer);

    // ===============================
    // EMAIL SEND
    // ===============================
    const safeName = meta?.clientName
      ? meta.clientName.replace(/\s+/g, "-")
      : "Client";

    const fileName = `${formId}_${safeName}.pdf`;

    await resend.emails.send({
      from: "Marra Forms <forms@resend.dev>",
      to: process.env.TEST_RECEIVER_EMAIL,
      subject: `New Form Submission – ${formId}`,
      html: `
        <p>A new form has been submitted.</p>
        <p><strong>Form:</strong> ${formId}</p>
        <p><strong>Client:</strong> ${meta?.clientName || "-"}</p>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer.toString("base64"),
          encoding: "base64",
          type: "application/pdf",
          disposition: "attachment"
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "PDF generated and email sent",
    });
  } catch (error) {
    console.error("PDF SUBMIT ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}