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

function BeschreibungEditModal({ onClose, isOpen, letter }) {
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
    delete values.lettercontacts;
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
        onClose();
        reset(resData);
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"3xl"}>
        <ModalHeader>Beschreibung bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-beschreibung-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.beschreibungProjekt}>
                  <FormLabel>Beschreibung Projekt</FormLabel>
                  <Textarea
                    name="beschreibungProjekt"
                    {...register("beschreibungProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.beschreibungProjekt &&
                      errors.beschreibungProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.zielsetzungProjekt}>
                  <FormLabel>Zielsetzung Projekt</FormLabel>
                  <Textarea
                    name="zielsetzungProjekt"
                    {...register("zielsetzungProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.zielsetzungProjekt &&
                      errors.zielsetzungProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.benachteiligungProjekt}>
                  <FormLabel>Benachteiligung Projekt</FormLabel>
                  <Textarea
                    name="benachteiligungProjekt"
                    {...register("benachteiligungProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.benachteiligungProjekt &&
                      errors.benachteiligungProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.umsetzungProjekt}>
                  <FormLabel>Projektumsetzung / Projektrealisierung</FormLabel>
                  <Textarea
                    name="umsetzungProjekt"
                    {...register("umsetzungProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.umsetzungProjekt && errors.umsetzungProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.bisherigeErgebnisse}>
                  <FormLabel>Bisherige Ergebnisse</FormLabel>
                  <Textarea
                    name="bisherigeErgebnisse"
                    {...register("bisherigeErgebnisse")}
                  />
                  <FormErrorMessage>
                    {errors.bisherigeErgebnisse &&
                      errors.bisherigeErgebnisse.message}
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

export default BeschreibungEditModal;
