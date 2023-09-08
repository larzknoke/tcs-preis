import prisma from "@/lib/prisma";
import {
  VStack,
  Container,
  Divider,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { dateFormatter } from "@/lib/utils";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import ConfirmEmail from "@/email/ConfirmEmail";

function VerifyLetter({ letter }) {
  console.log("letter: ", letter);

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <HStack justify={"space-between"}>
        <VStack alignItems={"start"}>
          <Heading fontSize={"22"} color={"gray.300"} fontWeight={"500"}>
            Bewerbung
          </Heading>
          <Heading fontSize={"24"}>{letter.organisationProjekt}</Heading>
        </VStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Eingang: {dateFormatter(letter.createdAt)}
          </Text>
          <Text>{letter.verified ? "Bestätigt" : "nicht Bestätigt"} </Text>
        </HStack>
      </HStack>
      <Divider my={4} />
      <Text>Sie erhalten zusätzlich eine Bestätigungs-Email.</Text>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  console.log("ctx: ", ctx);
  const { verifyId } = ctx.params;

  try {
    const letter = await prisma.letter.update({
      where: {
        verifyId: verifyId,
      },
      data: {
        verified: true,
      },
    });

    if (letter && letter.verified) {
      await sendEmail({
        to: "info@larsknoke.com",
        subject: "TC-Stiftung - Stiftungspreis 2023 - Bestätigung 2",
        html: render(<ConfirmEmail letter={letter} />),
      });
    }

    return { props: { letter } };
  } catch (error) {
    console.log("error: ", error);
    return {
      notFound: true,
    };
  }
};

export default VerifyLetter;
