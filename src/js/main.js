import { getParkData } from "./parkService.mjs";
import { getParkData, parkInfoLinks } from "./parkService.mjs";

const parkData = getParkData();

function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
        <span>${info.designation}</span>
        <span>${info.states}</span>
        </p>`;
}
function mediaCardTemplate(info) {
    return `
    <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}">
        </a>

        <h3>
            <a href="${info.link}">${info.name}</a>
        </h3>

        <p>${info.description}</p>
    `;
}


function setHeaderInfo(data) {
    // Insert data into disclaimer section
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;
    // update the title of the site. Notice that we can select things in the head just like in the body with querySelector
    document.querySelector("head > title").textContent = parkData.fullName;
    // Set the banner image.
    const heroImage = document.querySelector(".hero-banner img");
    heroImage.src = data.images[0].url;
    // use the template function above to set the rest of the park specific info in the header
    document.querySelector(".hero-banner__content").innerHTML =
        parkInfoTemplate(data);
}
setHeaderInfo(parkData);

const introSection = document.querySelector(".intro");
introSection.innerHTML = `
    <h2>${parkData.fullName}</h2>
    <p>${parkData}.description}</p>
`;

const infoSection = document.querySelector(".info");

const cardsHTML = parkInfoLinks
    .map((item) => mediaCardTemplate(item))
    .join("");
infoSection.innerHTML = cardsHTML;

const footer = document.querySelector("#park-footer");

function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}
function getVoicePhone(phoneNumbers) {
  return phoneNumbers.find((phone) => phone.type === "Voice").phoneNumber;
}

function footerTemplate(info) {
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

footer.innerHTML = footerTemplate(parkData);