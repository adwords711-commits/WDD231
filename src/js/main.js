import { getParkData, parkInfoLinks } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
const parkData = getParkData();



function setParkIntro(data) {
    const introSection = document.querySelector(".intro");

    introSection.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
`;
}

function setParkInfoLinks(data) {
  const infoSection = document.querySelector(".info");
  const cardHtml = data.map(mediaCardTemplate);
  infoSection.insertAdjacentHTML("afterbegin", cardHtml.join(""));
}

setHeaderFooter(parkData);
setParkInfoLinks(parkInfoLinks);
setParkIntro(parkData);
