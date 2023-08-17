import * as yup from "yup";
import localeDE from "./localeDE";

yup.setLocale(localeDE);

export const formSchema = yup.object().shape({
  // nameTraeger: yup.string().required(),
  // vorstandTraeger: yup.string().required(),
  // strasseTraeger: yup.string().required(),
  // plzTraeger: yup
  //   .number()
  //   .integer()
  //   .typeError("Dieses Feld muss eine Zahl sein")
  //   .moreThan(0, "Bitte eine gültige PLZ eingeben")
  //   .lessThan(100000, "Bitte eine gültige PLZ eingeben")
  //   .required(),
  ortTraeger: yup.string().required(),
  bundeslandTraeger: yup
    .string()
    .transform((value) => {
      return value.value;
    })
    .required(),
  // vereinTraeger: yup.string(),
  freistellungsbescheidTraeger: yup
    .mixed()
    .transform((fileList) => {
      if (fileList == null) return {};
      return fileList[0];
    })
    .test("checkFile", "Bitte eine Datei auswählen.", (file) => {
      return checkFileExist(file);
    })
    .test("fileSize", "Datei muss unter 10 MB sein.", (file) => {
      return isFileSizeValid(file, 10000000);
    }),
  freistellungsbescheidTraeger2: yup
    .mixed()
    .transform((fileList) => {
      if (fileList == null) return {};
      return fileList[0];
    })
    .test("fileSize", "Datei muss unter 10 MB sein.", (file) => {
      return isFileSizeValid(file, 1000000);
    }),
  customFile: yup
    .mixed()
    .transform((fileList) => {
      if (fileList == null) return {};
      return fileList[0];
    })
    .test("fileSize", "Datei muss unter 5 MB sein.", (file) => {
      return isFileSizeValid(file, 500000);
    }),
  customFile2: yup
    .mixed()
    .transform((fileList) => {
      if (fileList == null) return {};
      return fileList[0];
    })
    .test("fileSize", "Datei muss unter 5 MB sein.", (file) => {
      return isFileSizeValid(file, 500000);
    }),
  // organisationProjekt: yup.string().required(),
  // nameProjekt: yup.string().required(),
  // ansprechpartnerProjekt: yup.string().required(),
  // telefonnummerProjekt: yup.string(),
  // mobilProjekt: yup.string().required(),
  // emailProjekt: yup.string().email().required(),
  // emailBestaetigungProjekt: yup
  //   .string()
  //   .oneOf([yup.ref("emailProjekt"), null], "E-Mail stimmt nicht überein")
  //   .required("Bitte Email wiederholen"),
  // wwwProjekt: yup.string().required(),
  // ibanProjekt: yup
  //   .string()
  //   //   .required()
  //   .matches(/^DE[0-9]{20}$/gm, "Bitte eine gültige IBAN eingeben"),
  // kontoNameProjekt: yup.string().required(),
  // bankNameProjekt: yup.string().required(),
  // strasseProjekt: yup.string(),
  plzProjekt: yup
    .number()
    .integer()
    .typeError("Dieses Feld muss eine Zahl sein")
    .moreThan(0, "Bitte eine gültige PLZ eingeben")
    .lessThan(100000, "Bitte eine gültige PLZ eingeben")
    .required(),
  // ortProjekt: yup.string(),
  // bundeslandProjekt: yup.string(),
  // wannProjekt: yup.string().required(),
  // mitarbeiterProjekt: yup.string().required(),
  // hauptamtlichAnzahl: yup.string(),
  // hauptamtlichStunden: yup.string(),
  // ehrenamtlichAnzahl: yup.string(),
  // ehrenamtlichStunden: yup.string(),
  // beschreibungProjekt: yup.string().required(),
  // zielsetzungProjekt: yup.string().required(),
  // benachteiligungProjekt: yup.string().required(),
  // umsetzungProjekt: yup.string().required(),
  // bisherigeErgebnisse: yup.string().required(),
  // eigenmittel: yup
  //   .number()
  //   .integer()
  //   .typeError("Dieses Feld muss eine Zahl sein")
  //   .moreThan(0, "Bitte eine gültige PLZ eingeben")
  //   .required(),
  // oeffentlicheZuwendungen: yup
  //   .number()
  //   .integer()
  //   .typeError("Dieses Feld muss eine Zahl sein")
  //   .moreThan(0, "Bitte eine gültige PLZ eingeben")
  //   .required(),
  // privateSpenden: yup
  //   .number()
  //   .integer()
  //   .typeError("Dieses Feld muss eine Zahl sein")
  //   .moreThan(0, "Bitte eine gültige PLZ eingeben")
  //   .required(),
  // zuwendungAndere: yup
  //   .string()
  //   .required(),
  // bisherigeFoerderung: yup
  //   .number()
  //   .integer()
  //   .typeError("Dieses Feld muss eine Zahl sein")
  //   .moreThan(0, "Bitte eine gültige PLZ eingeben")
  //   .required(),
  // checkBeitrag: yup.boolean().required(),
  // checkBeitrag: yup
  //   .boolean()
  //   .required("Bitte Bestätigen Sie die Einverständniserklärung")
  //   .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
  // checkVeroeffentlich: yup
  //   .boolean()
  //   .required("Bitte Bestätigen Sie die Einverständniserklärung")
  //   .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
  // checkScheck: yup
  //   .boolean()
  //   .required("Bitte Bestätigen Sie die Einverständniserklärung")
  //   .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
  // checkDatenschutzBilder: yup
  //   .boolean()
  //   .required("Bitte Bestätigen Sie die Einverständniserklärung")
  //   .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
  // checkPersonenbezogen: yup
  //   .boolean()
  //   .required(
  //     "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
  //   )
  //   .oneOf(
  //     [true],
  //     "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
  //   ),
  // checkDatenschutzerklaerung: yup
  //   .boolean()
  //   .required(
  //     "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
  //   )
  //   .oneOf(
  //     [true],
  //     "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
  //   ),
  // checkTeilnahmebedingungen: yup
  //   .boolean()
  //   .required(
  //     "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
  //   )
  //   .oneOf(
  //     [true],
  //     "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
  //   ),
  // checkWahrheit: yup
  //   .boolean()
  //   .required(
  //     "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
  //   )
  //   .oneOf(
  //     [true],
  //     "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
  //   ),
});

export const botschafterSchema = yup.object().shape({
  name: yup.string().required(),
  strasse: yup.string().required(),
  plz: yup
    .number()
    .integer()
    .typeError("Dieses Feld muss eine Zahl sein")
    .moreThan(0, "Bitte eine gültige PLZ eingeben")
    .lessThan(100000, "Bitte eine gültige PLZ eingeben")
    .required(),
  ort: yup.string().required(),
  bundesland: yup
    .string()
    .transform((value) => {
      return value.value;
    })
    .required(),
});

export const kampagneSchema = yup.object().shape({
  name: yup.string().required(),
});

export const noteSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});

export const fileSchema = yup.object().shape({
  title: yup.string().required(),
  note: yup.string().required(),
});

export function isFileSizeValid(file, maxSize) {
  let valid = true;
  if (file) {
    const fileSize = file.size;
    console.log("fileSize", fileSize);
    if (fileSize > maxSize) {
      valid = false;
    }
  }
  return valid;
}

export function checkFileExist(file) {
  if (file != undefined) {
    if (Object.keys(file).length === 0 && file.constructor === Object) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
