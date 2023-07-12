import { Container, Heading } from "@chakra-ui/react";

function Admin() {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <Heading color={"gray.700"} size={"md"} textAlign={"left"} mb={8}>
        Admin Bereich
      </Heading>
    </Container>
  );
}

export default Admin;
