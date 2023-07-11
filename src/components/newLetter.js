import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  SimpleGrid,
  GridItem,
  Select,
  Tooltip,
  Heading,
  useToast,
  Card,
  CardBody,
  Checkbox,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function NewLetter() {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    try {
      console.log("values: ", values);
      const formData = new FormData();
      Object.keys(values).forEach((fieldName) => {
        if (fieldName === "mietvertrag") {
          formData.append(fieldName, values[fieldName][0]);
        } else {
          formData.append(fieldName, values[fieldName]);
        }
      });
      const res = await fetch("/api/miet", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });
      console.log("api fetch done", await res.json());
      if (res.status != 200) {
        return toast({
          title: "Ein Fehler ist aufgetreten.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      toast({
        title: "Angebot erstellt.",
        status: "success",
        isClosable: true,
        duration: 2000,
      });
      onClose();
      reset();
      router.replace(router.asPath);
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
    }
  }

  return (
    <Card size={"lg"}>
      <CardBody>
        <form id="new-angebot-form" onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={10}>
            <SimpleGrid spacing={6} columns={3} w={"full"}>
              <GridItem colSpan={3}>
                <Heading size={"md"} color={"gray.500"}>
                  Angaben zur internen Zuordnung
                </Heading>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl isInvalid={errors.andereLizenzpartner}>
                  <FormLabel>
                    Hatten Sie bereits im Vorfeld Kontakt mit einem Botschafter?
                    (Name bitte eintragen)
                  </FormLabel>
                  <Input
                    name="andereLizenzpartner"
                    type="text"
                    {...register("andereLizenzpartner", {
                      required: "Pflichtfeld",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.andereLizenzpartner &&
                      errors.andereLizenzpartner.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={3}>
                <Heading size={"md"} color={"gray.500"}>
                  Angaben zum Träger / Dachverband
                </Heading>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl isInvalid={errors.nameTraeger}>
                  <FormLabel>
                    Name und Rechtsform des Trägers (bitte exakt vom
                    Freistellungsbescheid des FA übernehmen)
                  </FormLabel>
                  <Input
                    name="nameTraeger"
                    // onChange={handleMiet}
                    type="number"
                    {...register("nameTraeger", {
                      required: "Pflichtfeld",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.nameTraeger && errors.nameTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl isInvalid={errors.vorstandTraeger}>
                  <FormLabel>Name des Vorstands/Geschäftsführers</FormLabel>
                  <Input
                    name="vorstandTraeger"
                    // onChange={handleMiet}
                    type="string"
                    {...register("vorstandTraeger", {
                      required: "Pflichtfeld",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.vorstandTraeger && errors.vorstandTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl isInvalid={errors.strasseTraeger}>
                  <FormLabel>Straße und Hausnummer</FormLabel>
                  <Input
                    name="strasseTraeger"
                    // onChange={handleMiet}
                    type="string"
                    {...register("strasseTraeger", {
                      required: "Pflichtfeld",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.strasseTraeger && errors.strasseTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl isInvalid={errors.plzTraeger}>
                  <FormLabel>PLZ</FormLabel>
                  <Input
                    name="plzTraeger"
                    // onChange={handleMiet}
                    type="string"
                    {...register("plzTraeger", {
                      required: "Pflichtfeld",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.plzTraeger && errors.plzTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isInvalid={errors.ortTraeger}>
                  <FormLabel>Ort</FormLabel>
                  <Input
                    name="ortTraeger"
                    // onChange={handleMiet}
                    type="string"
                    {...register("ortTraeger", {
                      required: "Pflichtfeld",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.ortTraeger && errors.ortTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={3}>
                <FormControl isInvalid={errors.bundeslandTraeger}>
                  <FormLabel>Bundesland</FormLabel>
                  <Select
                    name="bundeslandTraeger"
                    type="string"
                    {...register("bundeslandTraeger", {
                      required: "Pflichtfeld",
                    })}
                  >
                    <option value="Baden-Wuerttemberg">
                      Baden-Württemberg
                    </option>
                    <option value="Bayern">Bayern</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Brandenburg">Brandenburg</option>
                    <option value="Bremen">Bremen</option>
                    <option value="Hamburg">Hamburg</option>
                    <option value="Hessen">Hessen</option>
                    <option value="Mecklenburg-Vorpommern">
                      Mecklenburg-Vorpommern
                    </option>
                    <option value="Niedersachsen">Niedersachsen</option>
                    <option value="Nordrhein-Westfalen">
                      Nordrhein-Westfalen
                    </option>
                    <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
                    <option value="Saarland">Saarland</option>
                    <option value="Sachsen">Sachsen</option>
                    <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
                    <option value="Schleswig-Holstein">
                      Schleswig-Holstein
                    </option>
                    <option value="Thüringen">Thüringen</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.bundeslandTraeger &&
                      errors.bundeslandTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={"3"}>
                <FormControl isInvalid={errors.vereinTraeger}>
                  <FormLabel>Als gemeinnützig anerkannt</FormLabel>
                  <RadioGroup
                    defaultValue=""
                    name="vereinTraeger"
                    {...register("vereinTraeger", {
                      required: "Pflichtfeld",
                    })}
                  >
                    <HStack spacing="32px">
                      <Radio value="ja">Ja</Radio>
                      <Radio value="nein">Nein</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormErrorMessage>
                    {errors.vereinTraeger && errors.vereinTraeger.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <Input
                  type="file"
                  // multiple
                  {...register("mietvertrag")}
                  sx={{
                    "::file-selector-button": {
                      height: 10,
                      padding: 0,
                      mr: 4,
                      background: "none",
                      border: "none",
                      fontWeight: "bold",
                    },
                  }}
                />
              </GridItem>
              <GridItem colSpan={"3"}>
                <Button
                  colorScheme="green"
                  form="new-angebot-form"
                  type="submit"
                  w={"100%"}
                >
                  Bewerbung abschicken
                </Button>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
}

export default NewLetter;
