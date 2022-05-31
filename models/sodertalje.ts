import config from "../config/config.json";


const sodertaljeModel = {
    getData: async function getData(urlString:string): Promise<any> {
        const response = await fetch(`${config.base_url}/${urlString}`);
        const result = await response.json();

        return result.results;
    }
};

export default sodertaljeModel;