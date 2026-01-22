import retirementBudgetCSS from "../styles/retirement-budget-style.js";

export default function buildRetirementBudget(payload) {
  const { meta, data, summary } = payload;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Retirement Budget</title>
  <style>
    ${retirementBudgetCSS}
  </style>
</head>

<body>
<main class="container">

  ${renderHeader(meta)}

  ${renderHousing(data.housing)}
  ${renderTransport(data.transport)}
  ${renderLiving(data.living)}
  ${renderHealth(data.health)}
  ${renderLifestyle(data.lifestyle)}
  ${renderDebt(data.debt)}

  ${renderSummary(summary)}

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
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." />
  </div>

  <div class="form-title">
    <h1>RETIREMENT BUDGET</h1>
    <p>Please enter your estimated monthly expenses.</p>
  </div>
</header>
`;
}

/* ================= HOUSING ================= */

function renderHousing(h = {}) {
  return `
<section class="card step active">
  <h2>Housing</h2>

  ${money("Mortgage / Rent", h.mortgageRent)}
  ${money("Property Taxes", h.propertyTaxes)}
  ${money("Homeowners / Renters Insurance", h.homeInsurance)}
  ${money("Internet & Cable", h.internetCable)}
  ${money("Utilities (Electric, Gas, Water, Trash)", h.utilities)}
  ${money("Cell Phone", h.cellPhone)}
  ${money("Home Maintenance & Repairs", h.homeMaintenance)}
  ${money("HOA or Condo Fees", h.hoaFees)}
  ${money("Lawn Care / Snow Removal", h.lawnCare)}
  ${money("Home Security", h.homeSecurity)}

  <div class="sticky-total">
    <span>Housing Total</span>
    <span>$${fmt(h.total)}</span>
  </div>
</section>
`;
}

/* ================= TRANSPORT ================= */

function renderTransport(t = {}) {
  return `
<section class="card step">
  <h2>Transportation</h2>

  ${money("Vehicle Payment", t.vehiclePayment)}
  ${money("Fuel / Gas", t.fuelGas)}
  ${money("Maintenance & Repairs", t.maintenanceRepairs)}
  ${money("Auto Insurance", t.autoInsurance)}
  ${money("Registration / Inspection", t.registrationInspection)}
  ${money("Parking / Tolls", t.parkingTolls)}
  ${money("Public Transit", t.publicTransit)}

  <div class="sticky-total">
    <span>Transportation Total</span>
    <span>$${fmt(t.total)}</span>
  </div>
</section>
`;
}

/* ================= DAILY LIVING ================= */

function renderLiving(l = {}) {
  return `
<section class="card step">
  <h2>Daily Living</h2>

  ${money("Groceries", l.groceries)}
  ${money("Clothing & Shoes", l.clothingShoes)}
  ${money("Pet Care", l.petCare)}
  ${money("Dining Out / Takeout", l.diningOut)}
  ${money("Household Supplies", l.householdSupplies)}
  ${money("Personal Care", l.personalCare)}
  ${money("Other", l.otherLiving)}

  <div class="sticky-total">
    <span>Daily Living Total</span>
    <span>$${fmt(l.total)}</span>
  </div>
</section>
`;
}

/* ================= HEALTH ================= */

function renderHealth(h = {}) {
  return `
<section class="card step">
  <h2>Health & Insurance</h2>

  ${money("Medicare Premiums (Part B, Part D)", h.medicarePremiums)}
  ${money("Medicare Supplement / Advantage Plan", h.medicareSupplement)}
  ${money("Dental Insurance / Out-of-pocket", h.dentalCare)}
  ${money("Vision Care", h.visionCare)}
  ${money("Hearing Aids", h.hearingAids)}
  ${money("Prescription Drugs", h.prescriptionDrugs)}
  ${money("Copays & Deductibles", h.copaysDeductibles)}
  ${money("Long-Term Care Insurance", h.longTermCareInsurance)}
  ${money("Life Insurance", h.lifeInsurance)}
  ${money("Other", h.otherHealth)}

  <div class="sticky-total">
    <span>Health & Insurance Total</span>
    <span>$${fmt(h.total)}</span>
  </div>
</section>
`;
}

/* ================= LIFESTYLE ================= */

function renderLifestyle(l = {}) {
  return `
<section class="card step">
  <h2>Lifestyle / Recreations</h2>

  ${money("Travel & Vacations", l.travelVacations)}
  ${money("Hobbies / Clubs", l.hobbiesClubs)}
  ${money("Subscriptions", l.subscriptions)}
  ${money("Charitable Donations", l.charitableDonations)}
  ${money("Gifts (Birthdays, Holidays)", l.gifts)}
  ${money("Entertainment", l.entertainment)}
  ${money("Fitness / Classes", l.fitnessClasses)}
  ${money("Other", l.otherLifestyle)}

  <div class="sticky-total">
    <span>Lifestyle / Recreation Total</span>
    <span>$${fmt(l.total)}</span>
  </div>
</section>
`;
}

/* ================= DEBT ================= */

function renderDebt(d = {}) {
  return `
<section class="card step">
  <h2>Debt & Obligation</h2>

  ${money("Credit Cards", d.creditCards)}
  ${money("Personal Loans", d.personalLoans)}
  ${money("Medical Bills", d.medicalBills)}
  ${money("Taxes", d.taxes)}
  ${money("Estimated Quarterly Tax Payments", d.quarterlyTaxPayments)}
  ${money("Other", d.otherDebt)}

  <div class="sticky-total">
    <span>Debt & Obligations Total</span>
    <span>$${fmt(d.total)}</span>
  </div>
</section>
`;
}

/* ================= SUMMARY ================= */

function renderSummary(s = {}) {
  return `
<section class="summary step">
  <h2>Total Monthly Budget</h2>

  ${summaryRow("Housing", s.housing)}
  ${summaryRow("Transportation", s.transport)}
  ${summaryRow("Daily Living", s.living)}
  ${summaryRow("Health & Insurance", s.health)}
  ${summaryRow("Lifestyle / Recreation", s.lifestyle)}
  ${summaryRow("Debt & Obligation", s.debt)}

  <div class="summary-divider"></div>

  <div class="summary-total">
    <span>Total Monthly Budget</span>
    <span>$${fmt(s.grandTotal)}</span>
  </div>
</section>
`;
}

/* ================= CONFIRMATION ================= */

function renderConfirmation(meta) {
  return `
<section class="card step confirmation">
  <h2>Review & Confirmation</h2>

  <div class="confirmation-field">
    <span class="confirmation-label">Full Name</span>
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

function money(label, value) {
  return `
<label class="money-field">
  ${label}
  <div class="input-wrapper">
    <span class="currency">$</span>
    <span class="static-value">${fmt(value)}</span>
  </div>
</label>
`;
}

function summaryRow(label, value) {
  return `
<div class="summary-row">
  <span>${label}</span>
  <span>$${fmt(value)}</span>
</div>
`;
}

function fmt(n) {
  return Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function escape(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}