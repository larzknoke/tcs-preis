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
import { noteSchema } from "@/lib/formSchema";
import { useRouter } from "next/router";

function NewNoteModal({ letter, isOpen, onClose }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(noteSchema),
  });

  const toast = useToast();

  async function onSubmit(values) {
    try {
      values.letterId = letter.id;
      console.log("values: ", values);
      const res = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status != 200) {
        toast({
          title: "Ein Fehler ist aufgetreten",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        const resData = await res.json();
        console.log("resData: ", resData);
        toast({
          title: `Notiz ${resData.result.title} erstellt.`,
          status: "success",
          duration: 9000,
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
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Neue Notiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-note-form" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacing={6} columns={3} w={"full"}>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.title}>
                    <FormLabel>Titel</FormLabel>
                    <Input name="title" type="text" {...register("title")} />
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
              form="new-note-form"
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

export default NewNoteModal;
