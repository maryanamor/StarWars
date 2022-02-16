import "../styles/styles.css";
import "../index.html";

const table = document.querySelector('tbody');
const pagination_elements = document.querySelector('.pagination');

document.addEventListener("DOMContentLoaded", onDOMLoaded);

let current_page = 1;
let count;
let pageListLength;

function onDOMLoaded() {
    getResidentsList();
}

const fetchPlanets = async (page) => {
    try {
        const res = await fetch(`https://swapi.dev/api/planets/?${page}=&page=${page}`);
        return res.json();
    } catch (error) {
        return error
    }
};

const fetchAllData = async (url) => {
    try {
        return await fetch(url).then((res) => res.json());
    } catch (error) {
        return error
    }
};

async function getPlanets(page = 1){
    try {
        const planets = await fetchPlanets(page);
        current_page = page;
        count = planets.count;
        pageListLength = planets.results.length;
        if (planets.results.length) {
            const residentList = (await Promise.all(planets.results?.map((planet) => {
                return Promise.all(planet.residents?.map(async (resident, key) => {
                    const getResidentInfo = await fetchAllData(resident, planet.name, 'Residents');
                    return {
                        index: key+1,
                        planet: planet.name,
                        residentName: getResidentInfo.name,
                        species: getResidentInfo.species
                    }
                }))
            }))).flatMap(item => item)
            return (await Promise.all(residentList.map(async resident => {
                if (resident.species.length) {
                    return await Promise.all(resident.species.map(async item => {
                        const getSpecies = await fetchAllData(item, resident.residentName, 'Species');
                        resident.species = getSpecies.name
                        return resident
                    }))
                } else {
                    resident.species = 'Human'
                    return resident
                }
            }))).flatMap(item => item)
        }
    } catch (error) {
        return error
    }
}
// Draw table
function generateTable(table, data) {
    table.innerHTML = '';
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
    setUpPagination(count, pageListLength);
}

const getResidentsList = async (id) => {
    return await getPlanets(id).then((res) => {
        console.log('table data', res);
        generateTable(table, res)
    });
}

function paginationButton(page) {
    let button = document.createElement("button");
    button.classList.add("pagination__btn");
    button.innerText = page;
    if (current_page === page) {
        button.classList.add("pagination__btn-active");
    }

    button.addEventListener("click", function () {
        getResidentsList(page);
        let current_btn = document.querySelector(".pagination__btn-active");
        current_btn.classList.remove("pagination__btn-active");
        button.classList.add("pagination__btn-active");
    });
    return button;
}

function setUpPagination(count, perPage) {
    pagination_elements.innerHTML = "";
    let pageCount = Math.ceil(count / perPage);
    for (let i = 0; i < pageCount; i++) {
        let btn = paginationButton(i + 1);
        pagination_elements.appendChild(btn);
    }
}

