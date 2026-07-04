import "../css/style.css";
import "../css/visitor-center.css";

import setHeaderFooter from "./setHeaderFooter.mjs";
import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import {
  vcTitleTemplate,
  vcInfoTemplate,
  listTemplate,
  vcAmenityTemplate,
  vcDirectionsTemplate,
  vcAddressesListTemplate,
  vcContactsTemplate,
  vcImageTemplate
} from "./templates.mjs";

function getParam(param) {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

async function init() {
  const parkData = await getParkData();
  const id = getParam("id");
  const centerDetails = await getParkVisitorCenterDetails(id);

  console.log(centerDetails.images);
  console.log(centerDetails);
  console.log("IMAGES RAW:", centerDetails.images);
  console.log("IS ARRAY:", Array.isArray(centerDetails.images));

  setHeaderFooter(parkData);

  const detailsEl = document.querySelector(".vc-details-list");

  // TITLE
  document.querySelector(".vc-name").innerHTML =
    vcTitleTemplate(centerDetails.name);

  // INFO SECTION
  document.querySelector(".vc-info").innerHTML =
    vcInfoTemplate(centerDetails);

  // ADDRESSES
  const addressHTML = vcAddressesListTemplate(centerDetails.addresses);
  detailsEl
    .querySelector("#vcAddresses")
    .insertAdjacentHTML("beforeend", addressHTML);

  // DIRECTIONS
  const directionsHTML = vcDirectionsTemplate(centerDetails.directionsInfo);
  detailsEl
    .querySelector("#vcDirections")
    .insertAdjacentHTML("beforeend", directionsHTML);

  // AMENITIES
  const amenitiesHTML = listTemplate(
    centerDetails.amenities,
    vcAmenityTemplate
  );

  detailsEl
    .querySelector("#vcAmenities")
    .insertAdjacentHTML("beforeend", amenitiesHTML);

  // CONTACT  
  const contactHTML = vcContactsTemplate(centerDetails.contacts);
  detailsEl
    .querySelector("#vcContact")
    .insertAdjacentHTML("beforeend", contactHTML);
  
  // GALLERY
  const images = centerDetails.images;
  const galleryHTML = listTemplate(images, vcImageTemplate);
  
  document
    .querySelector(".vc-gallery")
  .insertAdjacentHTML("beforeend", galleryHTML);
  
  // DEBUG
  console.log(centerDetails.name);
  }
  


init();