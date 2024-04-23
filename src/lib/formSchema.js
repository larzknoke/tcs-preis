import * as yup from "yup";
import localeDE from "./localeDE";

yup.setLocale(localeDE);

export const formSchema = yup.object().shape(
  {
    nameTraeger: yup.string().required(),
    vorstandTraeger: yup.string().required(),
    strasseTraeger: yup.string().required(),
    plzTraeger: yup
      .string()
      .matches(/^\d+$/, "Bitte eine gültige PLZ eingeben.")
      .max("5", "Bitte eine gültige PLZ eingeben.")
      .required(),
    ortTraeger: yup.string().required(),
    bundeslandTraeger: yup
      .string()
      .transform((value) => {
        return value.value;
      })
      .required(),
    vereinTraeger: yup.string().required(),
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
        return isFileSizeValid(file, 10485760);
      })
      .test("fileFormat", "Bitte PDF oder JPG verwenden.", (file) => {
        return isValidFileType(file);
      }),
    freistellungsbescheidTraeger2: yup
      .mixed()
      .transform((fileList) => {
        if (fileList == null) return {};
        return fileList[0];
      })
      .test("fileSize", "Datei muss unter 10 MB sein.", (file) => {
        return isFileSizeValid(file, 10485760);
      })
      .test("fileFormat", "Bitte PDF oder JPG verwenden.", (file) => {
        return isValidFileType(file);
      }),
    customFile: yup
      .mixed()
      .transform((fileList) => {
        if (fileList == null) return {};
        return fileList[0];
      })
      .test("fileSize", "Datei muss unter 5 MB sein.", (file) => {
        return isFileSizeValid(file, 5242880);
      })
      .test("fileFormat", "Bitte PDF oder JPG verwenden.", (file) => {
        return isValidFileType(file);
      }),
    customFile2: yup
      .mixed()
      .transform((fileList) => {
        if (fileList == null) return {};
        return fileList[0];
      })
      .test("fileSize", "Datei muss unter 5 MB sein.", (file) => {
        return isFileSizeValid(file, 5242880);
      })
      .test("fileFormat", "Bitte PDF oder JPG verwenden.", (file) => {
        return isValidFileType(file);
      }),
    organisationProjekt: yup.string().required(),
    nameProjekt: yup.string().required(),
    ansprechpartnerProjekt: yup.string().required(),
    // telefonnummerProjekt: yup.string().required(),
    // mobilProjekt: yup.string().required(),
    telefonnummerProjekt: yup.string().when("mobilProjekt", {
      is: (mobilProjekt) => !mobilProjekt || mobilProjekt.length === 0,
      then: (formSchema) => {
        return formSchema.required("Telefon oder Mobil Nr. angeben");
      },
    }),
    mobilProjekt: yup.string().when("telefonnummerProjekt", {
      is: (telefonnummerProjekt) =>
        !telefonnummerProjekt || telefonnummerProjekt.length === 0,
      then: (formSchema) => {
        return formSchema.required("Telefon oder Mobil Nr. angeben");
      },
    }),
    emailProjekt: yup.string().email().required(),
    emailBestaetigungProjekt: yup
      .string()
      .oneOf([yup.ref("emailProjekt"), null], "E-Mail stimmt nicht überein")
      .required("Bitte Email wiederholen"),
    wwwProjekt: yup.string(),
    ibanProjekt: yup
      .string()
      .matches(/^DE[0-9]{20}$/gm, "Bitte eine gültige IBAN eingeben")
      .transform((value) => {
        return value.replaceAll(" ", "");
      })
      .required(),
    kontoNameProjekt: yup.string().required(),
    bankNameProjekt: yup.string().required(),
    strasseProjekt: yup.string(),
    plzProjekt: yup
      .string()
      .matches(/^\d+$/, {
        message: "Bitte eine gültige PLZ eingeben.",
        excludeEmptyString: true,
      })
      .max("5", "Bitte eine gültige PLZ eingeben."),
    ortProjekt: yup.string(),
    bundeslandProjekt: yup.string().transform((value) => {
      return value.value;
    }),
    wannProjekt: yup.string().required(),
    mitarbeiterProjekt: yup.string().required(),
    hauptamtlichAnzahl: yup.string(),
    hauptamtlichStunden: yup.string(),
    ehrenamtlichAnzahl: yup.string(),
    ehrenamtlichStunden: yup.string(),
    beschreibungProjekt: yup.string().max(1500).required(),
    zielsetzungProjekt: yup.string().max(1500).required(),
    benachteiligungProjekt: yup.string().max(1500).required(),
    umsetzungProjekt: yup.string().max(1500).required(),
    bisherigeErgebnisse: yup.string().max(1500).required(),
    eigenmittel: yup
      .number()
      .integer()
      .typeError("Dieses Feld muss eine Zahl sein")
      .moreThan(-1, "Bitte eine gültige Zahl eingeben")
      .required(),
    oeffentlicheZuwendungen: yup
      .number()
      .integer()
      .typeError("Dieses Feld muss eine Zahl sein")
      .moreThan(-1, "Bitte eine gültige Zahl eingeben")
      .required(),
    privateSpenden: yup
      .number()
      .integer()
      .typeError("Dieses Feld muss eine Zahl sein")
      .moreThan(-1, "Bitte eine gültige Zahl eingeben")
      .required(),
    zuwendungAndere: yup.string().required(),
    bisherigeFoerderung: yup.string().required(),
    checkBeitrag: yup.boolean().required(),
    checkBeitrag: yup
      .boolean()
      .required("Bitte Bestätigen Sie die Einverständniserklärung")
      .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
    checkVeroeffentlich: yup
      .boolean()
      .required("Bitte Bestätigen Sie die Einverständniserklärung")
      .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
    checkScheck: yup
      .boolean()
      .required("Bitte Bestätigen Sie die Einverständniserklärung")
      .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
    checkDatenschutzBilder: yup
      .boolean()
      .required("Bitte Bestätigen Sie die Einverständniserklärung")
      .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
    checkPersonenbezogen: yup
      .boolean()
      .required(
        "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
      )
      .oneOf(
        [true],
        "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
      ),
    checkDatenschutzerklaerung: yup
      .boolean()
      .required(
        "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
      )
      .oneOf(
        [true],
        "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
      ),
    checkTeilnahmebedingungen: yup
      .boolean()
      .required(
        "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
      )
      .oneOf(
        [true],
        "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
      ),
    checkWahrheit: yup
      .boolean()
      .required(
        "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
      )
      .oneOf(
        [true],
        "Bitte Bestätigen Sie die Datenschutzrechtliche Einwilligungserklärung"
      ),
  },
  [["telefonnummerProjekt", "mobilProjekt"]]
);

