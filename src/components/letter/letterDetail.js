import {
  SimpleGrid,
  useClipboard,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
} from "@chakra-ui/react";
import NoteTable from "../notes/noteTable";
import TraegerDetail from "./details/traeger";
import ProjektDetail from "./details/projekt";
import FinanzierungDetail from "./details/finanzierung";
import DateienDetail from "./details/dateien";
import BeschreibungDetail from "./details/beschreibung";
import InternDetail from "./details/intern";

function LetterDetail({ letter }) {
  return (
    <Tabs>
      <TabList>
        <Tab>Träger</Tab>
        <Tab>Projekt</Tab>
        <Tab>Beschreibung</Tab>
        <Tab>Finanzierung</Tab>
        <Tab>Intern</Tab>
        <Tab>Dateien</Tab>
        <Tab>Notizen</Tab>
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
          <DateienDetail letter={letter} />
        </TabPanel>
        <TabPanel px={0} py={6}>
          <NoteTable letter={letter} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default LetterDetail;
