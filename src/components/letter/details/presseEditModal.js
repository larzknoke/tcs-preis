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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Weekday_Names_Short, Month_Names_Short } from "@/lib/utils";
import { useEffect } from "react";

function PresseEditModal({ onClose, isOpen, letter }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [count, setCount] = useState(0);

  const [datePresseEinladung, setDatePresseEinladung] = useState(
    letter.presseEinladung || undefined
  );
  const [datePresseMitteilung, setDatePresseMitteilung] = useState(
    letter.presseMitteilung || undefined
  );
  const [datePresseFreigabe, setDatePresseFreigabe] = useState(
    letter.presseFreigabe || undefined
  );
  const [datePresseVersendet, setDatePresseVersendet] = useState(
    letter.presseVersendet || undefined
  );
  const [datePresseErledigt, setDatePresseErledigt] = useState(
    letter.presseErledigt || undefined
  );

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

  useEffect(() => {
    setCount(letter.presseText.length);
  }, [letter.presseText]);

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
        <ModalHeader>Presse bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-beschreibung-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.presseErlaubt}>
                  <FormLabel>Pressearbeit erwünscht</FormLabel>
                  <Switch
                    colorScheme="green"
                    name="presseErlaubt"
                    type="text"
                    {...register("presseErlaubt")}
                  />
                  <FormErrorMessage>
                    {errors.presseErlaubt && errors.presseErlaubt.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.presseText}>
                  <FormLabel display={"flex"} justifyContent={"space-between"}>
                    Pressetext{" "}
                    {count && <Text color={"gray.300"}>Zeichen: {count}</Text>}
                  </FormLabel>
                  <Textarea
                    name="presseText"
                    type="text"
                    {...register("presseText")}
                    minHeight={"200px"}
                    onChange={(e) => {
                      console.log(e.target.value.length);
                      console.log("count: ", count);
                      setCount(e.target.value.length);
                    }}
                  />

                  <FormErrorMessage>
                    {errors.presseText && errors.presseText.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.presseEinladung}>
                  <FormLabel>Presse Einladung</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={datePresseEinladung}
                    onDateChange={(dateInput) => {
                      setDatePresseEinladung(dateInput);
                      setValue("presseEinladung", dateInput);
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
                    {errors.presseEinladung && errors.presseEinladung.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.presseMitteilung}>
                  <FormLabel>Presse Mitteilung erstellt</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={datePresseMitteilung}
                    onDateChange={(dateInput) => {
                      setDatePresseMitteilung(dateInput);
                      setValue("presseMitteilung", dateInput);
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
                    {errors.presseMitteilung && errors.presseMitteilung.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.presseFreigabe}>
                  <FormLabel>Presse Freigabe erstellt</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={datePresseFreigabe}
                    onDateChange={(dateInput) => {
                      setDatePresseFreigabe(dateInput);
                      setValue("presseFreigabe", dateInput);
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
                    {errors.presseFreigabe && errors.presseFreigabe.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.presseVersendet}>
                  <FormLabel>Presse Versendet erstellt</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={datePresseVersendet}
                    onDateChange={(dateInput) => {
                      setDatePresseVersendet(dateInput);
                      setValue("presseVersendet", dateInput);
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
                    {errors.presseVersendet && errors.presseVersendet.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem idItem colSpan={4}>
                <FormControl isInvalid={errors.presseErledigt}>
                  <FormLabel>Pressearbeit erledigt</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={datePresseErledigt}
                    onDateChange={(dateInput) => {
                      setDatePresseErledigt(dateInput);
                      setValue("presseErledigt", dateInput);
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
                    {errors.presseErledigt && errors.presseErledigt.message}
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

export default PresseEditModal;
