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
import { useFormContext } from "react-hook-form";

function Step4() {
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
            Einverständniserklärung
          </Heading>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkBeitrag}>
            <Checkbox
              name="checkBeitrag"
              type="checkbox"
              {...register("checkBeitrag", {
                required: "Pflichtfeld",
              })}
              spacing={6}
            >
              Wir sind damit einverstanden, dass unsere Bewerbung oder Teile
              davon, insbesondere Fotos zum Zwecke der Öffentlichkeitsarbeit der
              Town & Country Stiftung, deren Presse- und Medienagentur, deren
              Botschaftern, Vertrags- und Kooperationspartnern sowie von
              regionaler und überregionaler Presse vervielfältigt, verbreitet,
              öffentlich wiedergegeben und ggf. für diese Zwecke bearbeitet
              werden.{" "}
              <Tooltip label="Die hiermit eingeräumten Nutzungsrechte gelten zeitlich, inhaltlich und medial unbeschränkt und sind unbefristet. Davon ausgenommen sind sämtliche Angaben zur Finanzierung.">
                <Text as="sup">1</Text>
              </Tooltip>
            </Checkbox>
            <FormErrorMessage>
              {errors.checkBeitrag && errors.checkBeitrag.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkVeroeffentlich}>
            <Checkbox
              name="checkVeroeffentlich"
              type="checkbox"
              {...register("checkVeroeffentlich", {
                required: "Pflichtfeld",
              })}
              spacing={6}
            >
              Vor diesem Hintergrund stimmen wir der Veröffentlichung der
              Angaben zu unserer als gemeinnützig anerkannten Einrichtung, zum
              Projekt, zu eingereichten Fotos, zu Fotos von einer Scheckübergabe
              im Rahmen des Town & Country Stiftungspreises sowie eventuellen
              Fotos und Videoaufnahmen im Rahmen der Town & Country
              Stiftungsgala zu.
            </Checkbox>
            <FormErrorMessage>
              {errors.checkVeroeffentlich && errors.checkVeroeffentlich.message}
            </FormErrorMessage>
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
            >
              Wir verpflichten uns, dafür Sorge zu tragen, dass die im Rahmen
              einer Scheckübergabe zu erstellenden Lichtbilder entsprechend den
              datenschutzrechtlichen Vorschriften erstellt und der Town &
              Country Stiftung sowie deren mit der Öffentlichkeitsarbeit
              betrauten Vertragspartnern zur Verfügung gestellt werden.
            </Checkbox>
            <FormErrorMessage>
              {errors.checkScheck && errors.checkScheck.message}
            </FormErrorMessage>
          </FormControl>
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
            >
              Die datenschutzrechtlichen Einwilligungserklärungen der dort
              abgebildeten Personen, insbesondere der dort abgebildeten Kinder
              werden wir entsprechend den geltenden Bestimmungen einholen. Über
              den Widerruf bzw. den Widerspruch eines auf den Lichtbildern
              abgebildeten Betroffenen werden wir die Town & Country Stiftung
              unverzüglich informieren.
            </Checkbox>
            <FormErrorMessage>
              {errors.checkDatenschutzBilder &&
                errors.checkDatenschutzBilder.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <Link
            href={
              "https://www.tc-stiftung.de/wp-content/uploads/2020/01/Muster-Einwilligungserkl%C3%A4rung.pdf"
            }
          >
            <HStack>
              <Icon as={FaFilePdf} />
              <Text>
                Hier finden Sie eine Muster-Einwilligungserklärung für
                Minderjährige für die Preisübergabe
              </Text>
            </HStack>
          </Link>
        </GridItem>
        <GridItem colSpan={4}>
          <Heading size={"md"} color={"gray.500"} mt={12}>
            Datenschutzrechtliche Einwilligungserklärung
          </Heading>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkPersonenbezogen}>
            <Checkbox
              name="checkPersonenbezogen"
              type="checkbox"
              {...register("checkPersonenbezogen", {
                required: "Pflichtfeld",
              })}
              spacing={6}
            >
              Wir willigen ein, dass die von uns im Rahmen der Bewerbung sowie
              Teilnahme am 10. Town & Country Stiftungspreis übermittelten
              personenbezogenen Daten im Rahmen des Town & Country
              Stiftungspreises verarbeitet werden. Die Daten werden von der Town
              & Country Stiftung (Hauptstraße 90E, 99820 Hörselberg-Hainich OT
              Behringen), den Botschaftern der Town & Country Stiftung, der Town
              & Country Haus Lizenzgeber GmbH (Hauptstraße 90E, 99820
              Hörselberg-Hainich OT Behringen), den Lizenz- und
              Franchise-Partnern der Town & Country Haus Lizenzgeber GmbH sowie
              den von der Town & Country Stiftung mit der Durchführung des Town
              & Country Stiftungspreises beauftragten Dritten ausschließlich im
              Zusammenhang mit dem 10. Town & Country Stiftungspreis,
              insbesondere jedoch für die Öffentlichkeitsarbeit im Zusammenhang
              mit dem 10. Town & Country Stiftungspreis verwendet. Eine darüber
              hinausgehende Nutzung der personenbezogenen Daten zu Werbezwecken
              findet nicht statt. Wir sind für die Verarbeitung von
              personenbezogenen Daten im eigenen Bereich selbst verantwortlich.
            </Checkbox>
            <FormErrorMessage>
              {errors.checkPersonenbezogen &&
                errors.checkPersonenbezogen.message}
            </FormErrorMessage>
          </FormControl>
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
            >
              Wir haben die{" "}
              <Link href="https://www.tc-stiftung.de/wp-content/uploads/2021/01/DatenschutzerklaerungBewerbung.pdf">
                hier abrufbare Datenschutzerklärung
              </Link>{" "}
              gelesen und erkennen sie als verbindlich an.
            </Checkbox>
            <FormErrorMessage>
              {errors.checkDatenschutzerklaerung &&
                errors.checkDatenschutzerklaerung.message}
            </FormErrorMessage>
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
            >
              Wir haben die{" "}
              <Link href="https://www.tc-stiftung.de/wp-content/uploads/2021/01/Allg.Teilnahmebedingungen.pdf">
                hier abrufbaren Teilnahmebedingungen
              </Link>{" "}
              des 10. Town & Country Stiftungspreises gelesen und erkennen sie
              als verbindlich an.
            </Checkbox>
            <FormErrorMessage>
              {errors.checkTeilnahmebedingungen &&
                errors.checkTeilnahmebedingungen.message}
            </FormErrorMessage>
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
            >
              Ich bestätige, die vorstehenden Angaben wahrheitsgemäß und
              vollständig getätigt zu haben.
            </Checkbox>
            <FormErrorMessage>
              {errors.checkWahrheit && errors.checkWahrheit.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}

export default Step4;