import prisma from "@/lib/prisma";
import {
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
  VStack,
} from "@chakra-ui/react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
// import kampagneDetail from "@/components/kampagne/kampagneDetail";
import { dateFormatter } from "@/lib/utils";
import LetterTable from "@/components/letter/letterTable";
import EditKampagneModal from "@/components/kampagne/editKampagneModal";

function Kampagne({ kampagne }) {
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  function statusBadge(status) {
    return status ? "green" : "yellow";
  }

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"8xl"}>
      <HStack justify={"space-between"}>
        <VStack alignItems={"start"}>
          <Heading fontSize={"22"} color={"gray.300"} fontWeight={"500"}>
            Kampagne
          </Heading>
          <Heading fontSize={"24"}>{kampagne.name}</Heading>
        </VStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Erstellt: {dateFormatter(kampagne.createdAt)}
          </Text>
          <Tooltip label="Status" placement="top">
            <Badge
              variant="outline"
              colorScheme={statusBadge(kampagne.abgeschlossen)}
              fontSize={"md"}
            >
              {kampagne.abgeschlossen ? "Abgeschlossen" : "Offen"}
            </Badge>
          </Tooltip>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HiOutlineCog6Tooth />}
              variant="ghost"
              size={"lg"}
            />
            <MenuList>
              <MenuItem onClick={editOnOpen}>Bearbeiten</MenuItem>
              <EditKampagneModal
                kampagne={kampagne}
                editIsOpen={editIsOpen}
                editOnClose={editOnClose}
              />
              <MenuItem>Löschen</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <Divider my={4} />
      <LetterTable letters={kampagne.letters} />
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const kampagne = await prisma.kampagne.findFirstOrThrow({
    where: {
      id: parseInt(id),
    },
    include: {
      letters: {
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
      },
    },
  });
  return { props: { kampagne } };
};

export default Kampagne;
