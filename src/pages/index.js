import TeaserText from "@/components/teaser-text";
import { Container, VStack, Heading, Button, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import CookieBanner from "@/components/layout/cookie";
import CloseText from "@/components/close-text";
import prisma from "@/lib/prisma";

export default function Home({ validKampagne }) {
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
        {validKampagne ? <TeaserText /> : <CloseText />}

        {validKampagne && (
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
        )}
      </VStack>
      <CookieBanner />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const kampagnes = await prisma.kampagne.findMany({
    where: {
      abgeschlossen: false,
    },
  });
  const validKampagne = Object.keys(kampagnes).length > 0;
  console.log("validKampagne: ", validKampagne);
  return { props: { validKampagne } };
};
