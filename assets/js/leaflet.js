//Mappa normale di esempio 

const mapID = 'map'

if (document.getElementById(mapID) !== null) {
  const map = L.map(mapID).setView([51.505, -0.09], 13)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
}

//Mappa con coordinate JSON

const mapID2 = 'map2'

if (document.getElementById(mapID2) !== null) {
  const map2 = L.map(mapID2).setView([45.0077, 8.2573], 13)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map2);
  
  var myGeoJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Track/Traccia",
                "type": "Running"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        8.256222,
                        45.006372,
                        243.5
                    ],
                    [
                        8.255651,
                        45.006833,
                        243.5
                    ],
                    [
                        8.255125,
                        45.006774,
                        236.8
                    ],
                    [
                        8.25501,
                        45.006941,
                        236
                    ],
                    [
                        8.255171,
                        45.009592,
                        249.8
                    ],
                    [
                        8.254114,
                        45.009772,
                        245.3
                    ],
                    [
                        8.253974,
                        45.009755,
                        244
                    ],
                    [
                        8.25186,
                        45.010014,
                        239.5
                    ],
                    [
                        8.250841,
                        45.009969,
                        239.3
                    ],
                    [
                        8.250447,
                        45.009922,
                        240
                    ],
                    [
                        8.249596,
                        45.009561,
                        235
                    ],
                    [
                        8.247718,
                        45.009002,
                        223.8
                    ],
                    [
                        8.247339,
                        45.008842,
                        220.8
                    ],
                    [
                        8.244188,
                        45.008468,
                        198.3
                    ],
                    [
                        8.243616,
                        45.008552,
                        192
                    ],
                    [
                        8.242344,
                        45.008569,
                        184.3
                    ],
                    [
                        8.241301,
                        45.008304,
                        180.8
                    ],
                    [
                        8.240381,
                        45.008304,
                        176.8
                    ],
                    [
                        8.239809,
                        45.008245,
                        176.5
                    ],
                    [
                        8.239081,
                        45.008062,
                        176.8
                    ],
                    [
                        8.238774,
                        45.007933,
                        176.5
                    ],
                    [
                        8.23827,
                        45.007653,
                        176.8
                    ],
                    [
                        8.237942,
                        45.007341,
                        177
                    ],
                    [
                        8.2364,
                        45.006584,
                        174.3
                    ],
                    [
                        8.236132,
                        45.006477,
                        176.3
                    ],
                    [
                        8.235213,
                        45.006279,
                        178
                    ],
                    [
                        8.234814,
                        45.006317,
                        175.3
                    ],
                    [
                        8.234707,
                        45.006383,
                        173.8
                    ],
                    [
                        8.234443,
                        45.006763,
                        168.3
                    ],
                    [
                        8.234103,
                        45.00752,
                        164.3
                    ],
                    [
                        8.231589,
                        45.007141,
                        167.8
                    ],
                    [
                        8.229114,
                        45.0067,
                        164.5
                    ],
                    [
                        8.227839,
                        45.00668,
                        165.8
                    ],
                    [
                        8.227759,
                        45.006871,
                        168.8
                    ],
                    [
                        8.227707,
                        45.007302,
                        175
                    ],
                    [
                        8.227791,
                        45.007624,
                        180
                    ],
                    [
                        8.22787,
                        45.007718,
                        182
                    ],
                    [
                        8.227861,
                        45.007813,
                        184
                    ],
                    [
                        8.227608,
                        45.008516,
                        197.5
                    ],
                    [
                        8.227316,
                        45.009031,
                        205
                    ],
                    [
                        8.227208,
                        45.009139,
                        206
                    ],
                    [
                        8.227633,
                        45.009392,
                        207
                    ],
                    [
                        8.227986,
                        45.009489,
                        208.5
                    ],
                    [
                        8.228593,
                        45.009521,
                        211
                    ],
                    [
                        8.228934,
                        45.009456,
                        211.3
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Departure/Partenza",
                "desc": "\n<b>ENG</b> - Departure from the wide car park in 'Piazza del Palio' in Calliano. <br>\n<b>ITA</b> - Partenza dall'ampio parcheggio in 'Piazza del Palio' a Calliano. <br>\n\n<img src=\"https://i.postimg.cc/FKvCMj4b/Calliano-Piazza-del-Palio-25.jpg\" width=\"300\" height=\"auto\">",
                "sym": " "
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.256311,
                    45.006428,
                    -1
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Arrival/Arrivo",
                "desc": "<b>ENG</b> - Arrival at the wonderful <b>Big Bench N.68</b> in Calliano. <br> <b>ITA</b> - Arrivo alla splendida <b>Big Bench N.68</b> a Calliano. <br> <img src=\"https://i.postimg.cc/nL1SpCFy/Calliano-Big-Bench-N68.jpg\" width=\"300\" height=\"auto\">",
                "sym": " "
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.228931,
                    45.009447,
                    -1
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Turn right/Gira a destra",
                "desc": "<b>ENG</b> - Turn right onto the path going downhill. <br> <b>ITA</b> - Svoltare a destra nel sentiero che scende verso il basso. <br> <img src=\"https://i.postimg.cc/50N70bj6/Calliano-Turn-Right.jpg\" width=\"300\" height=\"auto\"> name=Turn right/Gira a destra",
                "sym": " "
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.247342,
                    45.008851,
                    -1
                ]
            }
        }
    ]
}
  L.geoJSON(myGeoJSON).addTo(map2)
}