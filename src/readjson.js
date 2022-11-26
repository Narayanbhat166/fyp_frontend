const fs = require('fs');

const cities = new Set()
let rawdata = fs.readFileSync('output.json');
let json_data = JSON.parse(rawdata);
states = json_data.objects.output.geometries

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


for (state of states) {
    cities.add(state.properties.distname)
    state.properties.aqi = getRandomInt(1, 500);
}

console.log("Number of cities available in map " + cities.size)

json_data.objects.output.geometries = states;
fs.writeFileSync('output.json', JSON.stringify(json_data))