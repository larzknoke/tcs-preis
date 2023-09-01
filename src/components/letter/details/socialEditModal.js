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

function SocialEditModal({ onClose, isOpen, letter }) {
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

  const [dateSocialTCS, setDateSocialTCS] = useState(
    letter.socialTCS || undefined
  );
  const [dateSocialFremd, setDateSocialFremd] = useState(
    letter.socialFremd || undefined
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
        <ModalHeader>Social Media & Presse bearbeiten</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="edit-beschreibung-form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid spacing={6} columns={4} w={"full"}>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.socialTCS}>
                  <FormLabel>Social Media TCS</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={dateSocialTCS}
                    onDateChange={(dateInput) => {
                      setDateSocialTCS(dateInput);
                      setValue("socialTCS", dateInput);
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
                    {errors.socialTCS && errors.socialTCS.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.socialFremd}>
                  <FormLabel>Social Media Fremd</FormLabel>
                  <SingleDatepicker
                    placeholder="Datum auswählen..."
                    name="date-input"
                    date={dateSocialFremd}
                    onDateChange={(dateInput) => {
                      setDateSocialFremd(dateInput);
                      setValue("socialFremd", dateInput);
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
                    {errors.socialFremd && errors.socialFremd.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={4}>
                <FormControl isInvalid={errors.socialNotiz}>
                  <FormLabel>Social Media Notiz</FormLabel>
                  <Input
                    name="socialNotiz"
                    type="text"
                    {...register("socialNotiz")}
                  />
                  <FormErrorMessage>
                    {errors.socialNotiz && errors.socialNotiz.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
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

export default SocialEditModal;
