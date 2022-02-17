import "../styles/styles.css";
import "../index.html";
import {fetchAllData, fetchPlanets} from './fetchData'
import { Pagination } from "./pagination";

const table = document.querySelector('tbody');
const loader = document.querySelector('.loader');
const pagination_elements = document.querySelector('.pagination');

document.addEventListener("DOMContentLoaded", onDOMLoaded);


function onDOMLoaded() {
    getResidentsList(1);
}

const pagination = new Pagination();

async function getPlanets(page) {
    try {
        const planets = await fetchPlanets(page);
        pagination.setPagination(page, planets.results.length, planets.count)
        if (planets.results.length) {
            const residentList = (
                await Promise.all(
                    planets.results?.map((planet) => {
                        return Promise.all(
                            planet.residents?.map(async (resident, key) => {
                                const getResidentInfo = await fetchAllData(
                                    resident,
                                    planet.name,
                                    "Residents"
                                );
                                return {
                                    index: key + 1,
                                    planet: planet.name,
                                    residentName: getResidentInfo.name,
                                    species: getResidentInfo.species
                                };
                            })
                        );
                    })
                )
            ).flatMap((item) => item);
            const residentsWithSpecies = (
                await Promise.all(
                    residentList.map(async (resident) => {
                        if (resident.species.length) {
                            return await Promise.all(
                                resident.species.map(async (item) => {
                                    const getSpecies = await fetchAllData(
                                        item,
                                        resident.residentName,
                                        "Species"
                                    );
                                    resident.species = getSpecies.name;
                                    return resident;
                                })
                            );
                        } else {
                            resident.species = "Human";
                            return resident;
                        }
                    })
                )
            ).flatMap((item) => item);
            return residentsWithSpecies;
        }
    } catch (error) {
        return error;
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
    setUpPagination(pagination.total, pagination.count);
}

const getResidentsList = async (id) => {
    loader.removeAttribute('hidden');
    table.style.opacity = '0.4';
    return await getPlanets(id).then((res) => {
        loader.setAttribute('hidden', '');
        table.style.opacity = '1';
        generateTable(table, res)
    });
}

export function paginationButton(page) {
    let button = document.createElement("button");
    button.classList.add("pagination__btn");
    button.innerText = page;
    if (pagination.page === page) {
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

export function setUpPagination(total, count) {
    pagination_elements.innerHTML = "";
    let pageCount = Math.ceil(total / count);
    for (let i = 0; i < pageCount; i++) {
        let btn = paginationButton(i + 1);
        pagination_elements.appendChild(btn);
    }
}
