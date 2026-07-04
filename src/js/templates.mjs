import spritePath from "../images/sprite.symbol.svg";

export function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
        <span>${info.designation}</span>
        <span>${info.states}</span>
        </p>`;
}

export function mediaCardTemplate(info) {
    return `
    
    <section class="card">
        <a href="${info.link}">
            <img src="${info.image}" alt="${info.name}">
        </a>

        <h3>
            <a href="${info.link}">${info.name}</a>
        </h3>

        <p>${info.description}</p>
    </section>
    `;
}
function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}
function getVoicePhone(phoneNumbers) {
  return phoneNumbers.find((phone) => phone.type === "Voice").phoneNumber;
}

export function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers);

    return `
    <section class="contact">
      <h3>Contact Info</h3>

      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      </div>

      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}
export function alertTemplate(alert) {
  let alertType = alert.category.toLowerCase();
  if (alertType === "park closure") {
    alertType = "closure";
  }
  return `
  <li class="alert alert-${alertType}">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="${spritePath}#alert-${alertType}"></use>
    </svg>

    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>  
`;
}
export function visitorCenterTemplate(center) {

  return `
    <li>
      <h3><a href="visitor-center.html?id=${center.id}">${center.name}</a></h3>
      <p>${center.description}</p>
      <p>${center.directionsInfo}</p>
    </li>
  `;
}
export function activityListTemplate(activities) {
  return activities.map(activity => `<li>${activity.name}</li>`).join("");
}
// Turns each activity into a <li> and combines them

export function vcTitleTemplate(text) {
  return `
    <svg class="icon" role="presentation" focusable="false">
      <use
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="/images/sprite.symbol.svg#ranger-station"
      ></use>
    </svg>
    ${text}
  `;
}
export function vcInfoTemplate(data) {
  const image = data.images[0];

  return `
    <figure>
      <img src="${image.url}" alt="${image.altText}" />
      <figcaption>
        ${image.caption} <span>${image.credit}</span>
      </figcaption>
    </figure>
    <p>${data.description}</p>
  `;
}
export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate);
  return `<ul>${html.join("")}</ul>`;
}
function vcAddressTemplate(data) {
  return `
    <section>
      <h3>${data.type} Address</h3>
      <address>
        ${data.line1}<br />
        ${data.city}, ${data.stateCode} ${data.postalCode}
      </address>
    </section>
  `;
}
export function vcAddressesListTemplate(data) {
  const physical = data.find((address) => address.type === "Physical");
  const mailing = data.find((address) => address.type === "Mailing");

  let html = vcAddressTemplate(physical);

  if (mailing) {
    html += vcAddressTemplate(mailing);
  }

  return html;
}
export function vcAmenityTemplate(data) {
  return `<li>${data}</li>`;
}
export function vcDirectionsTemplate(data) {
  return `<p>${data}</p>`;
}
export function vcContactsTemplate(data) {
  return `
    <section class="vc-contact__email">
      <h3>Email Address</h3>
      <a href="mailto:${data.emailAddresses[0].emailAddress}">
        Send this visitor center an email
      </a>
    </section>

    <section class="vc-contact__phone">
      <h3>Phone numbers</h3>
      <a href="tel:${data.phoneNumbers[0].phoneNumber}">
        ${data.phoneNumbers[0].phoneNumber}
      </a>
    </section>
  `;
}
export function vcImageTemplate(data) {
  return `
    <li>
      <img src="${data.url}" alt="${data.altText}">
    </li>
  `;
}