import config from "../config/config.json";


const sodertaljeModel = {
    getData: async function getData(urlEnd:string): Promise<any> {
        const response = await fetch(`${config.base_url}/${urlEnd}`);
        const result = await response.json();

        return result.results;
    }
};

export default sodertaljeModel;