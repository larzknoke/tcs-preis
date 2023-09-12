import prisma from "@/lib/prisma";
import {
  Container,
  Text,
  Alert,
  Box,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { dateFormatter } from "@/lib/utils";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import ConfirmEmail from "@/email/ConfirmEmail";
import ConfirmStiftungEmail from "@/email/ConfirmStiftungEmail";
import { LetterPDF } from "@/email/pdf";
import { renderToBuffer } from "@react-pdf/renderer";

function VerifyLetter({ letter }) {
  console.log("letter: ", letter);

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <Box
        sx={{
          my: { base: 4, md: 8 },
          py: { base: 2, md: 10 },
          px: { base: 0, md: 8 },
          rounded: "md",
        }}
      >
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          rounded={"md"}
          bg={"brand.900"}
          color={"white"}
          p={8}
        >
          <AlertIcon boxSize="40px" mr={0} color={"white"} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Bewerbung erfolgreich bestätigt.
          </AlertTitle>
          <AlertDescription maxWidth="2xl" mt={2}>
            <Text>
              {letter.organisationProjekt} / {letter.nameTraeger}
            </Text>
            <Text>{dateFormatter(letter.createdAt)}</Text>
            <Text fontWeight={"700"} mt={4}>
              Sie erhalten zusätzlich eine Bestätigungs-Email.
            </Text>
          </AlertDescription>
        </Alert>
      </Box>
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
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : letter.emailProjekt,
        subject: "TC-Stiftung - Stiftungspreis 2023 - Bestätigung",
        html: render(<ConfirmEmail letter={letter} />),
      });
      await sendEmail({
        to:
          process.env.NODE_ENV === "development"
            ? "info@larsknoke.com"
            : ["stiftungspreis@tc-stiftung.de", "info@larsknoke.com"],
        subject: "TC-Stiftung - Stiftungspreis 2023 - Eingang neue Bewerbung",
        html: render(<ConfirmStiftungEmail letter={letter} />),
        attachments: [
          {
            filename: "Bewerbung.pdf",
            content: await renderToBuffer(<LetterPDF letter={letter} />),
          },
        ],
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
