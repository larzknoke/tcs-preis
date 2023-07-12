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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function Step2() {
  const {
    handleSubmit,
    register,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <VStack gap={10}>
      <SimpleGrid spacing={6} columns={4} w={"full"}>
        <GridItem colSpan={3}>
          <Heading size={"md"} color={"gray.500"}>
            Angaben zum Projekt
          </Heading>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.organisationProjekt}>
            <FormLabel>
              Name der Organisation/Einrichtung (innerhalb eines Dachverbandes)
            </FormLabel>
            <Input
              name="organisationProjekt"
              type="number"
              {...register("organisationProjekt", {
                required: "Pflichtfeld",
              })}
            />
            <FormErrorMessage>
              {errors.organisationProjekt && errors.organisationProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.ansprechpartnerProjekt}>
            <FormLabel>Ansprechpartner</FormLabel>
            <Input
              name="ansprechpartnerProjekt"
              type="string"
              {...register("ansprechpartnerProjekt", {
                required: "Pflichtfeld",
              })}
            />
            <FormErrorMessage>
              {errors.ansprechpartnerProjekt &&
                errors.ansprechpartnerProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.telefonnummerProjekt}>
            <FormLabel>Telefonnummer</FormLabel>
            <Input
              name="telefonnummerProjekt"
              type="string"
              {...register("telefonnummerProjekt", {
                required: "Pflichtfeld",
              })}
            />
            <FormErrorMessage>
              {errors.telefonnummerProjekt &&
                errors.telefonnummerProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.mobilProjekt}>
            <FormLabel>Mobilfunknummer</FormLabel>
            <Input
              name="mobilProjekt"
              type="string"
              {...register("mobilProjekt", {
                required: "Pflichtfeld",
              })}
            />
            <FormErrorMessage>
              {errors.mobilProjekt && errors.mobilProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.emailProjekt}>
            <FormLabel>E-Mail</FormLabel>
            <Input
              name="emailProjekt"
              type="string"
              {...register("emailProjekt", {
                required: "Pflichtfeld",
              })}
            />
            <FormErrorMessage>
              {errors.emailProjekt && errors.emailProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.emailBestaetigungProjekt}>
            <FormLabel>E-Mail Bestätigung</FormLabel>
            <Input
              name="emailBestaetigungProjekt"
              type="string"
              {...register("emailBestaetigungProjekt", {
                required: "Pflichtfeld",
              })}
            />
            <FormErrorMessage>
              {errors.emailBestaetigungProjekt &&
                errors.emailBestaetigungProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.wwwProjekt}>
            <FormLabel>Website, Facebook, Instagram</FormLabel>
            <Input
              name="wwwProjekt"
              type="string"
              {...register("wwwProjekt", {
                required: "Pflichtfeld",
              })}
            />
            <FormErrorMessage>
              {errors.wwwProjekt && errors.wwwProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.ibanProjekt}>
            <FormLabel>Bankverbindung – IBAN des Vereinskontos</FormLabel>
            <Input
              name="ibanProjekt"
              type="string"
              {...register("ibanProjekt", {
                required: "Pflichtfeld",
              })}
              onChange={(e) => console.log(e.target.value)}
            />
            <FormErrorMessage>
              {errors.ibanProjekt && errors.ibanProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.kontoNameProjekt}>
            <FormLabel>Name des Kontoinhabers (Verein/Organisation)</FormLabel>
            <Input
              name="kontoNameProjekt"
              type="string"
              {...register("kontoNameProjekt", {
                required: "Pflichtfeld",
              })}
            />
            <FormErrorMessage>
              {errors.kontoNameProjekt && errors.kontoNameProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}

export default Step2;
