import "../styles/styles.css";
import "../index.html";


document.addEventListener("DOMContentLoaded", onDOMLoaded);

const table = document.querySelector('table');


function onDOMLoaded() {
    getResidentsList();
}

const fetchPlanets = async (page) => {
    try {
        const res = await fetch(`https://swapi.dev/api/planets/?${page}`);
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

const getPlanets = async (page = 1 ) => {
    try {
        const planets = await fetchPlanets(page);
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
            const residentsWithSpecies = (await Promise.all(residentList.map(async resident => {
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
            return residentsWithSpecies
        }
    } catch (error) {
        return error
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        console.log('row', row)
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

const getResidentsList = async (id) => {
    return await getPlanets(id)
        .then(res => generateTable(table, res))
}


