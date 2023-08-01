"use strict"
function renderCoffee(coffees) {
    let html = `<div class="coffee col-6"> <span class="coffeeName">${coffees.name}</span> <span class="coffeeRoast">${coffees.roast}</span> </div>`;
    return html;
}
function renderCoffees(coffees) {
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}
// JavaScript code
function searchCoffees() {
    let input = document.getElementById('searchbar').value.toLowerCase()
    input = input.toLowerCase();
    let x = document.getElementsByClassName('coffee');
    for (let i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }else {
            x[i].style.display = "inline-block"
        }
    }
}
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }else if(selectedRoast === 'all'){
            filteredCoffees = coffees
        }
    });
    container.innerHTML = renderCoffees(filteredCoffees);
    roastColor = document.querySelectorAll(".coffeeRoast")
    roastColor.forEach( (element) => {
        if(element.innerHTML === 'dark'){
            element.style.color = "#7d4820"
        }else if (element.innerHTML === 'medium'){
            element.style.color = "#af6d35"
        }else{
            element.style.color = "#efc49e"
        }
    })
}
function addCoffee(e) {
    e.preventDefault();
    let addRoast = {id: coffees.length + 1, name: addBar.value, roast: addRoastSelection.value};
    coffees.push(addRoast);
    container.innerHTML = renderCoffees(coffees);
    roastColor = document.querySelectorAll(".coffeeRoast")
    roastColor.forEach( (element) => {
        if(element.innerHTML === 'dark'){
            element.style.color = "#7d4820"
        }else if (element.innerHTML === 'medium'){
            element.style.color = "#af6d35"
        }else{
            element.style.color = "#efc49e"
        }
    })
    addLocalStorage(coffees)
}
 //from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];
let container = document.querySelector('#container');
let submitButton = document.querySelector('#submit');
let addBtn = document.querySelector("#addBtn")
let roastSelection = document.querySelector('#roast-selection');
let addBar = document.querySelector("#addBar")
let addRoastSelection = document.querySelector("#addRoast-selection");
//This changes the color of the roast(based on strength) on window load.
let roastColor;
window.onload = (event) => {
    getLocalStorage()
    container.innerHTML = renderCoffees(coffees);
    roastColor = document.querySelectorAll(".coffeeRoast")
    roastColor.forEach( (element) => {
        if(element.innerHTML === 'dark'){
            element.style.color = "#7d4820"
        }else if (element.innerHTML === 'medium'){
            element.style.color = "#af6d35"
        }else{
            element.style.color = "#efc49e"
        }
    })
};
submitButton.addEventListener('click', updateCoffees);
addBtn.addEventListener('click', addCoffee);
function addLocalStorage(coffees){
    localStorage.setItem("coffees", JSON.stringify(coffees));
    renderCoffees(coffees)
}
function getLocalStorage(){
    const reference = localStorage.getItem('coffees');
    if (reference){
        coffees = JSON.parse(reference);
        renderCoffees(coffees);
    }
}
