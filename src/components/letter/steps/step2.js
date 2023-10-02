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
  Switch,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { Select } from "chakra-react-select";
import { bundeslaender } from "@/lib/data";
import { useState } from "react";
import InputMask from "react-input-mask";

function Step2() {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    clearErrors,
  } = useFormContext();

  const [adresseTraeger, setAdresseTraeger] = useState(false);

  return (
    <VStack gap={10}>
      <SimpleGrid spacing={6} columns={4} w={"full"}>
        <GridItem colSpan={3}>
          <Heading textAlign={"left"} size={"md"} color={"gray.500"}>
            Angaben zum Projekt
          </Heading>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.organisationProjekt}>
            <FormLabel>Name der Organisation/Einrichtung</FormLabel>
            <Input
              name="organisationProjekt"
              type="text"
              {...register("organisationProjekt")}
            />
            <FormErrorMessage>
              {errors.organisationProjekt && errors.organisationProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.nameProjekt}>
            <FormLabel>Name des Projektes</FormLabel>
            <Input
              name="nameProjekt"
              type="text"
              {...register("nameProjekt")}
            />
            <FormErrorMessage>
              {errors.nameProjekt && errors.nameProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.ansprechpartnerProjekt}>
            <FormLabel>Ansprechpartner</FormLabel>
            <Input
              name="ansprechpartnerProjekt"
              type="string"
              {...register("ansprechpartnerProjekt")}
            />
            <FormErrorMessage>
              {errors.ansprechpartnerProjekt &&
                errors.ansprechpartnerProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.telefonnummerProjekt}>
            <FormLabel>Telefonnummer</FormLabel>
            <Input
              name="telefonnummerProjekt"
              type="string"
              {...register("telefonnummerProjekt")}
              onChange={(field) => {
                field.target.value.length > 0
                  ? clearErrors(["mobilProjekt"])
                  : "";
              }}
            />
            <FormErrorMessage>
              {errors.telefonnummerProjekt &&
                errors.telefonnummerProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.mobilProjekt}>
            <FormLabel>Mobilfunknummer</FormLabel>
            <Input
              name="mobilProjekt"
              type="string"
              {...register("mobilProjekt")}
              onChange={(field) => {
                field.target.value.length > 0
                  ? clearErrors(["telefonnummerProjekt"])
                  : "";
              }}
            />
            <FormErrorMessage>
              {errors.mobilProjekt && errors.mobilProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.emailProjekt}>
            <FormLabel>E-Mail</FormLabel>
            <Input
              name="emailProjekt"
              type="email"
              {...register("emailProjekt")}
            />
            <FormErrorMessage>
              {errors.emailProjekt && errors.emailProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.emailBestaetigungProjekt}>
            <FormLabel>E-Mail Bestätigung</FormLabel>
            <Input
              name="emailBestaetigungProjekt"
              type="email"
              {...register("emailBestaetigungProjekt")}
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
              {...register("wwwProjekt")}
            />
            <FormErrorMessage>
              {errors.wwwProjekt && errors.wwwProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.kontoNameProjekt}>
            <FormLabel>Name des Kontoinhabers (Verein/Organisation)</FormLabel>
            <Input
              name="kontoNameProjekt"
              type="string"
              {...register("kontoNameProjekt")}
            />
            <FormErrorMessage>
              {errors.kontoNameProjekt && errors.kontoNameProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.bankNameProjekt}>
            <FormLabel>Name der Bank / des Kreditinstituts</FormLabel>
            <Input
              name="bankNameProjekt"
              type="string"
              {...register("bankNameProjekt")}
            />
            <FormErrorMessage>
              {errors.bankNameProjekt && errors.bankNameProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <Controller
            name="ibanProjekt"
            control={control}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
            }) => (
              <FormControl isInvalid={errors.ibanProjekt}>
                <FormLabel>
                  Bankverbindung - IBAN der gemeinnützigen Einrichtung (Bitte
                  ohne Leerzeichen eingeben)
                </FormLabel>
                <InputMask
                  mask="aa99 9999 9999 9999 9999 99"
                  value={value}
                  onChange={onChange}
                  disabled={false}
                  onBlur={onBlur}
                >
                  <Input
                    disabled={false}
                    name="ibanProjekt"
                    type="text"
                    placeholder="DE12 3456 7890 1234 5678 90"
                  />
                </InputMask>
                <FormErrorMessage>
                  {errors.ibanProjekt && errors.ibanProjekt.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        </GridItem>
        <GridItem colSpan={4} py={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="adresseTraeger" mb="0">
              Adresse abweichend vom Träger?
            </FormLabel>
            <Switch
              id="adresseTraeger"
              onChange={(e) => setAdresseTraeger(e.target.checked)}
            />
          </FormControl>
        </GridItem>
        {adresseTraeger && (
          <>
            <GridItem colSpan={4}>
              <Heading textAlign={"left"} size={"sm"} color={"red.500"}>
                – Sofern vom Sitz des Trägers abweichend –
              </Heading>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl isInvalid={errors.strasseProjekt}>
                <FormLabel>Straße und Hausnummer (Vereinsadresse)</FormLabel>
                <Input
                  name="strasseProjekt"
                  type="string"
                  {...register("strasseProjekt")}
                />
                <FormErrorMessage>
                  {errors.strasseProjekt && errors.strasseProjekt.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isInvalid={errors.plzProjekt}>
                <FormLabel>Postleitzahl (Vereinsadresse)</FormLabel>
                <Input
                  name="plzProjekt"
                  type="text"
                  {...register("plzProjekt")}
                />
                <FormErrorMessage>
                  {errors.plzProjekt && errors.plzProjekt.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isInvalid={errors.ortProjekt}>
                <FormLabel>Ort (Vereinsadresse)</FormLabel>
                <Input
                  name="ortProjekt"
                  type="string"
                  {...register("ortProjekt")}
                />
                <FormErrorMessage>
                  {errors.ortProjekt && errors.ortProjekt.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4} mb={6}>
              <Controller
                control={control}
                name="bundeslandProjekt"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <FormControl isInvalid={!!error} id="bundesland">
                      <FormLabel>Bundesland</FormLabel>
                      <Select
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        options={bundeslaender}
                        placeholder="Bitte auswählen..."
                      />
                      <FormErrorMessage>
                        {errors.bundeslandProjekt &&
                          errors.bundeslandProjekt.message}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              />
            </GridItem>
          </>
        )}
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.wannProjekt}>
            <FormLabel>Seit wann besteht das Projekt?</FormLabel>
            <Input
              name="wannProjekt"
              type="string"
              {...register("wannProjekt")}
            />
            <FormErrorMessage>
              {errors.wannProjekt && errors.wannProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.mitarbeiterProjekt}>
            <FormLabel>
              Wie viele Mitarbeiter sind am Projekt beteiligt?
            </FormLabel>
            <Input
              name="mitarbeiterProjekt"
              type="string"
              {...register("mitarbeiterProjekt")}
            />
            <FormErrorMessage>
              {errors.mitarbeiterProjekt && errors.mitarbeiterProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.hauptamtlichAnzahl}>
            <FormLabel>Davon hauptamtlich tätig?</FormLabel>
            <Input
              name="hauptamtlichAnzahl"
              type="string"
              {...register("hauptamtlichAnzahl")}
            />
            <FormErrorMessage>
              {errors.hauptamtlichAnzahl && errors.hauptamtlichAnzahl.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.hauptamtlichStunden}>
            <FormLabel>
              Anzahl der Gesamtstunden pro Woche (hauptamtlich)
            </FormLabel>
            <Input
              name="hauptamtlichStunden"
              type="string"
              {...register("hauptamtlichStunden")}
            />
            <FormErrorMessage>
              {errors.hauptamtlichStunden && errors.hauptamtlichStunden.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.ehrenamtlichAnzahl}>
            <FormLabel>Davon ehrenantlich tätig?</FormLabel>
            <Input
              name="ehrenamtlichAnzahl"
              type="string"
              {...register("ehrenamtlichAnzahl")}
            />
            <FormErrorMessage>
              {errors.ehrenamtlichAnzahl && errors.ehrenamtlichAnzahl.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 4, md: 2 }}>
          <FormControl isInvalid={errors.ehrenamtlichStunden}>
            <FormLabel>
              Anzahl der Gesamtstunden pro Woche (ehrenamtlich)
            </FormLabel>
            <Input
              name="ehrenamtlichStunden"
              type="string"
              {...register("ehrenamtlichStunden")}
            />
            <FormErrorMessage>
              {errors.ehrenamtlichStunden && errors.ehrenamtlichStunden.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.beschreibungProjekt}>
            <FormLabel>
              Projektbeschreibung{" "}
              <Text fontSize={"sm"} color={"gray.400"}>
                Ihre Beschreibung soll pressetauglich veröffentlicht werden.
                Bitte ziehen Sie alle Angaben in den folgenden Formularfeldern
                in diese Zusammenfassung mit ein. Ihnen stehen max. 1500 Zeichen
                zur Verfügung.
              </Text>
            </FormLabel>
            <Textarea
              name="beschreibungProjekt"
              type="string"
              {...register("beschreibungProjekt")}
              minH={48}
            />
            <FormErrorMessage>
              {errors.beschreibungProjekt && errors.beschreibungProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.zielsetzungProjekt}>
            <FormLabel>
              Zielsetzung des Projektes
              <Text fontSize={"sm"} color={"gray.400"}>
                In welcher Form wird Unterstützung geleistet und damit die
                Situation der Kinder und Jugendlichen verbessert? Ihnen stehen
                max. 500 Zeichen zur Verfügung.
              </Text>
            </FormLabel>
            <Textarea
              name="zielsetzungProjekt"
              type="string"
              {...register("zielsetzungProjekt")}
              minH={48}
            />
            <FormErrorMessage>
              {errors.zielsetzungProjekt && errors.zielsetzungProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.benachteiligungProjekt}>
            <FormLabel>
              Benachteiligung
              <Text fontSize={"sm"} color={"gray.400"}>
                Wie viele benachteiligte Kinder &amp; Jugendliche sind in das
                Projekt involviert? Welche Altersklassen sind vertreten? In
                welcher Form äußert sich die Benachteiligung? Ihnen stehen max.
                500 Zeichen zur Verfügung.
              </Text>
            </FormLabel>
            <Textarea
              name="benachteiligungProjekt"
              type="string"
              {...register("benachteiligungProjekt")}
              minH={48}
            />
            <FormErrorMessage>
              {errors.benachteiligungProjekt &&
                errors.benachteiligungProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.umsetzungProjekt}>
            <FormLabel>
              Projektumsetzung / Projektrealisierung
              <Text fontSize={"sm"} color={"gray.400"}>
                Wie und für was möchten Sie den Förderbetrag einsetzen? Ihnen
                stehen max. 500 Zeichen zur Verfügung.
              </Text>
            </FormLabel>
            <Textarea
              name="umsetzungProjekt"
              type="string"
              {...register("umsetzungProjekt")}
              minH={48}
            />
            <FormErrorMessage>
              {errors.umsetzungProjekt && errors.umsetzungProjekt.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.bisherigeErgebnisse}>
            <FormLabel>
              Bisherige Ergebnisse
              <Text fontSize={"sm"} color={"gray.400"}>
                Ihnen stehen max. 500 Zeichen zur Verfügung.
              </Text>
            </FormLabel>
            <Textarea
              name="bisherigeErgebnisse"
              type="string"
              {...register("bisherigeErgebnisse")}
              minH={48}
            />
            <FormErrorMessage>
              {errors.bisherigeErgebnisse && errors.bisherigeErgebnisse.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}

export default Step2;
