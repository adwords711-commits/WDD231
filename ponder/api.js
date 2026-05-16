// api.js
const baseUrl = "https://developer.nps.gov/api/v1/";
const outputList = document.getElementById("outputList");

async function getJson(endpoint) {
  // replace this with your actual key
  const apiKey = "GSu3OtbM79stdQW4Jh1oh8XAXLoBDws1kpPsxeIq";
  // construct the url: baseUrl + endpoint + parameters
  const url = baseUrl + endpoint;
  // set the options. The important one here is the X-Api-Key
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
      }
  }
  // make the request
  const response = await fetch(url, options);
  const data = await response.json()
  console.log(data)
  return data;
}

async function renderClimbingList() {
    const data = await getJson("activities/parks?q=climbing");

    const parks = data.data[0].parks;

    const html = parks.map(listTemplate).join("");

    outputList.innerHTML = html;

}
function listTemplate(item) {
    return `
    <li>
        <a href="${item.url}" target="_blank">${item.fullName}</a>
        - ${item.states}
        </li>
    `;
}

getJson('activities/parks?q=climbing');

renderClimbingList();