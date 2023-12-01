import {
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  Badge,
} from "@chakra-ui/react";
import NoteTable from "../notes/noteTable";
import TraegerDetail from "./details/traeger";
import ProjektDetail from "./details/projekt";
import FinanzierungDetail from "./details/finanzierung";
import DateienDetail from "./details/dateien";
import BeschreibungDetail from "./details/beschreibung";
import InternDetail from "./details/intern";
import PresseDetail from "./details/presse";
import LetterContactTable from "./letterContactTable";

function LetterDetail({ letter }) {
  return (
    <Tabs>
      <TabList>
        <Tab>Träger</Tab>
        <Tab>Projekt</Tab>
        <Tab>Beschreibung</Tab>
        <Tab>Finanzierung</Tab>
        <Tab>Intern</Tab>
        <Tab>Presse</Tab>
        <Tab>Dateien</Tab>
        <Tab>
          Notizen
          {letter.notes.length > 0 && (
            <Badge colorScheme="green" ml={2}>
              {letter.notes.length}
            </Badge>
          )}
        </Tab>
        <Tab>Ansprechpartner</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0} py={6}>
          <TraegerDetail letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <ProjektDetail letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <BeschreibungDetail letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <FinanzierungDetail letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <InternDetail letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <PresseDetail letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <DateienDetail letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <NoteTable letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <LetterContactTable letter={letter} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default LetterDetail;
