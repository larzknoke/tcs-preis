import TeaserText from "@/components/teaser-text";
import { Container, VStack, Heading, Button } from "@chakra-ui/react";
import Image from "next/image";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function Home() {
  return (
    <main>
      <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
        <VStack gap={8}>
          <Image
            src="/tcs_logo.svg"
            alt="TCS Logo"
            width={180}
            height={24}
            priority
          />
          <Heading color={"gray.700"} size={"xl"} textAlign={"center"} mb={8}>
            11. Town & Country Stiftungspreis
          </Heading>
          <TeaserText />
          <Button
            href="/formular"
            as={NextLink}
            rightIcon={<ArrowForwardIcon />}
            colorScheme="green"
            form="new-angebot-form"
            type="submit"
            width={"30%"}
          >
            Zum Formular
          </Button>
        </VStack>
      </Container>
    </main>
  );
}
