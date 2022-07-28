import config from "../config/config.json";
import Geojson from "../interfaces/geojson";


const sodertaljeModel = {
    getJsonData: async function getJsonData(urlEnd: string): Promise<any> {
        try {
            const response = await fetch(`${config.base_url}/${urlEnd}`);
            const result = await response.json();
            return result.results;
        } catch (e) {
            // Om t.ex. något går fel vid hämtning av data, t.ex. pga dålig internetuppkoppling så skickas detta istället.
            // ============================================
            return false;
        }

    },
    getGeoJsonData: async function getGeoJsonData(urlEnd: string): Promise<any> {
        try {
            const response = await fetch(`${config.base_url}/${urlEnd}`);
            const result: Geojson = await response.json();

            let refinedResult: Array<any> = [];

            const resultLength = result.features.length;
            // Gör varje "led" till ett eget geodataJson objekt för att kunna byta färg på ett enskilt geoDataObjekt senare.
            // Om det redan finns ett geodataJson objekt som innehåller samma namn, lägg istället till koordinationer till det objektet med "push".
            // ==============================================
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
            return refinedResult;
        } catch {
            // Om t.ex. något går fel vid hämtning av data, t.ex. pga dålig internetuppkoppling så skickas detta istället.
            // ============================================
            return false;
        }
    }
};


export default sodertaljeModel;