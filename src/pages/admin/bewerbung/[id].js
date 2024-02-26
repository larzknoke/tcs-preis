import prisma from "@/lib/prisma";
import {
  VStack,
  Container,
  Divider,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Badge,
  Tooltip,
  useDisclosure,
  Text,
  useToast,
  Spinner,
  MenuDivider,
} from "@chakra-ui/react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import LetterDetail from "@/components/letter/letterDetail";
import StatusModal from "@/components/letter/statusModal";
import { dateFormatter } from "@/lib/utils";
import Link from "next/link";
import ConfirmModal from "@/components/letter/confirmModal";
import { useState } from "react";
import { exportToExcel } from "react-json-to-excel";
import { PressePDF } from "@/pdf/pressePDF";
import { pdf } from "@react-pdf/renderer";
import { LetterBotPDF } from "@/pdf/letterBotPDF";

function Bewerbung({ letter }) {
  const [loading, setLoading] = useState();
  const toast = useToast();
  const {
    isOpen: statusIsOpen,
    onOpen: statusOnOpen,
    onClose: statusOnClose,
  } = useDisclosure();
  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onClose: confirmOnClose,
  } = useDisclosure();

  function statusBadge(status) {
    switch (status) {
      case "offen":
        return "yellow";
      case "klaerung":
        return "orange";
      case "1111":
        return "green";
      case "5000":
        return "green";
      case "ausland1111":
        return "blue";
      case "ausland5000":
        return "blue";
      case "abgelehnt":
        return "red";
    }
  }

  async function sendConfirmEmail(letter) {
    try {
      setLoading(true);
      const res = await fetch("/api/letter/confirmEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letter }),
      });
      if (res.status != 200) {
        toast({
          title: "Ein Fehler ist aufgetreten",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      } else {
        const resData = await res.json();
        console.log("resData", resData);
        toast({
          title: `Email wurde an "${resData.letter.emailProjekt}" versendet.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      toast({
        title: "Ein Fehler ist aufgetreten",
        description: JSON.stringify(error),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    }
  }

  // function exportPresse() {
  //   const date = new Date().toLocaleDateString("de-DE").replace(/\./g, "-");
  //   const letterExport = {
  //     id: letter.id,
  //     "Name Träger": letter.nameTraeger,
  //     "Name Organisation": letter.organisationProjekt,
  //     "Name Projekt": letter.nameProjekt,
  //     "Ansprechpartner Projekt": letter.ansprechpartnerProjekt,
  //     "Email Projekt": letter.emailProjekt,
  //     "Telefon Projekt": letter.telefonnummerProjekt,
  //     "Mobil Projekt": letter.mobilProjekt,
  //     "WWW Projekt": letter.wwwProjekt,
  //     "Seit wann besteht das Projekt": letter.wannProjekt,
  //     Mitarbeiter: letter.mitarbeiterProjekt,
  //     "Hauptamtlich Anzahl / Stunden": `${letter.hauptamtlichAnzahl} / ${letter.hauptamtlichStunden}`,
  //     "Ehrenamtlich Anzahl / Stunden": `${letter.ehrenamtlichAnzahl} / ${letter.ehrenamtlichStunden}`,
  //     Projektbeschreibung: letter.beschreibungProjekt,
  //     "Zielsetzung des Projektes": letter.zielsetzungProjekt,
  //     Benachteiligung: letter.benachteiligungProjekt,
  //     Projektumsetzung: letter.umsetzungProjekt,
  //     "Bisherige Ergebnisse": letter.bisherigeErgebnisse,
  //     "Botschafter Name ": `${letter.botschafter.vorname} / ${letter.botschafter.name}`,
  //     "Botschafter Email": letter.botschafter.email,
  //     "Botschafter Telefon": letter.botschafter.telefon,
  //     "Botschafter Mobil": letter.botschafter.mobil,
  //   };
  //   exportToExcel(
  //     [letterExport],
  //     "bewerbung_" + letter.id + "_presse-export_" + date
  //   );
  // }

  async function exportPresse() {
    const blob = await pdf(<PressePDF letter={letter} />).toBlob();
    saveAs(blob, `Presse_Bewerbung${letter.id}.pdf`);
  }

  async function exportPDF() {
    const blob = await pdf(<LetterBotPDF letter={letter} />).toBlob();
    saveAs(blob, `Presse_Bewerbung${letter.id}.pdf`);
  }

  return loading ? (
    <Container
      display={"flex"}
      flexDirection={"column"}
      maxWidth={"7xl"}
      alignItems={"center"}
      py={32}
    >
      <Spinner color="blue.500" size={"xl"} />
    </Container>
  ) : (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"7xl"}>
      <HStack
        justify={"space-between"}
        flexDirection={{ sm: "column", md: "row" }}
        mb={4}
      >
        <Heading fontSize={"22"} color={"gray.300"} fontWeight={"500"}>
          Bewerbung
          {!letter.verified && (
            <Tooltip label="Bewerbung bestätigen" placement="top">
              <Badge
                variant="outline"
                colorScheme={"red"}
                fontSize={"md"}
                ml={2}
                _hover={{ cursor: "pointer" }}
                onClick={confirmOnOpen}
              >
                NICHT BESTÄTIGT
              </Badge>
            </Tooltip>
          )}
          <ConfirmModal
            confirmOnOpen={confirmOnOpen}
            confirmIsOpen={confirmIsOpen}
            confirmOnClose={confirmOnClose}
            letter={letter}
          />
        </Heading>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Eingang: {dateFormatter(letter.createdAt)}
          </Text>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Aktualisiert: {dateFormatter(letter.updatedAt)}
          </Text>
          <Link
            href={
              letter.kampagne
                ? "/admin/kampagne/" + letter.kampagne?.id
                : "/admin/kampagne"
            }
          >
            <Text fontSize={"sm"} color={"gray.400"} mr={3}>
              Kampagne: {letter.kampagne ? letter.kampagne.name : "-"}
            </Text>
          </Link>
          <Tooltip label="Status" placement="top">
            <Badge
              variant="outline"
              colorScheme={statusBadge(letter.status)}
              fontSize={"md"}
              _hover={{ cursor: "pointer" }}
              onClick={statusOnOpen}
            >
              {letter.status}
            </Badge>
          </Tooltip>
          <StatusModal
            statusOnOpen={statusOnOpen}
            statusOnClose={statusOnClose}
            statusIsOpen={statusIsOpen}
            letter={letter}
          />
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HiOutlineCog6Tooth />}
              variant="ghost"
              size={"lg"}
            />
            <MenuList>
              <MenuItem onClick={() => sendConfirmEmail(letter)}>
                Bestätigung erneut senden
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => exportPresse(letter)}>
                Export Presse
              </MenuItem>
              <MenuItem onClick={() => exportPDF(letter)}>Export PDF</MenuItem>
              <MenuDivider />
              <MenuItem isDisabled={true}>Bearbeiten</MenuItem>
              <MenuItem isDisabled={true}>Löschen</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <Heading fontSize={"24"}>
        {letter.id} | {letter.organisationProjekt}
      </Heading>
      <Divider my={4} />
      <LetterDetail letter={letter} />
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    const letter = await prisma.letter.findFirstOrThrow({
      where: {
        id: parseInt(id),
      },
      include: {
        botschafter: { include: { botcontacts: true } },
        kampagne: true,
        notes: true,
        files: true,
        lettercontacts: true,
      },
    });
    return { props: { letter } };
  } catch (error) {
    console.log("error", error);
    return {
      notFound: true,
    };
  }
};

export default Bewerbung;
