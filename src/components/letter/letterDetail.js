import { SimpleGrid, useClipboard } from "@chakra-ui/react";
import NoteTable from "../notes/noteTable";
import TraegerDetail from "./details/traeger";
import ProjektDetail from "./details/projekt";
import FinanzierungDetail from "./details/finanzierung";
import DateienDetail from "./details/dateien";

function LetterDetail({ letter }) {
  return (
    <SimpleGrid
      spacing={6}
      columns={{ sm: 1, md: 2 }}
      // minChildWidth={"500px"}
      //   templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <TraegerDetail letter={letter} />
      <ProjektDetail letter={letter} />
      <FinanzierungDetail letter={letter} />
      <DateienDetail letter={letter} />
      <NoteTable letter={letter} />
    </SimpleGrid>
  );
}

export default LetterDetail;
