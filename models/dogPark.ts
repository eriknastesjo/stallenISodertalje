import config from "../config/config.json";
import DogPark from "../interfaces/dogPark";


const dogParkModel = {
    getData: async function getData(): Promise<DogPark[]> {
        const response = await fetch(`${config.base_url}/1d83a1df-16ca-4bfd-8bc7-242747231b60`);
        const result = await response.json();

        console.log(result.results);

        return result.results;
    }
};

export default dogParkModel;