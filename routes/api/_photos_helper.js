module.exports = function getSearchArea(query) {
    let northValue = parseFloat(query.lng2);
    let southValue = parseFloat(query.lng1);
    let eastValue = parseFloat(query.lat2);
    let westValue = parseFloat(query.lat1);

    console.log("northvalue", northValue);
    console.log("southValue", southValue);
    console.log("eastValue", eastValue);
    console.log("westValue", westValue);


    const searchArea = {
        type: "Polygon",
        coordinates: [
            [
            [northValue, westValue],
            [southValue, westValue],
            [southValue, eastValue],
            [northValue, eastValue],
            [northValue, westValue],
            ],
        ],
    };

    return searchArea;
}
