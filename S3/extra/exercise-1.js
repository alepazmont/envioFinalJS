/* Basandote en el array siguiente, crea una lista ul > li dinámicamente 
en el html que imprima cada uno de los paises. */

const countries = ['Japón', 'Nicaragua', 'Suiza', 'Australia', 'Venezuela'];

const countriesList = document.createElement("ul");

for (let country of countries) {
    const countryLi = document.createElement("li");
    countryLi.innerText = country;
    countriesList.append(countryLi)
}

document.body.appendChild(countriesList)