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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { dateFormatter } from "@/lib/utils";
import EditKampagneModal from "@/components/kampagne/editKampagneModal";
import KampagnenBots from "@/components/kampagne/kampagnenBots";
import KampagnenBundesland from "@/components/kampagne/kampagnenBundesland";

function Kampagne({ kampagne, kampagnenBots }) {
  const groupLetters = kampagne.letters.reduce((x, y) => {
    (x[y.bundeslandProjekt ? y.bundeslandProjekt : y.bundeslandTraeger] =
      x[y.bundeslandProjekt ? y.bundeslandProjekt : y.bundeslandTraeger] ||
      []).push(y);
    return x;
  }, {});
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
      <Tabs>
        <TabList>
          <Tab>Botschafter</Tab>
          <Tab>Bundesland</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0} py={6}>
            <KampagnenBots
              kampagnenBots={kampagnenBots}
              kampagneId={kampagne.id}
            />
          </TabPanel>
          <TabPanel px={0} py={6}>
            <KampagnenBundesland groupLetters={groupLetters} />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
          lettercontacts: {
            select: {
              name: true,
              anrede: true,
              telefon: true,
              funktion: true,
              email: true,
            },
          },
          botschafter: {
            select: { vorname: true, name: true, id: true },
          },
        },
      },
      // botcontacts: true,
    },
  });
  const kampagnenBots = await prisma.botschafter.findMany({
    where: {
      letters: {
        some: { kampagneId: parseInt(id), verified: true },
      },
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
          lettercontacts: {
            select: {
              name: true,
              anrede: true,
              telefon: true,
              funktion: true,
              email: true,
            },
          },
        },
      },
      botcontacts: true,
    },
  });
  return { props: { kampagne, kampagnenBots } };
};

export default Kampagne;
