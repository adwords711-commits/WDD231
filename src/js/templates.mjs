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
      <h3>${center.name}</h3>
      <p>${center.description}</p>
      <p>${center.directionsInfo}</p>
    </li>
  `;
}
export function activityListTemplate(activities) {
  return activities.map(activity => `<li>${activity.name}</li>`).join("");
}
// Turns each activity into a <li> and combines them

