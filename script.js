const $ = (id) => document.getElementById(id);

const mobileMenuButton = $("mobileMenuButton");
const mainNav = $("mainNav");
mobileMenuButton.addEventListener("click", () => mainNav.classList.toggle("open"));

async function getJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.json();
}

/* CTRL+F: LOAD SITE CONTENT */
async function loadSiteContent() {
  const content = await getJson("data/site-content.json");
  $("topTagline").textContent = content.brand.tagline;
  $("navPropertyName").textContent = content.brand.propertyName;
  $("navCityState").textContent = content.brand.cityState;
  $("heroLocation").textContent = content.brand.cityState;
  $("positioningStatement").textContent = content.brand.positioningStatement;
  $("positioningStatementKorean").textContent = content.brand.positioningStatementKorean;
  $("generalHours").textContent = content.hours.generalHours;
  $("generalHoursKorean").textContent = content.hours.koreanNote;
  $("leasingHeadline").textContent = content.leasing.leasingHeadline;
  $("leasingIntro").textContent = content.leasing.leasingIntro;
  $("leasingIntroKorean").textContent = content.leasing.leasingIntroKorean;
  const leasingEmail = content.contact.leasingEmail;
const leasingSubject = encodeURIComponent("Leasing Inquiry - Pine Plaza");

$("availabilityNote").innerHTML = content.leasing.availabilityNote.replace(
  "{{leasingEmail}}",
  `<a class="text-link" href="mailto:${leasingEmail}?subject=${leasingSubject}">${leasingEmail}</a>`
);
  $("operatorLanguage").textContent = content.leasing.operatorLanguage;
  $("banquetHeadline").textContent = content.banquetHall.headline;
  $("banquetDescription").textContent = content.banquetHall.description;
  $("banquetDescriptionKorean").textContent = content.banquetHall.descriptionKorean;
  $("banquetCta").textContent = content.banquetHall.ctaText;
  $("visitAddress").innerHTML = content.contact.address.replace(", NJ", "<br>NJ");
  $("mapLink").href = "https://maps.google.com/?q=" + encodeURIComponent(content.contact.address);
  $("contactAddress").textContent = content.contact.address;
  $("contactPhone").textContent = content.contact.phone;
  $("contactGeneralEmail").textContent = content.contact.generalEmail;
  $("contactLeasingEmail").textContent = content.contact.leasingEmail;
  $("contactParkingEmail").textContent = content.contact.parkingEmail;
  $("footerCity").textContent = content.brand.cityState;
  $("footerPositioning").textContent = content.brand.positioningStatement;
}

/* CTRL+F: LOAD TENANTS */
let allTenants = [];
const tenantGrid = $("tenantGrid");
const filterButtons = document.querySelectorAll(".filter-button");

async function loadTenants() {
  allTenants = await getJson("data/tenants.json");
  renderTenants(allTenants);
}

function renderTenants(tenants) {
  tenantGrid.innerHTML = "";
  tenants.forEach((tenant) => {
    const card = document.createElement("article");
    card.className = "tenant-card";
    card.innerHTML = `
      <div>
        <div class="tenant-name">${tenant.nameEnglish}</div>
        <div class="tenant-korean">${tenant.nameKorean || ""}</div>
        <p>${tenant.descriptionEnglish || ""}</p>
        <p class="korean-line">${tenant.descriptionKorean || ""}</p>
        <div class="tenant-links">
          ${tenant.phone ? `<a href="tel:${tenant.phone.replace(/[^0-9+]/g, "")}">${tenant.phone}</a>` : ""}
          ${tenant.website ? `<a href="${tenant.website}" target="_blank" rel="noopener">Website</a>` : ""}
        </div>
      </div>
      <div class="tenant-meta">
        <span class="pill">${tenant.category}</span>
        <span class="pill">${tenant.level}</span>
        ${tenant.suite ? `<span class="pill">${tenant.suite}</span>` : ""}
      </div>
    `;
    tenantGrid.appendChild(card);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    if (selected === "All") renderTenants(allTenants);
    else renderTenants(allTenants.filter(t => t.category === selected));
  });
});

/* CTRL+F: LOAD PARKING */
async function loadParking() {
  const parking = await getJson("data/parking.json");
  $("parkingHeadline").textContent = parking.headline;
  $("parkingIntro").textContent = parking.intro;
  $("parkingIntroKorean").textContent = parking.introKorean;
  $("shopperParkingTitle").textContent = parking.shopperParking.title;
  $("shopperParkingDescription").textContent = parking.shopperParking.description;
  $("shopperParkingKorean").textContent = parking.shopperParking.descriptionKorean;
  $("parkingFormLink").href = parking.shopperParking.formUrl;
  $("parkingPaymentLink").href = parking.shopperParking.paymentUrl;
  $("monthlyParkingTitle").textContent = parking.monthlyParking.title;
  $("monthlyParkingDescription").textContent = parking.monthlyParking.description;
  $("monthlyParkingKorean").textContent = parking.monthlyParking.descriptionKorean;
  const rulesList = $("parkingRules");
  rulesList.innerHTML = "";
  parking.rules.forEach((rule) => {
    const li = document.createElement("li");
    li.textContent = rule;
    rulesList.appendChild(li);
  });
}

/* CTRL+F: LOAD EVENTS */
async function loadEvents() {
  const events = await getJson("data/events.json");
  const eventGrid = $("eventGrid");
  eventGrid.innerHTML = "";
  events.forEach((event) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-card-image">${event.icon}</div>
      <div class="event-card-body">
        <p class="eyebrow">${event.type} · ${event.date}</p>
        <h3>${event.titleEnglish}</h3>
        <p class="tenant-korean">${event.titleKorean || ""}</p>
        <p>${event.descriptionEnglish}</p>
        <p class="korean-line">${event.descriptionKorean || ""}</p>
      </div>
    `;
    eventGrid.appendChild(card);
  });
}

/* CTRL+F: INITIALIZE */
async function init() {
  try {
    await Promise.all([loadSiteContent(), loadTenants(), loadParking(), loadEvents()]);
  } catch (error) {
    console.error(error);
  }
}
init();
