import React, { useEffect, useState } from "react";
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
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import NextLink from "next/link";

export default function ResetPage() {
  const router = useRouter();
  const { token: qToken, email: qEmail } = router.query;
  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (qToken && qEmail) {
      // prefill if available
    }
  }, [qToken, qEmail]);

  async function onSubmit(values) {
    try {
      setStatus(null);
      const payload = {
        email: values.email || qEmail,
        token: values.token || qToken,
        password: values.password,
      };
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus(
          "Passwort wurde zurückgesetzt. Du wirst zum Login weitergeleitet.",
        );
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setStatus(json.error || "Fehler");
      }
    } catch (err) {
      setStatus("Fehler beim Zurücksetzen");
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
          <Text fontSize={"2xl"}>Passwort zurücksetzen</Text>
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
                <Input
                  defaultValue={qEmail || ""}
                  {...register("email")}
                ></Input>
              </FormControl>

              {status && (
                <Text textAlign={"center"} fontWeight={"bold"}>
                  {status}
                </Text>
              )}

              <FormControl id="token" isRequired>
                <FormLabel>Token</FormLabel>
                <Input
                  defaultValue={qToken || ""}
                  {...register("token")}
                ></Input>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Neues Passwort</FormLabel>
                <Input type="password" {...register("password")}></Input>
              </FormControl>
              <FormControl id="password2" isRequired>
                <FormLabel>Passwort wiederholen</FormLabel>
                <Input type="password" {...register("password2")}></Input>
              </FormControl>

              <Stack spacing={6} pt={4} w="full">
                <Button
                  colorScheme="white"
                  isLoading={isSubmitting}
                  type="submit"
                  bg={"brand.900"}
                  _hover={{ bg: "brand.800" }}
                  w={"full"}
                >
                  Passwort zurücksetzen
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

                {status && <Text>{status}</Text>}
              </Stack>
            </VStack>
          </form>
        </Box>
      </Stack>
    </Stack>
  );
}
