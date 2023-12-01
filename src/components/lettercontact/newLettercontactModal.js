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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { lettercontactSchema } from "@/lib/formSchema";
import { useRouter } from "next/router";

function NewLettercontactModal({ letter, isOpen, onClose }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(lettercontactSchema),
  });

  const toast = useToast();

  async function onSubmit(values) {
    try {
      values.letterId = letter.id;
      const res = await fetch("/api/lettercontact", {
        method: "POST",
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
          title: `Ansprechpartner ${resData.result.name} erstellt.`,
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
          <ModalHeader>Neuer Bewerbung Ansprechpartner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-lettercontact-form" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacing={6} columns={3} w={"full"}>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.anrede}>
                    <FormLabel>Anrede</FormLabel>
                    <Input name="anrede" type="text" {...register("anrede")} />
                    <FormErrorMessage>
                      {errors.anrede && errors.anrede.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type="text" {...register("name")} />
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
                    />
                    <FormErrorMessage>
                      {errors.funktion && errors.funktion.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="text" {...register("email")} />

                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.telefon}>
                    <FormLabel>Telefon</FormLabel>
                    <Input
                      name="telefon"
                      type="text"
                      {...register("telefon")}
                    />

                    <FormErrorMessage>
                      {errors.telefon && errors.telefon.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.notiz}>
                    <FormLabel>Notiz</FormLabel>
                    <Textarea name="notiz" type="text" {...register("notiz")} />

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
              form="new-lettercontact-form"
              type="submit"
            >
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewLettercontactModal;
