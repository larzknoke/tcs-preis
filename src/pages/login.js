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
} from "@chakra-ui/react";
import Image from "next/image";
import { PasswordField } from "@/components/passwordField";

export default function Login() {
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
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
                <PasswordField />
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
                <Button>Anmelden</Button>
              </Stack>
            </Stack>
          </Box>
        </VStack>
      </Container>
    </main>
  );
}
