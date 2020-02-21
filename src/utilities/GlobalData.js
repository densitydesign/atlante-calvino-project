
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
      "type": "racconto",
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
  allowedCollections : allowedCollections,
  allowedCollectionsSplit : allowedCollections.split(","),
  col_collections : d3
    .scaleOrdinal()
    .domain(collections.map(d => d.id))
    .range(collections.map(d => d.c))
    .unknown('transparent')
}

export default GlobalData;