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
  Textarea,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

function EditLettercontactModal({ lettercontact, isOpen, onClose }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({});

  const toast = useToast();

  useEffect(() => {
    reset(lettercontact);
  }, [lettercontact, reset]);

  function onSubmit() {
    submitForm();
  }

  async function submitForm() {
    try {
      const values = getValues();
      const res = await fetch("/api/lettercontact", {
        method: "PUT",
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
      } else {
        const resData = await res.json();
        toast({
          title: `Ansprechpartner ${resData.name} gespeichert.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
        reset();
        router.replace(router.asPath);
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
          <ModalHeader>Bewerbung Ansprechpartner bearbeiten</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="edit-lettercontact-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <SimpleGrid spacing={6} columns={3} w={"full"}>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.anrede}>
                    <FormLabel>Titel</FormLabel>
                    <Input
                      name="anrede"
                      type="text"
                      {...register("anrede")}
                      onChange={(e) => {
                        setValue("anrede", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {errors.anrede && errors.anrede.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      type="text"
                      {...register("name")}
                      onChange={(e) => {
                        setValue("name", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.funktion}>
                    <FormLabel>Funktion</FormLabel>
                    <Input
                      name="funktion"
                      type="text"
                      {...register("funktion")}
                      onChange={(e) => {
                        setValue("funktion", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {errors.funktion && errors.funktion.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="text"
                      {...register("email")}
                      onChange={(e) => {
                        setValue("email", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.telefon}>
                    <FormLabel>telefon</FormLabel>
                    <Input
                      name="telefon"
                      type="text"
                      {...register("telefon")}
                      onChange={(e) => {
                        setValue("telefon", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {errors.telefon && errors.telefon.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.notiz}>
                    <FormLabel>Inhalt</FormLabel>
                    <Textarea
                      name="notiz"
                      type="text"
                      {...register("notiz")}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setValue("notiz", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {errors.notiz && errors.notiz.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
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
            >
              Schliessen
            </Button>
            <Button
              size={"md"}
              variant="outline"
              colorScheme="green"
              form="edit-lettercontact-form"
              // type="submit"
              onClick={() => submitForm()}
            >
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditLettercontactModal;
