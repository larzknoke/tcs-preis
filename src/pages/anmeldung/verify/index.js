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
import Link from "next/link";

function VerifyInvite() {
  const router = useRouter();
  const { verifyId } = router.query;
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState(null);
  const [inviteError, setInviteError] = useState(false);

  async function getInvite(verifyId) {
    try {
      setLoading(true);
      const res = await fetch(`/api/invite/verify?verifyId=${verifyId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status != 200) {
        setLoading(false);
        setInviteError(true);
      } else {
        const resData = await res.json();
        setInviteData(resData);
        setLoading(false);
        if (resData?.verified) {
          sendConfirmEmail(resData);
        }
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      setInviteError(true);
    }
  }

  async function sendConfirmEmail(invite) {
    try {
      const res = await fetch("/api/invite/confirmEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invite }),
      });
      if (res.status != 200) {
        setInviteError(true);
      } else {
        const resData = await res.json();
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("sendConfirmEmail Error: ", error);
      setInviteError(true);
    }
  }

  useEffect(() => {
    if (verifyId) {
      getInvite(verifyId);
    }
  }, [verifyId]);

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      {loading && (
        <Flex justifyContent={"center"} mt={16}>
          <Spinner color={"brand.900"} size={"xl"} />
        </Flex>
      )}
      {inviteData?.verified && (
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
              Teilnahme erfolgreich bestätigt.
            </AlertTitle>
            <AlertDescription maxWidth="2xl" mt={2}>
              <Text>
                {inviteData?.vorname} {inviteData?.name}
              </Text>
              <Text>{inviteData?.unternehmen}</Text>
              <Text>{dateFormatter(inviteData?.createdAt)}</Text>
              <Text fontWeight={"700"} mt={4}>
                Sie erhalten zusätzlich eine Bestätigungs-Email.
              </Text>
            </AlertDescription>
          </Alert>
        </Box>
      )}
      {inviteError && !inviteData?.verified && (
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
              <Text textAlign={"center"}>
                Bitte kontaktieren Sie die Town & Country Stiftung: <br />
                <Link href="mailto:stiftungspreis@tc-stiftung.de">
                  stiftungspreis@tc-stiftung.de
                </Link>
              </Text>
            </VStack>
          </CardBody>
        </Card>
      )}
    </Container>
  );
}

export default VerifyInvite;
