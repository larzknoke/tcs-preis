import {
  SimpleGrid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "chakra-react-select";
import { bundeslaender } from "@/lib/data";
import { userSchema } from "@/lib/formSchema";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function FormUserModal({ isOpen, onClose, isNew, user = {} }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(userSchema),
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user]);

  async function onSubmit(values) {
    console.log("values", values);
    try {
      setLoading(true);
      const res = await fetch("/api/user", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
        toast({
          title: `Benutzer ${resData.name} erstellt.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
        router.push(`/admin/users`);
        setLoading(false);
        reset(resData);
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isNew ? "Neuer Benutzer" : "Benutzer bearbeiten"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-user-form" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacing={6} columns={4} w={"full"}>
                <GridItem colSpan={4}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type="text" {...register("name")} />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="text" {...register("email")} />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                {isNew && (
                  <GridItem colSpan={4}>
                    <FormControl isInvalid={errors.password}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        name="password"
                        type="password"
                        {...register("password")}
                      />
                      <FormErrorMessage>
                        {errors.password && errors.password.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                )}
                {isNew && (
                  <GridItem colSpan={4}>
                    <FormControl isInvalid={errors.password_confirm}>
                      <FormLabel>Passwort wiederholen</FormLabel>
                      <Input
                        name="password_confirm"
                        type="password"
                        {...register("password_confirm")}
                      />
                      <FormErrorMessage>
                        {errors.password_confirm &&
                          errors.password_confirm.message}
                      </FormErrorMessage>
                    </FormControl>
                  </GridItem>
                )}
              </SimpleGrid>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              size={"md"}
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              variant={"outline"}
              isDisabled={loading}
            >
              Schliessen
            </Button>
            <Button
              size={"md"}
              variant="outline"
              colorScheme="green"
              form="new-user-form"
              type="submit"
              isLoading={loading}
            >
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormUserModal;
