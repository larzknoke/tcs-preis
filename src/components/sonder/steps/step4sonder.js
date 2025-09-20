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
  Checkbox,
  CheckboxGroup,
  Icon,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";
import Link from "next/link";
import { useFormContext, Controller } from "react-hook-form";

function Step4Sonder() {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
  } = useFormContext();

  return (
    <VStack gap={10}>
      <SimpleGrid spacing={6} columns={4} w={"full"}>
        <GridItem colSpan={4}>
          <Heading size={"md"} color={"gray.500"}>
            Datenschutzrechtliche Einverständniserklärung
          </Heading>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkDatenschutzBilder}>
            <Checkbox
              name="checkDatenschutzBilder"
              type="checkbox"
              {...register("checkDatenschutzBilder", {
                required: "Pflichtfeld",
              })}
              spacing={6}
              textAlign={"left"}
            >
              Wir sind damit einverstanden, dass unsere Bewerbung oder Teile
              davon, insbesondere Foto-, Film- und Tonaufnahmen zum Zwecke der
              Öffentlichkeitsarbeit der Town & Country Stiftung, deren Presse-
              und Medienagentur, deren Botschaftern, Vertrags- und
              Kooperationspartnern sowie von regionaler und überregionaler
              Presse vervielfältigt, verbreitet, öffentlich wiedergegeben und
              ggf. für diese Zwecke bearbeitet werden. Diese
              Einverständniserklärung umfasst insbesondere die Veröffentlichung
              der Angaben zu unserer als gemeinnützig anerkannten Einrichtung,
              zum Projekt, zu eingereichten Fotos, zu Fotos von einer
              Scheckübergabe im Rahmen des Town & Country Stiftungspreises sowie
              eventuellen Foto-, Film- und Tonaufnahmen im Rahmen der Town &
              Country Stiftungsgala.
              <FormErrorMessage>
                {errors.checkDatenschutzBilder &&
                  errors.checkDatenschutzBilder.message}
              </FormErrorMessage>
            </Checkbox>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkScheck}>
            <Checkbox
              name="checkScheck"
              type="checkbox"
              {...register("checkScheck", {
                required: "Pflichtfeld",
              })}
              spacing={6}
              textAlign={"left"}
            >
              Wir verpflichten uns, dafür Sorge zu tragen, dass die im Rahmen
              einer Scheckübergabe zu erstellenden Foto-, Film- und Tonaufnahmen
              nach den datenschutzrechtlichen Vorschriften erstellt und der Town
              & Country Stiftung sowie deren mit der Öffentlichkeitsarbeit
              betrauten Vertragspartnern dementsprechend zur Verfügung gestellt
              werden. Wir werden die Town & Country Stiftung im Falle eines
              Widerrufs der Einverständniserklärung eines Betroffenen bzgl.
              dieser Aufnahmen unverzüglich informieren.
              <FormErrorMessage>
                {errors.checkScheck && errors.checkScheck.message}
              </FormErrorMessage>
            </Checkbox>
          </FormControl>
        </GridItem>

        {/* <GridItem colSpan={4}>
          <Link
            target="_blank"
            href={
              "https://www.tc-stiftung.de/wp-content/uploads/2023/09/Muster-Einwilligungserklaerung-Stiftungspreis.pdf"
            }
          >
            <HStack>
              <Icon as={FaFilePdf} />
              <Text>
                <Text as="sup" mr={1}>
                  1
                </Text>
                Hier findet Ihr eine Muster-Einwilligungserklärung für
                Minderjährige für die Preisübergabe.
              </Text>
            </HStack>
          </Link>
        </GridItem> */}
        <GridItem colSpan={4}>
          <Heading size={"md"} color={"gray.500"} mt={12}>
            Bestätigung
          </Heading>
        </GridItem>

        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkDatenschutzerklaerung}>
            <Checkbox
              name="checkDatenschutzerklaerung"
              type="checkbox"
              {...register("checkDatenschutzerklaerung", {
                required: "Pflichtfeld",
              })}
              spacing={6}
              textAlign={"left"}
            >
              Wir haben die{" "}
              <Link
                target="_blank"
                href="https://www.tc-stiftung.de/wp-content/uploads/2025/09/2025_DSErklBew_SP.pdf"
              >
                hier abrufbare Datenschutzerklärung
              </Link>{" "}
              gelesen und erkennen diese als verbindlich an.
              <FormErrorMessage>
                {errors.checkDatenschutzerklaerung &&
                  errors.checkDatenschutzerklaerung.message}
              </FormErrorMessage>
            </Checkbox>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkTeilnahmebedingungen}>
            <Checkbox
              name="checkTeilnahmebedingungen"
              type="checkbox"
              {...register("checkTeilnahmebedingungen", {
                required: "Pflichtfeld",
              })}
              spacing={6}
              textAlign={"left"}
            >
              Wir haben die{" "}
              <Link
                target="_blank"
                href="https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_AllgTeilnBed_SP.pdf"
              >
                hier abrufbaren Teilnahmebedingungen
              </Link>{" "}
              des 12. Town & Country Sonderpreis gelesen und erkennen sie als
              verbindlich an.
              <FormErrorMessage>
                {errors.checkTeilnahmebedingungen &&
                  errors.checkTeilnahmebedingungen.message}
              </FormErrorMessage>
            </Checkbox>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkWahrheit}>
            <Checkbox
              name="checkWahrheit"
              type="checkbox"
              {...register("checkWahrheit", {
                required: "Pflichtfeld",
              })}
              spacing={6}
              textAlign={"left"}
            >
              Ich bestätige, die vorstehenden Angaben wahrheitsgemäß und
              vollständig getätigt zu haben.
              <FormErrorMessage>
                {errors.checkWahrheit && errors.checkWahrheit.message}
              </FormErrorMessage>
            </Checkbox>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}

export default Step4Sonder;
