export type LineStringGeometry = {
  type: "LineString";
  coordinates: number[][];
};

export type PolygonGeometry = {
  type: "Polygon";
  coordinates: number[][][];
};

export type MultiPolygonGeometry = {
  type: "MultiPolygon";
  coordinates: number[][][][];
};

export type BuildingGeometry = LineStringGeometry | PolygonGeometry | MultiPolygonGeometry;

export interface Building {
  id: string;
  name: string;
  shortName: string;
  category: "academic" | "food" | "hostels" | "labs" | "sports" | "admin" | "parking" | "security";
  description: string;
  latitude: number;
  longitude: number;
  busyStatus: "Quiet" | "Moderate" | "Busy";
  busyColor: string;
  details: {
    hours: string;
    distance: string;
    floors: string;
    features: string[];
  };
  image: string;
  geometry: BuildingGeometry;
}

export type CategoryType = "all" | "academic" | "food" | "hostels" | "labs" | "sports" | "admin" | "parking" | "security";

export const buildings: Building[] = [
  {
    "id": "clmpf_0",
    "name": "Central Library and Major Project Facility",
    "shortName": "CLMPF",
    "category": "admin",
    "description": "The primary academic resource center, featuring extensive book collections, digital archives, and collaborative spaces for major student projects.",
    "latitude": 13.1263123,
    "longitude": 77.5883769,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/manah.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5887698, 13.1265663],
          [77.5886196, 13.1266212],
          [77.5884876, 13.1262798],
          [77.588477, 13.1262588],
          [77.5884629, 13.12624],
          [77.5884449, 13.126223],
          [77.5884241, 13.1262095],
          [77.5884011, 13.1261998],
          [77.5883767, 13.1261943],
          [77.5883517, 13.126193],
          [77.5883269, 13.1261961],
          [77.588303, 13.1262035],
          [77.5882809, 13.1262149],
          [77.5882612, 13.1262299],
          [77.5882446, 13.1262481],
          [77.5882315, 13.1262689],
          [77.5882225, 13.1262917],
          [77.5882178, 13.1263156],
          [77.5882174, 13.1263391],
          [77.5882212, 13.1263624],
          [77.5879975, 13.1264452],
          [77.587984, 13.1263666],
          [77.5879849, 13.1263081],
          [77.5879967, 13.1262485],
          [77.5880191, 13.126192],
          [77.5880515, 13.1261403],
          [77.5880929, 13.126095],
          [77.5881419, 13.1260576],
          [77.5881969, 13.1260293],
          [77.5882562, 13.126011],
          [77.5883179, 13.1260033],
          [77.5883801, 13.1260064],
          [77.5884407, 13.1260202],
          [77.5884978, 13.1260443],
          [77.5885496, 13.1260779],
          [77.5885944, 13.12612],
          [77.5886294, 13.1261669],
          [77.5886557, 13.126219],
          [77.5887158, 13.126402],
          [77.5887698, 13.1265663]
        ]
      ]
    }
  },
  {
    "id": "admin_1",
    "name": "Admin Building",
    "shortName": "Admin",
    "category": "admin",
    "description": "The administrative heart of the campus, housing university offices, student services, and the registrar's office.",
    "latitude": 13.1250158,
    "longitude": 77.589359,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/mahead1.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5892385, 13.1249298],
          [77.5892637, 13.1249038],
          [77.5892947, 13.1248846],
          [77.5893295, 13.1248733],
          [77.5893661, 13.1248706],
          [77.5894023, 13.1248768],
          [77.5894359, 13.1248913],
          [77.5894648, 13.1249133],
          [77.5894873, 13.1249416],
          [77.5895019, 13.1249738],
          [77.5895081, 13.1250084],
          [77.5895056, 13.1250435],
          [77.5894945, 13.125077],
          [77.5894755, 13.1251069],
          [77.5894496, 13.1251315],
          [77.5894185, 13.1251493],
          [77.5893839, 13.1251594],
          [77.5893478, 13.125161],
          [77.5893132, 13.1251544],
          [77.5892811, 13.1251401],
          [77.5892534, 13.1251189],
          [77.5892315, 13.125092],
          [77.5892168, 13.1250608],
          [77.58921, 13.1250271],
          [77.5892114, 13.1249927],
          [77.5892211, 13.1249597],
          [77.5892385, 13.1249298]
        ]
      ]
    }
  },
  {
    "id": "hb1_3",
    "name": "Hostel Block 1",
    "shortName": "HB1",
    "category": "hostels",
    "description": "Hostel block 1, for girls.",
    "latitude": 13.130338,
    "longitude": 77.5888943,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5891731, 13.1305221],
          [77.5886193, 13.1305273],
          [77.5886155, 13.1301538],
          [77.5891694, 13.1301486],
          [77.5891706, 13.1302753],
          [77.5887436, 13.1302793],
          [77.5887448, 13.1303952],
          [77.5891718, 13.1303912],
          [77.5891731, 13.1305221]
        ]
      ]
    }
  },
  {
    "id": "hb2_4",
    "name": "Hostel Block 2",
    "shortName": "HB2",
    "category": "hostels",
    "description": "Hostel block 2, for boys.",
    "latitude": 13.1298053,
    "longitude": 77.588865,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/hb2.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5891415, 13.1299928],
          [77.5885876, 13.1299914],
          [77.5885885, 13.1296179],
          [77.5891424, 13.1296193],
          [77.5891421, 13.1297459],
          [77.588715, 13.1297449],
          [77.5887147, 13.1298608],
          [77.5891418, 13.1298619],
          [77.5891415, 13.1299928]
        ]
      ]
    }
  },
  {
    "id": "hb3_5",
    "name": "Hostel Block 3",
    "shortName": "HB3",
    "category": "hostels",
    "description": "Hostel block 3, girls hostel, houses the following facilities: Bluedove Kitchen, Domino's, Subway, Campus Mart, CopyCove, Saloon, Sports Room, and Zolo Office.",
    "latitude": 13.1292503,
    "longitude": 77.5888784,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible",
        "Bluedove Kitchen",
        "Domino's",
        "Subway",
        "Campus Mart",
        "CopyCove",
        "Saloon",
        "Sports Room",
        "Zolo Office"
      ]
    },
    "image": "/images/buildings/hb3.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5891549, 13.1294377],
          [77.588601, 13.1294364],
          [77.5886019, 13.1290629],
          [77.5891558, 13.1290642],
          [77.5891555, 13.1291908],
          [77.5887284, 13.1291898],
          [77.5887282, 13.1293058],
          [77.5891552, 13.1293068],
          [77.5891549, 13.1294377]
        ]
      ]
    }
  },
  {
    "id": "hb4_nw_6",
    "name": "Hostel Block 4 NW",
    "shortName": "HB4 NW",
    "category": "hostels",
    "description": "The northern wing of Hostel Block 4, for girls.",
    "latitude": 13.1287057,
    "longitude": 77.5889656,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/hb4.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5893652, 13.1288976],
          [77.5885686, 13.1289029],
          [77.5885659, 13.1285137],
          [77.5893626, 13.1285085],
          [77.5893634, 13.1286286],
          [77.5886545, 13.1286332],
          [77.5886554, 13.1287657],
          [77.5893643, 13.1287611],
          [77.5893652, 13.1288976]
        ]
      ]
    }
  },
  {
    "id": "hb4_sw_7",
    "name": "Hostel Block 4 SW",
    "shortName": "HB4 SW",
    "category": "hostels",
    "description": "The southern wing of Hostel Block 4, for boys.",
    "latitude": 13.1282368,
    "longitude": 77.5889656,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/hb4.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5893652, 13.1284288],
          [77.5885686, 13.128434],
          [77.5885659, 13.1280448],
          [77.5893626, 13.1280396],
          [77.5893634, 13.1281597],
          [77.5886545, 13.1281644],
          [77.5886554, 13.1282969],
          [77.5893643, 13.1282922],
          [77.5893652, 13.1284288]
        ]
      ]
    }
  },
  {
    "id": "ab1_8",
    "name": "Academic Block 1",
    "shortName": "AB1",
    "category": "academic",
    "description": "Department of Liberal Arts, Humanities, and Social Sciences (DLHS).",
    "latitude": 13.1264119,
    "longitude": 77.5898059,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/ab1.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5896241, 13.1267231],
          [77.5900961, 13.1266317],
          [77.5900525, 13.1264181],
          [77.5898702, 13.1264534],
          [77.5898477, 13.1263436],
          [77.5900301, 13.1263083],
          [77.5899877, 13.1261006],
          [77.5895156, 13.126192],
          [77.589558, 13.1263997],
          [77.5897645, 13.1263597],
          [77.589787, 13.1264696],
          [77.5895805, 13.1265096],
          [77.5896241, 13.1267231]
        ]
      ]
    }
  },
  {
    "id": "ab2_9",
    "name": "Academic Block 2",
    "shortName": "AB2",
    "category": "academic",
    "description": "Shared academic block for Manipal Law School (MLS) and Manipal Institute of Regenerative Medicine (MIRM).",
    "latitude": 13.1263235,
    "longitude": 77.5904676,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/ab2.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5902858, 13.1266347],
          [77.5907579, 13.1265432],
          [77.5907143, 13.1263297],
          [77.5905319, 13.126365],
          [77.5905095, 13.1262552],
          [77.5906919, 13.1262199],
          [77.5906494, 13.1260122],
          [77.5901774, 13.1261036],
          [77.5902198, 13.1263113],
          [77.5904263, 13.1262713],
          [77.5904487, 13.1263811],
          [77.5902422, 13.1264211],
          [77.5902858, 13.1266347]
        ]
      ]
    }
  },
  {
    "id": "ab3",
    "name": "Academic Block 3",
    "shortName": "AB3",
    "category": "academic",
    "description": "Academic block for Srishti Manipal Institute of Art, Design and Technology (SMI).",
    "latitude": 13.125662,
    "longitude":  77.591264,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/ab3.avif",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                77.591857545098037,
                                13.125937526463444
                            ],
                            [
                                77.591606959256282,
                                13.125355396277227
                            ],
                            [
                                77.591433344968138,
                                13.125424260045152
                            ],
                            [
                                77.591453741750357,
                                13.125350337329232
                            ],
                            [
                                77.591463787665603,
                                13.125305587343144
                            ],
                            [
                                77.591491185616263,
                                13.125310153668256
                            ],
                            [
                                77.591516757036885,
                                13.125192342480393
                            ],
                            [
                                77.5910930020666,
                                13.125104669038263
                            ],
                            [
                                77.591045512285433,
                                13.125329332233722
                            ],
                            [
                                77.591232731614994,
                                13.125361296509498
                            ],
                            [
                                77.591240951000188,
                                13.125317459788432
                            ],
                            [
                                77.591429793308208,
                                13.125346637140746
                            ],
                            [
                                77.591416405716899,
                                13.125430978966035
                            ],
                            [
                                77.591376934304122,
                                13.125446635224735
                            ],
                            [
                                77.591636515535058,
                                13.126040330911341
                            ],
                            [
                                77.591857545098037,
                                13.125937526463444
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                77.591089667968845,
                                13.126108684559659
                            ],
                            [
                                77.59111850698153,
                                13.126252879623049
                            ],
                            [
                                77.591053428627703,
                                13.126263925031726
                            ],
                            [
                                77.591090144501962,
                                13.126484220277222
                            ],
                            [
                                77.591881983523265,
                                13.126333685192799
                            ],
                            [
                                77.591853834686333,
                                13.126128076297004
                            ],
                            [
                                77.591135648861865,
                                13.126249970221341
                            ],
                            [
                                77.591108804064959,
                                13.12610903503761
                            ],
                            [
                                77.591323673073504,
                                13.126112970367437
                            ],
                            [
                                77.591323673073504,
                                13.125480058630382
                            ],
                            [
                                77.591001972080079,
                                13.125477727463762
                            ],
                            [
                                77.591005468830005,
                                13.126107142450889
                            ],
                            [
                                77.591089667968845,
                                13.126108684559659
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                77.591690543633177,
                                13.126015483651997
                            ],
                            [
                                77.59168053575398,
                                13.126020193242207
                            ],
                            [
                                77.591687600139295,
                                13.126155593960721
                            ],
                            [
                                77.591699374114825,
                                13.126153827864393
                            ],
                            [
                                77.591690543633177,
                                13.126015483651997
                            ]
                        ]
                    ]
                ]
            }
  },
  {
    "id": "ab4_10",
    "name": "Academic Block 4",
    "shortName": "AB4",
    "category": "academic",
    "description": "Manipal Institute of Technology academic block 4.",
    "latitude": 13.1253255,
    "longitude": 77.5904676,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/ab4.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5901786, 13.125547],
          [77.5906512, 13.1256358],
          [77.5906936, 13.1254221],
          [77.590511, 13.1253877],
          [77.5905328, 13.1252778],
          [77.5907154, 13.1253121],
          [77.5907566, 13.1251042],
          [77.590284, 13.1250153],
          [77.5902428, 13.1252233],
          [77.5904496, 13.1252621],
          [77.5904278, 13.1253721],
          [77.590221, 13.1253332],
          [77.5901786, 13.125547]
        ]
      ]
    }
  },
  {
    "id": "ab5_11",
    "name": "Academic Block 5",
    "shortName": "AB5",
    "category": "academic",
    "description": "Manipal Institute of Technology academic block 5.",
    "latitude": 13.12523,
    "longitude": 77.5898258,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/ab5.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5895368, 13.1254514],
          [77.5900094, 13.1255403],
          [77.5900518, 13.1253265],
          [77.5898692, 13.1252922],
          [77.589891, 13.1251822],
          [77.5900736, 13.1252165],
          [77.5901148, 13.1250086],
          [77.5896422, 13.1249197],
          [77.589601, 13.1251277],
          [77.5898077, 13.1251665],
          [77.5897859, 13.1252765],
          [77.5895792, 13.1252376],
          [77.5895368, 13.1254514]
        ]
      ]
    }
  },
  {
    "id": "ab6_12",
    "name": "Academic Block 6",
    "shortName": "AB6",
    "category": "academic",
    "description": "The newest academic block, equipped with high-tech lecture theatres, innovation incubators, and sprawling study zones.",
    "latitude": 13.1281701,
    "longitude": 77.5906796,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/ab6.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5902101, 13.1282851],
          [77.5911462, 13.1282955],
          [77.591149, 13.1280551],
          [77.5902129, 13.1280447],
          [77.5902101, 13.1282851]
        ]
      ]
    }
  },
  {
    "id": "mlcp_15",
    "name": "MLCP",
    "shortName": "MLCP",
    "category": "parking",
    "description": "The Multi-Level Car Parking facility, providing ample and secure parking space for faculty, students, and visitors.",
    "latitude": 13.1267495,
    "longitude": 77.5869498,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5864758, 13.12707],
          [77.5875267, 13.1267604],
          [77.5874238, 13.1264289],
          [77.5863729, 13.1267385],
          [77.5864758, 13.12707]
        ]
      ]
    }
  },
  {
    "id": "sc_16",
    "name": "Marena/Chefs Touch Mess",
    "shortName": "SC",
    "category": "sports",
    "description": "Marena building, home to the state-of-the-art Sports Complex and the bustling Chef's Touch Mess.",
    "latitude": 13.1284449,
    "longitude": 77.5898774,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Wi-Fi",
        "Accessible"
      ]
    },
    "image": "/images/buildings/marena.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5901077, 13.1287496],
          [77.5899306, 13.1287488],
          [77.5899308, 13.1287043],
          [77.5897795, 13.1287036],
          [77.5897805, 13.1285057],
          [77.5896442, 13.128505],
          [77.589646, 13.1281402],
          [77.5901106, 13.1281423],
          [77.5901077, 13.1287496]
        ]
      ]
    }
  },
  {
    "id": "cricket_field",
    "name": "Cricket Field & Jogging Track",
    "shortName": "Cricket",
    "category": "sports",
    "description": "The main campus cricket ground, and an outer jogging track.",
    "latitude": 13.1299,
    "longitude": 77.5898,
    "busyStatus": "Moderate",
    "busyColor": "bg-yellow-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins",
      "floors": "Levels TBA",
      "features": [
        "Ground",
        "Track"
      ]
    },
    "image": "/images/buildings/circket-ground-jogging-track.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.59028, 13.1299],
          [77.5902565, 13.1300298],
          [77.5901883, 13.1301469],
          [77.5900821, 13.1302398],
          [77.5899483, 13.1302994],
          [77.5898, 13.13032],
          [77.5896517, 13.1302994],
          [77.5895179, 13.1302398],
          [77.5894117, 13.1301469],
          [77.5893435, 13.1300298],
          [77.58932, 13.1299],
          [77.5893435, 13.1297702],
          [77.5894117, 13.1296531],
          [77.5895179, 13.1295602],
          [77.5896517, 13.1295006],
          [77.5898, 13.12948],
          [77.5899483, 13.1295006],
          [77.5900821, 13.1295602],
          [77.5901883, 13.1296531],
          [77.5902565, 13.1297702],
          [77.59028, 13.1299]
        ]
      ]
    }
  },
  {
    "id": "football_field",
    "name": "Football Field",
    "shortName": "Football",
    "category": "sports",
    "description": "A sprawling, lush green football turf hosting inter-college tournaments and daily student practice sessions.",
    "latitude": 13.128775,
    "longitude": 77.590525,
    "busyStatus": "Busy",
    "busyColor": "bg-red-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "3 mins",
      "floors": "Levels TBA",
      "features": [
        "Turf"
      ]
    },
    "image": "/images/buildings/football-field.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.590290420283424,
            13.129194043665542
          ],
          [
            77.590287521954309,
            13.128341934908802
          ],
          [
            77.590812119522241,
            13.128337587415144
          ],
          [
            77.590820814509556,
            13.129095500475987
          ],
          [
            77.590780237902095,
            13.12919259450099
          ],
          [
            77.590290420283424,
            13.129194043665542
          ]
        ]
      ]
    }
  },
  {
    "id": "volleyball_courts",
    "name": "Volleyball Courts",
    "shortName": "Volleyball",
    "category": "sports",
    "description": "Outdoor, well-lit volleyball courts designed for both casual play and competitive campus tournaments.",
    "latitude": 13.1294,
    "longitude": 77.5904,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins",
      "floors": "Levels TBA",
      "features": [
        "Net",
        "Sand"
      ]
    },
    "image": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5903, 13.12955],
          [77.5905, 13.12955],
          [77.5905, 13.12925],
          [77.5903, 13.12925],
          [77.5903, 13.12955]
        ]
      ]
    }
  },
  {
    "id": "basketball_court_1",
    "name": "Basketball Courts",
    "shortName": "BB Court",
    "category": "sports",
    "description": "A full-size, professional-grade basketball court featuring acrylic flooring and high-intensity lighting for evening games.",
    "latitude": 13.129028,
    "longitude": 77.590092,
    "busyStatus": "Busy",
    "busyColor": "bg-red-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins",
      "floors": "Levels TBA",
      "features": [
        "Court",
        "Hoops"
      ]
    },
    "image": "/images/buildings/basketball-court.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.589920883332212,
            13.129192703130323
          ],
          [
            77.58991768792437,
            13.128858783011273
          ],
          [
            77.590275573602213,
            13.128860380715192
          ],
          [
            77.5902659873787,
            13.129194300834243
          ],
          [
            77.590261194266944,
            13.129194300834243
          ],
          [
            77.589920883332212,
            13.129192703130323
          ]
        ]
      ]
    }
  },
  {
    "id": "basketball_half_court",
    "name": "Basketball Half Court",
    "shortName": "Half Court",
    "category": "sports",
    "description": "A compact half-court area perfect for 3-on-3 games, casual shootarounds, and quick practice sessions.",
    "latitude": 13.129169,
    "longitude": 77.589461,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins",
      "floors": "Levels TBA",
      "features": [
        "Court",
        "Hoop"
      ]
    },
    "image": "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.589546941144093,
            13.129230358116692
          ],
          [
            77.589552348088603,
            13.129103835615254
          ],
          [
            77.589376081697708,
            13.129104917004154
          ],
          [
            77.58937716308661,
            13.12922927672779
          ],
          [
            77.589546941144093,
            13.129230358116692
          ]
        ]
      ]
    }
  },
    {
    "id": "tennis_court",
    "name": "Tennis Court",
    "shortName": "Tennis Court",
    "category": "sports",
    "description": "A compact half-court area perfect for 3-on-3 games, casual shootarounds, and quick practice sessions.",
    "latitude": 13.129,
    "longitude": 77.5898,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins",
      "floors": "Levels TBA",
      "features": [
        "Court",
        "Hoop"
        ]
      },
      "image": "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              77.589751290551078,
              13.129190361339905
            ],
            [
              77.589748906088545,
              13.128863689973697
            ],
            [
              77.58991768792437,
              13.128858783011273
            ],
            [
              77.589920883332212,
              13.129192703130323
            ],
            [
              77.589751290551078,
              13.129190361339905
            ]
          ]
        ]
      }
  },
  {
    "id": "cricket_nets",
    "name": "Cricket Nets",
    "shortName": "Nets",
    "category": "sports",
    "description": "Enclosed cricket practice nets equipped with bowling machines and artificial turf for focused batting and bowling drills.",
    "latitude": 13.129102,
    "longitude": 77.589670,
    "busyStatus": "Moderate",
    "busyColor": "bg-yellow-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "3 mins",
      "floors": "Levels TBA",
      "features": [
        "Nets"
      ]
    },
    "image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.589748079479705,
            13.128758872555776
          ],
          [
            77.589749160868607,
            13.129234683672296
          ],
          [
            77.589585871144536,
            13.129236846450098
          ],
          [
            77.589594522255737,
            13.128759953944678
          ],
          [
            77.589748079479705,
            13.128758872555776
          ]
        ]
      ]
    }
  },
  {
    "id": "gate_3",
    "name": "Gate 3 Security Block",
    "shortName": "Gate 3",
    "category": "security",
    "description": "The primary northern security checkpoint, managing incoming visitor traffic and providing 24/7 campus surveillance.",
    "latitude": 13.13058,
    "longitude": 77.59,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "0 mins",
      "floors": "Levels TBA",
      "features": [
        "Security",
        "Check"
      ]
    },
    "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.58995, 13.13063],
          [77.59005, 13.13063],
          [77.59005, 13.13053],
          [77.58995, 13.13053],
          [77.58995, 13.13063]
        ]
      ]
    }
  },
  {
    "id": "gate_2",
    "name": "Gate 2 Security Block",
    "shortName": "Gate 2",
    "category": "security",
    "description": "The eastern entry portal, providing convenient access to the academic blocks and featuring round-the-clock security.",
    "latitude": 13.1288,
    "longitude": 77.5912,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "0 mins",
      "floors": "Levels TBA",
      "features": [
        "Security",
        "Check"
      ]
    },
    "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5911, 13.1289],
          [77.5913, 13.1289],
          [77.5913, 13.1287],
          [77.5911, 13.1287],
          [77.5911, 13.1289]
        ]
      ]
    }
  },
  {
    "id": "gate_1",
    "name": "Gate 1 Security Block",
    "shortName": "Gate 1",
    "category": "security",
    "description": "The main southern entrance of the campus, acting as the primary transit point for day scholars and faculty.",
    "latitude": 13.12305,
    "longitude": 77.59211,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "0 mins",
      "floors": "Levels TBA",
      "features": [
        "Security",
        "Check"
      ]
    },
    "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.59206, 13.1231],
          [77.59216, 13.1231],
          [77.59216, 13.123],
          [77.59206, 13.123],
          [77.59206, 13.1231]
        ]
      ]
    }
  },
  {
    "id": "laundry",
    "name": "Laundry & Cloak Rooms",
    "shortName": "Laundry",
    "category": "admin",
    "description": "The central student laundry service facility, offering both self-service washing machines and professional dry-cleaning.",
    "latitude": 13.1293,
    "longitude": 77.5883,
    "busyStatus": "Moderate",
    "busyColor": "bg-yellow-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "1 mins",
      "floors": "Levels TBA",
      "features": [
        "Washing",
        "Drying"
      ]
    },
    "image": "https://images.unsplash.com/photo-1545062080-a71640ea89fa?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5882, 13.12945],
          [77.5884, 13.12945],
          [77.5884, 13.12915],
          [77.5882, 13.12915],
          [77.5882, 13.12945]
        ]
      ]
    }
  },
  {
    "id": "blue_dove_mess",
    "name": "Melon (Chef's Touch)",
    "shortName": "Melon",
    "category": "food",
    "description": "A bustling student dining hall operated by Chef's Touch, offering a diverse menu of nutritious and delicious meals.",
    "latitude": 13.1272928,
    "longitude": 77.5883639,
    "busyStatus": "Busy",
    "busyColor": "bg-red-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "1 mins",
      "floors": "Levels TBA",
      "features": [
        "Dining",
        "Food"
      ]
    },
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.58827, 13.1274136],
          [77.5882131, 13.1271222],
          [77.5884878, 13.1271222],
          [77.588489, 13.1273407],
          [77.5883637, 13.1273432],
          [77.5883599, 13.1274148],
          [77.58827, 13.1274136]
        ]
      ]
    }
  },
  {
    "id": "ta_pai",
    "name": "TA Pai Auditorium",
    "shortName": "TA Pai Auditorium",
    "category": "admin",
    "description": "A grand convention center hosting major cultural events, guest lectures, and the renowned Blue Dove Mess.",
    "latitude": 13.1276,
    "longitude": 77.5888,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins",
      "floors": "Levels TBA",
      "features": [
        "Events",
        "Stage",
        "Dining"
      ]
    },
    "image": "/images/buildings/tapai-convention-center.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5885668, 13.1277177],
          [77.5885719, 13.1277671],
          [77.5893577, 13.1277587],
          [77.5893476, 13.1276555],
          [77.5893441, 13.1272847],
          [77.5891853, 13.1272919],
          [77.5887312, 13.1272841],
          [77.588674, 13.1272882],
          [77.5886157, 13.1273],
          [77.5885681, 13.1273419],
          [77.5885668, 13.1277177]
        ]
      ]
    }
  },
  {
    "id": "hb5_new",
    "name": "Hostel Block 5",
    "shortName": "HB5",
    "category": "hostels",
    "description": "Hostel block 5, for boys.",
    "latitude": 13.12645,
    "longitude": 77.58768,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "3 mins away",
      "floors": "Levels TBA",
      "features": [
        "Under Construction"
      ]
    },
    "image": "/images/buildings/hb5.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5875526, 13.1266973],
          [77.5878925, 13.1266277],
          [77.5878567, 13.126461],
          [77.5877256, 13.126488],
          [77.5877071, 13.1264024],
          [77.5878385, 13.1263755],
          [77.5878036, 13.1262135],
          [77.5874637, 13.1262832],
          [77.5874984, 13.1264451],
          [77.5876472, 13.1264147],
          [77.5876657, 13.1265003],
          [77.5875169, 13.1265307],
          [77.5875526, 13.1266973]
        ]
      ]
    }
  },
  {
    "id": "chefs_touch_marena",
    "name": "Chef's Touch (Marena)",
    "shortName": "Chef's Touch",
    "category": "food",
    "description": "A popular food and refreshment outlet situated inside the Marena Sports Complex, perfect for post-workout meals.",
    "latitude": 13.1285449,
    "longitude": 77.5900274,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Dining",
        "Food"
      ]
    },
    "image": "/images/buildings/marena.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5899774, 13.1286449],
          [77.5900774, 13.1286449],
          [77.5900774, 13.1285449],
          [77.5899774, 13.1285449],
          [77.5899774, 13.1286449]
        ]
      ]
    }
  },
  {
    "id": "blue_dove_auditorium",
    "name": "Blue Dove (Auditorium)",
    "shortName": "Blue Dove",
    "category": "food",
    "description": "An elegant dining facility housed within the TA Pai Auditorium, famous for its premium catering and diverse cuisines.",
    "latitude": 13.1275,
    "longitude": 77.5893,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Dining",
        "Food"
      ]
    },
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.58925, 13.12755],
          [77.58935, 13.12755],
          [77.58935, 13.12745],
          [77.58925, 13.12745],
          [77.58925, 13.12755]
        ]
      ]
    }
  },
  {
    "id": "mahe_sign",
    "name": "MAHE Signboard",
    "shortName": "Sign",
    "category": "admin",
    "description": "The iconic main campus signboard, serving as a popular landmark and photo spot for graduating students.",
    "latitude": 13.1258435,
    "longitude": 77.590453,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "1 mins",
      "floors": "Levels TBA",
      "features": [
        "Sign"
      ]
    },
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.590503, 13.1258435],
          [77.59049919, 13.12586072],
          [77.59048836, 13.12587532],
          [77.59047213, 13.12588507],
          [77.590453, 13.1258885],
          [77.59043387, 13.12588507],
          [77.59041764, 13.12587532],
          [77.59040681, 13.12586072],
          [77.590403, 13.1258435],
          [77.59040681, 13.12582628],
          [77.59041764, 13.12581168],
          [77.59043387, 13.12580193],
          [77.590453, 13.1257985],
          [77.59047213, 13.12580193],
          [77.59048836, 13.12581168],
          [77.59049919, 13.12582628],
          [77.590503, 13.1258435]
        ]
      ]
    }
  },
  {
    "id": "tiger_circle",
    "name": "Tiger and the Man Circle",
    "shortName": "Tiger and the Man Circle",
    "category": "admin",
    "description": "A traffic roundabout near Academic Block 1, serving as a central junction point on campus.",
    "latitude": 13.126802,
    "longitude": 77.589401,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Landmark"
      ]
    },
    "image": "/images/buildings/marc-circle.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.589461, 13.126802],
          [77.58945643, 13.12682496],
          [77.58944343, 13.12684443],
          [77.58942396, 13.12685743],
          [77.589401, 13.126862],
          [77.58937804, 13.12685743],
          [77.58935857, 13.12684443],
          [77.58934557, 13.12682496],
          [77.589341, 13.126802],
          [77.58934557, 13.12677904],
          [77.58935857, 13.12675957],
          [77.58937804, 13.12674657],
          [77.589401, 13.126742],
          [77.58942396, 13.12674657],
          [77.58944343, 13.12675957],
          [77.58945643, 13.12677904],
          [77.589461, 13.126802]
        ]
      ]
    }
  },
  {
    "id": "flag_post",
    "name": "Flag Post",
    "shortName": "Flag Post",
    "category": "admin",
    "description": "A traffic roundabout near the Admin Building, marked by the campus flag post landmark.",
    "latitude": 13.124654,
    "longitude": 77.588728,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "2 mins away",
      "floors": "Levels TBA",
      "features": [
        "Landmark"
      ]
    },
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.588818, 13.124654],
          [77.58881115, 13.12468844],
          [77.58879164, 13.12471764],
          [77.58876244, 13.12473715],
          [77.588728, 13.124744],
          [77.58869356, 13.12473715],
          [77.58866436, 13.12471764],
          [77.58864485, 13.12468844],
          [77.588638, 13.124654],
          [77.58864485, 13.12461956],
          [77.58866436, 13.12459036],
          [77.58869356, 13.12457085],
          [77.588728, 13.124564],
          [77.58876244, 13.12457085],
          [77.58879164, 13.12459036],
          [77.58881115, 13.12461956],
          [77.588818, 13.124654]
        ]
      ]
    }
  },
  {
    "id": "yippee_point",
    "name": "Yippee Point",
    "shortName": "Yippee Point",
    "category": "food",
    "description": "A popular cafeteria spot near the Admin Building, serving quick snacks and beverages between classes.",
    "latitude": 13.12495,
    "longitude": 77.58955,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "1 mins away",
      "floors": "Levels TBA",
      "features": [
        "Snacks",
        "Beverages"
      ]
    },
    "image": "/images/buildings/mahead1.avif",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5895, 13.125],
          [77.5896, 13.125],
          [77.5896, 13.1249],
          [77.5895, 13.1249],
          [77.5895, 13.125]
        ]
      ]
    }
  },
  {
    "id": "campus_mart",
    "name": "Campus Mart",
    "shortName": "Campus Mart",
    "category": "food",
    "description": "A convenient campus mart tucked into the courtyard gap of Hostel Block 3, stocking snacks and daily essentials.",
    "latitude": 13.12925,
    "longitude": 77.5887952,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "1 mins away",
      "floors": "Levels TBA",
      "features": [
        "Groceries",
        "Snacks"
      ]
    },
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5887352, 13.1293],
          [77.5888552, 13.1293],
          [77.5888552, 13.1292],
          [77.5887352, 13.1292],
          [77.5887352, 13.1293]
        ]
      ]
    }
  },
  {
    "id": "dominos",
    "name": "Domino's Pizza",
    "shortName": "Domino's",
    "category": "food",
    "description": "A Domino's Pizza outlet nestled in the courtyard gap of Hostel Block 3, popular for late-night orders.",
    "latitude": 13.12925,
    "longitude": 77.5889252,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "1 mins away",
      "floors": "Levels TBA",
      "features": [
        "Pizza",
        "Delivery"
      ]
    },
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5888652, 13.1293],
          [77.5889852, 13.1293],
          [77.5889852, 13.1292],
          [77.5888652, 13.1292],
          [77.5888652, 13.1293]
        ]
      ]
    }
  },
  {
    "id": "subway",
    "name": "Subway",
    "shortName": "Subway",
    "category": "food",
    "description": "A Subway sandwich outlet in the courtyard gap of Hostel Block 3, offering fresh made-to-order subs.",
    "latitude": 13.12925,
    "longitude": 77.5890552,
    "busyStatus": "Quiet",
    "busyColor": "bg-green-500",
    "details": {
      "hours": "Schedule TBA",
      "distance": "1 mins away",
      "floors": "Levels TBA",
      "features": [
        "Sandwiches",
        "Salads"
      ]
    },
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5889952, 13.1293],
          [77.5891152, 13.1293],
          [77.5891152, 13.1292],
          [77.5889952, 13.1292],
          [77.5889952, 13.1293]
        ]
      ]
    }
  },
  {
    "id": "campus_boundary",
    "name": "Campus Boundary",
    "shortName": "Boundary",
    "category": "admin",
    "description": "Campus perimeter boundary line",
    "latitude": 13.1269,
    "longitude": 77.5890,
    "busyStatus": "Quiet",
    "busyColor": "bg-gray-500",
    "details": {
      "hours": "",
      "distance": "",
      "floors": "",
      "features": ["Boundary"]
    },
    "image": "",
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [77.59211022948978, 13.123244929291966],
        [77.59165321532569, 13.122234939984427],
        [77.5869094442877, 13.124342782871215],
        [77.58691784087338, 13.124459135558663],
        [77.58677120050184, 13.124831284231655],
        [77.58642454146398, 13.124750167216305],
        [77.58640310018268, 13.124879864477441],
        [77.58617834157637, 13.124925895759718],
        [77.58614250614816, 13.125060690947883],
        [77.58638195877943, 13.125186789672298],
        [77.58587486497923, 13.126696675706587],
        [77.585808891806, 13.126971963766],
        [77.585892257907, 13.12741038549],
        [77.586344474022, 13.127227459874],
        [77.58761715651, 13.126861008884],
        [77.587832768836, 13.126816926809],
        [77.588025290551, 13.126795335588],
        [77.588123950432, 13.127456266834],
        [77.588275088975, 13.128477051751],
        [77.588334164953, 13.129378485201],
        [77.58839174154, 13.129377285689],
        [77.588394140565, 13.129446857399],
        [77.588462512763, 13.130035817909],
        [77.58849849813, 13.130642771104],
        [77.58850749447178, 13.13074712866884],
        [77.58927458255037, 13.13071594135055],
        [77.58960924646583, 13.13070754476486],
        [77.58990571281663, 13.130716053498439],
        [77.58998606298182, 13.130713757779432],
        [77.59001486968873, 13.130697348910807],
        [77.59008995099667, 13.130578897076937],
        [77.59008995099667, 13.130578897076937],
        [77.59087443200275, 13.129263332025808],
        [77.59108794518177, 13.129032725797336],
        [77.59108794518177, 13.129032725797336],
        [77.59158724215241, 13.127799327334767],
        [77.59142800690232, 13.127781334651141],
        [77.59018291319543, 13.127802026237312],
        [77.58958240737942, 13.127786957364775],
        [77.58959230335542, 13.126926007453239],
        [77.59026522972306, 13.126867531231451],
        [77.59155890367583, 13.126726738482068],
        [77.59241520978625, 13.126869971148551],
        [77.59107130194958, 13.123970709167549],
        [77.59210633107521, 13.123468713294367],
        [77.59219130903439, 13.123424934875205],
        [77.59210936734058, 13.123244367020398]
      ]
    }
  }
];