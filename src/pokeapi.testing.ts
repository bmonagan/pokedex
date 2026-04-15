async function getPokeAPILocations(){
    const url = "https://pokeapi.co/api/v2/location-area/1";

    try {
        const response = await fetch(url);
        console.log("status:", response.status, response.statusText);

        const data = await response.json();
        console.log("location name:", data.name);
        console.log("full payload:", data);

    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return;
        }
        console.error(error);
    }
}

getPokeAPILocations()
    .then(() => console.log("done"));