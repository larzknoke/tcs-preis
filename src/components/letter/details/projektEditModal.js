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
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { formSchema } from "@/lib/formSchema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function ProjektEditModal({ onClose, isOpen, letter }) {
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
        onClose();
        // reset();
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
      <ModalContent>
        <ModalHeader>Projekt bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-letter-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.organisationProjekt}>
                  <FormLabel>Organisation Name</FormLabel>
                  <Input
                    name="organisationProjekt"
                    type="text"
                    {...register("organisationProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.organisationProjekt &&
                      errors.organisationProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.nameProjekt}>
                  <FormLabel> Name</FormLabel>
                  <Input
                    name="nameProjekt"
                    type="text"
                    {...register("nameProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.nameProjekt && errors.nameProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.ansprechpartnerProjekt}>
                  <FormLabel>Ansprechpartner</FormLabel>
                  <Input
                    name="ansprechpartnerProjekt"
                    type="text"
                    {...register("ansprechpartnerProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.ansprechpartnerProjekt &&
                      errors.ansprechpartnerProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.emailProjekt}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="emailProjekt"
                    type="text"
                    {...register("emailProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.emailProjekt && errors.emailProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.wwwProjekt}>
                  <FormLabel>Website</FormLabel>
                  <Input
                    name="wwwProjekt"
                    type="text"
                    {...register("wwwProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.wwwProjekt && errors.wwwProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.telefonnummerProjekt}>
                  <FormLabel>Telefon</FormLabel>
                  <Input
                    name="telefonnummerProjekt"
                    type="text"
                    {...register("telefonnummerProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.telefonnummerProjekt &&
                      errors.telefonnummerProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.mobilProjekt}>
                  <FormLabel>Mobil</FormLabel>
                  <Input
                    name="mobilProjekt"
                    type="text"
                    {...register("mobilProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.mobilProjekt && errors.mobilProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.strasseProjekt}>
                  <FormLabel>Straße</FormLabel>
                  <Input
                    name="strasseProjekt"
                    type="text"
                    {...register("strasseProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.strasseProjekt && errors.strasseProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.plzProjekt}>
                  <FormLabel>Plz</FormLabel>
                  <Input
                    name="plzProjekt"
                    type="text"
                    {...register("plzProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.plzProjekt && errors.plzProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.ortProjekt}>
                  <FormLabel>Ort</FormLabel>
                  <Input
                    name="ortProjekt"
                    type="text"
                    {...register("ortProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.ortProjekt && errors.ortProjekt.message}
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
            form="edit-letter-form"
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

export default ProjektEditModal;
