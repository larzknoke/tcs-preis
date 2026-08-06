import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import VerifyEmail from "@/email/VerifyEmail";
import { render } from "@react-email/render";
import ErrorEmail from "@/email/ErrorEmail";
import { Prisma } from "@prisma/client";

const MAX_LENGTH_FIELDS = {
  beschreibungProjekt: 1500,
  zielsetzungProjekt: 500,
  benachteiligungProjekt: 500,
  umsetzungProjekt: 500,
  bisherigeErgebnisse: 500,
  nachhaltigkeitProjekt: 500,
  uebertragbarkeitProjekt: 500,
  aufmerksamkeit: 500,
};

const REQUIRED_FIELDS = [
  "nameTraeger",
  "vorstandTraeger",
  "strasseTraeger",
  "plzTraeger",
  "ortTraeger",
  "bundeslandTraeger",
  "vereinTraeger",
  "organisationProjekt",
  "nameProjekt",
  "ansprechpartnerProjekt",
  "emailProjekt",
  "ibanProjekt",
  "kontoNameProjekt",
  "bankNameProjekt",
  "wannProjekt",
  "mitarbeiterProjekt",
  "beschreibungProjekt",
  "zielsetzungProjekt",
  "umsetzungProjekt",
  "bisherigeErgebnisse",
  "aufmerksamkeit",
  "eigenmittel",
  "oeffentlicheZuwendungen",
  "privateSpenden",
  "zuwendungAndere",
  "bisherigeFoerderung",
];

const REQUIRED_FIELD_MESSAGES = {
  nameTraeger: "Bitte gebt den Namen und die Rechtsform des Trägers an.",
  vorstandTraeger: "Bitte gebt den Namen des Vorstands/Geschaeftsfuehrers an.",
  strasseTraeger: "Bitte gebt Strasse und Hausnummer des Traegers an.",
  plzTraeger: "Bitte gebt die PLZ des Traegers an.",
  ortTraeger: "Bitte gebt den Ort des Traegers an.",
  bundeslandTraeger: "Bitte waehlt ein Bundesland fuer den Traeger aus.",
  vereinTraeger:
    "Bitte waehlt aus, ob der Traeger als gemeinnuetzig anerkannt ist.",
  organisationProjekt: "Bitte gebt den Namen der Organisation/Einrichtung an.",
  nameProjekt: "Bitte gebt den Namen des Projekts an.",
  ansprechpartnerProjekt: "Bitte gebt einen Ansprechpartner an.",
  emailProjekt: "Bitte gebt eine gueltige E-Mail-Adresse an.",
  ibanProjekt: "Bitte gebt eine gueltige IBAN an.",
  kontoNameProjekt: "Bitte gebt den Kontoinhaber an.",
  bankNameProjekt: "Bitte gebt den Namen der Bank an.",
  wannProjekt: "Bitte gebt an, seit wann das Projekt besteht.",
  mitarbeiterProjekt: "Bitte gebt an, wie viele Mitarbeiter beteiligt sind.",
  beschreibungProjekt: "Bitte ergaenzt die Projektbeschreibung.",
  zielsetzungProjekt: "Bitte ergaenzt die Zielsetzung des Projekts.",
  umsetzungProjekt: "Bitte beschreibt die Projektumsetzung.",
  bisherigeErgebnisse: "Bitte beschreibt die bisherigen Ergebnisse.",
  aufmerksamkeit:
    "Bitte gebt an, wie Ihr auf den Stiftungspreis aufmerksam geworden seid.",
  eigenmittel: "Bitte gebt die Eigenmittel als Zahl an.",
  oeffentlicheZuwendungen:
    "Bitte gebt die oeffentlichen Zuwendungen als Zahl an.",
  privateSpenden: "Bitte gebt die privaten Spenden als Zahl an.",
  zuwendungAndere: "Bitte gebt die Zuwendungen anderer Organisationen an.",
  bisherigeFoerderung: "Bitte gebt die bisherige Foerderung an.",
  benachteiligungProjekt: "Bitte beschreibt die Benachteiligung im Projekt.",
  nachhaltigkeitProjekt: "Bitte ergaenzt die Angaben zur Nachhaltigkeit.",
  uebertragbarkeitProjekt: "Bitte ergaenzt die Angaben zur Uebertragbarkeit.",
};

const REQUIRED_CHECKBOXES = [
  "checkScheck",
  "checkDatenschutzBilder",
  "checkDatenschutzerklaerung",
  "checkTeilnahmebedingungen",
  "checkWahrheit",
];

