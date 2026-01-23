/**
 * Risk Tolerance Assessment – PDF Template
 * Input  : payload (UI-driven)
 * Output : Full HTML document string
 */

import riskToleranceCSS from "../styles/risk-tolerance-assessment-style.js";

export default function buildRiskTolerance(payload) {

  console.log("Risk CSS length:", riskToleranceCSS?.length);

  const { meta, sections, totalRiskScore } = payload;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Risk Tolerance Assessment</title>

  <style>
    ${riskToleranceCSS}
  </style>
</head>

<body class="container">

  <!-- HEADER -->
  <header class="form-header">
    <img class="marra_logo" src="https://nicwaproject.github.io/api-marra-financial-group-form/assets/marra_logo.png" />
    <h1>Risk Tolerance Assessment</h1>
    <p class="meta">
      ${escape(meta.clientName)} · ${escape(meta.submissionDate)}
    </p>
  </header>

  <!-- ===================== -->
  <!-- 1. INVESTMENT OBJECTIVE -->
  <!-- ===================== -->
  <section class="card">
    <h2 class=question-title>1. Investment Objective</h2>
    <p class="question-desc">
      Which of the following best describes your primary investment objective?
    </p>

    ${radio(
      "Wealth Accumulation Emphasis on continued capital appreciation in accordance with your overall risk tolerance.",
      sections.objective.selected === "accumulation"
    )}

    ${radio(
      "Wealth Maintenance Emphasis on maintaining a desired lifestyle or level of financial security.",
      sections.objective.selected === "maintenance"
    )}

    ${radio(
      "Wealth Distribution Emphasis on using wealth for living expenses.",
      sections.objective.selected === "distribution"
    )}
  </section>

  <!-- ===================== -->
  <!-- 2. INVESTMENT HORIZON -->
  <!-- ===================== -->
  <section class="card">
    <h2 class="question-title">2. Investment Horizon</h2>
    <p class="question-desc">
      Approximately how many years do you expect to continue investing?
    </p>

    ${radio("0–3 Years", sections.horizon.selected === "0-3")}
    ${radio("3–5 Years", sections.horizon.selected === "3-5")}
    ${radio("6–10 Years", sections.horizon.selected === "6-10")}
    ${radio("11–15 Years", sections.horizon.selected === "11-15")}
    ${radio("15+ Years", sections.horizon.selected === "15+")}
  </section>
  
  <div class="page-break"></div>
  <!-- ===================== -->
  <!-- 3. RISK / RETURN -->
  <!-- ===================== -->
  <section class="card">
    <h2 class="question-title">3. Risk / Return Preference</h2>
    <p class="question-desc">Assuming you are investing $100,000 and can choose from the five hypothetical portfolios shown in the table below. The dollar values for each portfolio represent two possible returns – low and high – after one year.</p>
    <p class="question-desc">Assuming there is an equal chance of achieving either result (low or high), indicate which portfolio represents the maximum risk/return trade-off you would be willing to accept.</p>

    <table class="risk-table">
      <thead>
        <tr>
          <th></th>
          <th>Portfolio</th>
          <th>Possible High</th>
          <th>Possible Low</th>
        </tr>
      </thead>
      <tbody>
        ${portfolioRow("A", "High Risk", "$160,000", "$55,000", sections.portfolio.selected === "A")}
        ${portfolioRow("B", "", "$150,000", "$65,000", sections.portfolio.selected === "B")}
        ${portfolioRow("C", "", "$135,000", "$75,000", sections.portfolio.selected === "C")}
        ${portfolioRow("D", "", "$125,000", "$85,000", sections.portfolio.selected === "D")}
        ${portfolioRow("E", "Low Risk", "$115,000", "$95,000", sections.portfolio.selected === "E")}
      </tbody>
    </table>

    <p class="helper-text">The maximum gain or loss on an investment is impossible to predict. The ranges shown in the chart are
      hypothetical and are designed solely to gauge an investor’s tolerance for risk.</p>
  </section>

  <!-- ===================== -->
  <!-- 4. RISK LEVEL SCALE -->
  <!-- ===================== -->
  <section class="card">
    <h2 class="question-title">4. Risk Level</h2>
    <p class="question-desc">Please indicate the level of risk with which you are most comfortable (circle one response):</p>

    <div class="risk-level">
      ${Array.from({ length: 11 })
        .map((_, i) => {
          const score = i * 2;
          return `
            <div class="scale-item ${
              sections.risklevel.score === score ? "active" : ""
            }">${i}</div>
          `;
        })
        .join("")}
    </div>

    <div class="risk-labels">
      <span class="low">Low</span>
      <span class="medium">Medium</span>
      <span class="high">High</span>
    </div>
  </section>

  <!-- ===================== -->
  <!-- 5. RECOVERY TIME -->
  <!-- ===================== -->
  <section class="card">
    <h2 class="question-title">5. Return Account</h2>
      <p class="question-desc">How long are you prepared to wait for your account to return to its original
      value after a down market?</p>

    ${radio("Less than 18 months", sections.recovery.selected === "lt-18")}
    ${radio("18–24 months", sections.recovery.selected === "18-24")}
    ${radio("2–3 years", sections.recovery.selected === "2-3yr")}
    ${radio("3–5 years", sections.recovery.selected === "3-5yr")}
    ${radio("5+ years", sections.recovery.selected === "5+")}
  </section>
  
  <div class="page-break"></div>
  <!-- ===================== -->
  <!-- 6. INCOME STABILITY -->
  <!-- ===================== -->
  <section class="card">
    <h2 class="question-title">6. Income</h2>
    <p class="question-desc">My current income and future income (salary, pension, etc.) is:</h2>

    ${radio("Very Secure / Stable", sections.incomeStability.selected === "very-stable")}
    ${radio("Mostly Secure / Stable", sections.incomeStability.selected === "mostly-stable")}
    ${radio("Secure / Stable", sections.incomeStability.selected === "stable")}
    ${radio("Somewhat Secure / Stable", sections.incomeStability.selected === "somewhat")}
    ${radio("Not Secure / Stable", sections.incomeStability.selected === "not-stable")}
  </section>

  <!-- ===================== -->
  <!-- 7. EMERGENCY -->
  <!-- ===================== -->
  <section class="card">
    <h2 class="question-title">7. Financial Emergencies</h2>
    <p class="question-desc">How able are you to handle financial emergencies with assets outside of your
      investment account(s)?</p>

    ${radio("Very Able", sections.emergency.selected === "very-able")}
    ${radio("Mostly Able", sections.emergency.selected === "mostly-able")}
    ${radio("Able", sections.emergency.selected === "able")}
    ${radio("Somewhat Able", sections.emergency.selected === "somewhat")}
    ${radio("Not Able", sections.emergency.selected === "not-able")}
  </section>

  <div class="page-break"></div>
  <!-- ===================== -->
  <!-- SUMMARY -->
  <!-- ===================== -->
  <section class="section summary">
    <h2>Risk Assessment Summary</h2>

    ${summaryRow("Investment Objective", sections.objective.score)}
    ${summaryRow("Investment Horizon", sections.horizon.score)}
    ${summaryRow("Risk / Return Preference", sections.portfolio.score)}
    ${summaryRow("Risk Comfort Level", sections.risklevel.score)}
    ${summaryRow("Recovery Time", sections.recovery.score)}
    ${summaryRow("Income Stability", sections.incomeStability.score)}
    ${summaryRow("Emergency Preparedness", sections.emergency.score)}

    <div class="summary-total">
      <span>Total Risk Score</span>
      <strong>${totalRiskScore}</strong>
    </div>
  </section>

  <!-- ===================== -->
  <!-- CONFIRMATION -->
  <!-- ===================== -->
  <section class="card">
    <p class="confirmation-desc">
      I confirm that the information provided above is accurate and reflects
      my current financial situation and risk tolerance.
    </p>

    <div class="signature-box">
      <div class="signature-name">${escape(meta.clientName)}</div>
      <div class="signature-date">${escape(meta.submissionDate)}</div>
    </div>
  </section>

</body>
</html>
`;
}

/* =====================================================
   HELPERS
===================================================== */

function radio(label, checked) {
  return `
    <div class="radio-row">
      <span class="radio-box ${checked ? "checked" : ""}">
        ${checked ? "✓" : ""}
      </span>
      <span class="label">${label}</span>
    </div>
  `;
}

function portfolioRow(letter, risk, high, low, checked) {
  return `
    <tr>
      <td class="radio-cell">
        <span class="radio-box ${checked ? "checked" : ""}">
          ${checked ? "✓" : ""}
        </span>
      </td>
      <td>Portfolio ${letter} ${risk ? `<span class="muted">(${risk})</span>` : ""}</td>
      <td>${high}</td>
      <td>${low}</td>
    </tr>
  `;
}

function summaryRow(label, value) {
  return `
    <div class="summary-row">
      <span>${label}</span>
      <span>${value}</span>
    </div>
  `;
}

function escape(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}