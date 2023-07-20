export let mixed = {
  default: "Dieses Feld ist ungültig",
  required: "Dieses Feld ist ein Pflichtfeld",
  oneOf: "Dieses Feld muss einem der folgenden Werte entsprechen: ${values}",
  notOneOf:
    "Dieses Feld darf keinem der folgenden Werte entsprechen: ${values}",
};

export let string = {
  length: "Dieses Feld muss genau ${length} Zeichen lang sein",
  min: "Dieses Feld muss mindestens ${min} Zeichen lang sein",
  max: "Dieses Feld darf höchstens ${max} Zeichen lang sein",
  matches: 'Dieses Feld muss wie folgt aussehen: "${regex}"',
  email: "Dieses Feld muss eine gültige E-Mail-Adresse enthalten",
  url: "Dieses Feld muss eine gültige URL sein",
  trim: "Dieses Feld darf keine Leerzeichen am Anfang oder Ende enthalten",
  lowercase: "Dieses Feld darf nur Kleinschreibung enthalten",
  uppercase: "Dieses Feld darf nur Großschreibung enthalten",
};

export let number = {
  required: "Dieses Feld muss eine Zahl sein",
  min: "Dieses Feld muss größer oder gleich ${min} sein",
  max: "Dieses Feld muss kleiner oder gleich ${max} sein",
  lessThan: "Dieses Feld muss kleiner sein als ${less}",
  moreThan: "Dieses Feld muss größer sein als ${more}",
  notEqual: 'Dieses Feld darf nicht gleich sein mit "${notEqual}"',
  positive: "Dieses Feld muss eine positive Zahl sein",
  negative: "Dieses Feld muss eine negative Zahl sein",
  integer: "Dieses Feld muss eine ganze Zahl sein",
};

export let date = {
  min: "Dieses Feld muss später sein als ${min}",
  max: "Dieses Feld muss früher sein als ${max}",
};

export let boolean = {};

export let object = {
  noUnknown:
    'Dieses Feld-Feld darf keine Schlüssel verwenden, die nicht im "Objekt-Shape" definiert wurden',
};

export let array = {
  min: "Dieses Feld-Feld muss mindesten ${min} Einträge haben",
  max: "Dieses Feld-Feld darf höchstens ${max} Einträge haben",
};

export default {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};
