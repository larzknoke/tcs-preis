import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import NextLink from "next/link";

export default function ForgotPage() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  const [status, setStatus] = useState(null);
  const [resetUrl, setResetUrl] = useState(null);

  async function onSubmit(values) {
    try {
      setStatus(null);
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      setStatus(
        json.ok
          ? "Wenn die E-Mail existiert, wurde ein Link zum Zurücksetzen verschickt."
          : "Fehler",
      );
      if (json.resetUrl) setResetUrl(json.resetUrl);
    } catch (err) {
      setStatus("Fehler beim Anfordern des Links");
    }
  }

  return (
    <Stack
      // minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        w={{ base: "full", md: "lg" }}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Image
            src="/tcs_logo.svg"
            alt="TCS Logo"
            width={180}
            height={24}
            marginBottom={4}
            priority
          />
          <Text fontSize={"2xl"}>Passwort vergessen</Text>
          <Text fontSize={"sm"} color={"gray.600"} textAlign={"center"}>
            Gib deine E-Mail-Adresse ein, wir senden dir einen Link zum
            Zurücksetzen.
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>E-Mail</FormLabel>
                <Input type="email" {...register("email")}></Input>
              </FormControl>
              {status && (
                <Text textAlign={"center"} fontWeight={"bold"}>
                  {status}
                </Text>
              )}

              <Stack spacing={6} pt={4} w="full">
                <Button
                  colorScheme="white"
                  isLoading={isSubmitting}
                  type="submit"
                  bg={"brand.900"}
                  _hover={{ bg: "brand.800" }}
                  w={"full"}
                >
                  Reset-Link anfordern
                </Button>
                <Text
                  as={NextLink}
                  href="/login"
                  color={"gray.900"}
                  textAlign={"center"}
                  w={"full"}
                >
                  Zurück zum Login
                </Text>
                {resetUrl && (
                  <Box>
                    <Text fontSize="sm">
                      DEV Reset-URL (nur in Entwicklung sichtbar):
                    </Text>
                    <Text fontSize="xs" wordBreak="break-all">
                      {resetUrl}
                    </Text>
                  </Box>
                )}
              </Stack>
            </VStack>
          </form>
        </Box>
      </Stack>
    </Stack>
  );
}
