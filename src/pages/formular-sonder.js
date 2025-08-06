import NewLetter from "@/components/letter/newLetter";
import { Heading, HStack, Container, VStack, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import NewLetterSonder from "@/components/sonder/newLetterSonder";

function FormularSonder() {
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
            Bewerbung zum 12. Town & Country Sonderpreis
          </Heading>
        </HStack>
        <NewLetterSonder />
      </VStack>
    </Container>
  );
}

export default FormularSonder;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("formular session", session);
  const kampagnes = await prisma.kampagne.findMany({
    where: {
      abgeschlossen: false,
      aktiv: true,
    },
  });
  const validKampagne = Object.keys(kampagnes).length > 0;
  console.log("validKampagne: ", validKampagne);
  if (!session && !validKampagne) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
