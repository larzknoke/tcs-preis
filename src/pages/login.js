import TeaserText from "@/components/teaser-text";
import {
  Container,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Box,
  Stack,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { PasswordField } from "@/components/passwordField";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: "Bitte überprüfen Sie Ihre E-Mail und Passwort.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Fehler",
        description:
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
        <VStack gap={8}>
          <Image
            src="/tcs_logo.svg"
            alt="TCS Logo"
            width={180}
            height={24}
            priority
          />
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Stack>
                <HStack justify="space-between">
                  <Checkbox defaultChecked size={"sm"}>
                    Anmeldung merken
                  </Checkbox>
                  <Button variant="text" size="sm">
                    Passwort vergessen?
                  </Button>
                </HStack>
                <Stack spacing="6">
                  <Button type="submit" isLoading={isLoading}>
                    Anmelden
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </VStack>
      </Container>
    </main>
  );
}
