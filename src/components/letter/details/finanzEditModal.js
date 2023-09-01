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

function FinanzEditModal({ onClose, isOpen, letter }) {
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
        router.push(`/admin/bewerbung/${resData.id}`);
        setLoading(false);
        reset(resData);
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
        <ModalHeader>Finanzierung bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-beschreibung-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.eigenmittel}>
                  <FormLabel>Eigenmittel</FormLabel>
                  <Input
                    name="eigenmittel"
                    type="number"
                    {...register("eigenmittel", {
                      valueAsNumber: true,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.eigenmittel && errors.eigenmittel.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.oeffentlicheZuwendungen}>
                  <FormLabel>Öffentlich Zuwendungen</FormLabel>
                  <Input
                    name="oeffentlicheZuwendungen"
                    type="number"
                    {...register("oeffentlicheZuwendungen", {
                      valueAsNumber: true,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.oeffentlicheZuwendungen &&
                      errors.oeffentlicheZuwendungen.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.privateSpenden}>
                  <FormLabel>Private Spenden</FormLabel>
                  <Input
                    name="privateSpenden"
                    type="number"
                    {...register("privateSpenden", {
                      valueAsNumber: true,
                    })}
                  />
                  <FormErrorMessage>
                    {errors.privateSpenden && errors.privateSpenden.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.bisherigeFoerderung}>
                  <FormLabel>Bisherige Förderungen</FormLabel>
                  <Input
                    name="bisherigeFoerderung"
                    type="text"
                    {...register("bisherigeFoerderung")}
                  />
                  <FormErrorMessage>
                    {errors.bisherigeFoerderung &&
                      errors.bisherigeFoerderung.message}
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

export default FinanzEditModal;
