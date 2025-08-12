import LetterTable from "@/components/letter/letterTable";
import { Container, Heading } from "@chakra-ui/react";
import prisma from "@/lib/prisma";

function Bewerbungen({ letters }) {
  return (
    <Container display={"flex"} flexDirection={"column"} minW={"100%"}>
      <LetterTable letters={letters} />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const letters = await prisma.letter.findMany({
    where: {
      verified: true,
    },
    select: {
      id: true,
      nameTraeger: true,
      vorstandTraeger: true,
      strasseTraeger: true,
      plzTraeger: true,
      ortTraeger: true,
      bundeslandTraeger: true,
      vereinTraeger: true,
      organisationProjekt: true,
      ansprechpartnerProjekt: true,
      telefonnummerProjekt: true,
      mobilProjekt: true,
      emailProjekt: true,
      wwwProjekt: true,
      ibanProjekt: true,
      kontoNameProjekt: true,
      botschafterId: true,
      kampagneId: true,
      kampagne: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
      andereLizenzpartner: true,
      zuwendungAndere: true,
      status: true,
      verified: true,
      verifyId: true,
      bankNameProjekt: true,
      bundeslandProjekt: true,
      ehrenamtlichAnzahl: true,
      ehrenamtlichStunden: true,
      hauptamtlichAnzahl: true,
      hauptamtlichStunden: true,
      mitarbeiterProjekt: true,
      nameProjekt: true,
      strasseProjekt: true,
      wannProjekt: true,
      checkFreistellung: true,
      terminGeld: true,
      terminUebergabe: true,
      bildmaterial: true,
      socialFremd: true,
      socialNotiz: true,
      socialTCS: true,
      sonderpreis: true,
      aufmerksamkeit: true,
      nachhaltigkeitProjekt: true,
      uebertragbarkeitProjekt: true,
      presseEinladung: true,
      presseErlaubt: true,
      presseErledigt: true,
      presseFreigabe: true,
      presseMitteilung: true,
      presseVersendet: true,
      zwb1000: true,
      zwb5000: true,
      ortProjekt: true,
      plzProjekt: true,
      jury: true,
      juryStatus: true,
      botschafterConfirm: true,
      botschafter: {
        select: {
          id: true,
          name: true,
          strasse: true,
          plz: true,
          ort: true,
          bundesland: true,
          anrede: true,
          firma: true,
          mobil: true,
          primaryId: true,
          telefon: true,
          typ: true,
          vorname: true,
          email: true,
        },
      },
    },
  });
  return { props: { letters } };
};

export default Bewerbungen;
