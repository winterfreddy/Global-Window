module.exports = function getSearchArea(query) {
    let northValue = query.lng2;
    let southValue = query.lng1;
    let eastValue = query.lat2;
    let westValue = query.lat1;

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
