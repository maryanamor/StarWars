
export const fetchPlanets = async (page) => {
    try {
        const res = await fetch(`https://swapi.dev/api/planets/?${page}=&page=${page}`);
        return res.json();
    } catch (error) {
        return error
    }
};

export const fetchAllData = async (url) => {
    try {
        return await fetch(url).then((res) => res.json());
    } catch (error) {
        return error
    }
};
