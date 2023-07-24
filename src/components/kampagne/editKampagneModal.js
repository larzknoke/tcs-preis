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
  Switch,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { kampagneSchema } from "@/lib/formSchema";
import { useRouter } from "next/router";

function EditKampagneModal({ editIsOpen, editOnClose, kampagne }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(kampagneSchema),
    defaultValues: kampagne,
  });

  const toast = useToast();

  async function onSubmit(values) {
    try {
      console.log("submit values: ", values);
      const res = await fetch(`/api/kampagne/updateKampagne`, {
        method: "PUT",
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
        editOnClose();
        toast({
          title: `Kampagne ${resData.result.name} gespeichert.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push(`/kampagne/${resData.result.id}`);
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
      <Modal isOpen={editIsOpen} onClose={editOnClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kampagne bearbeiten</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="edit-kampagne-form" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacing={6} columns={3} w={"full"}>
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
                  <FormControl isInvalid={errors.abgeschlosssen}>
                    <FormLabel htmlFor="abgeschlossen" mb="0">
                      Abgeschlossen
                    </FormLabel>
                    <Switch
                      id="abgeschlossen"
                      colorScheme="green"
                      {...register("abgeschlossen")}
                      name="abgeschlossen"
                      isChecked={kampagne.abgeschlosssen}
                    />
                    <FormErrorMessage>
                      {errors.abgeschlosssen && errors.abgeschlosssen.message}
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
              onClick={editOnClose}
              variant={"outline"}
            >
              Schliessen
            </Button>
            <Button
              size={"md"}
              variant="outline"
              colorScheme="green"
              form="edit-kampagne-form"
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

export default EditKampagneModal;
