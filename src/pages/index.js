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
            color={"gray.700"}
            size={"xl"}
            textAlign={"center"}
            mb={{ base: 0, md: 0 }}
          >
            12. Town & Country Stiftungspreis <br />
          </Heading>
          <Heading
            color={"gray.500"}
            size={"lg"}
            textAlign={"center"}
            mt={{ base: 0, md: 4 }}
          >
            und Sonderpreis:
          </Heading>
          <Heading
            color={"gray.700"}
            size={"lg"}
            textAlign={"center"}
            mb={{ base: 0, md: 8 }}
          >
            Jung trifft Alt - Begegnung, die verbindet
          </Heading>
        </VStack>
        {validKampagne || session ? <TeaserText /> : <CloseText />}

        {validKampagne ||
          (session && (
            <HStack justifyContent={"center"} gap={8} mt={8}>
              <Button
                href="/formular"
                as={NextLink}
                rightIcon={<ArrowForwardIcon />}
                colorScheme="green"
                minWidth={"250px"}
              >
                Formular Stiftungspreis 2025
              </Button>
              <Center height="50px">
                <Divider orientation="vertical" />
              </Center>
              <Button
                href="/formular-sonder"
                as={NextLink}
                rightIcon={<ArrowForwardIcon />}
                colorScheme="green"
                minWidth={"250px"}
              >
                Formular Sonderpreis 2025
              </Button>
            </HStack>
          ))}
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
