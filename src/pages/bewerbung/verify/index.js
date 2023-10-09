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
  Card,
  CardBody,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { dateFormatter } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function VerifyLetter() {
  const router = useRouter();
  const { verifyId } = router.query;
  const [loading, setLoading] = useState(true);
  const [letterData, setLetterData] = useState(null);
  const [letterError, setLetterError] = useState(false);

  async function getLetter(verifyId) {
    try {
      setLoading(true);
      const res = await fetch(`/api/letter?verifyId=${verifyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status != 200) {
        setLoading(false);
        setLetterError(true);
      } else {
        const resData = await res.json();
        setLetterData(resData);
        setLoading(false);
        if (resData?.verified) {
          sendConfirmEmail(resData);
        }
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      setLetterError(true);
    }
  }

  async function sendConfirmEmail(letter) {
    try {
      const res = await fetch("/api/letter/confirmEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letter }),
      });
      if (res.status != 200) {
        setLetterError(true);
      } else {
        const resData = await res.json();
        console.log("resData", resData);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      setLetterError(true);
    }
  }

  useEffect(() => {
    if (verifyId) {
      getLetter(verifyId);
    }
  }, [verifyId]);

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      {loading && (
        <Flex justifyContent={"center"} mt={16}>
          <Spinner color={"brand.900"} size={"xl"} />
        </Flex>
      )}
      {letterData?.verified && (
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
                {letterData?.organisationProjekt} / {letterData?.nameTraeger}
              </Text>
              <Text>{dateFormatter(letterData?.createdAt)}</Text>
              <Text fontWeight={"700"} mt={4}>
                Sie erhalten zusätzlich eine Bestätigungs-Email.
              </Text>
            </AlertDescription>
          </Alert>
        </Box>
      )}
      {letterError && (
        <Card my={16}>
          <CardBody>
            <VStack gap={6} p={6}>
              <Heading size={"md"} color={"red.600"}>
                Bestätigungs Fehler
              </Heading>
              <Text>
                Der Verifizierungs-Link wurde entweder schon bestätigt und ist
                nun ungültig oder ein Fehler ist aufgetreten.
              </Text>
              <Text>Bitte kontaktieren Sie die Town & Country Stiftung.</Text>
            </VStack>
          </CardBody>
        </Card>
      )}
    </Container>
  );
}

export default VerifyLetter;
