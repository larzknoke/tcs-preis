import * as yup from "yup";
import localeDE from "./localeDE";

yup.setLocale(localeDE);

export const formSchema = yup
  .object({
    andereLizenzpartner: yup.string().required(),
    nameTraeger: yup.string().required(),
    vorstandTraeger: yup.string().required(),
    strasseTraeger: yup.string().required(),
    plzTraeger: yup
      .number()
      .integer()
      .typeError("Dieses Feld muss eine Zahl sein")
      .moreThan(0, "Bitte eine gültige PLZ eingeben")
      .lessThan(100000, "Bitte eine gültige PLZ eingeben")
      .required(),
    ortTraeger: yup.string().required(),
    bundeslandTraeger: yup
      .string()
      .transform((value) => {
        return value.value;
      })
      .required(),
    vereinTraeger: yup.string().required(),
    organisationProjekt: yup.string().required(),
    ansprechpartnerProjekt: yup.string().required(),
    ansprechpartnerProjekt: yup.string().required(),
    telefonnummerProjekt: yup.string().required(),
    mobilProjekt: yup.string().required(),
    emailProjekt: yup.string().email().required(),
    emailBestaetigungProjekt: yup
      .string()
      .oneOf([yup.ref("emailProjekt"), null], "E-Mail stimmt nicht überein")
      .required("Bitte Email wiederholen"),
    wwwProjekt: yup.string().required(),
    ibanProjekt: yup
      .string()
      //   .required()
      .matches(/^DE[0-9]{20}$/gm, "Bitte eine gültige IBAN eingeben"),
    kontoNameProjekt: yup.string().required(),
  })
  .required();
