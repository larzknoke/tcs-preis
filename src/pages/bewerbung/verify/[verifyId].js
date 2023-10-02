import prisma from "@/lib/prisma";
import {
  Flex,
  Container,
  Text,
  Alert,
  Box,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { dateFormatter } from "@/lib/utils";

import { useEffect, useState } from "react";

function VerifyLetter({ letter }) {
  console.log("letter: ", letter);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  async function sendConfirmEmail(letter) {
    try {
      setLoading(true);
      const res = await fetch("/api/letter/confirmEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(letter),
      });
      if (res.status != 200) {
        toast({
          title: "Ein Fehler ist aufgetreten",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
      } else {
        const resData = await res.json();
        setLoading(false);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      toast({
        title: "Ein Fehler ist aufgetreten",
        description: JSON.stringify(error),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    sendConfirmEmail(letter);
  }, []);

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      {loading ? (
        <Flex justifyContent={"center"} mt={16}>
          <Spinner color={"brand.900"} size={"xl"} />
        </Flex>
      ) : (
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
      )}
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
        verifyId: null,
      },
    });

    return { props: { letter } };
  } catch (error) {
    console.log("verifyError: ", error);
    return {
      redirect: {
        destination: "/bewerbung/verifyError",
        permanent: false,
      },
    };
  }
};

export default VerifyLetter;
