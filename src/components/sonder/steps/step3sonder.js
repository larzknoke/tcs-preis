import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  SimpleGrid,
  GridItem,
  Select,
  Heading,
  RadioGroup,
  HStack,
  Radio,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

function Step3Sonder() {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    getValues,
    resetField,
  } = useFormContext();

  const [customFile, setCustomFile] = useState("");
  const [customFile2, setCustomFile2] = useState("");

  useEffect(() => {
    ["customFile", "customFile2"].forEach((typ) => {
      const files = getValues(typ);
      if (files && files.length > 0 && files[0] && files[0].name) {
        if (typ == "customFile") {
          setCustomFile(files[0].name);
        } else if (typ == "customFile2") {
          setCustomFile2(files[0].name);
        }
      }
    });
  }, []);

  return (
    <VStack gap={10}>
      <SimpleGrid spacing={6} columns={4} w={"full"}>
        <GridItem colSpan={3}>
          <Heading textAlign={"left"} size={"md"} color={"gray.500"}>
            Angaben zur Finanzierung (in Euro)
          </Heading>
        </GridItem>
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
            <FormLabel>
              Öffentliche Zuwendungen (z.B. Landes- oder Bundesmittel)
            </FormLabel>
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
            <FormLabel>
              Private Spenden (z.B. Privatpersonen, Unternehmen)
            </FormLabel>
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
          <FormControl isInvalid={errors.zuwendungAndere}>
            <FormLabel>
              Zuwendungen durch andere gemeinnützige Organisationen (z.B.
              Stiftungen, Vereine)
            </FormLabel>
            <Input
              name="zuwendungAndere"
              type="text"
              {...register("zuwendungAndere")}
            />
            <FormErrorMessage>
              {errors.zuwendungAndere && errors.zuwendungAndere.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.bisherigeFoerderung}>
            <FormLabel>
              Bisherige Förderung Eures Vereins/Organisation durch die Town
              &amp; Country Stiftung (Wann und welche Zahlungen/Preise habt ihr
              bislang von der Town &amp; Country Stiftung erhalten,
              beispielsweise aus vergangenen Stiftungspreisen?)
            </FormLabel>
            <Input
              name="bisherigeFoerderung"
              type="text"
              {...register("bisherigeFoerderung")}
            />
            <FormErrorMessage>
              {errors.bisherigeFoerderung && errors.bisherigeFoerderung.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={3} maxW={{ base: "100%", md: "50%" }}>
          <FormControl isInvalid={errors.customFile}>
            <FormLabel>weitere Dateien (max 5MB, PDF oder JPG)</FormLabel>
            {customFile == "" ? (
              <Input
                name="customFile"
                type="file"
                {...register("customFile", {
                  onChange: (e) => {
                    setCustomFile(e.target.files[0].name);
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
                <Text>Datei: {customFile}</Text>
                <IconButton
                  variant={"ghost"}
                  colorScheme="red"
                  icon={<HiOutlineTrash />}
                  onClick={() => {
                    resetField("customFile", {
                      defaultValue: null,
                    });
                    setCustomFile("");
                  }}
                />
              </HStack>
            )}
            <FormErrorMessage>
              {errors.customFile && errors.customFile.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={3} maxW={{ base: "100%", md: "50%" }}>
          <FormControl isInvalid={errors.customFile2}>
            <FormLabel>weitere Dateien (max 5MB, PDF oder JPG)</FormLabel>
            {customFile2 == "" ? (
              <Input
                name="customFile2"
                type="file"
                {...register("customFile2", {
                  onChange: (e) => {
                    setCustomFile2(e.target.files[0].name);
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
                <Text>Datei: {customFile2}</Text>
                <IconButton
                  variant={"ghost"}
                  colorScheme="red"
                  icon={<HiOutlineTrash />}
                  onClick={() => {
                    resetField("customFile2", {
                      defaultValue: null,
                    });
                    setCustomFile2("");
                  }}
                />
              </HStack>
            )}
            <FormErrorMessage>
              {errors.customFile2 && errors.customFile2.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}

export default Step3Sonder;
