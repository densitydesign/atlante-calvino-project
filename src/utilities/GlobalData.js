
import * as d3 from 'd3';

const collections = [
  {
    'n': 'Il sentiero dei nidi di ragno',
    'id': 'V001',
    'year': 1947,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Ultimo viene il corvo',
    'id': 'V002',
    'year': 1949,
    'c': '#00c19c',
    'has_metaball': true,
    'concavityTolerance': 1.1
  },
  {
    'n': 'Il visconte dimezzato',
    'id': 'V003',
    'year': 1952,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'L\'entrata in guerra',
    'id': 'V004',
    'year': 1954,
    'c': '#8ae297',
    'has_metaball': true,
    'concavityTolerance': 1.1
  },
  {
    'n': 'Il barone rampante',
    'id': 'V005',
    'year': 1957,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'I racconti',
    'id': 'V006',
    'year': 1958,
    'c': '#5151fc',
    'has_metaball': true,
    'concavityTolerance': 1.2
  },
  {
    'n': 'La formica argentina',
    'id': 'V007',
    'year': 1957,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Il cavaliere inesistente',
    'id': 'V008',
    'year': 1959,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'La giornata di uno scrutatore',
    'id': 'V009',
    'year': 1963,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'La speculazione edilizia',
    'id': 'V010',
    'year': 1963,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Marcovaldo',
    'id': 'V011',
    'year': 1963,
    'c': '#bbbbff',
    'has_metaball': true,
    'concavityTolerance': 1.1
  },
  {
    'n': 'La nuvola di smog e la formica argentina',
    'id': 'V012',
    'year': 1965,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Le cosmicomiche',
    'id': 'V013',
    'year': 1965,
    'c': '#97dadd',
    'has_metaball': true,
    'concavityTolerance': 1.1
  },
  {
    'n': 'Ti con zero',
    'id': 'V014',
    'year': 1967,
    'c': '#ff3366',
    'has_metaball': true,
    'concavityTolerance': 1.2
  },
  {
    'n': 'La memoria del mondo',
    'id': 'V015',
    'year': 1968,
    'c': '#FFA500',
    'has_metaball': true,
    'concavityTolerance': 1.1
  },
  {
    'n': 'Il castello dei destini incrociati',
    'id': 'V016',
    'year': 1969,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Gli amori difficili',
    'id': 'V017',
    'year': 1970,
    'c': '#ffd93b',
    'has_metaball': true,
    'concavityTolerance': 1.1
  },
  {
    'n': 'Le città invisibili',
    'id': 'V018',
    'year': 1972,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Il castello dei destini incrociati (riedizione)',
    'id': 'V019',
    'year': 1973,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Eremita a Parigi',
    'id': 'V020',
    'year': 1974,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Se una notte d\'inverno un viaggiatore',
    'id': 'V021',
    'year': 1979,
    'c': '#AEB6BF',
    'has_metaball': false
  },
  {
    'n': 'Palomar',
    'id': 'V022',
    'year': 1983,
    'c': '#ff6c39',
    'has_metaball': true,
    'concavityTolerance': 1.1
  },
  {
    'n': 'Cosmicomiche vecchie e nuove',
    'id': 'V023',
    'year': 1984,
    'c': '#00bfd3',
    'has_metaball': true,
    'concavityTolerance': 1.2
  }
];

