/* Dado el html usa querySelector para mostrar por consola todos los p*/

let paragraphs = document.querySelectorAll("p")

for (let paragraph of paragraphs) {
    console.log(paragraph.innerHTML);
};