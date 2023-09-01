import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useToast,
  SimpleGrid,
  GridItem,
  FormErrorMessage,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { formSchema } from "@/lib/formSchema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bundeslaender } from "@/lib/data";
import { Select } from "chakra-react-select";

function DetailsEditModal({ detailsOnClose, detailsIsOpen, letter }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(formSchema),
    defaultValues: letter,
  });

  const [selectedBundesland, setSelectedBundesland] = useState(
    letter
      ? {
          value: letter?.bundeslandTraeger,
          label: letter?.bundeslandTraeger,
        }
      : ""
  );

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch("/api/letter", {
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
        setLoading(false);
      } else {
        const resData = await res.json();
        toast({
          title: `Projekt ${resData.nameTraeger} aktualisiert.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        detailsOnClose();
        router.push(`/admin/bewerbung/${resData.id}`);
        setLoading(false);
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
    <Modal isOpen={detailsIsOpen} onClose={detailsOnClose}>
      <ModalOverlay />
      <ModalContent minW={"3xl"}>
        <ModalHeader>Details bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-beschreibung-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.wannProjekt}>
                  <FormLabel>Seit wann besteht das Projekt</FormLabel>
                  <Input
                    name="wannProjekt"
                    type="text"
                    {...register("wannProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.wannProjekt && errors.wannProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.mitarbeiterProjekt}>
                  <FormLabel>Mitarbeiter Projekt</FormLabel>
                  <Input
                    name="mitarbeiterProjekt"
                    type="text"
                    {...register("mitarbeiterProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.mitarbeiterProjekt &&
                      errors.mitarbeiterProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.hauptamtlichAnzahl}>
                  <FormLabel>Hauptamtlich Anzahl</FormLabel>
                  <Input
                    name="hauptamtlichAnzahl"
                    type="text"
                    {...register("hauptamtlichAnzahl")}
                  />
                  <FormErrorMessage>
                    {errors.hauptamtlichAnzahl &&
                      errors.hauptamtlichAnzahl.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.hauptamtlichStunden}>
                  <FormLabel>Hauptamtlich Stunden</FormLabel>
                  <Input
                    name="hauptamtlichStunden"
                    type="text"
                    {...register("hauptamtlichStunden")}
                  />
                  <FormErrorMessage>
                    {errors.hauptamtlichStunden &&
                      errors.hauptamtlichStunden.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.ehrenamtlichAnzahl}>
                  <FormLabel>Ehrenamtlich Anzahl</FormLabel>
                  <Input
                    name="ehrenamtlichAnzahl"
                    type="text"
                    {...register("ehrenamtlichAnzahl")}
                  />
                  <FormErrorMessage>
                    {errors.ehrenamtlichAnzahl &&
                      errors.ehrenamtlichAnzahl.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.ehrenamtlichStunden}>
                  <FormLabel>Hauptamtlich Stunden</FormLabel>
                  <Input
                    name="ehrenamtlichStunden"
                    type="text"
                    {...register("ehrenamtlichStunden")}
                  />
                  <FormErrorMessage>
                    {errors.ehrenamtlichStunden &&
                      errors.ehrenamtlichStunden.message}
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
            onClick={detailsOnClose}
            variant={"outline"}
          >
            Schliessen
          </Button>
          <Button
            size={"md"}
            variant="outline"
            colorScheme="green"
            form="edit-beschreibung-form"
            type="submit"
            isLoading={loading}
          >
            Speichern
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DetailsEditModal;