export const botschafterSchema = yup.object().shape({
  primaryId: yup.string(),
  firma: yup.string().required(),
  vorname: yup.string().required(),
  name: yup.string().required(),
  strasse: yup.string().required(),
  plz: yup.string().required(),
  ort: yup.string().required(),
  mobil: yup.string(),
  telefon: yup.string(),
  region: yup.string(),
  typ: yup.string(),
  email: yup.string().email(),
  bundesland: yup
    .string()
    // .transform((value) => {
    //   return value.value;
    // })
    .required(),
  anrede: yup
    .string()
    // .transform((value) => {
    //   return value.value;
    // })
    .required(),
});

export const inviteSchema = yup.object().shape({
  teilnahme: yup
    .boolean()
    .transform((value) => {
      return value == "ja";
    })
    .required(),
  spende: yup.boolean(),
  titel: yup.string(),
  name: yup.string().required(),
  vorname: yup.string().required(),
  unternehmen: yup.string().required(),
  email: yup.string().email().required(),
  telefon: yup.string(),
  begleitung: yup.string().transform((value) => {
    return value == "true" ? "ja" : "nein";
  }),
  datenschutz: yup
    .boolean()
    .required("Bitte Bestätigen Sie die Datenschutzerklärung")
    .oneOf([true], "Bitte Bestätigen Sie die Datenschutzerklärung"),
  datenschutzMedia: yup
    .boolean()
    .required("Bitte Bestätigen Sie die Einverständniserklärung")
    .oneOf([true], "Bitte Bestätigen Sie die Einverständniserklärung"),
});

export const kampagneSchema = yup.object().shape({
  name: yup.string().required(),
});

export const noteSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});

export const botcontactSchema = yup.object().shape({
  name: yup.string().required(),
});

export const lettercontactSchema = yup.object().shape({
  name: yup.string().required(),
});

export const fileSchema = yup.object().shape({
  title: yup.string().required(),
  note: yup.string(),
});

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  password_confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwort stimmt nicht überein")
    .required("Bitte Passwort wiederholen"),
});

export function isFileSizeValid(file, maxSize) {
  let valid = true;
  if (file) {
    const fileSize = file.size;
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

export function isValidFileType(file) {
  if (file === undefined) return true;
  return (
    file && ["application/pdf", "image/jpg", "image/jpeg"].includes(file.type)
  );
}
