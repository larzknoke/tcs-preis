import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  SimpleGrid,
  GridItem,
  Heading,
  RadioGroup,
  HStack,
  Radio,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { bundeslaender } from "@/lib/data";
import { useFormContext, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

function Step1Sonder() {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    getValues,
    resetField,
  } = useFormContext();

  const [freistellungFile, setFreistellungFile] = useState("");
  const [freistellungFile2, setFreistellungFile2] = useState("");

  useEffect(() => {
    ["freistellungsbescheidTraeger", "freistellungsbescheidTraeger2"].forEach(
      (typ) => {
        const files = getValues(typ);
        if (files && files.length > 0 && files[0] && files[0].name) {
          if (typ == "freistellungsbescheidTraeger") {
            setFreistellungFile(files[0].name);
          } else if (typ == "freistellungsbescheidTraeger2") {
            setFreistellungFile2(files[0].name);
          }
        }
      }
    );
  }, []);

  return (
    <VStack gap={10}>
      <SimpleGrid spacing={6} columns={3} w={"full"}>
        <GridItem colSpan={3}>
          <Heading textAlign={"left"} size={"md"} color={"gray.500"}>
            Angaben zur internen Zuordnung Sonderpreis
          </Heading>
        </GridItem>
        <GridItem colSpan={3}>
          <FormControl isInvalid={errors.andereLizenzpartner}>
            <FormLabel>
              Hattet Ihr bereits im Vorfeld Kontakt mit einem
              Stiftungsbotschafter (falls ja, bitte den Namen eintragen)
            </FormLabel>
            <Input
              name="andereLizenzpartner"
              type="text"
              {...register("andereLizenzpartner")}
            />
            <FormErrorMessage>
              {errors.andereLizenzpartner && errors.andereLizenzpartner.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={3}>
          <Heading textAlign={"left"} mt={8} size={"md"} color={"gray.500"}>
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
              type="text"
              {...register("nameTraeger")}
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
              type="text"
              {...register("vorstandTraeger")}
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
              type="string"
              {...register("strasseTraeger")}
            />
            <FormErrorMessage>
              {errors.strasseTraeger && errors.strasseTraeger.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isInvalid={errors.plzTraeger}>
            <FormLabel>PLZ</FormLabel>
            <Input name="plzTraeger" type="text" {...register("plzTraeger")} />
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
              type="string"
              {...register("ortTraeger")}
            />
            <FormErrorMessage>
              {errors.ortTraeger && errors.ortTraeger.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={3}>
          <Controller
            control={control}
            name="bundeslandTraeger"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
            }) => {
              return (
                <FormControl py={4} isInvalid={!!error}>
                  <FormLabel>Bundesland</FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={bundeslaender}
                    placeholder="Bitte auswählen..."
                    instanceId={"bundeslaender-select"}
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
        <GridItem colSpan={"3"} mb={3}>
          <FormControl isInvalid={errors.vereinTraeger}>
            <FormLabel>Als gemeinnützig anerkannt</FormLabel>
            <Controller
              control={control}
              name="vereinTraeger"
              render={({ field }) => (
                <RadioGroup ref={register()} defaultValue="" {...field}>
                  <HStack spacing="32px">
                    <Radio value="ja">Ja</Radio>
                    <Radio value="nein">Nein</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors.vereinTraeger && errors.vereinTraeger.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={3} maxW={{ base: "100%", md: "60%" }}>
          <FormControl isInvalid={errors.freistellungsbescheidTraeger}>
            <FormLabel>
              Freistellungsbescheid (max 10 MB, PDF oder JPG)
            </FormLabel>
            {freistellungFile == "" ? (
              <Input
                name="freistellungsbescheidTraeger"
                type="file"
                {...register("freistellungsbescheidTraeger", {
                  onChange: (e) => {
                    setFreistellungFile(e.target.files[0].name);
                  },
                })}
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
            ) : (
              <HStack spacing={8}>
                <Text>Datei: {freistellungFile}</Text>
                <IconButton
                  variant={"ghost"}
                  colorScheme="red"
                  icon={<HiOutlineTrash />}
                  onClick={() => {
                    resetField("freistellungsbescheidTraeger", {
                      defaultValue: null,
                    });
                    setFreistellungFile("");
                  }}
                />
              </HStack>
            )}
            <FormErrorMessage>
              {errors.freistellungsbescheidTraeger &&
                errors.freistellungsbescheidTraeger.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={3} maxW={{ base: "100%", md: "60%" }}>
          <FormControl isInvalid={errors.freistellungsbescheidTraeger2}>
            <FormLabel>
              Freistellungsbescheid (optional zweite Datei, max 10MB, PDF oder
              JPG)
            </FormLabel>
            {freistellungFile2 == "" ? (
              <Input
                name="freistellungsbescheidTraeger2"
                type="file"
                {...register("freistellungsbescheidTraeger2", {
                  onChange: (e) => {
                    setFreistellungFile2(e.target.files[0].name);
                  },
                })}
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
            ) : (
              <HStack spacing={8}>
                <Text>Datei: {freistellungFile2}</Text>
                <IconButton
                  variant={"ghost"}
                  colorScheme="red"
                  icon={<HiOutlineTrash />}
                  onClick={() => {
                    resetField("freistellungsbescheidTraeger2", {
                      defaultValue: null,
                    });
                    setFreistellungFile2("");
                  }}
                />
              </HStack>
            )}
            <FormErrorMessage>
              {errors.freistellungsbescheidTraeger2 &&
                errors.freistellungsbescheidTraeger2.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}

export default Step1Sonder;