const chapters_subdivision = [
  {
      "id opera": "V001",
      "numero sezione": "1",
      "titolo": "Capitolo 1",
      "start": "58",
      "end": "17217",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "2",
      "titolo": "Capitolo 2",
      "start": "17219",
      "end": "39839",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "3",
      "titolo": "Capitolo 3",
      "start": "39839",
      "end": "59419",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "4",
      "titolo": "Capitolo 4",
      "start": "59420",
      "end": "88126",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "5",
      "titolo": "Capitolo 5",
      "start": "88127",
      "end": "109237",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "6",
      "titolo": "Capitolo 6",
      "start": "109238",
      "end": "126676",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "7",
      "titolo": "Capitolo 7",
      "start": "126677",
      "end": "143168",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "8",
      "titolo": "Capitolo 8",
      "start": "143169",
      "end": "163539",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "9",
      "titolo": "Capitolo 9",
      "start": "163541",
      "end": "189243",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "10",
      "titolo": "Capitolo 10",
      "start": "189244",
      "end": "209838",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "11",
      "titolo": "Capitolo 11",
      "start": "209839",
      "end": "234202",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V001",
      "numero sezione": "12",
      "titolo": "Capitolo 12",
      "start": "234203",
      "end": "249888",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "1",
      "titolo": "Capitolo 1",
      "start": "22",
      "end": "8683",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "2",
      "titolo": "Capitolo 2",
      "start": "8684",
      "end": "15511",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "3",
      "titolo": "Capitolo 3",
      "start": "15512",
      "end": "23588",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "4",
      "titolo": "Capitolo 4",
      "start": "23589",
      "end": "30129",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "5",
      "titolo": "Capitolo 5",
      "start": "30130",
      "end": "66570",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "6",
      "titolo": "Capitolo 6",
      "start": "66571",
      "end": "78574",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "7",
      "titolo": "Capitolo 7",
      "start": "78575",
      "end": "100828",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "8",
      "titolo": "Capitolo 8",
      "start": "100829",
      "end": "114011",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "9",
      "titolo": "Capitolo 9",
      "start": "114012",
      "end": "123243",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V003",
      "numero sezione": "10",
      "titolo": "Capitolo 10",
      "start": "123244",
      "end": "138096",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "1",
      "titolo": "Capitolo 1",
      "start": "19",
      "end": "22161",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "2",
      "titolo": "Capitolo 2",
      "start": "22162",
      "end": "42001",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "3",
      "titolo": "Capitolo 3",
      "start": "42002",
      "end": "51583",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "4",
      "titolo": "Capitolo 4",
      "start": "51587",
      "end": "67504",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "5",
      "titolo": "Capitolo 5",
      "start": "67505",
      "end": "85377",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "6",
      "titolo": "Capitolo 6",
      "start": "85378",
      "end": "102333",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "7",
      "titolo": "Capitolo 7",
      "start": "102334",
      "end": "112095",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "8",
      "titolo": "Capitolo 8",
      "start": "112096",
      "end": "122561",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "9",
      "titolo": "Capitolo 9",
      "start": "122563",
      "end": "131256",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "10",
      "titolo": "Capitolo 10",
      "start": "131257",
      "end": "147956",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "11",
      "titolo": "Capitolo 11",
      "start": "147957",
      "end": "164799",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "12",
      "titolo": "Capitolo 12",
      "start": "164800",
      "end": "188373",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "13",
      "titolo": "Capitolo 13",
      "start": "188374",
      "end": "199324",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "14",
      "titolo": "Capitolo 14",
      "start": "199325",
      "end": "210530",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "15",
      "titolo": "Capitolo 15",
      "start": "210531",
      "end": "230740",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "16",
      "titolo": "Capitolo 16",
      "start": "230741",
      "end": "242435",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "17",
      "titolo": "Capitolo 17",
      "start": "242436",
      "end": "254890",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "18",
      "titolo": "Capitolo 18",
      "start": "254892",
      "end": "265553",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "19",
      "titolo": "Capitolo 19",
      "start": "265554",
      "end": "275321",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "20",
      "titolo": "Capitolo 20",
      "start": "275322",
      "end": "290408",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "21",
      "titolo": "Capitolo 21",
      "start": "290409",
      "end": "306573",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "22",
      "titolo": "Capitolo 22",
      "start": "306574",
      "end": "318279",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "23",
      "titolo": "Capitolo 23",
      "start": "318280",
      "end": "343118",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "24",
      "titolo": "Capitolo 24",
      "start": "343119",
      "end": "355118",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "25",
      "titolo": "Capitolo 25",
      "start": "355119",
      "end": "367839",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "26",
      "titolo": "Capitolo 26",
      "start": "367840",
      "end": "379739",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "27",
      "titolo": "Capitolo 27",
      "start": "379740",
      "end": "392064",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "28",
      "titolo": "Capitolo 28",
      "start": "392065",
      "end": "400026",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "29",
      "titolo": "Capitolo 29",
      "start": "400027",
      "end": "408312",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V005",
      "numero sezione": "30",
      "titolo": "Capitolo 30",
      "start": "408313",
      "end": "416806",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "1",
      "titolo": "Capitolo 1",
      "start": "25",
      "end": "8392",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "2",
      "titolo": "Capitolo 2",
      "start": "8395",
      "end": "29522",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "3",
      "titolo": "Capitolo 3",
      "start": "29525",
      "end": "43386",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "4",
      "titolo": "Capitolo 4",
      "start": "43387",
      "end": "67286",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "5",
      "titolo": "Capitolo 5",
      "start": "67287",
      "end": "84387",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "6",
      "titolo": "Capitolo 6",
      "start": "84390",
      "end": "98339",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "7",
      "titolo": "Capitolo 7",
      "start": "98341",
      "end": "122379",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "8",
      "titolo": "Capitolo 8",
      "start": "122380",
      "end": "146152",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "9",
      "titolo": "Capitolo 9",
      "start": "146154",
      "end": "160661",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "10",
      "titolo": "Capitolo 10",
      "start": "160662",
      "end": "178369",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "11",
      "titolo": "Capitolo 11",
      "start": "178370",
      "end": "194101",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V008",
      "numero sezione": "12",
      "titolo": "Capitolo 12",
      "start": "194102",
      "end": "197261",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "1",
      "titolo": "Nota dell'autore",
      "start": "30",
      "end": "577",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "2",
      "titolo": "Capitolo 1",
      "start": "579",
      "end": "3628",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "3",
      "titolo": "Capitolo 2",
      "start": "3630",
      "end": "11495",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "4",
      "titolo": "Capitolo 3",
      "start": "11497",
      "end": "25189",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "5",
      "titolo": "Capitolo 4",
      "start": "25191",
      "end": "29541",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "6",
      "titolo": "Capitolo 5",
      "start": "29543",
      "end": "38437",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "7",
      "titolo": "Capitolo 6",
      "start": "38440",
      "end": "46631",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "8",
      "titolo": "Capitolo 7",
      "start": "46633",
      "end": "50902",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "9",
      "titolo": "Capitolo 8",
      "start": "50904",
      "end": "57217",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "10",
      "titolo": "Capitolo 9",
      "start": "57219",
      "end": "63540",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "11",
      "titolo": "Capitolo 10",
      "start": "63542",
      "end": "70115",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "12",
      "titolo": "Capitolo 11",
      "start": "70117",
      "end": "90519",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "13",
      "titolo": "Capitolo 12",
      "start": "90520",
      "end": "107194",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "14",
      "titolo": "Capitolo 13",
      "start": "107195",
      "end": "114084",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "15",
      "titolo": "Capitolo 14",
      "start": "114085",
      "end": "116522",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V009",
      "numero sezione": "16",
      "titolo": "Capitolo 15",
      "start": "116523",
      "end": "121316",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "1",
      "titolo": "Capitolo 1",
      "start": "187",
      "end": "6594",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "2",
      "titolo": "Capitolo 2",
      "start": "6595",
      "end": "13894",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "3",
      "titolo": "Capitolo 3",
      "start": "13894",
      "end": "24515",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "4",
      "titolo": "Capitolo 4",
      "start": "24516",
      "end": "29487",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "5",
      "titolo": "Capitolo 5",
      "start": "29488",
      "end": "36490",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "6",
      "titolo": "Capitolo 6",
      "start": "36491",
      "end": "42232",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "7",
      "titolo": "Capitolo 7",
      "start": "42233",
      "end": "52372",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "8",
      "titolo": "Capitolo 8",
      "start": "52373",
      "end": "59164",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "9",
      "titolo": "Capitolo 9",
      "start": "59165",
      "end": "67243",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "10",
      "titolo": "Capitolo 10",
      "start": "67244",
      "end": "73508",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "11",
      "titolo": "Capitolo 11",
      "start": "73509",
      "end": "89970",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "12",
      "titolo": "Capitolo 12",
      "start": "89971",
      "end": "99446",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "13",
      "titolo": "Capitolo 13",
      "start": "99448",
      "end": "105127",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "14",
      "titolo": "Capitolo 14",
      "start": "105128",
      "end": "114153",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "15",
      "titolo": "Capitolo 15",
      "start": "114154",
      "end": "117921",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "16",
      "titolo": "Capitolo 16",
      "start": "117922",
      "end": "122973",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "17",
      "titolo": "Capitolo 17",
      "start": "122974",
      "end": "133771",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "18",
      "titolo": "Capitolo 18",
      "start": "133772",
      "end": "145476",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "19",
      "titolo": "Capitolo 19",
      "start": "145477",
      "end": "152612",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "20",
      "titolo": "Capitolo 20",
      "start": "152613",
      "end": "159591",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "21",
      "titolo": "Capitolo 21",
      "start": "159592",
      "end": "165953",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "22",
      "titolo": "Capitolo 22",
      "start": "165954",
      "end": "171897",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "23",
      "titolo": "Capitolo 23",
      "start": "171897",
      "end": "180178",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V010",
      "numero sezione": "24",
      "titolo": "Capitolo 24",
      "start": "180179",
      "end": "191036",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "1",
      "titolo": ".....",
      "start": "244",
      "end": "1833",
      "dettaglio_1": "1",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "2",
      "titolo": "Le città e la memoria. 1.",
      "start": "1835",
      "end": "2566",
      "dettaglio_1": "1",
      "dettaglio_2": "Diomira"
  },
  {
      "id opera": "V018",
      "numero sezione": "3",
      "titolo": "Le città e la memoria. 2.",
      "start": "2568",
      "end": "3333",
      "dettaglio_1": "1",
      "dettaglio_2": "Isidora"
  },
  {
      "id opera": "V018",
      "numero sezione": "4",
      "titolo": "Le città e il desiderio. 1",
      "start": "3335",
      "end": "4771",
      "dettaglio_1": "1",
      "dettaglio_2": "Dorotea"
  },
  {
      "id opera": "V018",
      "numero sezione": "5",
      "titolo": "Le città e la memoria. 3.",
      "start": "4772",
      "end": "6419",
      "dettaglio_1": "1",
      "dettaglio_2": "Zaira"
  },
  {
      "id opera": "V018",
      "numero sezione": "6",
      "titolo": "Le città e il desiderio. 2.",
      "start": "6421",
      "end": "7819",
      "dettaglio_1": "1",
      "dettaglio_2": "Anastasia"
  },
  {
      "id opera": "V018",
      "numero sezione": "7",
      "titolo": "Le città e i segni. 1.",
      "start": "7820",
      "end": "10217",
      "dettaglio_1": "1",
      "dettaglio_2": "Tamara"
  },
  {
      "id opera": "V018",
      "numero sezione": "8",
      "titolo": "Le città e la memoria. 4.",
      "start": "10219",
      "end": "11951",
      "dettaglio_1": "1",
      "dettaglio_2": "Zora"
  },
  {
      "id opera": "V018",
      "numero sezione": "9",
      "titolo": "Le città e il desiderio. 3.",
      "start": "11953",
      "end": "13543",
      "dettaglio_1": "1",
      "dettaglio_2": "Despina"
  },
  {
      "id opera": "V018",
      "numero sezione": "10",
      "titolo": "Le città e i segni. 2.",
      "start": "13545",
      "end": "14706",
      "dettaglio_1": "1",
      "dettaglio_2": "Zirma"
  },
  {
      "id opera": "V018",
      "numero sezione": "11",
      "titolo": "Le città sottili. 1.",
      "start": "14708",
      "end": "15976",
      "dettaglio_1": "1",
      "dettaglio_2": "Isaura"
  },
  {
      "id opera": "V018",
      "numero sezione": "12",
      "titolo": ".....",
      "start": "15978",
      "end": "19092",
      "dettaglio_1": "1",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "13",
      "titolo": ".....",
      "start": "19093",
      "end": "22980",
      "dettaglio_1": "2",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "14",
      "titolo": "Le città e la memoria. 5.",
      "start": "22983",
      "end": "24827",
      "dettaglio_1": "2",
      "dettaglio_2": "Maurilia"
  },
  {
      "id opera": "V018",
      "numero sezione": "15",
      "titolo": "Le città e il desiderio. 4.",
      "start": "24829",
      "end": "26328",
      "dettaglio_1": "2",
      "dettaglio_2": "Fedora"
  },
  {
      "id opera": "V018",
      "numero sezione": "16",
      "titolo": "Le città e i segni. 3",
      "start": "26330",
      "end": "27796",
      "dettaglio_1": "2",
      "dettaglio_2": "Zoe"
  },
  {
      "id opera": "V018",
      "numero sezione": "17",
      "titolo": "Le città sottili. 2.",
      "start": "27797",
      "end": "29277",
      "dettaglio_1": "2",
      "dettaglio_2": "Zenobia"
  },
  {
      "id opera": "V018",
      "numero sezione": "18",
      "titolo": "Le città e gli scambi. 1.",
      "start": "29279",
      "end": "30878",
      "dettaglio_1": "2",
      "dettaglio_2": "Eufemia"
  },
  {
      "id opera": "V018",
      "numero sezione": "19",
      "titolo": ".....",
      "start": "30881",
      "end": "33617",
      "dettaglio_1": "2",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "20",
      "titolo": ".....",
      "start": "33619",
      "end": "35819",
      "dettaglio_1": "3",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "21",
      "titolo": "Le città e il desiderio. 5.",
      "start": "35821",
      "end": "37408",
      "dettaglio_1": "3",
      "dettaglio_2": "Zobeide"
  },
  {
      "id opera": "V018",
      "numero sezione": "22",
      "titolo": "Le città e i segni. 4.",
      "start": "37410",
      "end": "39881",
      "dettaglio_1": "3",
      "dettaglio_2": "Ipazia"
  },
  {
      "id opera": "V018",
      "numero sezione": "23",
      "titolo": "Le città sottili. 3.",
      "start": "39883",
      "end": "41854",
      "dettaglio_1": "3",
      "dettaglio_2": "Armilla"
  },
  {
      "id opera": "V018",
      "numero sezione": "24",
      "titolo": "Le città e gli scambi. 2.",
      "start": "41856",
      "end": "43546",
      "dettaglio_1": "3",
      "dettaglio_2": "Cloe"
  },
  {
      "id opera": "V018",
      "numero sezione": "25",
      "titolo": "Le città e gli occhi. 1.",
      "start": "43548",
      "end": "45334",
      "dettaglio_1": "3",
      "dettaglio_2": "Valdrada"
  },
  {
      "id opera": "V018",
      "numero sezione": "26",
      "titolo": ".....",
      "start": "45337",
      "end": "46651",
      "dettaglio_1": "3",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "27",
      "titolo": ".....",
      "start": "46654",
      "end": "48960",
      "dettaglio_1": "4",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "28",
      "titolo": "Le città e i segni. 5.",
      "start": "48962",
      "end": "50896",
      "dettaglio_1": "4",
      "dettaglio_2": "Olivia"
  },
  {
      "id opera": "V018",
      "numero sezione": "29",
      "titolo": "Le città sottili. 4.",
      "start": "50897",
      "end": "52090",
      "dettaglio_1": "4",
      "dettaglio_2": "Sofronia"
  },
  {
      "id opera": "V018",
      "numero sezione": "30",
      "titolo": "Le città e gli scambi. 3.",
      "start": "52091",
      "end": "53831",
      "dettaglio_1": "4",
      "dettaglio_2": "Eutropia"
  },
  {
      "id opera": "V018",
      "numero sezione": "31",
      "titolo": "Le città e gli occhi. 2.",
      "start": "53833",
      "end": "54867",
      "dettaglio_1": "4",
      "dettaglio_2": "Zemrude"
  },
  {
      "id opera": "V018",
      "numero sezione": "32",
      "titolo": "Le città e il nome. 1.",
      "start": "54869",
      "end": "56743",
      "dettaglio_1": "4",
      "dettaglio_2": "Aglaura"
  },
  {
      "id opera": "V018",
      "numero sezione": "33",
      "titolo": ".....",
      "start": "56746",
      "end": "57918",
      "dettaglio_1": "4",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "34",
      "titolo": ".....",
      "start": "57921",
      "end": "60021",
      "dettaglio_1": "5",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "35",
      "titolo": "Le città sottili. 5.",
      "start": "60023",
      "end": "61033",
      "dettaglio_1": "5",
      "dettaglio_2": "Ottavia"
  },
  {
      "id opera": "V018",
      "numero sezione": "36",
      "titolo": "Le città e gli scambi. 4.",
      "start": "61035",
      "end": "62085",
      "dettaglio_1": "5",
      "dettaglio_2": "Ersilia"
  },
  {
      "id opera": "V018",
      "numero sezione": "37",
      "titolo": "Le città e gli occhi. 3.",
      "start": "62087",
      "end": "62993",
      "dettaglio_1": "5",
      "dettaglio_2": "Bauci"
  },
  {
      "id opera": "V018",
      "numero sezione": "38",
      "titolo": "Le città e il nome. 2.",
      "start": "62995",
      "end": "65608",
      "dettaglio_1": "5",
      "dettaglio_2": "Leandra"
  },
  {
      "id opera": "V018",
      "numero sezione": "39",
      "titolo": "Le città e i morti. 1.",
      "start": "65610",
      "end": "67755",
      "dettaglio_1": "5",
      "dettaglio_2": "Melania"
  },
  {
      "id opera": "V018",
      "numero sezione": "40",
      "titolo": ".....",
      "start": "67759",
      "end": "68156",
      "dettaglio_1": "5",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "41",
      "titolo": ".....",
      "start": "68160",
      "end": "70981",
      "dettaglio_1": "6",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "42",
      "titolo": "Le città e gli scambi. 5.",
      "start": "70983",
      "end": "73146",
      "dettaglio_1": "6",
      "dettaglio_2": "Smeraldina"
  },
  {
      "id opera": "V018",
      "numero sezione": "43",
      "titolo": "Le città e gli occhi. 4.",
      "start": "73148",
      "end": "75191",
      "dettaglio_1": "6",
      "dettaglio_2": "Fillide"
  },
  {
      "id opera": "V018",
      "numero sezione": "44",
      "titolo": "Le città e il nome. 3.",
      "start": "75194",
      "end": "76803",
      "dettaglio_1": "6",
      "dettaglio_2": "Pirra"
  },
  {
      "id opera": "V018",
      "numero sezione": "45",
      "titolo": "Le città e i morti. 2.",
      "start": "76804",
      "end": "79348",
      "dettaglio_1": "6",
      "dettaglio_2": "Adelma"
  },
  {
      "id opera": "V018",
      "numero sezione": "46",
      "titolo": "Le città e il cielo. 1.",
      "start": "79350",
      "end": "81651",
      "dettaglio_1": "6",
      "dettaglio_2": "Eudossia"
  },
  {
      "id opera": "V018",
      "numero sezione": "47",
      "titolo": ".....",
      "start": "81654",
      "end": "83620",
      "dettaglio_1": "6",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "48",
      "titolo": ".....",
      "start": "83622",
      "end": "85551",
      "dettaglio_1": "7",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "49",
      "titolo": "Le città e gli occhi. 5.",
      "start": "85552",
      "end": "86621",
      "dettaglio_1": "7",
      "dettaglio_2": "Moriana"
  },
  {
      "id opera": "V018",
      "numero sezione": "50",
      "titolo": "Le città e il nome. 4.",
      "start": "86622",
      "end": "90319",
      "dettaglio_1": "7",
      "dettaglio_2": "Clarice"
  },
  {
      "id opera": "V018",
      "numero sezione": "51",
      "titolo": "Le città e i morti. 3.",
      "start": "90321",
      "end": "92952",
      "dettaglio_1": "7",
      "dettaglio_2": "Eusapia"
  },
  {
      "id opera": "V018",
      "numero sezione": "52",
      "titolo": "Le città e il cielo. 2.",
      "start": "92954",
      "end": "95895",
      "dettaglio_1": "7",
      "dettaglio_2": "Bersabea"
  },
  {
      "id opera": "V018",
      "numero sezione": "53",
      "titolo": "Le città continue. 1.",
      "start": "95896",
      "end": "99381",
      "dettaglio_1": "7",
      "dettaglio_2": "Leonia"
  },
  {
      "id opera": "V018",
      "numero sezione": "54",
      "titolo": ".....",
      "start": "99383",
      "end": "100654",
      "dettaglio_1": "7",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "55",
      "titolo": ".....",
      "start": "100656",
      "end": "104520",
      "dettaglio_1": "8",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "56",
      "titolo": "Le città e il nome. 5.",
      "start": "104523",
      "end": "106349",
      "dettaglio_1": "8",
      "dettaglio_2": "Irene"
  },
  {
      "id opera": "V018",
      "numero sezione": "57",
      "titolo": "Le città e i morti. 4.",
      "start": "106351",
      "end": "107114",
      "dettaglio_1": "8",
      "dettaglio_2": "Argia"
  },
  {
      "id opera": "V018",
      "numero sezione": "58",
      "titolo": "Le città e il cielo. 3.",
      "start": "107116",
      "end": "108338",
      "dettaglio_1": "8",
      "dettaglio_2": "Tecla"
  },
  {
      "id opera": "V018",
      "numero sezione": "59",
      "titolo": "Le città continue. 2.",
      "start": "108340",
      "end": "109392",
      "dettaglio_1": "8",
      "dettaglio_2": "Trude"
  },
  {
      "id opera": "V018",
      "numero sezione": "60",
      "titolo": "Le città nascoste. 1.",
      "start": "109394",
      "end": "111103",
      "dettaglio_1": "8",
      "dettaglio_2": "Olinda"
  },
  {
      "id opera": "V018",
      "numero sezione": "61",
      "titolo": ".....",
      "start": "111106",
      "end": "112798",
      "dettaglio_1": "8",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "62",
      "titolo": ".....",
      "start": "112800",
      "end": "119197",
      "dettaglio_1": "9",
      "dettaglio_2": ""
  },
  {
      "id opera": "V018",
      "numero sezione": "63",
      "titolo": "Le città e i morti. 5.",
      "start": "119199",
      "end": "123404",
      "dettaglio_1": "9",
      "dettaglio_2": "Laudomia"
  },
  {
      "id opera": "V018",
      "numero sezione": "64",
      "titolo": "Le città e il cielo. 4.",
      "start": "123406",
      "end": "124937",
      "dettaglio_1": "9",
      "dettaglio_2": "Perinzia"
  },
  {
      "id opera": "V018",
      "numero sezione": "65",
      "titolo": "Le città continue. 3.",
      "start": "124938",
      "end": "127570",
      "dettaglio_1": "9",
      "dettaglio_2": "Procopia"
  },
  {
      "id opera": "V018",
      "numero sezione": "66",
      "titolo": "Le città nascoste. 2.",
      "start": "127571",
      "end": "129408",
      "dettaglio_1": "9",
      "dettaglio_2": "Raissa"
  },
  {
      "id opera": "V018",
      "numero sezione": "67",
      "titolo": "Le città e il cielo. 5.",
      "start": "129410",
      "end": "131796",
      "dettaglio_1": "9",
      "dettaglio_2": "Andria"
  },
  {
      "id opera": "V018",
      "numero sezione": "68",
      "titolo": "Le città continue. 4.",
      "start": "131798",
      "end": "134100",
      "dettaglio_1": "9",
      "dettaglio_2": "Cecilia"
  },
  {
      "id opera": "V018",
      "numero sezione": "69",
      "titolo": "Le città nascoste. 3.",
      "start": "134102",
      "end": "136572",
      "dettaglio_1": "9",
      "dettaglio_2": "Sibilla"
  },
  {
      "id opera": "V018",
      "numero sezione": "70",
      "titolo": "Le città continue. 5.",
      "start": "136574",
      "end": "139346",
      "dettaglio_1": "9",
      "dettaglio_2": "Pentesilea"
  },
  {
      "id opera": "V018",
      "numero sezione": "71",
      "titolo": "Le città nascoste. 4.",
      "start": "139347",
      "end": "141609",
      "dettaglio_1": "9",
      "dettaglio_2": "Teodora"
  },
  {
      "id opera": "V018",
      "numero sezione": "72",
      "titolo": "Le città nascoste. 5.",
      "start": "141611",
      "end": "144789",
      "dettaglio_1": "9",
      "dettaglio_2": "Berenice"
  },
  {
      "id opera": "V018",
      "numero sezione": "73",
      "titolo": ".....",
      "start": "144793",
      "end": "146738",
      "dettaglio_1": "9",
      "dettaglio_2": ""
  },
  {
      "id opera": "S152",
      "numero sezione": "1",
      "titolo": "La taverna",
      "start": "35",
      "end": "3266",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S152",
      "numero sezione": "2",
      "titolo": "Storia dell'indeciso",
      "start": "3268",
      "end": "17399",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S152",
      "numero sezione": "3",
      "titolo": "Storia della foresta che si vendica",
      "start": "17401",
      "end": "25054",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S152",
      "numero sezione": "4",
      "titolo": "Storia del guerriero sopravvissuto",
      "start": "25056",
      "end": "35910",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S152",
      "numero sezione": "5",
      "titolo": "Storia del regno dei vampiri",
      "start": "35912",
      "end": "51538",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S152",
      "numero sezione": "6",
      "titolo": "Due storie in cui si cerca e ci si perde",
      "start": "51540",
      "end": "65327",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S152",
      "numero sezione": "7",
      "titolo": "Anch'io cerco di dire la mia",
      "start": "65329",
      "end": "86272",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S152",
      "numero sezione": "8",
      "titolo": "Tre storie di follia e distruzione",
      "start": "86274",
      "end": "98778",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V016",
      "numero sezione": "1",
      "titolo": "Il castello",
      "start": "36",
      "end": "5691",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V016",
      "numero sezione": "2",
      "titolo": "Storia dell'ingrato punito",
      "start": "5693",
      "end": "16848",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V016",
      "numero sezione": "3",
      "titolo": "Storia dell'alchimista che vendette l'anima",
      "start": "16850",
      "end": "25273",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V016",
      "numero sezione": "4",
      "titolo": "Storia della sposa dannata",
      "start": "25275",
      "end": "30351",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V016",
      "numero sezione": "5",
      "titolo": "Storia d'un ladro di sepolcri",
      "start": "30353",
      "end": "34495",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V016",
      "numero sezione": "6",
      "titolo": "Storia del'Orlando pazzo per amore",
      "start": "34498",
      "end": "43172",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V016",
      "numero sezione": "7",
      "titolo": "Storia di Astolfo sulla Luna",
      "start": "43174",
      "end": "49992",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V016",
      "numero sezione": "8",
      "titolo": "Tutte le altre storie",
      "start": "49994",
      "end": "62895",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "1",
      "titolo": "Capitolo 1",
      "start": "61",
      "end": "12670",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "2",
      "titolo": "Se una notte d'inverno un viaggiatore",
      "start": "12671",
      "end": "38811",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "3",
      "titolo": "Capitolo 2",
      "start": "38813",
      "end": "53532",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "4",
      "titolo": "Fuori dell’abitato di Malbork",
      "start": "53534",
      "end": "67182",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "5",
      "titolo": "Capitolo 3",
      "start": "67184",
      "end": "87717",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "6",
      "titolo": "Sporgendosi dalla costa scoscesa",
      "start": "87719",
      "end": "113488",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "7",
      "titolo": "Capitolo 4",
      "start": "113490",
      "end": "129030",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "8",
      "titolo": "Senza temere il vento e la vertigine",
      "start": "129032",
      "end": "153401",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "9",
      "titolo": "Capitolo 5",
      "start": "153402",
      "end": "174436",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "10",
      "titolo": "Guarda in basso dove l’ombra s’addensa",
      "start": "174438",
      "end": "197460",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "11",
      "titolo": "Capitolo 6",
      "start": "197462",
      "end": "229994",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "12",
      "titolo": "In una rete di linee che s’allacciano",
      "start": "229996",
      "end": "243593",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "13",
      "titolo": "Capitolo 7",
      "start": "243595",
      "end": "280423",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "14",
      "titolo": "In una rete di linee che s’intersecano",
      "start": "280425",
      "end": "295346",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "15",
      "titolo": "Capitolo 8 - Diario di Silas Flannery",
      "start": "295348",
      "end": "349087",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "16",
      "titolo": "Sul tappeto di foglie illuminate dalla luna",
      "start": "349089",
      "end": "370639",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "17",
      "titolo": "Capitolo 9",
      "start": "370641",
      "end": "390057",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "18",
      "titolo": "Intorno a una fossa vuota",
      "start": "390059",
      "end": "412011",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "19",
      "titolo": "Capitolo 10",
      "start": "412013",
      "end": "430366",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "20",
      "titolo": "Quale storia laggiù attende la fine?",
      "start": "430368",
      "end": "445839",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "21",
      "titolo": "Capitolo 11",
      "start": "445841",
      "end": "457982",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "V021",
      "numero sezione": "22",
      "titolo": "Capitolo 12",
      "start": "457984",
      "end": "458334",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "1",
      "titolo": "",
      "start": "19",
      "end": "10134",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "2",
      "titolo": "",
      "start": "10137",
      "end": "17505",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "3",
      "titolo": "",
      "start": "17507",
      "end": "21398",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "4",
      "titolo": "",
      "start": "21399",
      "end": "24071",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "5",
      "titolo": "",
      "start": "24072",
      "end": "34137",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "6",
      "titolo": "",
      "start": "34139",
      "end": "38795",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "7",
      "titolo": "",
      "start": "38797",
      "end": "44355",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "8",
      "titolo": "",
      "start": "44356",
      "end": "49954",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "9",
      "titolo": "",
      "start": "49955",
      "end": "53411",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "10",
      "titolo": "",
      "start": "53412",
      "end": "59107",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "11",
      "titolo": "",
      "start": "59108",
      "end": "62894",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "12",
      "titolo": "",
      "start": "62895",
      "end": "67401",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "13",
      "titolo": "",
      "start": "67402",
      "end": "71336",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "14",
      "titolo": "",
      "start": "71338",
      "end": "78539",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "15",
      "titolo": "",
      "start": "78540",
      "end": "81013",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "16",
      "titolo": "",
      "start": "81015",
      "end": "84586",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "17",
      "titolo": "",
      "start": "84587",
      "end": "89233",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "18",
      "titolo": "",
      "start": "89234",
      "end": "94833",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S095",
      "numero sezione": "19",
      "titolo": "",
      "start": "94835",
      "end": "101390",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S132",
      "numero sezione": "1",
      "titolo": "prologo scientifico",
      "start": "11",
      "end": "451",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S132",
      "numero sezione": "2",
      "titolo": "1",
      "start": "452",
      "end": "14779",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S132",
      "numero sezione": "3",
      "titolo": "2",
      "start": "14782",
      "end": "19629",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S132",
      "numero sezione": "4",
      "titolo": "3",
      "start": "19630",
      "end": "27755",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "1",
      "titolo": "1",
      "start": "24",
      "end": "3078",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "2",
      "titolo": "2",
      "start": "3080",
      "end": "5947",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "3",
      "titolo": "3",
      "start": "5948",
      "end": "8208",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "4",
      "titolo": "4",
      "start": "8211",
      "end": "11084",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "5",
      "titolo": "5",
      "start": "11085",
      "end": "13046",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "6",
      "titolo": "6",
      "start": "13047",
      "end": "14870",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "7",
      "titolo": "7",
      "start": "14871",
      "end": "17042",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "8",
      "titolo": "8",
      "start": "17043",
      "end": "21575",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S144",
      "numero sezione": "9",
      "titolo": "9",
      "start": "21576",
      "end": "22375",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "1",
      "titolo": "",
      "start": "17",
      "end": "526",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "2",
      "titolo": "",
      "start": "528",
      "end": "1312",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "3",
      "titolo": "",
      "start": "1313",
      "end": "1643",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "4",
      "titolo": "",
      "start": "1645",
      "end": "2236",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "5",
      "titolo": "",
      "start": "2238",
      "end": "2998",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "6",
      "titolo": "",
      "start": "3000",
      "end": "4031",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "7",
      "titolo": "",
      "start": "4033",
      "end": "4976",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "8",
      "titolo": "",
      "start": "4978",
      "end": "5397",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "9",
      "titolo": "",
      "start": "5399",
      "end": "5915",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "10",
      "titolo": "",
      "start": "5917",
      "end": "6359",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "11",
      "titolo": "",
      "start": "6361",
      "end": "6585",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "12",
      "titolo": "",
      "start": "6587",
      "end": "6877",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "13",
      "titolo": "",
      "start": "6879",
      "end": "7468",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "14",
      "titolo": "",
      "start": "7470",
      "end": "8027",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "15",
      "titolo": "",
      "start": "8029",
      "end": "8515",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "16",
      "titolo": "",
      "start": "8517",
      "end": "8854",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "17",
      "titolo": "",
      "start": "8856",
      "end": "9263",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "18",
      "titolo": "",
      "start": "9265",
      "end": "9639",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "19",
      "titolo": "",
      "start": "9641",
      "end": "10026",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "20",
      "titolo": "",
      "start": "10028",
      "end": "10676",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "21",
      "titolo": "",
      "start": "10678",
      "end": "10960",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "22",
      "titolo": "",
      "start": "10962",
      "end": "11579",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "23",
      "titolo": "",
      "start": "11581",
      "end": "12132",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "24",
      "titolo": "",
      "start": "12134",
      "end": "12685",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "25",
      "titolo": "",
      "start": "12687",
      "end": "13151",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "26",
      "titolo": "",
      "start": "13153",
      "end": "14356",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "27",
      "titolo": "",
      "start": "14358",
      "end": "15729",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "28",
      "titolo": "",
      "start": "15731",
      "end": "16437",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "29",
      "titolo": "",
      "start": "16439",
      "end": "16961",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "30",
      "titolo": "",
      "start": "16963",
      "end": "17367",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "31",
      "titolo": "",
      "start": "17369",
      "end": "17699",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "32",
      "titolo": "",
      "start": "17701",
      "end": "18315",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "33",
      "titolo": "",
      "start": "18317",
      "end": "19007",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "34",
      "titolo": "",
      "start": "19009",
      "end": "19485",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "35",
      "titolo": "",
      "start": "19487",
      "end": "19707",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "36",
      "titolo": "",
      "start": "19709",
      "end": "20325",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "37",
      "titolo": "",
      "start": "20327",
      "end": "20751",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "38",
      "titolo": "",
      "start": "20753",
      "end": "21134",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "39",
      "titolo": "",
      "start": "21136",
      "end": "21692",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S150",
      "numero sezione": "40",
      "titolo": "",
      "start": "21997",
      "end": "22004",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "1",
      "titolo": "",
      "start": "23",
      "end": "1232",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "2",
      "titolo": "",
      "start": "1234",
      "end": "6629",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "3",
      "titolo": "",
      "start": "6630",
      "end": "8764",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "4",
      "titolo": "",
      "start": "8766",
      "end": "15109",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "5",
      "titolo": "",
      "start": "15110",
      "end": "18321",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "6",
      "titolo": "",
      "start": "18322",
      "end": "20702",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "7",
      "titolo": "",
      "start": "20704",
      "end": "21262",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "8",
      "titolo": "",
      "start": "21264",
      "end": "23155",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "9",
      "titolo": "",
      "start": "23156",
      "end": "23820",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S151",
      "numero sezione": "10",
      "titolo": "",
      "start": "23822",
      "end": "25010",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S181",
      "numero sezione": "1",
      "titolo": "1",
      "start": "25",
      "end": "5138",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S181",
      "numero sezione": "2",
      "titolo": "2",
      "start": "5139",
      "end": "7820",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S181",
      "numero sezione": "3",
      "titolo": "3",
      "start": "7821",
      "end": "10502",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S181",
      "numero sezione": "4",
      "titolo": "4",
      "start": "10503",
      "end": "13456",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S181",
      "numero sezione": "5",
      "titolo": "5",
      "start": "13457",
      "end": "18849",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "1",
      "titolo": "",
      "start": "23",
      "end": "5039",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "2",
      "titolo": "",
      "start": "5041",
      "end": "8066",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "3",
      "titolo": "",
      "start": "8067",
      "end": "10658",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "4",
      "titolo": "",
      "start": "10659",
      "end": "13555",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "5",
      "titolo": "",
      "start": "13556",
      "end": "15204",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "6",
      "titolo": "",
      "start": "15206",
      "end": "18241",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "7",
      "titolo": "",
      "start": "18243",
      "end": "19410",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "8",
      "titolo": "",
      "start": "19412",
      "end": "23154",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "9",
      "titolo": "",
      "start": "23156",
      "end": "25234",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "10",
      "titolo": "",
      "start": "25236",
      "end": "29066",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "11",
      "titolo": "",
      "start": "29068",
      "end": "30695",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "12",
      "titolo": "",
      "start": "30697",
      "end": "32425",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "13",
      "titolo": "",
      "start": "32427",
      "end": "35217",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "14",
      "titolo": "",
      "start": "35217",
      "end": "38624",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "15",
      "titolo": "",
      "start": "38626",
      "end": "41668",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "16",
      "titolo": "",
      "start": "41669",
      "end": "45752",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S204",
      "numero sezione": "17",
      "titolo": "",
      "start": "45754",
      "end": "46528",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S149",
      "numero sezione": "1",
      "titolo": "1",
      "start": "29",
      "end": "7947",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S149",
      "numero sezione": "2",
      "titolo": "2",
      "start": "7949",
      "end": "11304",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S149",
      "numero sezione": "3",
      "titolo": "3",
      "start": "11305",
      "end": "22359",
      "dettaglio_1": "",
      "dettaglio_2": ""
  },
  {
      "id opera": "S149",
      "numero sezione": "4",
      "titolo": "4",
      "start": "22360",
      "end": "25519",
      "dettaglio_1": "",
      "dettaglio_2": ""
  }
]

