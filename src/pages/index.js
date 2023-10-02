import TeaserText from "@/components/teaser-text";
import { Container, VStack, Heading, Button, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import CookieBanner from "@/components/layout/cookie";

export default function Home() {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <VStack gap={8}>
        <Image
          src="/tcs_logo.svg"
          alt="TCS Logo"
          width={180}
          height={24}
          priority
        />
        <Heading
          color={"gray.700"}
          size={"xl"}
          textAlign={"center"}
          mb={{ base: 0, md: 8 }}
        >
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
          minWidth={"250px"}
        >
          Zum Formular
        </Button>
      </VStack>
      <CookieBanner />
    </Container>
  );
}
