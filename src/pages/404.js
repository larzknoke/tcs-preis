import { Button, Container, Text } from "@chakra-ui/react";
import Link from "next/link";
export default function Custom404() {
  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      maxWidth={"8xl"}
      py={16}
      alignItems={"center"}
      gap={12}
    >
      <Text textAlign={"center"}>Die Seite wurde nicht gefunden.</Text>
      <Link href="/">
        <Button w={40}>Zur Startseite</Button>
      </Link>
    </Container>
  );
}
