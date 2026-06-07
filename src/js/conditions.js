import "../css/style.css"; // we can do this type of import because we are using Vite
import "../css/conditions.css";
import "../css/home.css";

import { getParkData, getParkAlerts, getParkVisitorCenters } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import {
  alertTemplate,
  visitorCenterTemplate,
  activityListTemplate
} from "./templates.mjs";

async function init() {
  const parkData = await getParkData();
  
  const visitorCenters = await getParkVisitorCenters(parkData.parkCode);
  const visitorUl = document.querySelector(".visitor ul");
  const visitorHTML = visitorCenters.map(visitorCenterTemplate).join("");
  visitorUl.innerHTML = visitorHTML;
  const alerts = await getParkAlerts(parkData.parkCode);
  const alertsUl = document.querySelector(".alerts ul");
  const alertHTML = alerts.map(alertTemplate).join("");
  alertsUl.innerHTML = alertHTML;
  const activitiesUl = document.querySelector(".activities ul");

activitiesUl.innerHTML = activityListTemplate(parkData.activities);
// displays activities on the page
  setHeaderFooter(parkData);
}
init();


