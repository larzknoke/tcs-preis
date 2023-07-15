import LetterTable from "@/components/letterTable";
import { Container, Heading } from "@chakra-ui/react";

function Bewerbungen() {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"8xl"}>
      <LetterTable />
    </Container>
  );
}

export default Bewerbungen;
