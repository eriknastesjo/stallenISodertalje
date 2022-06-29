export default interface Geojson {
    "type": string,
    "name": string,
    "features": [
        {
            "type": string,
            "geometry": {
                "type": string,
                "coordinates": Array<Array<number>>
            }
        }
        ]
}