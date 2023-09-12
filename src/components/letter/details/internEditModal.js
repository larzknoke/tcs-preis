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
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { formSchema } from "@/lib/formSchema";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bundeslaender } from "@/lib/data";
import { Select } from "chakra-react-select";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Weekday_Names_Short, Month_Names_Short } from "@/lib/utils";

function InternEditModal({ onClose, isOpen, letter }) {
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

  const [dateBild, setDateBild] = useState(letter.bildmaterial || undefined);
  const [dateGeld, setDateGeld] = useState(letter.terminGeld || undefined);
  const [dateZWB1000, setDateZWB1000] = useState(letter.zwb1000 || undefined);
  const [dateZWB5000, setDateZWB5000] = useState(letter.zwb5000 || undefined);
  const [dateUebergabe, setDateUebergabe] = useState(
    letter.terminUebergabe || undefined
  );

  async function onSubmit(values) {
    try {
      setLoading(true);
      console.log("values: ", values);
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
        console.log("resData: ", resData);
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
        <ModalHeader>Interne Daten bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-beschreibung-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.checkFreistellung}>
                  <FormLabel>Freistellungsbescheid geprüft</FormLabel>
                  <Switch
                    colorScheme="green"
                    name="checkFreistellung"
                    type="text"
                    {...register("checkFreistellung")}
                  />
                  <FormErrorMessage>
                    {errors.checkFreistellung &&
                      errors.checkFreistellung.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.checkFreistellung}>
                  <FormLabel>Bildmaterial/Medien erhalten</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={dateBild}
                    onDateChange={(dateInput) => {
                      setDateBild(dateInput);
                      setValue("bildmaterial", dateInput);
                    }}
                    configs={{
                      dateFormat: "dd.MM.yyyy",
                      dayNames: Weekday_Names_Short,
                      monthNames: Month_Names_Short,
                      firstDayOfWeek: 1,
                    }}
                    propsConfigs={{
                      inputProps: {
                        placeholder: "Datum auswählen...",
                      },
                      dayOfMonthBtnProps: {
                        defaultBtnProps: {
                          _hover: {
                            background: "brand.900",
                            color: "white",
                          },
                        },
                        todayBtnProps: {
                          background: "brand2.900",
                          color: "white",
                        },
                        selectedBtnProps: {
                          background: "brand.900",
                          color: "white",
                        },
                      },
                    }}
                  />
                  <FormErrorMessage>
                    {errors.checkFreistellung &&
                      errors.checkFreistellung.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.terminGeld}>
                  <FormLabel>Termin Überweisung 1.000€</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={dateGeld}
                    onDateChange={(dateInput) => {
                      setDateGeld(dateInput);
                      setValue("terminGeld", dateInput);
                    }}
                    configs={{
                      dateFormat: "dd.MM.yyyy",
                      dayNames: Weekday_Names_Short,
                      monthNames: Month_Names_Short,
                      firstDayOfWeek: 1,
                    }}
                    propsConfigs={{
                      inputProps: {
                        placeholder: "Datum auswählen...",
                      },
                      dayOfMonthBtnProps: {
                        defaultBtnProps: {
                          _hover: {
                            background: "brand.900",
                            color: "white",
                          },
                        },
                        todayBtnProps: {
                          background: "brand2.900",
                          color: "white",
                        },
                        selectedBtnProps: {
                          background: "brand.900",
                          color: "white",
                        },
                      },
                    }}
                  />
                  <FormErrorMessage>
                    {errors.terminGeld && errors.terminGeld.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.terminUebergabe}>
                  <FormLabel>Termin Übergabe</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={dateUebergabe}
                    onDateChange={(dateInput) => {
                      setDateUebergabe(dateInput);
                      setValue("terminUebergabe", dateInput);
                    }}
                    configs={{
                      dateFormat: "dd.MM.yyyy",
                      dayNames: Weekday_Names_Short,
                      monthNames: Month_Names_Short,
                      firstDayOfWeek: 1,
                    }}
                    propsConfigs={{
                      inputProps: {
                        placeholder: "Datum auswählen...",
                      },
                      dayOfMonthBtnProps: {
                        defaultBtnProps: {
                          _hover: {
                            background: "brand.900",
                            color: "white",
                          },
                        },
                        todayBtnProps: {
                          background: "brand2.900",
                          color: "white",
                        },
                        selectedBtnProps: {
                          background: "brand.900",
                          color: "white",
                        },
                      },
                    }}
                  />
                  <FormErrorMessage>
                    {errors.terminUebergabe && errors.terminUebergabe.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.zwb1000}>
                  <FormLabel>ZWB 1111</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={dateZWB1000}
                    onDateChange={(dateInput) => {
                      setDateZWB1000(dateInput);
                      setValue("zwb1000", dateInput);
                    }}
                    configs={{
                      dateFormat: "dd.MM.yyyy",
                      dayNames: Weekday_Names_Short,
                      monthNames: Month_Names_Short,
                      firstDayOfWeek: 1,
                    }}
                    propsConfigs={{
                      inputProps: {
                        placeholder: "Datum auswählen...",
                      },
                      dayOfMonthBtnProps: {
                        defaultBtnProps: {
                          _hover: {
                            background: "brand.900",
                            color: "white",
                          },
                        },
                        todayBtnProps: {
                          background: "brand2.900",
                          color: "white",
                        },
                        selectedBtnProps: {
                          background: "brand.900",
                          color: "white",
                        },
                      },
                    }}
                  />
                  <FormErrorMessage>
                    {errors.zwb1000 && errors.zwb5000.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.zwb5000}>
                  <FormLabel>ZWB 5000</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={dateZWB5000}
                    onDateChange={(dateInput) => {
                      setDateZWB5000(dateInput);
                      setValue("zwb5000", dateInput);
                    }}
                    configs={{
                      dateFormat: "dd.MM.yyyy",
                      dayNames: Weekday_Names_Short,
                      monthNames: Month_Names_Short,
                      firstDayOfWeek: 1,
                    }}
                    propsConfigs={{
                      inputProps: {
                        placeholder: "Datum auswählen...",
                      },
                      dayOfMonthBtnProps: {
                        defaultBtnProps: {
                          _hover: {
                            background: "brand.900",
                            color: "white",
                          },
                        },
                        todayBtnProps: {
                          background: "brand2.900",
                          color: "white",
                        },
                        selectedBtnProps: {
                          background: "brand.900",
                          color: "white",
                        },
                      },
                    }}
                  />
                  <FormErrorMessage>
                    {errors.zwb5000 && errors.zwb5000.message}
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

export default InternEditModal;
