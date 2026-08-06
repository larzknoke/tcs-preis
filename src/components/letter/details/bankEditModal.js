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

function BankEditModal({ onClose, isOpen, letter }) {
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
      : "",
  );

  async function onSubmit(values) {
    try {
      const payload = {
        id: letter.id,
        expectedUpdatedAt: letter.updatedAt,
        ibanProjekt: values.ibanProjekt || null,
        kontoNameProjekt: values.kontoNameProjekt || null,
        bankNameProjekt: values.bankNameProjekt || null,
      };

      setLoading(true);
      const res = await fetch("/api/letter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status == 409) {
        toast({
          title: "Konflikt erkannt",
          description:
            "Die Bewerbung wurde parallel geaendert. Bitte Seite neu laden und erneut speichern.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

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
        router.replace(router.asPath);
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
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={"3xl"}>
        <ModalHeader>Bank bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-bank-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.ibanProjekt}>
                  <FormLabel>IBAN</FormLabel>
                  <Input
                    name="ibanProjekt"
                    type="text"
                    {...register("ibanProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.ibanProjekt && errors.ibanProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.kontoNameProjekt}>
                  <FormLabel>Konto Name</FormLabel>
                  <Input
                    name="kontoNameProjekt"
                    type="text"
                    {...register("kontoNameProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.kontoNameProjekt && errors.kontoNameProjekt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.bankNameProjekt}>
                  <FormLabel>Konto Name</FormLabel>
                  <Input
                    name="bankNameProjekt"
                    type="text"
                    {...register("bankNameProjekt")}
                  />
                  <FormErrorMessage>
                    {errors.bankNameProjekt && errors.bankNameProjekt.message}
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
            form="edit-bank-form"
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

export default BankEditModal;
