import NewInvite from "@/components/invite/newInvite";
import NewLetter from "@/components/letter/newLetter";
import { Heading, HStack, Container, VStack, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";
// import prisma from "@/lib/prisma";

function Anmeldung() {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <VStack gap={8} alignItems={"start"}>
        <HStack direction={"row"} alignItems={"center"} gap={6}>
          <Link href="/">
            <Image
              src="/gala_header.jpg"
              alt="Gala Anmeldung"
              width={1120}
              height={200}
              priority
              className="rounded"
            />
          </Link>
          {/* <Heading color={"gray.600"} size={"md"} textAlign={"center"}>
            12. Town &amp; Country Stiftungsgala{" "}
          </Heading> */}
        </HStack>
        {/* <NewLetter /> */}
        <NewInvite />
      </VStack>
    </Container>
  );
}

export default Anmeldung;

export const getServerSideProps = async (context) => {
  // const session = await getServerSession(context.req, context.res, authOptions);
  // console.log("formular session", session);
  // const kampagnes = await prisma.kampagne.findMany({
  //   where: {
  //     abgeschlossen: false,
  //   },
  // });
  // const validKampagne = Object.keys(kampagnes).length > 0;
  // console.log("validKampagne: ", validKampagne);
  // if (!session && !validKampagne) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };

  return { props: {} };
};
