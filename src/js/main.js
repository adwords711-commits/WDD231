import "../css/style.css"; // we can do this type of import because we are using Vite
import "../css/conditions.css";
import "../css/home.css";

import { getParkData, getInfoLinks, getParkVisitorCenters} from "./parkService.mjs";
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
function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  
  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;

    document.querySelector(".global-nav").classList.toggle("show");
    
    if (target.tagName != "BUTTON") {
    target = target.closest("button");
    }
    
    if (document.querySelector(".global-nav").classList.contains("show")) {
    target.setAttribute("aria-expanded", true);
    } else {
  target.setAttribute("aria-expanded", false);
  }

  });
}

async function init() {
  const parkData = await getParkData("yell");
  
  const visitorCenters = await getParkVisitorCenters(parkData.parkCode);
  console.log("Visitor Centers:", visitorCenters);

  const links = getInfoLinks(parkData.images);

  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links);
}

init();

enableNavigation();