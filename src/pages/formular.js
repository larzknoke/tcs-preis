import NewLetter from "@/components/letter/newLetter";
import { Heading, HStack, Container, VStack, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

function Formular() {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <VStack gap={8} alignItems={"start"}>
        <HStack direction={"row"} alignItems={"center"} gap={6}>
          <Link href="/">
            <Image
              src="/tcs_logo.svg"
              alt="TCS Logo"
              width={80}
              height={24}
              priority
            />
          </Link>
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
