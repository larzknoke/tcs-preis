import NewLetter from "@/components/newLetter";
import { Heading, HStack, Container, VStack, Flex } from "@chakra-ui/react";
import Image from "next/image";

function Formular() {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <VStack gap={8} alignItems={"start"}>
        <HStack direction={"row"} alignItems={"center"} gap={6}>
          <Image
            src="/tcs_logo.svg"
            alt="TCS Logo"
            width={80}
            height={24}
            priority
          />
          <Heading color={"gray.600"} size={"md"} textAlign={"center"}>
            Bewerbung zum 11. Town & Country Stiftungspreis
          </Heading>
        </HStack>
        <NewLetter />
      </VStack>
    </Container>
  );
}

export default Formular;
