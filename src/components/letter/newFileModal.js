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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fileSchema } from "@/lib/formSchema";
import { useRouter } from "next/router";
import { useState } from "react";

function NewFileModal({ letter, isOpen, onClose }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(fileSchema),
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values) {
    try {
      setLoading(true);
      console.log("values: ", values);

      // ***********
      // UPLOAD FILE
      // ***********
      const res = await fetch(`/api/file/s3url?file=${values.file[0].name}`);
      const { url, fields } = await res.json();

      const formDataFile = new FormData();

      Object.entries({ ...fields, file: values.file[0] }).forEach(
        ([key, value]) => {
          formDataFile.append(key, value);
        }
      );

      const upload = await fetch(url, {
        method: "POST",
        body: formDataFile,
      });

      // ***********
      // CREATE UPLOAD IN DB
      // ***********
      if (upload.ok) {
        const formData = {
          letterId: letter.id,
          title: values.title,
          note: values.note,
          file: fields.key,
        };
        const res = await fetch("/api/file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
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
          toast({
            title: `Datei erstellt.`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          onClose();
          reset();
          router.push(`/admin/bewerbung/${letter.id}`);
          setLoading(false);
        }
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
          <ModalHeader>Datei Upload</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-file-form" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacing={6} columns={3} w={"full"}>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.title}>
                    <FormLabel>Name</FormLabel>
                    <Input name="title" type="text" {...register("title")} />
                    <FormErrorMessage>
                      {errors.title && errors.title.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.note}>
                    <FormLabel>Notiz</FormLabel>
                    <Input name="note" type="text" {...register("note")} />
                    <FormErrorMessage>
                      {errors.note && errors.note.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.file}>
                    <FormLabel>Datei</FormLabel>
                    <Input
                      type="file"
                      // multiple
                      {...register("file")}
                      sx={{
                        "::file-selector-button": {
                          height: 10,
                          padding: 0,
                          mr: 4,
                          background: "none",
                          border: "none",
                          fontWeight: "bold",
                        },
                      }}
                    />
                    <FormErrorMessage>
                      {errors.file && errors.file.message}
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
              isDisabled={loading}
            >
              Schliessen
            </Button>
            <Button
              size={"md"}
              variant="outline"
              colorScheme="green"
              form="new-file-form"
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

export default NewFileModal;
