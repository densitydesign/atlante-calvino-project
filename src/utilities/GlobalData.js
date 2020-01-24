
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


const GlobalData = {
  allVolumes : [
    {"id":"V001","label":"Il sentiero dei nidi di ragno"},
    {"id":"V002","label":"Ultimo viene il corvo"},
    {"id":"V003","label":"Il visconte dimezzato"},
    {"id":"V004","label":"L'entrata in guerra"},
    {"id":"V005","label":"Il barone rampante"},
    {"id":"V006","label":"I racconti"},
    {"id":"V007","label":"La formica argentina"},
    {"id":"V008","label":"Il cavaliere inesistente"},
    {"id":"V009","label":"La giornata di uno scrutatore"},
    {"id":"V010","label":"La speculazione edilizia"},
    {"id":"V011","label":"Marcovaldo"},
    {"id":"V012","label":"La nuvola di smog e La formica argentina"},
    {"id":"V013","label":"Le cosmicomiche"},
    {"id":"V014","label":"Ti con Zero"},
    {"id":"V015","label":"La memoria del mondo"},
    {"id":"V016","label":"Il castello dei destini incrociati"},
    {"id":"V017","label":"Gli amori difficili"},
    {"id":"V018","label":"Le città invisibili"},
    {"id":"V019","label":"Il castello dei destini incrociati (riediz)"},
    {"id":"V020","label":"Eremita a Parigi"},
    {"id":"V021","label":"Se una notte d'inverno un viaggiatore"},
    {"id":"V022","label":"Palomar"},
    {"id":"V023","label":"Le cosmicomiche vecchie e nuove"}
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
      proportion : "shape_proportion",
      types : "types"
    },
    space : {
      genericNonTerrestrial : "genericNonTerrestrial",
      namedNonTerrestrial : "namedNonTerrestrial",
      genericTerrestrial : "genericTerrestrial",
      namedTerrestrial : "namedTerrestrial",
      invented : "invented",
      noSetting : "noSetting",
      proportion : "space_proportion",
      placeHierarchies : "placeHierarchies"
    }
  },
  bottomPanelModes : {
    noAnalysis : "none",
    doubt : "doubt",
    shape : "shape",
    space : "space",
    chronologicalFilter : "chronologicalFilter",
    legend : "legend"
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
      genericNonTerrestrial : "genericNonTerrestrial",
      namedNonTerrestrial : "namedNonTerrestrial",
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
    }
  },
  legendPages : {
    territory : {
      chronology : "chronology",
      volumes : "volumes",
      doubt : "doubt",
      shape : "shape",
      space : "space"
    }
  },
  visualizationColors : {
    territory : {
      nebbia_bright : '#5151FC',
      nebbia_dim : '#C5C5FC',
      cancellazione_bright : '#FF3366',
      cancellazione_dim : '#FCD0DB',
      allDubitative_bright : '#00C19C',
      allDubitative_dim : '#C2FAEF',
      generico_non_terrestre_color_scale_start : '#DDDDDD',
      generico_non_terrestre_color_scale_end : 'red',
      generico_terrestre_color_scale_start : '#DDDDDD',
      generico_terrestre_color_scale_end : 'orange',
      inventato_color_scale_start : '#DDDDDD',
      inventato_color_scale_end : 'fuchsia',
      no_ambientazione_color_scale_start : '#DDDDDD',
      no_ambientazione_color_scale_end : 'darkgrey',
      nominato_non_terrestre_color_scale_start : '#DDDDDD',
      nominato_non_terrestre_color_scale_end : 'blue',
      nominato_terrestre_color_scale_start : '#DDDDDD',
      nominato_terrestre_color_scale_end : 'dodgerblue',
      placeHierarchies_color_scale_start : 'white',
      placeHierarchies_color_scale_end : 'white',
      placeHierarchies_unknown : 'white'
    }
  },
  defaultTerritoryDataExtent : [1942, 1985],
  collections : collections,
  allowedCollections : allowedCollections,
  allowedCollectionsSplit : allowedCollections.split(","),
  col_collections : d3
    .scaleOrdinal()
    .domain(collections.map(d => d.id))
    .range(collections.map(d => d.c))
    .unknown('transparent')
}

export default GlobalData;
