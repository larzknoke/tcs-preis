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
import { bundeslaender } from "@/lib/data";
import { Select } from "chakra-react-select";

function TraegerEditModal({ onClose, isOpen, letter }) {
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
        nameTraeger: values.nameTraeger || null,
        bundeslandTraeger: values.bundeslandTraeger || null,
        vorstandTraeger: values.vorstandTraeger || null,
        strasseTraeger: values.strasseTraeger || null,
        plzTraeger: values.plzTraeger || null,
        ortTraeger: values.ortTraeger || null,
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
          title: `Träger ${resData.nameTraeger} aktualisiert.`,
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
      <ModalContent>
        <ModalHeader>Träger bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-traeger-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.nameTraeger}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="nameTraeger"
                    type="text"
                    {...register("nameTraeger")}
                  />
                  <FormErrorMessage>
                    {errors.nameTraeger && errors.nameTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <Controller
                  control={control}
                  name="bundeslandTraeger"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { error },
                  }) => {
                    return (
                      <FormControl isInvalid={!!error} id="bundeslandTraeger">
                        <FormLabel>Bundesland</FormLabel>
                        <Select
                          name={name}
                          ref={ref}
                          onChange={(e) => {
                            setValue("bundeslandTraeger", e.value);
                            setSelectedBundesland(e);
                          }}
                          onBlur={onBlur}
                          value={selectedBundesland}
                          options={bundeslaender}
                          placeholder="Bitte auswählen..."
                        />
                        <FormErrorMessage>
                          {errors.bundeslandTraeger &&
                            errors.bundeslandTraeger.message}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  }}
                />
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.vorstandTraeger}>
                  <FormLabel>Name Vorstand</FormLabel>
                  <Input
                    name="vorstandTraeger"
                    type="text"
                    {...register("vorstandTraeger")}
                  />
                  <FormErrorMessage>
                    {errors.vorstandTraeger && errors.vorstandTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.strasseTraeger}>
                  <FormLabel>Straße</FormLabel>
                  <Input
                    name="strasseTraeger"
                    type="text"
                    {...register("strasseTraeger")}
                  />
                  <FormErrorMessage>
                    {errors.strasseTraeger && errors.strasseTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isInvalid={errors.plzTraeger}>
                  <FormLabel>PLZ</FormLabel>
                  <Input
                    name="plzTraeger"
                    type="text"
                    {...register("plzTraeger")}
                  />
                  <FormErrorMessage>
                    {errors.plzTraeger && errors.plzTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isInvalid={errors.ortTraeger}>
                  <FormLabel>Straße</FormLabel>
                  <Input
                    name="ortTraeger"
                    type="text"
                    {...register("ortTraeger")}
                  />
                  <FormErrorMessage>
                    {errors.ortTraeger && errors.ortTraeger.message}
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
            form="edit-traeger-form"
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

export default TraegerEditModal;
