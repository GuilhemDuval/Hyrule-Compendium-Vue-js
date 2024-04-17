/* getData */

const getData = async function () {
    const response = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/");
    if (response.status == 200) {
        const data = await response.json();
        return data.data;
    } else {
        throw new Error(response.statusText);
    }
}

export { getData };


/* getOneEntry */

const getOneEntry = async function (entry_id) {
    const response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${entry_id}`)
    if (response.status === 200) {
        const data = await response.json();
        return data.data;
    } else {
        throw new Error(response.statusText)
    }
}

export { getOneEntry }