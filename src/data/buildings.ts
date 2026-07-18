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
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5887698,
            13.1265663
          ],
          [
            77.5886196,
            13.1266212
          ],
          [
            77.5884876,
            13.1262798
          ],
          [
            77.588477,
            13.1262588
          ],
          [
            77.5884629,
            13.12624
          ],
          [
            77.5884449,
            13.126223
          ],
          [
            77.5884241,
            13.1262095
          ],
          [
            77.5884011,
            13.1261998
          ],
          [
            77.5883767,
            13.1261943
          ],
          [
            77.5883517,
            13.126193
          ],
          [
            77.5883269,
            13.1261961
          ],
          [
            77.588303,
            13.1262035
          ],
          [
            77.5882809,
            13.1262149
          ],
          [
            77.5882612,
            13.1262299
          ],
          [
            77.5882446,
            13.1262481
          ],
          [
            77.5882315,
            13.1262689
          ],
          [
            77.5882225,
            13.1262917
          ],
          [
            77.5882178,
            13.1263156
          ],
          [
            77.5882174,
            13.1263391
          ],
          [
            77.5882212,
            13.1263624
          ],
          [
            77.5879975,
            13.1264452
          ],
          [
            77.587984,
            13.1263666
          ],
          [
            77.5879849,
            13.1263081
          ],
          [
            77.5879967,
            13.1262485
          ],
          [
            77.5880191,
            13.126192
          ],
          [
            77.5880515,
            13.1261403
          ],
          [
            77.5880929,
            13.126095
          ],
          [
            77.5881419,
            13.1260576
          ],
          [
            77.5881969,
            13.1260293
          ],
          [
            77.5882562,
            13.126011
          ],
          [
            77.5883179,
            13.1260033
          ],
          [
            77.5883801,
            13.1260064
          ],
          [
            77.5884407,
            13.1260202
          ],
          [
            77.5884978,
            13.1260443
          ],
          [
            77.5885496,
            13.1260779
          ],
          [
            77.5885944,
            13.12612
          ],
          [
            77.5886294,
            13.1261669
          ],
          [
            77.5886557,
            13.126219
          ],
          [
            77.5887158,
            13.126402
          ],
          [
            77.5887698,
            13.1265663
          ]
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5892385,
            13.1249298
          ],
          [
            77.5892637,
            13.1249038
          ],
          [
            77.5892947,
            13.1248846
          ],
          [
            77.5893295,
            13.1248733
          ],
          [
            77.5893661,
            13.1248706
          ],
          [
            77.5894023,
            13.1248768
          ],
          [
            77.5894359,
            13.1248913
          ],
          [
            77.5894648,
            13.1249133
          ],
          [
            77.5894873,
            13.1249416
          ],
          [
            77.5895019,
            13.1249738
          ],
          [
            77.5895081,
            13.1250084
          ],
          [
            77.5895056,
            13.1250435
          ],
          [
            77.5894945,
            13.125077
          ],
          [
            77.5894755,
            13.1251069
          ],
          [
            77.5894496,
            13.1251315
          ],
          [
            77.5894185,
            13.1251493
          ],
          [
            77.5893839,
            13.1251594
          ],
          [
            77.5893478,
            13.125161
          ],
          [
            77.5893132,
            13.1251544
          ],
          [
            77.5892811,
            13.1251401
          ],
          [
            77.5892534,
            13.1251189
          ],
          [
            77.5892315,
            13.125092
          ],
          [
            77.5892168,
            13.1250608
          ],
          [
            77.58921,
            13.1250271
          ],
          [
            77.5892114,
            13.1249927
          ],
          [
            77.5892211,
            13.1249597
          ],
          [
            77.5892385,
            13.1249298
          ]
        ]
      ]
    }
  }
  ,{
    "id": "hb1_3",
    "name": "Hostel Block 1",
    "shortName": "HB1",
    "category": "hostels",
    "description": "A premium residential facility for students, providing comfortable dormitories, common lounges, and study areas.",
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
          [
            77.5891731,
            13.1305221
          ],
          [
            77.5886193,
            13.1305273
          ],
          [
            77.5886155,
            13.1301538
          ],
          [
            77.5891694,
            13.1301486
          ],
          [
            77.5891706,
            13.1302753
          ],
          [
            77.5887436,
            13.1302793
          ],
          [
            77.5887448,
            13.1303952
          ],
          [
            77.5891718,
            13.1303912
          ],
          [
            77.5891731,
            13.1305221
          ]
        ]
      ]
    }
  },
  {
    "id": "hb2_4",
    "name": "Hostel Block 2",
    "shortName": "HB2",
    "category": "hostels",
    "description": "A lively student residence known for its spacious rooms, recreational areas, and strong community vibe.",
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5891415,
            13.1299928
          ],
          [
            77.5885876,
            13.1299914
          ],
          [
            77.5885885,
            13.1296179
          ],
          [
            77.5891424,
            13.1296193
          ],
          [
            77.5891421,
            13.1297459
          ],
          [
            77.588715,
            13.1297449
          ],
          [
            77.5887147,
            13.1298608
          ],
          [
            77.5891418,
            13.1298619
          ],
          [
            77.5891415,
            13.1299928
          ]
        ]
      ]
    }
  },
  {
    "id": "hb3_5",
    "name": "Hostel Block 3",
    "shortName": "HB3",
    "category": "hostels",
    "description": "A modern on-campus dormitory featuring excellent amenities, quiet study rooms, and easy access to campus dining.",
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
        "Accessible"
      ]
    },
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5891549,
            13.1294377
          ],
          [
            77.588601,
            13.1294364
          ],
          [
            77.5886019,
            13.1290629
          ],
          [
            77.5891558,
            13.1290642
          ],
          [
            77.5891555,
            13.1291908
          ],
          [
            77.5887284,
            13.1291898
          ],
          [
            77.5887282,
            13.1293058
          ],
          [
            77.5891552,
            13.1293068
          ],
          [
            77.5891549,
            13.1294377
          ]
        ]
      ]
    }
  },
  {
    "id": "hb4_nw_6",
    "name": "Hostel Block 4 NW",
    "shortName": "HB4 NW",
    "category": "hostels",
    "description": "The north-west wing of Hostel Block 4, offering modern living spaces and a peaceful environment for focused students.",
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5893652,
            13.1288976
          ],
          [
            77.5885686,
            13.1289029
          ],
          [
            77.5885659,
            13.1285137
          ],
          [
            77.5893626,
            13.1285085
          ],
          [
            77.5893634,
            13.1286286
          ],
          [
            77.5886545,
            13.1286332
          ],
          [
            77.5886554,
            13.1287657
          ],
          [
            77.5893643,
            13.1287611
          ],
          [
            77.5893652,
            13.1288976
          ]
        ]
      ]
    }
  },
  {
    "id": "hb4_sw_7",
    "name": "Hostel Block 4 SW",
    "shortName": "HB4 SW",
    "category": "hostels",
    "description": "The south-west wing of Hostel Block 4, featuring easy access to sports facilities and an active student community.",
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5893652,
            13.1284288
          ],
          [
            77.5885686,
            13.128434
          ],
          [
            77.5885659,
            13.1280448
          ],
          [
            77.5893626,
            13.1280396
          ],
          [
            77.5893634,
            13.1281597
          ],
          [
            77.5886545,
            13.1281644
          ],
          [
            77.5886554,
            13.1282969
          ],
          [
            77.5893643,
            13.1282922
          ],
          [
            77.5893652,
            13.1284288
          ]
        ]
      ]
    }
  },
  {
    "id": "ab1_8",
    "name": "Academic Block 1",
    "shortName": "AB1",
    "category": "academic",
    "description": "The core academic building housing primary lecture halls, seminar rooms, and faculty offices for various disciplines.",
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5896241,
            13.1267231
          ],
          [
            77.5900961,
            13.1266317
          ],
          [
            77.5900525,
            13.1264181
          ],
          [
            77.5898702,
            13.1264534
          ],
          [
            77.5898477,
            13.1263436
          ],
          [
            77.5900301,
            13.1263083
          ],
          [
            77.5899877,
            13.1261006
          ],
          [
            77.5895156,
            13.126192
          ],
          [
            77.589558,
            13.1263997
          ],
          [
            77.5897645,
            13.1263597
          ],
          [
            77.589787,
            13.1264696
          ],
          [
            77.5895805,
            13.1265096
          ],
          [
            77.5896241,
            13.1267231
          ]
        ]
      ]
    }
  },
  {
    "id": "ab2_9",
    "name": "Academic Block 2",
    "shortName": "AB2",
    "category": "academic",
    "description": "A modern academic facility featuring state-of-the-art smart classrooms, research laboratories, and student lounge areas.",
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5902858,
            13.1266347
          ],
          [
            77.5907579,
            13.1265432
          ],
          [
            77.5907143,
            13.1263297
          ],
          [
            77.5905319,
            13.126365
          ],
          [
            77.5905095,
            13.1262552
          ],
          [
            77.5906919,
            13.1262199
          ],
          [
            77.5906494,
            13.1260122
          ],
          [
            77.5901774,
            13.1261036
          ],
          [
            77.5902198,
            13.1263113
          ],
          [
            77.5904263,
            13.1262713
          ],
          [
            77.5904487,
            13.1263811
          ],
          [
            77.5902422,
            13.1264211
          ],
          [
            77.5902858,
            13.1266347
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
    "description": "An advanced academic center focused on applied sciences and engineering, featuring specialized workshops and computer labs.",
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5901786,
            13.125547
          ],
          [
            77.5906512,
            13.1256358
          ],
          [
            77.5906936,
            13.1254221
          ],
          [
            77.590511,
            13.1253877
          ],
          [
            77.5905328,
            13.1252778
          ],
          [
            77.5907154,
            13.1253121
          ],
          [
            77.5907566,
            13.1251042
          ],
          [
            77.590284,
            13.1250153
          ],
          [
            77.5902428,
            13.1252233
          ],
          [
            77.5904496,
            13.1252621
          ],
          [
            77.5904278,
            13.1253721
          ],
          [
            77.590221,
            13.1253332
          ],
          [
            77.5901786,
            13.125547
          ]
        ]
      ]
    }
  },
  {
    "id": "ab5_11",
    "name": "Academic Block 5",
    "shortName": "AB5",
    "category": "academic",
    "description": "A vibrant academic hub hosting creative arts, humanities classes, and interactive collaborative workspaces.",
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5895368,
            13.1254514
          ],
          [
            77.5900094,
            13.1255403
          ],
          [
            77.5900518,
            13.1253265
          ],
          [
            77.5898692,
            13.1252922
          ],
          [
            77.589891,
            13.1251822
          ],
          [
            77.5900736,
            13.1252165
          ],
          [
            77.5901148,
            13.1250086
          ],
          [
            77.5896422,
            13.1249197
          ],
          [
            77.589601,
            13.1251277
          ],
          [
            77.5898077,
            13.1251665
          ],
          [
            77.5897859,
            13.1252765
          ],
          [
            77.5895792,
            13.1252376
          ],
          [
            77.5895368,
            13.1254514
          ]
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5902101,
            13.1282851
          ],
          [
            77.5911462,
            13.1282955
          ],
          [
            77.591149,
            13.1280551
          ],
          [
            77.5902129,
            13.1280447
          ],
          [
            77.5902101,
            13.1282851
          ]
        ]
      ]
    }
  }
  ,{
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
          [
            77.5864758,
            13.12707
          ],
          [
            77.5875267,
            13.1267604
          ],
          [
            77.5874238,
            13.1264289
          ],
          [
            77.5863729,
            13.1267385
          ],
          [
            77.5864758,
            13.12707
          ]
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5901077,
            13.1287496
          ],
          [
            77.5899306,
            13.1287488
          ],
          [
            77.5899308,
            13.1287043
          ],
          [
            77.5897795,
            13.1287036
          ],
          [
            77.5897805,
            13.1285057
          ],
          [
            77.5896442,
            13.128505
          ],
          [
            77.589646,
            13.1281402
          ],
          [
            77.5901106,
            13.1281423
          ],
          [
            77.5901077,
            13.1287496
          ]
        ]
      ]
    }
  },
  {
    "id": "cricket_field",
    "name": "Cricket Field & Jogging Track",
    "shortName": "Cricket",
    "category": "sports",
    "description": "The main campus cricket ground, featuring a meticulously maintained pitch and a popular outer jogging track.",
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
    "image": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80",
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
    "latitude": 13.1288,
    "longitude": 77.5907,
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
    "image": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5904,
            13.1292
          ],
          [
            77.591,
            13.1292
          ],
          [
            77.591,
            13.1284
          ],
          [
            77.5904,
            13.1284
          ],
          [
            77.5904,
            13.1292
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
          [
            77.5903,
            13.12955
          ],
          [
            77.5905,
            13.12955
          ],
          [
            77.5905,
            13.12925
          ],
          [
            77.5903,
            13.12925
          ],
          [
            77.5903,
            13.12955
          ]
        ]
      ]
    }
  },
  {
    "id": "basketball_court_1",
    "name": "Basketball Court 1",
    "shortName": "BB Court",
    "category": "sports",
    "description": "A full-size, professional-grade basketball court featuring acrylic flooring and high-intensity lighting for evening games.",
    "latitude": 13.1290,
    "longitude": 77.5903,
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
    "image": "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5901,
            13.1291
          ],
          [
            77.5904,
            13.1291
          ],
          [
            77.5904,
            13.1289
          ],
          [
            77.5901,
            13.1289
          ],
          [
            77.5901,
            13.1291
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
    "latitude": 13.1290,
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
            77.5897,
            13.1291
          ],
          [
            77.5899,
            13.1291
          ],
          [
            77.5899,
            13.1289
          ],
          [
            77.5897,
            13.1289
          ],
          [
            77.5897,
            13.1291
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
    "latitude": 13.1290,
    "longitude": 77.5900,
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
            77.5899,
            13.1291
          ],
          [
            77.5901,
            13.1291
          ],
          [
            77.5901,
            13.1289
          ],
          [
            77.5899,
            13.1289
          ],
          [
            77.5899,
            13.1291
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
    "latitude": 13.13048,
    "longitude": 77.58985,
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
          [
            77.5898,
            13.13053
          ],
          [
            77.5899,
            13.13053
          ],
          [
            77.5899,
            13.13043
          ],
          [
            77.5898,
            13.13043
          ],
          [
            77.5898,
            13.13053
          ]
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
          [
            77.5911,
            13.1289
          ],
          [
            77.5913,
            13.1289
          ],
          [
            77.5913,
            13.1287
          ],
          [
            77.5911,
            13.1287
          ],
          [
            77.5911,
            13.1289
          ]
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
    "latitude": 13.12411,
    "longitude": 77.5926,
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
          [
            77.59255,
            13.12416
          ],
          [
            77.59265,
            13.12416
          ],
          [
            77.59265,
            13.12406
          ],
          [
            77.59255,
            13.12406
          ],
          [
            77.59255,
            13.12416
          ]
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
          [
            77.5882,
            13.12945
          ],
          [
            77.58840000000001,
            13.12945
          ],
          [
            77.58840000000001,
            13.129150000000001
          ],
          [
            77.5882,
            13.129150000000001
          ],
          [
            77.5882,
            13.12945
          ]
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
    "latitude": 13.12765,
    "longitude": 77.588277,
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
          [
            77.588127,
            13.1278
          ],
          [
            77.588427,
            13.1278
          ],
          [
            77.588427,
            13.1275
          ],
          [
            77.588127,
            13.1275
          ],
          [
            77.588127,
            13.1278
          ]
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
    "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            77.5885668,
            13.1277177
          ],
          [
            77.5885719,
            13.1277671
          ],
          [
            77.5893577,
            13.1277587
          ],
          [
            77.5893476,
            13.1276555
          ],
          [
            77.5893441,
            13.1272847
          ],
          [
            77.5891853,
            13.1272919
          ],
          [
            77.5887312,
            13.1272841
          ],
          [
            77.588674,
            13.1272882
          ],
          [
            77.5886157,
            13.1273
          ],
          [
            77.5885681,
            13.1273419
          ],
          [
            77.5885668,
            13.1277177
          ]
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
          [
            77.590503,
            13.1258435
          ],
          [
            77.59049919,
            13.12586072
          ],
          [
            77.59048836,
            13.12587532
          ],
          [
            77.59047213,
            13.12588507
          ],
          [
            77.590453,
            13.1258885
          ],
          [
            77.59043387,
            13.12588507
          ],
          [
            77.59041764,
            13.12587532
          ],
          [
            77.59040681,
            13.12586072
          ],
          [
            77.590403,
            13.1258435
          ],
          [
            77.59040681,
            13.12582628
          ],
          [
            77.59041764,
            13.12581168
          ],
          [
            77.59043387,
            13.12580193
          ],
          [
            77.590453,
            13.1257985
          ],
          [
            77.59047213,
            13.12580193
          ],
          [
            77.59048836,
            13.12581168
          ],
          [
            77.59049919,
            13.12582628
          ],
          [
            77.590503,
            13.1258435
          ]
        ]
      ]
    }
  }
,
  {
    "id": "hb5_new",
    "name": "Hostel Block 5",
    "shortName": "HB5",
    "category": "hostels",
    "description": "The newest hostel block on campus, offering modern amenities and a strategic location closer to the academic blocks for maximum student convenience.",
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
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [77.5875659, 13.1266476],
          [77.5878777, 13.1265662],
          [77.5877941, 13.1262625],
          [77.5874823, 13.1263439],
          [77.5875659, 13.1266476]
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
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
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
          [77.5892500, 13.1275500],
          [77.5893500, 13.1275500],
          [77.5893500, 13.1274500],
          [77.5892500, 13.1274500],
          [77.5892500, 13.1275500]
        ]
      ]
    }
  }
    ];