const CHECKBOX_MESSAGES = {
  checkScheck:
    "Bitte bestaetigt die Einverstaendniserklaerung zur Scheckuebergabe.",
  checkDatenschutzBilder:
    "Bitte bestaetigt die Einverstaendniserklaerung zu Foto-, Film- und Tonaufnahmen.",
  checkDatenschutzerklaerung: "Bitte bestaetigt die Datenschutzerklaerung.",
  checkTeilnahmebedingungen: "Bitte bestaetigt die Teilnahmebedingungen.",
  checkWahrheit:
    "Bitte bestaetigt die Richtigkeit und Vollstaendigkeit der Angaben.",
};

function isBlank(value) {
  return typeof value !== "string" || value.trim().length === 0;
}

function normalizeIban(value) {
  if (typeof value !== "string") return value;
  return value.toUpperCase().replace(/\s+/g, "");
}

function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    return Number(value.replace(",", "."));
  }
  return NaN;
}

function sanitizeCreatePayload(body) {
  const data = { ...body };
  delete data.id;
  delete data.kampagneId;
  delete data.botschafter;
  delete data.botschafterId;
  delete data.notes;
  delete data.files;
  delete data.lettercontacts;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.emailBestaetigungProjekt;

  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "undefined") {
      delete data[key];
    }
  });

  data.ibanProjekt = normalizeIban(data.ibanProjekt);
  return data;
}

function validateCreatePayload(data) {
  const fieldErrors = {};
  const isSonderpreis = Boolean(data.sonderpreis);

  REQUIRED_FIELDS.forEach((key) => {
    const value = data[key];
    const numberField =
      key === "eigenmittel" ||
      key === "oeffentlicheZuwendungen" ||
      key === "privateSpenden";

    if (numberField) {
      const parsed = toNumber(value);
      if (Number.isNaN(parsed)) {
        fieldErrors[key] =
          REQUIRED_FIELD_MESSAGES[key] || "Dieses Feld muss eine Zahl sein";
      } else if (!Number.isInteger(parsed) || parsed < 0) {
        fieldErrors[key] = "Bitte eine gültige Zahl eingeben";
      } else {
        data[key] = parsed;
      }
      return;
    }

    if (isBlank(value)) {
      fieldErrors[key] =
        REQUIRED_FIELD_MESSAGES[key] || "Dieses Feld ist ein Pflichtfeld";
    }
  });

  if (!isSonderpreis && isBlank(data.benachteiligungProjekt)) {
    fieldErrors.benachteiligungProjekt =
      REQUIRED_FIELD_MESSAGES.benachteiligungProjekt;
  }

  if (isSonderpreis && isBlank(data.nachhaltigkeitProjekt)) {
    fieldErrors.nachhaltigkeitProjekt =
      REQUIRED_FIELD_MESSAGES.nachhaltigkeitProjekt;
  }

  if (isSonderpreis && isBlank(data.uebertragbarkeitProjekt)) {
    fieldErrors.uebertragbarkeitProjekt =
      REQUIRED_FIELD_MESSAGES.uebertragbarkeitProjekt;
  }

  if (!isBlank(data.plzTraeger) && !/^\d{5}$/.test(data.plzTraeger)) {
    fieldErrors.plzTraeger = "Bitte eine gültige PLZ eingeben.";
  }

  if (
    !isBlank(data.plzProjekt) &&
    typeof data.plzProjekt === "string" &&
    !/^\d{5}$/.test(data.plzProjekt)
  ) {
    fieldErrors.plzProjekt = "Bitte eine gültige PLZ eingeben.";
  }

  if (!isBlank(data.emailProjekt)) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.emailProjekt)) {
      fieldErrors.emailProjekt =
        "Dieses Feld muss eine gültige E-Mail-Adresse enthalten";
    }
  }

  if (!isBlank(data.ibanProjekt) && !/^DE\d{20}$/.test(data.ibanProjekt)) {
    fieldErrors.ibanProjekt = "Bitte eine gültige IBAN eingeben";
  }

  const phoneEmpty = isBlank(data.telefonnummerProjekt);
  const mobileEmpty = isBlank(data.mobilProjekt);
  if (phoneEmpty && mobileEmpty) {
    fieldErrors.telefonnummerProjekt =
      "Bitte gebt eine Telefonnummer oder Mobilnummer an.";
    fieldErrors.mobilProjekt =
      "Bitte gebt eine Telefonnummer oder Mobilnummer an.";
  }

  REQUIRED_CHECKBOXES.forEach((key) => {
    if (data[key] !== true) {
      fieldErrors[key] =
        CHECKBOX_MESSAGES[key] || "Bitte bestaetigt dieses Pflichtfeld.";
    }
  });

  Object.entries(MAX_LENGTH_FIELDS).forEach(([key, maxLength]) => {
    const value = data[key];
    if (typeof value === "string" && value.length > maxLength) {
      fieldErrors[key] =
        `Dieses Feld darf höchstens ${maxLength} Zeichen lang sein`;
    }
  });

  return fieldErrors;
}

