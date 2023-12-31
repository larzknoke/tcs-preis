import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  VStack,
  FormErrorMessage,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

//icons
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
// import FormPasswordlessEmail from "@components/auth/form-passwordless";

export default function SimpleCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen: isOpenCollapse, onToggle: onToggleCollapse } =
    useDisclosure();
  const { isOpen: isOpenEmail, onToggle: onToggleEmail } = useDisclosure();
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  let defaultBody = {
    grant_type: "",
    username: "asdf@gmail.com",
    password: "asdf",
    scope: "",
    client_id: "",
    client_secret: "",
  };

  async function onSubmit(values) {
    try {
      const body = { ...defaultBody, ...values };
      console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
      let res = await signIn("credentials", {
        ...body,
        callbackUrl: router.query.callbackUrl,
      });
      console.log(`signing:onsubmit:res`, res);
    } catch (error) {
      console.log(error);
    }
  }
  if (status === "authenticated") {
    router.push("/", {
      query: {
        callbackUrl: router.query.callbackUrl,
      },
    });
  }

  return (
    <Flex
      minH={"100vh"}
      // align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w={"lg"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Image
            src="/tcs_logo.svg"
            alt="TCS Logo"
            width={180}
            height={24}
            priority
          />
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
          <VStack>
            {/* <FormPasswordlessEmail /> */}
            <Button
              w="full"
              leftIcon={<BiLockAlt />}
              onClick={onToggleCollapse}
            >
              Email & Passwort
            </Button>
            {/* <Button
              w="full"
              leftIcon={<AiFillGithub />}
              onClick={() =>
                signIn("github", {
                  callbackUrl: router.query.callbackUrl.toString(),
                })
              }
            >
              Github
            </Button> */}
          </VStack>
          <Collapse in={isOpenCollapse}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} pt={10}>
                <FormControl
                  id="email"
                  isInvalid={Boolean(router.query.error)}
                  isRequired
                >
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...register("username")} />
                </FormControl>
                <FormControl
                  id="password"
                  isRequired
                  isInvalid={Boolean(router.query.error)}
                >
                  <FormLabel>Password</FormLabel>
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
                  {router.query.error &&
                    router.query.error === "CredentialsSignin" && (
                      <FormErrorMessage>Invalid credentials</FormErrorMessage>
                    )}
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"brand.900"}>Password vergessen?</Link>
                  </Stack>
                  <Button
                    isLoading={isSubmitting}
                    loadingText="bitte warten..."
                    bg={"brand.800"}
                    color={"white"}
                    type="submit"
                    _hover={{
                      bg: "brand.900",
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Collapse>
        </Box>
      </Stack>
    </Flex>
  );
}
