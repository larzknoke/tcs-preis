import LetterTable from "@/components/letterTable";
import { Container, Heading } from "@chakra-ui/react";

function Admin() {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"8xl"}>
      <Heading color={"gray.700"} size={"md"} textAlign={"left"} mb={8}>
        Bewerbungen
      </Heading>
      <LetterTable />
    </Container>
  );
}

export default Admin;
