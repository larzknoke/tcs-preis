import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function SignupCard() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    try {
      const body = { ...values };
      console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
      const res = await fetch(`/api/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(`res`, res);
      reset();
      router.push(
        `signin${
          router.query.callbackUrl
            ? `?callbackUrl=${router.query.callbackUrl}`
            : ""
        }`
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        w={{ md: "md" }}
        maxW={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Registrierung
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            TC-Stiftung WebApp
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Box>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" {...register("name")} />
                </FormControl>
              </Box>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" {...register("email")} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Passwort</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: "transparent" }}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="bitte warten..."
                  size="lg"
                  type="submit"
                  isLoading={isSubmitting}
                  bg={"brand.800"}
                  color={"white"}
                  _hover={{
                    bg: "brand.900",
                  }}
                >
                  Registrieren
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Schon registriert?{" "}
                  <Link color={"brand.900"} href="signin">
                    Anmelden
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}