const output = document.querySelector("#output");
const outputList = document.querySelector("#outputList");

// fetch.js
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";
let results = null;

async function getPokemon(url, callback) {
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    callback(data);
  }
}
function doStuff(data) {
  results = data;
  const pokeHtml = `<h2>${results.name}</h2>
                <img src="${results.sprites.front_default}" alt="Image of ${results.name}">
  `;
  output.innerHTML = pokeHtml;

  console.log("first: ", results);
}
function doStuffList(data) {
  const pokeList = data.results;

  const sortedList = sortPokemon(pokeList);

  outputList.innerHTML = "";
  
  sortedList.forEach((currentItem) => {
    const html = `<li>${currentItem.name}</li>`;
    outputList.innerHTML += html;
  })
}
function sortPokemon(list) {
    list.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }  
      else return 0;
    });
    return list;
}

getPokemon(url,doStuff);
getPokemon(urlList, doStuffList);


console.log("second: ", results);

