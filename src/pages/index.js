import TeaserText from "@/components/teaser-text";
import {
  Container,
  VStack,
  Heading,
  Button,
  Tooltip,
  Text,
  HStack,
  Center,
  Divider,
  Flex,
  Hide,
} from "@chakra-ui/react";
import Image from "next/image";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import CookieBanner from "@/components/layout/cookie";
import CloseText from "@/components/close-text";
import prisma from "@/lib/prisma";
import { useSession } from "next-auth/react";

export default function Home({ validKampagne }) {
  const { data: session } = useSession();
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
        <VStack spacing={2} alignItems={"center"}>
          <Heading
            color={"brand2.900"}
            size={"xl"}
            textAlign={"center"}
            mb={{ base: 0, md: 0 }}
          >
            12. Town & Country Stiftungspreis <br />
          </Heading>
          <Heading
            color={"brand.900"}
            size={"lg"}
            textAlign={"center"}
            mt={{ base: 0, md: 4 }}
          >
            und Sonderpreis:
          </Heading>
          <Heading
            color={"brand.900"}
            size={"md"}
            textAlign={"center"}
            mb={{ base: 0, md: 8 }}
            className="italic"
          >
            „Jung trifft Alt – Begegnung, die verbindet“
          </Heading>
        </VStack>
        {(validKampagne || session || false) && (
          <Flex
            my={{ base: 4, md: 4 }}
            gap={{ base: 6, md: 10 }}
            direction={{ base: "column", md: "row" }}
          >
            <Button
              href="/formular"
              as={NextLink}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="white"
              minWidth={"250px"}
              bg={"brand2.900"}
              _hover={{ bg: "brand2.800" }}
            >
              Bewerbung Stiftungspreis
            </Button>
            <Hide below="md">
              <Center height="45px">
                <Divider orientation="vertical" />
              </Center>
            </Hide>
            <Button
              href="/formular-sonder"
              as={NextLink}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="white"
              bg={"brand.900"}
              _hover={{ bg: "brand.800" }}
              minWidth={"250px"}
            >
              Bewerbung Sonderpreis
            </Button>
          </Flex>
        )}

        {validKampagne || session || false ? <TeaserText /> : <CloseText />}
      </VStack>
      <CookieBanner />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const kampagnes = await prisma.kampagne.findMany({
    where: {
      abgeschlossen: false,
      aktiv: true,
    },
  });
  const validKampagne = Object.keys(kampagnes).length > 0;
  console.log("validKampagne: ", validKampagne);
  return { props: { validKampagne } };
};
