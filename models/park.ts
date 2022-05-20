import config from "../config/config.json";
import Park from "../interfaces/park";


const parkModel = {
    getData: async function getData(): Promise<Park[]> {
        const response = await fetch(`${config.base_url}/2cc90eb1-2c6a-444b-ab52-e4bcd22c7130`);
        const result = await response.json();

        return result.results;
    }
};

export default parkModel;