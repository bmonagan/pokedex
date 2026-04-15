async function getPokeAPILocations(url){
    

    try {
        const response = await fetch(url);
        console.log("status:", response.status, response.statusText);

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));

    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return;
        }
        console.error(error);
    }
}

getPokeAPILocations("https://pokeapi.co/api/v2/location-area/1")
    .then(() => console.log("done"));


getPokeAPILocations("https://pokeapi.co/api/v2/location-area/")
    .then(() => console.log("done"));