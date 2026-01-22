import incomeFinderCSS from "../styles/retirement-income-fact-finder-style.js";

export default function buildIncomeFactFinder(payload) {
  const { meta, income, assets, additional } = payload;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Retirement Income Fact Finder</title>
  <style>${incomeFinderCSS}</style>
</head>

<body class="pdf">
<main class="container">

  ${renderHeader(meta)}
  ${renderClientInfo(meta)}
  ${renderIncomeTable(income)}
  ${renderAssetsTable(assets)}
  ${renderAdditional(additional)}
  ${renderConfirmation(meta)}

</main>
</body>
</html>
`;
}

/* ================= HEADER ================= */

function renderHeader(meta) {
  return `
<header class="form-header">
  <div class="brand">
    <img src="https://nicwaproject.github.io/api-marra-financial-group-form/assets/marra_logo.png" alt="Marra Financial Group Logo" />
  </div>
  <div class="form-title">
    <h1>RETIREMENT INCOME FACT FINDER</h1>
    <p>Please provide estimates where exact figures are not available.</p>
  </div>
</header>
`;
}

/* ================= CLIENT INFO ================= */

function renderClientInfo(m = {}) {
  return `
<section class="card step">
  <h2>Client Information</h2>

  <div class="form-grid">
    ${field("Client Name", m.clientName)}
    ${field("Spouse / Partner Name", m.spouseName)}
    ${field("Phone Number", m.phone)}
    ${field("Client Date of Birth", m.clientDob)}
    ${field("Spouse Date of Birth", m.spouseDob)}
    ${field("Planned Retirement Date (Client)", m.retirementClient)}
    ${field("Planned Retirement Date (Spouse)", m.retirementSpouse)}
  </div>
</section>
`;
}

/* ================= MONTHLY INCOME ================= */

function renderIncomeTable(i = {}) {
  return `
<section class="card step">
  <h2>Monthly Income Sources</h2>

  <table class="data-table">
    <thead>
      <tr>
        <th>Source</th>
        <th>Client</th>
        <th>Spouse</th>
        <th>Joint</th>
        <th>Current Value</th>
        <th>Current Investment</th>
      </tr>
    </thead>
    <tbody>
      ${incomeRow("Social Security @ 62", i.ss62)}
      ${incomeRow("Social Security @ 67", i.ss67)}
      ${incomeRow("Social Security @ 70", i.ss70)}
      ${incomeRow("Pension", i.pension)}
      ${incomeRow("Rental Income", i.rental)}
      ${incomeRow("Other Income", i.other)}

      <tr class="table-total">
        <td><strong>Total Monthly Income</strong></td>
        ${totalCells(i.totals, 5)}
      </tr>
    </tbody>
  </table>
</section>
`;
}

/* ================= ASSETS ================= */

function renderAssetsTable(a = {}) {
  return `
<section class="card step">
  <h2>Assets</h2>

  <table class="data-table">
    <thead>
      <tr>
        <th>Asset</th>
        <th>Client</th>
        <th>Spouse</th>
        <th>Joint</th>
        <th>Current Value</th>
      </tr>
    </thead>
    <tbody>
      ${assetRow("Savings", a.savings)}
      ${assetRow("Checking", a.checking)}
      ${assetRow("CDs", a.cds)}
      ${assetRow("Annuities", a.annuities)}
      ${assetRow("Brokerage Accounts", a.brokerage)}
      ${assetRow("Cryptocurrency", a.crypto)}
      ${assetRow("Gold / Silver", a.gold)}
      ${assetRow("Possible Inheritance", a.inheritance)}
      ${assetRow("IRA Accounts", a.ira)}
      ${assetRow("ROTH IRA Accounts", a.rothIra)}
      ${assetRow("401(k) / 403(b)", a.k401)}
      ${assetRow("ROTH 401(k) / 403(b)", a.roth401)}

      <tr class="table-total">
        <td><strong>Total Assets</strong></td>
        ${totalCells(a.totals, 4)}
      </tr>
    </tbody>
  </table>
</section>
`;
}

/* ================= ADDITIONAL ================= */

function renderAdditional(a = {}) {
  return `
<section class="card step confirmation">
  <h2>Additional Retirement Details</h2>

  ${textarea("Desired Income in Retirement", a.desiredIncome)}
  ${textarea("Large Purchases Planned", a.largePurchases)}
  ${textarea("Long Term Care Planning", a.longTermCare)}
  ${textarea("Estate Planning", a.estatePlanning)}
  ${textarea("Cost-of-Living Adjustments", a.costLiving)}
  ${textarea("Current Home Value", a.homeValue)}
  ${textarea("Downsizing Plans", a.downsizing)}
  ${textarea("Other Real Estate", a.realEstate)}
  ${textarea("Total Debt", a.totalDebt)}
</section>
`;
}

/* ================= CONFIRMATION ================= */

function renderConfirmation(meta) {
  return `
<section class="card step confirmation">
  <h2>Review & Confirmation</h2>

  <div class="confirmation-field">
    <span class="confirmation-label">Client Name</span>
    <div class="signature-name">${escape(meta.clientName)}</div>
  </div>

  <div class="confirmation-field">
    <span class="confirmation-label">Date</span>
    <div class="signature-date">${escape(meta.submissionDate)}</div>
  </div>
</section>
`;
}

/* ================= HELPERS ================= */

function field(label, value) {
  return `
<div class="field">
  <label>${label}</label>
  <div class="static-value">${escape(value)}</div>
</div>
`;
}

function incomeRow(label, r = {}) {
  return `
<tr>
  <td>${label}</td>
  <td>${fmt(r.client)}</td>
  <td>${fmt(r.spouse)}</td>
  <td>${fmt(r.joint)}</td>
  <td>${fmt(r.currentValue)}</td>
  <td>${fmt(r.currentInvestment)}</td>
</tr>
`;
}

function assetRow(label, r = {}) {
  return `
<tr>
  <td>${label}</td>
  <td>${fmt(r.client)}</td>
  <td>${fmt(r.spouse)}</td>
  <td>${fmt(r.joint)}</td>
  <td>${fmt(r.currentValue)}</td>
</tr>
`;
}

function totalCells(t = {}, count) {
  return Array.from({ length: count })
    .map((_, i) => `<td>${fmt(Object.values(t || {})[i])}</td>`)
    .join("");
}

function textarea(label, value) {
  return `
<div class="field">
  <label>${label}</label>
  <div class="static-textarea">${escape(value)}</div>
</div>
`;
}

function fmt(n) {
  const num = Number(n);
  if (Number.isNaN(num)) return "—";

  return num.toLocaleString("en-US");
}

function escape(t = "") {
  return String(t)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}