function formatApiError(error) {
  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      status: 422,
      body: {
        code: "PRISMA_VALIDATION_ERROR",
        message: "Einige Angaben sind ungültig. Bitte prüft Eure Eingaben.",
      },
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return {
        status: 409,
        body: {
          code: "UNIQUE_CONSTRAINT",
          message:
            "Ein Datensatz mit diesen Angaben existiert bereits. Bitte prüft Eure Eingaben.",
        },
      };
    }
  }

  return {
    status: 500,
    body: {
      code: "INTERNAL_ERROR",
      message:
        "Ein technischer Fehler ist aufgetreten. Bitte versucht es erneut.",
    },
  };
}

export default async function handle(req, res) {
  console.log("api call");
  const session = await getServerSession(req, res, authOptions);

  if (req.method == "POST") {
    try {
      const data = sanitizeCreatePayload(req.body || {});
      const kampagne = await prisma.kampagne.findFirst({
        where: {
          abgeschlossen: false,
          aktiv: true,
        },
        select: { id: true },
      });

      if (!session && !kampagne) {
        return res.status(403).json({
          code: "CAMPAIGN_CLOSED",
          message: "Die Bewerbungsphase ist beendet.",
          msg: "Die Bewerbungsphase ist beendet.",
        });
      }

      const fieldErrors = validateCreatePayload(data);
      if (Object.keys(fieldErrors).length > 0) {
        return res.status(422).json({
          code: "VALIDATION_ERROR",
          message: "Bitte überprüft die markierten Felder.",
          msg: "Bitte überprüft die markierten Felder.",
          fieldErrors,
        });
      }

      data.kampagneId = kampagne ? kampagne.id : null;
      data.originalLetter = JSON.parse(JSON.stringify(data));
      const result = await prisma.letter.create({ data: data });

      if (result.emailProjekt) {
        await sendEmail({
          to:
            process.env.NODE_ENV === "development"
              ? ["info@larsknoke.com"]
              : result.emailProjekt,
          subject: result.sonderpreis
            ? "Town & Country Stiftungs-Sonderpreis: Bitte bestätigt Eure Bewerbung"
            : "12. Town & Country Stiftungspreis: Bitte bestätigt Eure Bewerbung",
          html: render(<VerifyEmail letter={result} />),
        });
      } else {
        await sendEmail({
          to: ["info@larsknoke.com"],
          subject: "TC-Stiftung - Stiftungspreis 2025 - Fehler",
          html: render(<ErrorEmail letter={result} />),
        });
      }

      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("api error: ", error);
      const apiError = formatApiError(error);
      return res.status(apiError.status).json(apiError.body);
    }
  }

  if (req.method == "PUT") {
    try {
      const body = req.body || {};
      const id = parseInt(body.id, 10);
      const expectedUpdatedAt = body.expectedUpdatedAt;

      if (!id) {
        return res.status(400).json({ message: "invalid id" });
      }

      const data = { ...body };
      [
        "id",
        "expectedUpdatedAt",
        "notes",
        "files",
        "botschafterId",
        "kampagneId",
        "botschafter",
        "kampagne",
        "lettercontacts",
        "createdAt",
        "updatedAt",
      ].forEach((k) => delete data[k]);

      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "undefined") {
          delete data[key];
        }
      });

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "no updatable fields" });
      }

      const where = expectedUpdatedAt
        ? { id, updatedAt: new Date(expectedUpdatedAt) }
        : { id };

      const updated = await prisma.letter.updateMany({
        where,
        data: { ...data, updatedAt: new Date() },
      });

      if (updated.count === 0) {
        return res.status(409).json({
          message:
            "Konflikt: Datensatz wurde zwischenzeitlich geaendert. Bitte neu laden.",
        });
      }

      const result = await prisma.letter.findUnique({ where: { id } });
      return res.status(200).json(result);
    } catch (error) {
      console.log("api error: ", error);
      const apiError = formatApiError(error);
      return res.status(apiError.status).json(apiError.body);
    }
  }

  return res.status(405).json({ message: "method not allowed" });
}