const allowedCollections = "all"; // all : all collections; undefined for texts with undefined collection; V002,V014 (no spaces) for setting some collection ids for filtering (you can also put undefined in this list)

const territoryColorPalette = {
  brightBlue     : "#5151FC",     dimBlue : "#C5C5FC",
  brightAmaranth : "#FF3366", dimAmaranth : "#FCD0DB",
  brightCyan     : "#00C19C",     dimCyan : "#C2FAEF",
  brightGold     : "#FFA500",     dimGold : "#FDDDA1",
  brightViolet   : "#BBBBFF",   dimViolet : "#E2E2FD",
  brightOrange   : "#FF6C39",   dimOrange : "#FFCDBC",
  grey           : "#C6CACF",
  lightComfit    : "#F8F8FF",
  green          : "#8AE297",
  yellow         : "#FFD93B",
  turquoise      : "#00BFD3",
  paleTurquoise  : "#97DADD"
};

const publications = [
    {
      "id": "S001",
      "destination": "«Roma fascista»",
      "type": "altro",
      "year": "1943",
      "month": "04",
      "day": "29",
      "firstPublication": "TRUE"
    },
    {
      "id": "S002",
      "destination": "«Roma fascista»",
      "type": "altro",
      "year": "1943",
      "month": "04",
      "day": "29",
      "firstPublication": "TRUE"
    },
    {
      "id": "S003",
      "destination": "«Roma fascista»",
      "type": "altro",
      "year": "1943",
      "month": "04",
      "day": "29",
      "firstPublication": "TRUE"
    },
    {
      "id": "S004",
      "destination": "«Aretusa»",
      "type": "altro",
      "year": "1945",
      "month": "12",
      "day": "16",
      "firstPublication": "TRUE"
    },
    {
      "id": "S005",
      "destination": "«Politecnico»",
      "type": "altro",
      "year": "1946",
      "month": "01",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S006",
      "destination": "«L'Unità» (Milano)",
      "type": "altro",
      "year": "1946",
      "month": "04",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S007",
      "destination": "«Darsena nuova»",
      "type": "altro",
      "year": "1946",
      "month": "06",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S008",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1946",
      "month": "06",
      "day": "09",
      "firstPublication": "TRUE"
    },
    {
      "id": "S009",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1946",
      "month": "06",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S010",
      "destination": "«L'Unità» (Genova)",
      "type": "altro",
      "year": "1946",
      "month": "08",
      "day": "18",
      "firstPublication": "TRUE"
    },
    {
      "id": "S011",
      "destination": "«L'Unità» (Milano)",
      "type": "altro",
      "year": "1946",
      "month": "09",
      "day": "22",
      "firstPublication": "TRUE"
    },
    {
      "id": "S012",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1946",
      "month": "09",
      "day": "29",
      "firstPublication": "TRUE"
    },
    {
      "id": "S013",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1946",
      "month": "11",
      "day": "07",
      "firstPublication": "TRUE"
    },
    {
      "id": "S014",
      "destination": "«Agorà»",
      "type": "altro",
      "year": "1947",
      "month": "01",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S016",
      "destination": "«L'Unità» (Milano)",
      "type": "altro",
      "year": "1947",
      "month": "01",
      "day": "05",
      "firstPublication": "TRUE"
    },
    {
      "id": "S017",
      "destination": "«L'Unità» (Milano)",
      "type": "altro",
      "year": "1947",
      "month": "01",
      "day": "08",
      "firstPublication": "TRUE"
    },
    {
      "id": "S018",
      "destination": "«L'Unità» (Genova)",
      "type": "altro",
      "year": "1947",
      "month": "03",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S019",
      "destination": "«Il Settimanale»",
      "type": "altro",
      "year": "1947",
      "month": "05",
      "day": "03",
      "firstPublication": "TRUE"
    },
    {
      "id": "S020",
      "destination": "«L'Unità» (Genova)",
      "type": "altro",
      "year": "1947",
      "month": "05",
      "day": "18",
      "firstPublication": "TRUE"
    },
    {
      "id": "S021",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1947",
      "month": "06",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S015",
      "destination": "«Graal. Rivista d’arte e pensiero»",
      "type": "altro",
      "year": "1947",
      "month": "07",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S022",
      "destination": "«L'Unità» (Genova)",
      "type": "altro",
      "year": "1947",
      "month": "07",
      "day": "06",
      "firstPublication": "TRUE"
    },
    {
      "id": "V001",
      "destination": "V001",
      "type": "romanzo",
      "year": "1947",
      "month": "10",
      "day": "10",
      "firstPublication": "TRUE"
    },
    {
      "id": "S023",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "01",
      "day": "08",
      "firstPublication": "TRUE"
    },
    {
      "id": "S024",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "02",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S025",
      "destination": "«Rinascita»",
      "type": "altro",
      "year": "1948",
      "month": "02",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S026",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "04",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S027",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "06",
      "day": "11",
      "firstPublication": "TRUE"
    },
    {
      "id": "S028",
      "destination": "«Milano-sera»",
      "type": "altro",
      "year": "1948",
      "month": "06",
      "day": "22",
      "firstPublication": "TRUE"
    },
    {
      "id": "S029",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "08",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S030",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "09",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S031",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "10",
      "day": "16",
      "firstPublication": "TRUE"
    },
    {
      "id": "S032",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "10",
      "day": "31",
      "firstPublication": "TRUE"
    },
    {
      "id": "S033",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1948",
      "month": "11",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S034",
      "destination": "Antologia Einaudi 1948",
      "type": "altro",
      "year": "1948",
      "month": "12",
      "day": "22",
      "firstPublication": "TRUE"
    },
    {
      "id": "S035",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1949",
      "month": "01",
      "day": "08",
      "firstPublication": "TRUE"
    },
    {
      "id": "S036",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1949",
      "month": "04",
      "day": "02",
      "firstPublication": "TRUE"
    },
    {
      "id": "S004",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S005",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S006",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S007",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S009",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S010",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S011",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S014",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S016",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S017",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S018",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S020",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S021",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S022",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S023",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S024",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S025",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S026",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S027",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S029",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S030",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S033",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S034",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S067",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "FALSO"
    },
    {
      "id": "S037",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S038",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S039",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S040",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S041",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S042",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S043",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "V002",
      "destination": "V002",
      "type": "raccolta",
      "year": "1949",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S044",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1950",
      "month": "04",
      "day": "07",
      "firstPublication": "TRUE"
    },
    {
      "id": "S045",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1950",
      "month": "08",
      "day": "17",
      "firstPublication": "TRUE"
    },
    {
      "id": "S046",
      "destination": "«Inventario»",
      "type": "altro",
      "year": "1950",
      "month": "09",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S047",
      "destination": "«Rinascita»",
      "type": "altro",
      "year": "1950",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S048",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1950",
      "month": "11",
      "day": "09",
      "firstPublication": "TRUE"
    },
    {
      "id": "S049",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1951",
      "month": "07",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S050",
      "destination": "«Paragone-letteratura»",
      "type": "altro",
      "year": "1951",
      "month": "08",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "V003",
      "destination": "V003",
      "type": "ibrido",
      "year": "1952",
      "month": "02",
      "day": "12",
      "firstPublication": "TRUE"
    },
    {
      "id": "S051",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1952",
      "month": "06",
      "day": "08",
      "firstPublication": "TRUE"
    },
    {
      "id": "S052",
      "destination": "«L'Unità»",
      "type": "altro",
      "year": "1952",
      "month": "06",
      "day": "29",
      "firstPublication": "TRUE"
    },
    {
      "id": "S053",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1952",
      "month": "09",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S054",
      "destination": "«Botteghe Oscure»",
      "type": "altro",
      "year": "1952",
      "month": "10",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S055",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1952",
      "month": "10",
      "day": "12",
      "firstPublication": "TRUE"
    },
    {
      "id": "S056",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1952",
      "month": "10",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S057",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1952",
      "month": "11",
      "day": "02",
      "firstPublication": "TRUE"
    },
    {
      "id": "S058",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1952",
      "month": "12",
      "day": "09",
      "firstPublication": "TRUE"
    },
    {
      "id": "S059",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1952",
      "month": "12",
      "day": "14",
      "firstPublication": "TRUE"
    },
    {
      "id": "S060",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1953",
      "month": "01",
      "day": "14",
      "firstPublication": "TRUE"
    },
    {
      "id": "S061",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1953",
      "month": "02",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S062",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1953",
      "month": "02",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S063",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1953",
      "month": "04",
      "day": "02",
      "firstPublication": "TRUE"
    },
    {
      "id": "S064",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1953",
      "month": "04",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S065",
      "destination": "«Nuovi Argomenti»",
      "type": "altro",
      "year": "1953",
      "month": "05",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S066",
      "destination": "«L'Unità» (Torino)",
      "type": "altro",
      "year": "1953",
      "month": "07",
      "day": "05",
      "firstPublication": "TRUE"
    },
    {
      "id": "S067",
      "destination": "«Il Ponte»",
      "type": "altro",
      "year": "1953",
      "month": "08",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S068",
      "destination": "«Paragone-letteratura»",
      "type": "altro",
      "year": "1953",
      "month": "08",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S069",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1953",
      "month": "10",
      "day": "14",
      "firstPublication": "TRUE"
    },
    {
      "id": "S070",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1953",
      "month": "10",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S071",
      "destination": "«Unità» (Torino)",
      "type": "altro",
      "year": "1954",
      "month": "02",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S072",
      "destination": "V004",
      "type": "raccolta",
      "year": "1954",
      "month": "05",
      "day": "25",
      "firstPublication": "TRUE"
    },
    {
      "id": "V004",
      "destination": "V004",
      "type": "raccolta",
      "year": "1954",
      "month": "05",
      "day": "25",
      "firstPublication": "TRUE"
    },
    {
      "id": "S065",
      "destination": "V004",
      "type": "raccolta",
      "year": "1954",
      "month": "05",
      "day": "25",
      "firstPublication": "FALSO"
    },
    {
      "id": "S067",
      "destination": "V004",
      "type": "raccolta",
      "year": "1954",
      "month": "05",
      "day": "25",
      "firstPublication": "FALSO"
    },
    {
      "id": "S073",
      "destination": "«Incontri oggi»",
      "type": "altro",
      "year": "1954",
      "month": "06",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S074",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "08",
      "day": "07",
      "firstPublication": "TRUE"
    },
    {
      "id": "S075",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "08",
      "day": "21",
      "firstPublication": "TRUE"
    },
    {
      "id": "S076",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "08",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S077",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "09",
      "day": "04",
      "firstPublication": "TRUE"
    },
    {
      "id": "S078",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "09",
      "day": "11",
      "firstPublication": "TRUE"
    },
    {
      "id": "S079",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "09",
      "day": "25",
      "firstPublication": "TRUE"
    },
    {
      "id": "S080",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "10",
      "day": "09",
      "firstPublication": "TRUE"
    },
    {
      "id": "S081",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "10",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S082",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "12",
      "day": "11",
      "firstPublication": "TRUE"
    },
    {
      "id": "S083",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1954",
      "month": "12",
      "day": "25",
      "firstPublication": "TRUE"
    },
    {
      "id": "S084",
      "destination": "«Il contemporaneo»",
      "type": "altro",
      "year": "1955",
      "month": "04",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S085",
      "destination": "«Il Caffè»",
      "type": "altro",
      "year": "1956",
      "month": "01",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S086",
      "destination": "«Corriere d'informazione»",
      "type": "altro",
      "year": "1957",
      "month": "05",
      "day": "04",
      "firstPublication": "TRUE"
    },
    {
      "id": "V005",
      "destination": "V005",
      "type": "romanzo",
      "year": "1957",
      "month": "06",
      "day": "04",
      "firstPublication": "TRUE"
    },
    {
      "id": "S087",
      "destination": "«Città aperta»",
      "type": "altro",
      "year": "1957",
      "month": "07",
      "day": "25",
      "firstPublication": "TRUE"
    },
    {
      "id": "S088",
      "destination": "«Botteghe Oscure»",
      "type": "altro",
      "year": "1957",
      "month": "09",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S089",
      "destination": "«Città aperta»",
      "type": "altro",
      "year": "1958",
      "month": "03",
      "day": "06",
      "firstPublication": "TRUE"
    },
    {
      "id": "S090",
      "destination": "«L'Espresso»",
      "type": "altro",
      "year": "1958",
      "month": "05",
      "day": "25",
      "firstPublication": "TRUE"
    },
    {
      "id": "S091",
      "destination": "«Città aperta»",
      "type": "altro",
      "year": "1958",
      "month": "06",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S092",
      "destination": "«Nuova Corrente»",
      "type": "altro",
      "year": "1958",
      "month": "07",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S093",
      "destination": "«Il Mondo»",
      "type": "altro",
      "year": "1958",
      "month": "07",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S094",
      "destination": "«Tempo presente»",
      "type": "altro",
      "year": "1958",
      "month": "08",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S095",
      "destination": "«Nuovi Argomenti»",
      "type": "altro",
      "year": "1958",
      "month": "09",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S096",
      "destination": "«Il Caffè»",
      "type": "altro",
      "year": "1958",
      "month": "09",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S097",
      "destination": "«Il Verri»",
      "type": "altro",
      "year": "1958",
      "month": "10",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S005",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S007",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S009",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S010",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S011",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S016",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S018",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S021",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S022",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S023",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S024",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S026",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S027",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S029",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S030",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S034",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S037",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S041",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S042",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S046",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S048",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S050",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S052",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S053",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S054",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S055",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S056",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S061",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S062",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S064",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S065",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S066",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S068",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S072",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S083",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S085",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S086",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S088",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S092",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S093",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S094",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S095",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S096",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S097",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S098",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S099",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S100",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S101",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S102",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S103",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S104",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "V006",
      "destination": "V006",
      "type": "raccolta",
      "year": "1958",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S054",
      "destination": "V007",
      "type": "ibrido",
      "year": "1958",
      "month": "",
      "day": "",
      "firstPublication": "FALSO"
    },
    {
      "id": "V007",
      "destination": "V007",
      "type": "ibrido",
      "year": "1958",
      "month": "",
      "day": "",
      "firstPublication": "TRUE"
    },
    {
      "id": "S105",
      "destination": "«Successo»",
      "type": "altro",
      "year": "1959",
      "month": "05",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "V008",
      "destination": "V008",
      "type": "romanzo",
      "year": "1959",
      "month": "11",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S106",
      "destination": "«Questo e altro», n.1",
      "type": "altro",
      "year": "1962",
      "month": "01",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "V009",
      "destination": "V009",
      "type": "ibrido",
      "year": "1963",
      "month": "02",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S107",
      "destination": "«L'Europa letteraria»",
      "type": "altro",
      "year": "1963",
      "month": "04",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S088",
      "destination": "V010",
      "type": "ibrido",
      "year": "1963",
      "month": "06",
      "day": "28",
      "firstPublication": "FALSO"
    },
    {
      "id": "V010",
      "destination": "V010",
      "type": "ibrido",
      "year": "1963",
      "month": "06",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S108",
      "destination": "«Il Corriere dei Piccoli»",
      "type": "altro",
      "year": "1963",
      "month": "10",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S109",
      "destination": "«Il Corriere dei Piccoli»",
      "type": "altro",
      "year": "1963",
      "month": "10",
      "day": "27",
      "firstPublication": "TRUE"
    },
    {
      "id": "S110",
      "destination": "«Il Corriere dei Piccoli»",
      "type": "altro",
      "year": "1963",
      "month": "11",
      "day": "03",
      "firstPublication": "TRUE"
    },
    {
      "id": "S111",
      "destination": "«Il Corriere dei Piccoli»",
      "type": "altro",
      "year": "1963",
      "month": "11",
      "day": "10",
      "firstPublication": "TRUE"
    },
    {
      "id": "S053",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S055",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S056",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S061",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S062",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S066",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S083",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S085",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S086",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S098",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S108",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S109",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S110",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S111",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "FALSO"
    },
    {
      "id": "S112",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S113",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S114",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S115",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S116",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S117",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "V011",
      "destination": "V011",
      "type": "raccolta",
      "year": "1963",
      "month": "11",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S118",
      "destination": "«Il Caffè politico e letterario»",
      "type": "altro",
      "year": "1964",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S119",
      "destination": "«Il Caffè politico e letterario»",
      "type": "altro",
      "year": "1964",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S120",
      "destination": "«Il Caffè politico e letterario»",
      "type": "altro",
      "year": "1964",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S121",
      "destination": "«Il Caffè politico e letterario»",
      "type": "altro",
      "year": "1964",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S122",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1965",
      "month": "04",
      "day": "11",
      "firstPublication": "TRUE"
    },
    {
      "id": "S123",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1965",
      "month": "04",
      "day": "18",
      "firstPublication": "TRUE"
    },
    {
      "id": "S124",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1965",
      "month": "05",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S125",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1965",
      "month": "05",
      "day": "16",
      "firstPublication": "TRUE"
    },
    {
      "id": "S054",
      "destination": "V012",
      "type": "raccolta",
      "year": "1965",
      "month": "10",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S095",
      "destination": "V012",
      "type": "raccolta",
      "year": "1965",
      "month": "10",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "V012",
      "destination": "V012",
      "type": "raccolta",
      "year": "1965",
      "month": "10",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S126",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1965",
      "month": "10",
      "day": "24",
      "firstPublication": "TRUE"
    },
    {
      "id": "S127",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1965",
      "month": "10",
      "day": "31",
      "firstPublication": "TRUE"
    },
    {
      "id": "S128",
      "destination": "«L'Espresso»",
      "type": "altro",
      "year": "1965",
      "month": "11",
      "day": "14",
      "firstPublication": "TRUE"
    },
    {
      "id": "S046",
      "destination": "V012",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "S129",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S130",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S131",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S132",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S118",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "S119",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "S120",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "S121",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "V013",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S122",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "S124",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "S126",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "S128",
      "destination": "V013",
      "type": "raccolta",
      "year": "1965",
      "month": "11",
      "day": "15",
      "firstPublication": "FALSO"
    },
    {
      "id": "S133",
      "destination": "Almanacco Letterario Bompiani 1967",
      "type": "altro",
      "year": "1966",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S134",
      "destination": "«Nuova Corrente»",
      "type": "altro",
      "year": "1967",
      "month": "01",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S135",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1967",
      "month": "05",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S136",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1967",
      "month": "06",
      "day": "11",
      "firstPublication": "TRUE"
    },
    {
      "id": "S137",
      "destination": "«Linus»",
      "type": "altro",
      "year": "1967",
      "month": "07",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S138",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1967",
      "month": "07",
      "day": "02",
      "firstPublication": "TRUE"
    },
    {
      "id": "S139",
      "destination": "«Rendiconti»",
      "type": "altro",
      "year": "1967",
      "month": "07",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S140",
      "destination": "«Il Giorno»",
      "type": "altro",
      "year": "1967",
      "month": "07",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S133",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "FALSO"
    },
    {
      "id": "S134",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "FALSO"
    },
    {
      "id": "S135",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "FALSO"
    },
    {
      "id": "S136",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "FALSO"
    },
    {
      "id": "S137",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "FALSO"
    },
    {
      "id": "S139",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "FALSO"
    },
    {
      "id": "S140",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "FALSO"
    },
    {
      "id": "S141",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S142",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S143",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S144",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "V014",
      "destination": "V014",
      "type": "raccolta",
      "year": "1967",
      "month": "10",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "S145",
      "destination": "«Playmen»",
      "type": "altro",
      "year": "1968",
      "month": "05",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S146",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S147",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S148",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "V015",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S118",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S119",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S122",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S123",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S124",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S125",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S126",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S127",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S130",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S135",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S136",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S137",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S138",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S140",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S141",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S144",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S145",
      "destination": "V015",
      "type": "raccolta",
      "year": "1968",
      "month": "11",
      "day": "01",
      "firstPublication": "FALSO"
    },
    {
      "id": "S149",
      "destination": "«Il caffè letterario e satirico»",
      "type": "altro",
      "year": "1969",
      "month": "08",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "V016",
      "destination": "V016",
      "type": "romanzo",
      "year": "1969",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S042",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S050",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S054",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S068",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S084",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S094",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S095",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S097",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S100",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S101",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S102",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S103",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S104",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S105",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S140",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "V017",
      "destination": "V017",
      "type": "raccolta",
      "year": "1970",
      "month": "06",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S150",
      "destination": "Adelphiana 1971",
      "type": "altro",
      "year": "1971",
      "month": "06",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S151",
      "destination": "«Playboy»",
      "type": "altro",
      "year": "1972",
      "month": "11",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "V018",
      "destination": "V018",
      "type": "romanzo",
      "year": "1972",
      "month": "11",
      "day": "03",
      "firstPublication": "TRUE"
    },
    {
      "id": "S152",
      "destination": "V019",
      "type": "raccolta",
      "year": "1973",
      "month": "10",
      "day": "27",
      "firstPublication": "TRUE"
    },
    {
      "id": "V019",
      "destination": "V019",
      "type": "raccolta",
      "year": "1973",
      "month": "10",
      "day": "27",
      "firstPublication": "TRUE"
    },
    {
      "id": "S153",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1974",
      "month": "04",
      "day": "25",
      "firstPublication": "TRUE"
    },
    {
      "id": "S154",
      "destination": "F. Fellini, Quattro film",
      "type": "altro",
      "year": "1974",
      "month": "09",
      "day": "28",
      "firstPublication": "TRUE"
    },
    {
      "id": "V020",
      "destination": "V020",
      "type": "ibrido",
      "year": "1974",
      "month": "12",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S155",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1974",
      "month": "12",
      "day": "21",
      "firstPublication": "TRUE"
    },
    {
      "id": "S156",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1975",
      "month": "04",
      "day": "27",
      "firstPublication": "TRUE"
    },
    {
      "id": "S157",
      "destination": "Aa. Vv., Le interviste imposibili",
      "type": "altro",
      "year": "1975",
      "month": "05",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S158",
      "destination": "Aa. Vv., Le interviste imposibili",
      "type": "altro",
      "year": "1975",
      "month": "05",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S159",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1975",
      "month": "07",
      "day": "27",
      "firstPublication": "TRUE"
    },
    {
      "id": "S160",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1975",
      "month": "08",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S161",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1975",
      "month": "08",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S162",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1975",
      "month": "08",
      "day": "10",
      "firstPublication": "TRUE"
    },
    {
      "id": "S163",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1975",
      "month": "08",
      "day": "10",
      "firstPublication": "TRUE"
    },
    {
      "id": "S164",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1975",
      "month": "08",
      "day": "24",
      "firstPublication": "TRUE"
    },
    {
      "id": "S165",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1975",
      "month": "09",
      "day": "18",
      "firstPublication": "TRUE"
    },
    {
      "id": "S166",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1976",
      "month": "01",
      "day": "23",
      "firstPublication": "TRUE"
    },
    {
      "id": "S167",
      "destination": "L'atelier de l'artiste",
      "type": "altro",
      "year": "1976",
      "month": "04",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S168",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1976",
      "month": "07",
      "day": "16",
      "firstPublication": "TRUE"
    },
    {
      "id": "S169",
      "destination": "-V. Gobbi/S. Toresella, Acquedotti ieri e oggi",
      "type": "altro",
      "year": "1976",
      "month": "12",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S170",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1977",
      "month": "01",
      "day": "16",
      "firstPublication": "TRUE"
    },
    {
      "id": "S171",
      "destination": "«Paragone»",
      "type": "altro",
      "year": "1977",
      "month": "02",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S172",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1977",
      "month": "08",
      "day": "02",
      "firstPublication": "TRUE"
    },
    {
      "id": "S173",
      "destination": "«Il Caffè»",
      "type": "altro",
      "year": "1977",
      "month": "10",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S174",
      "destination": "Paraphrases",
      "type": "altro",
      "year": "1978",
      "month": "04",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S175",
      "destination": "«Corriere della sera»",
      "type": "altro",
      "year": "1978",
      "month": "12",
      "day": "24",
      "firstPublication": "TRUE"
    },
    {
      "id": "V021",
      "destination": "V021",
      "type": "romanzo",
      "year": "1979",
      "month": "06",
      "day": "02",
      "firstPublication": "TRUE"
    },
    {
      "id": "S176",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1980",
      "month": "03",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S177",
      "destination": "«Derrière le miroir»",
      "type": "altro",
      "year": "1980",
      "month": "05",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S178",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1980",
      "month": "05",
      "day": "16",
      "firstPublication": "TRUE"
    },
    {
      "id": "S179",
      "destination": "«Gran Bazaar»",
      "type": "altro",
      "year": "1980",
      "month": "09",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S180",
      "destination": "Magnelli. Les pierres: 1931-1935",
      "type": "altro",
      "year": "1981",
      "month": "07",
      "day": "14",
      "firstPublication": "TRUE"
    },
    {
      "id": "S181",
      "destination": "I. Calvino/M. Campigli, Le memorie di Casanova",
      "type": "altro",
      "year": "1981",
      "month": "11",
      "day": "30",
      "firstPublication": "TRUE"
    },
    {
      "id": "S182",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1981",
      "month": "12",
      "day": "03",
      "firstPublication": "TRUE"
    },
    {
      "id": "S183",
      "destination": "Firenze perduta",
      "type": "altro",
      "year": "1982",
      "month": "01",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S184",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1982",
      "month": "04",
      "day": "15",
      "firstPublication": "TRUE"
    },
    {
      "id": "S185",
      "destination": "«FMR»",
      "type": "altro",
      "year": "1982",
      "month": "06",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S186",
      "destination": "«Cnac Magazine»",
      "type": "altro",
      "year": "1982",
      "month": "07",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S187",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1982",
      "month": "08",
      "day": "12",
      "firstPublication": "TRUE"
    },
    {
      "id": "S188",
      "destination": "Gnoli",
      "type": "altro",
      "year": "1983",
      "month": "03",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S189",
      "destination": "«FMR»",
      "type": "altro",
      "year": "1983",
      "month": "07",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S190",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1983",
      "month": "07",
      "day": "29",
      "firstPublication": "TRUE"
    },
    {
      "id": "S191",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1983",
      "month": "08",
      "day": "25",
      "firstPublication": "TRUE"
    },
    {
      "id": "S192",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S193",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S194",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S195",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S196",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S197",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S198",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S199",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S200",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S201",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "V022",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "TRUE"
    },
    {
      "id": "S160",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S161",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S162",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S163",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S164",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S165",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S166",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S168",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S170",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S172",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S178",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S182",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S184",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S186",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S187",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S190",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S191",
      "destination": "V022",
      "type": "raccolta",
      "year": "1983",
      "month": "11",
      "day": "19",
      "firstPublication": "FALSO"
    },
    {
      "id": "S202",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1984",
      "month": "01",
      "day": "03",
      "firstPublication": "TRUE"
    },
    {
      "id": "S203",
      "destination": "Cremonini. Opere dal 1960 al 1984",
      "type": "altro",
      "year": "1984",
      "month": "06",
      "day": "01",
      "firstPublication": "TRUE"
    },
    {
      "id": "S204",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1984",
      "month": "08",
      "day": "12",
      "firstPublication": "TRUE"
    },
    {
      "id": "S205",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1984",
      "month": "09",
      "day": "02",
      "firstPublication": "TRUE"
    },
    {
      "id": "S206",
      "destination": "«la Repubblica»",
      "type": "altro",
      "year": "1984",
      "month": "09",
      "day": "13",
      "firstPublication": "TRUE"
    },
    {
      "id": "S118",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S119",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S120",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S121",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S122",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S123",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S124",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S125",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S126",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S127",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S128",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S129",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S130",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S131",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S132",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S133",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S134",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S135",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S136",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S137",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S139",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S140",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S141",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S142",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S143",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S144",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S145",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S146",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S147",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "V023",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "TRUE"
    },
    {
      "id": "S205",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    },
    {
      "id": "S206",
      "destination": "V023",
      "type": "raccolta",
      "year": "1984",
      "month": "11",
      "day": "20",
      "firstPublication": "FALSO"
    }
  ]

  const publications_simple = [
    {
      "id": "S001",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S002",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S003",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S004",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S005",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S006",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S007",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S008",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S009",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S010",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S011",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S012",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S013",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S014",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S015",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S016",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S017",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S018",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S019",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S020",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S021",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S022",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "V001",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S023",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S024",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S025",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S026",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S027",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S028",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S029",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S030",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S031",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S032",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S033",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S034",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S035",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S036",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S037",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S038",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S039",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S040",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S041",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S042",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S043",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S044",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S045",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S046",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S047",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S048",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S049",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S050",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "V003",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S051",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S052",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S053",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S054",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S055",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S056",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S057",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S058",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S059",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S060",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S061",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S062",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S063",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S064",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S065",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S066",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S067",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S068",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S069",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S070",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S071",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S072",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S073",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S074",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S075",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S076",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S077",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S078",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S079",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S080",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S081",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S082",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S083",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S084",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S085",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S086",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "V005",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S087",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S088",
      "types": [
        "raccolta",
        "romanzo"
      ]
    },
    {
      "id": "V010",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S089",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S090",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S091",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S092",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S093",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S094",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S095",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S096",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S097",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S098",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S099",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S100",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S101",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S102",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S103",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S104",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S105",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "V008",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S106",
      "types": [
        "altro"
      ]
    },
    {
      "id": "V009",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S107",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S108",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S109",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S110",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S111",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S112",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S113",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S114",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S115",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S116",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S117",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S118",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S119",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S120",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S121",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S122",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S123",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S124",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S125",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S126",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S127",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S128",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S129",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S130",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S131",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S132",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S133",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S134",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S135",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S136",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S137",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S138",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S139",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S140",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S141",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S142",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S143",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S144",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S145",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S146",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S147",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S148",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S149",
      "types": [
        "altro"
      ]
    },
    {
      "id": "V016",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S150",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S151",
      "types": [
        "altro"
      ]
    },
    {
      "id": "V018",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S152",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S153",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S154",
      "types": [
        "altro"
      ]
    },
    {
      "id": "V020",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S155",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S156",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S157",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S158",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S159",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S160",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S161",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S162",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S163",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S164",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S165",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S166",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S167",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S168",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S169",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S170",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S171",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S172",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S173",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S174",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S175",
      "types": [
        "altro"
      ]
    },
    {
      "id": "V021",
      "types": [
        "romanzo"
      ]
    },
    {
      "id": "S176",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S177",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S178",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S179",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S180",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S181",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S182",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S183",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S184",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S185",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S186",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S187",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S188",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S189",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S190",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S191",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S192",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S193",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S194",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S195",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S196",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S197",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S198",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S199",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S200",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S201",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S202",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S203",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S204",
      "types": [
        "altro"
      ]
    },
    {
      "id": "S205",
      "types": [
        "raccolta"
      ]
    },
    {
      "id": "S206",
      "types": [
        "raccolta"
      ]
    }
  ]

