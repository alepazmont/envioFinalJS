/* Basandote en el siguiente array crea una lista ul > li con los textos del array y metelo en el html. */

const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];

const ul = document.createElement("ul");

for (let app of apps) {
    const li = document.createElement("li");
    li.textContent = app;
    ul.appendChild(li);
  }

document.body.appendChild(ul);