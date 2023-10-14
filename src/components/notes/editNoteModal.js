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

function EditNoteModal({ note, isOpen, onClose }) {
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
    reset(note);
  }, [note, reset]);

  async function submitForm() {
    try {
      const values = getValues();
      const res = await fetch("/api/note", {
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
          title: `Notiz ${resData.title} gespeichert.`,
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
          <ModalHeader>Notiz bearbeiten</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="edit-note-form"
              // onSubmit={handleSubmit(onSubmit)}
            >
              <SimpleGrid spacing={6} columns={3} w={"full"}>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.title}>
                    <FormLabel>Titel</FormLabel>
                    <Input
                      name="title"
                      type="text"
                      {...register("title")}
                      onChange={(e) => {
                        setValue("title", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {errors.title && errors.title.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.content}>
                    <FormLabel>Inhalt</FormLabel>
                    <Textarea
                      name="content"
                      type="text"
                      {...register("content")}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setValue("content", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {errors.content && errors.content.message}
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
              form="edit-note-form"
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

export default EditNoteModal;
