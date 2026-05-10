import { getParkData, getInfoLinks, getVisitorCenterData } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";



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

async function init() {
  const parkData = await getParkData("yell");
  
  const visitorData = await getVisitorCenterData();
  console.log("Visitor Center Data:", visitorData);

  const links = getInfoLinks(parkData.images);

  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

init();