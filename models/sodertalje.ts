import config from "../config/config.json";
import Geojson from "../interfaces/geojson";


const sodertaljeModel = {
    getJsonData: async function getJsonData(urlEnd: string): Promise<any> {
        const response = await fetch(`${config.base_url}/${urlEnd}`);
        const result = await response.json();

        // console.log(result.results);

        return result.results;
    },
    getGeoJsonData: async function getGeoJsonData(urlEnd: string): Promise<any> {
        const response = await fetch(`${config.base_url}/${urlEnd}`);
        const result : Geojson = await response.json();


        // const fitCoord = calculateFitCoordinatesGeoJson(result);

        let refinedResult: Array<any> = [];

        const resultLength = result.features.length;
        // Gör varje "led" till ett eget geodataJson objekt för att kunna byta färg på ett enskilt geoDataObjekt senare...
        // Om det redan finns ett geodataJson objekt som innehåller samma namn, lägg istället till koordinationer till det objektet
        for (let i = 0; i < resultLength; i++) {
            let nameAlreadyInData = false;
            const refinedResultLength = refinedResult.length;


            for (let j = 0; j < refinedResultLength; j++) {

                if (result.features[i].properties.Namn === refinedResult[j].features[0].properties.Namn) {
                    nameAlreadyInData = true;
                    refinedResult[j].features.push(result.features[i]);
                }
            }

            if (!nameAlreadyInData) {
                refinedResult.push({
                    "type": result.type,
                    "name": result.name,
                    "features": [result.features[i]]
                })
            }
        }

        // refinedResult["fitCoordination"] = fitCoord;

        // console.log(refinedResult.fitCoordination);

        return refinedResult;
    }
};


// function calculateFitCoordinatesGeoJson(geoJson: Geojson) {
//     // console.log(geoJson);
//     let allCoordinates: Array<Array<number>> = [];

//     const geoJsonLength = geoJson.features.length;
//     for (let i = 0; i < geoJsonLength; i++) {
//         allCoordinates.push(...geoJson.features[i].geometry.coordinates);
//     }
//     const lowestLat = allCoordinates.reduce((a, b) => a[1] < b[1] ? a : b)[1];
//     const highestLat = allCoordinates.reduce((a, b) => a[1] > b[1] ? a : b)[1];

//     const lowestLng = allCoordinates.reduce((a, b) => a[0] < b[0] ? a : b)[0];
//     const highestLng = allCoordinates.reduce((a, b) => a[0] > b[0] ? a : b)[0];

//     const latLngMin = [lowestLng, lowestLat];
//     const latLngMax = [highestLng, highestLat];

//     // console.log("-----------")
//     // console.log(latLngMin);
//     // console.log(latLngMax);

//     return {
//         "latLngMin": latLngMin,
//         "latLngMax": latLngMax
//     }
// }


export default sodertaljeModel;