const GlobalData = {
  allVolumes : [
    {"id":"V001","label":"Il sentiero dei nidi di ragno", "type":"romanzo"},
    {"id":"V002","label":"Ultimo viene il corvo", "type":"raccolta"},
    {"id":"V003","label":"Il visconte dimezzato", "type":"ibrido"},
    {"id":"V004","label":"L'entrata in guerra", "type":"raccolta"},
    {"id":"V005","label":"Il barone rampante", "type":"romanzo"},
    {"id":"V006","label":"I racconti", "type":"raccolta"},
    {"id":"V007","label":"La formica argentina", "type":"ibrido"},
    {"id":"V008","label":"Il cavaliere inesistente", "type":"romanzo"},
    {"id":"V009","label":"La giornata di uno scrutatore", "type":"ibrido"},
    {"id":"V010","label":"La speculazione edilizia", "type":"ibrido"},
    {"id":"V011","label":"Marcovaldo", "type":"raccolta"},
    {"id":"V012","label":"La nuvola di smog e La formica argentina", "type":"raccolta"},
    {"id":"V013","label":"Le cosmicomiche", "type":"raccolta"},
    {"id":"V014","label":"Ti con Zero", "type":"raccolta"},
    {"id":"V015","label":"La memoria del mondo", "type":"raccolta"},
    {"id":"V016","label":"Il castello dei destini incrociati", "type":"romanzo"},
    {"id":"V017","label":"Gli amori difficili", "type":"raccolta"},
    {"id":"V018","label":"Le città invisibili", "type":"romanzo"},
    {"id":"V019","label":"Il castello dei destini incrociati (riediz)", "type":"raccolta"},
    {"id":"V020","label":"Eremita a Parigi", "type":"racconto"},
    {"id":"V021","label":"Se una notte d'inverno un viaggiatore", "type":"romanzo"},
    {"id":"V022","label":"Palomar", "type":"raccolta"},
    {"id":"V023","label":"Le cosmicomiche vecchie e nuove", "type":"raccolta"}
  ],
/*
  commands : {
    territory : {
      doubt : {
        fog : "fog",
        cancellation : "cancellation",
        all : "doubtAll",
        percentage : "doubtPercentage",
      }
    }
  },
*/
  analysisModes : {
    noAnalysis : {
      chronology : "chronology",
      volumes : "volumes"
    },
    doubt : {
      fog : "fog",
      cancellation : "cancellation",
      all : "all",
      percentage : "percentage"
    },
    shape : {
      types : "types",
      proportion : "shape_proportion"
    },
    space : {
      genericCosmic : "genericCosmic",
      namedCosmic : "namedCosmic",
      genericTerrestrial : "genericTerrestrial",
      namedTerrestrial : "namedTerrestrial",
      invented : "invented",
      noSetting : "noSetting",
      proportion : "space_proportion",
      placeHierarchies : "placeHierarchies"
    }
  },
  noAnalysisDropDownPositions : {
    open : "open",
    closed : "closed"
  },
  bottomPanelModes : {
    noAnalysis : "noAnalysis",
    doubt : "doubt",
    shape : "shape",
    space : "space",
    chronologicalFilter : "chronologicalFilter",
    legend : "legend"
  },
  bottomPanelPositions : {
    open : "open",
    closed : "closed"
  },
  itineraryDropUpPositions : {
    open : "open",
    closed : "closed"
  },
  analysisPanelModes : {
    doubt : {
      fog : "fog",
      cancellation : "cancellation",
      all : "all",
      percentage : "percentage"
    },
    shape : {
      proportion : "shape_proportion",
      types : "types"
    },
    space : {
      genericCosmic : "genericCosmic",
      namedCosmic : "namedCosmic",
      genericTerrestrial : "genericTerrestrial",
      namedTerrestrial : "namedTerrestrial",
      invented : "invented",
      noSetting : "noSetting",
      proportion : "space_proportion",
      placeHierarchies : "placeHierarchies"
    }
  },
  helpPages : {
    territory : {
      main : "territoryMain",
      placeHierarchies : "territoryPlaceHierarchies",
      doubt : "territoryDoubt",
      shape : "territoryShape",
      place : "territoryPlace",
    },
    transform : {
      main : "transformMain"
    },
    plot : {
      main : "plotMain"
    },
    compass : {
      time : "compassTime",
      bones : "compassBones"
    },
    processDoubting : {
      main : "processDoubtingMain"
    }
  },
  legendPages : {
    territory : {
      chronology       : "chronology",
      volumes          : "volumes",

      doubt            : "doubt",
      doubtOccurrences : "doubtOccurrences",
      doubtProportion  : "doubtProportion",

      shape            : "shape",
      shapeProportion1 : "shapeProportion1",
      shapeProportion2 : "shapeProportion2",

      space            : "space",
      spaceOccurrences : "spaceOccurrences",
      spaceProportion  : "spaceProportion",
      spaceHierarchies : "spaceHierarchies"
    },
    transform : {
      mainLegend : "mainLegend"
    }
  },
  visualizationColors : {
    territory : {
                             nebbia_bright : territoryColorPalette.brightBlue,
                                nebbia_dim : territoryColorPalette.dimBlue,
                      cancellazione_bright : territoryColorPalette.brightCyan,
                         cancellazione_dim : territoryColorPalette.dimCyan,
                      allDubitative_bright : territoryColorPalette.brightOrange,
                         allDubitative_dim : territoryColorPalette.dimOrange,
                      generico_cosmico_dim : territoryColorPalette.dimBlue,
                   generico_cosmico_bright : territoryColorPalette.brightBlue,
                    generico_terrestre_dim : territoryColorPalette.dimOrange,
                 generico_terrestre_bright : territoryColorPalette.brightOrange,
                             inventato_dim : territoryColorPalette.dimCyan,
                          inventato_bright : territoryColorPalette.brightCyan,
                      no_ambientazione_dim : territoryColorPalette.lightComfit,
                   no_ambientazione_bright : territoryColorPalette.grey,
                      nominato_cosmico_dim : territoryColorPalette.dimViolet,
                   nominato_cosmico_bright : territoryColorPalette.brightViolet,
                    nominato_terrestre_dim : territoryColorPalette.dimGold,
                 nominato_terrestre_bright : territoryColorPalette.brightGold,
                                    parole : territoryColorPalette.brightCyan,
                                  sintagmi : territoryColorPalette.brightGold,
                                     frasi : territoryColorPalette.brightBlue,
                                     misto : territoryColorPalette.brightAmaranth,
               lists_ratio_below_threshold : "black",
               lists_ratio_above_threshold : territoryColorPalette.turquoise,
        placeHierarchies_color_scale_start : 'white',
          placeHierarchies_color_scale_end : 'white',
                  placeHierarchies_unknown : 'white'
    }
  },
  defaultTerritoryDataExtent : [1942, 1985],
  collections : collections,
  publications : publications,
  publications_simple: publications_simple,
  allowedCollections : allowedCollections,
  chapters_subdivision : chapters_subdivision,
  allowedCollectionsSplit : allowedCollections.split(","),
  col_collections : d3
    .scaleOrdinal()
    .domain(collections.map(d => d.id))
    .range(collections.map(d => d.c))
    .unknown('transparent')
}

export default GlobalData;