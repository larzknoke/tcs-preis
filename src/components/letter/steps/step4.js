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
              {...register("checkBeitrag")}
              spacing={6}
              isInvalid={errors.checkBeitrag}
              textAlign={"left"}
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
              <FormErrorMessage>
                {errors.checkBeitrag && errors.checkBeitrag.message}
              </FormErrorMessage>
            </Checkbox>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.checkVeroeffentlich}>
            <Checkbox
              name="checkVeroeffentlich"
              type="checkbox"
              {...register("checkVeroeffentlich")}
              spacing={6}
              textAlign={"left"}
            >
              Vor diesem Hintergrund stimmen wir der Veröffentlichung der
              Angaben zu unserer als gemeinnützig anerkannten Einrichtung, zum
              Projekt, zu eingereichten Fotos, zu Fotos von einer Scheckübergabe
              im Rahmen des Town & Country Stiftungspreises sowie eventuellen
              Fotos und Videoaufnahmen im Rahmen der Town & Country
              Stiftungsgala zu.
              <FormErrorMessage>
                {errors.checkVeroeffentlich &&
                  errors.checkVeroeffentlich.message}
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
              einer Scheckübergabe zu erstellenden Lichtbilder entsprechend den
              datenschutzrechtlichen Vorschriften erstellt und der Town &
              Country Stiftung sowie deren mit der Öffentlichkeitsarbeit
              betrauten Vertragspartnern zur Verfügung gestellt werden.
              <FormErrorMessage>
                {errors.checkScheck && errors.checkScheck.message}
              </FormErrorMessage>
            </Checkbox>
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
              textAlign={"left"}
            >
              Die datenschutzrechtlichen Einwilligungserklärungen der dort
              abgebildeten Personen, insbesondere der dort abgebildeten Kinder
              werden wir entsprechend den geltenden Bestimmungen einholen. Über
              den Widerruf bzw. den Widerspruch eines auf den Lichtbildern
              abgebildeten Betroffenen werden wir die Town & Country Stiftung
              unverzüglich informieren.
              <FormErrorMessage>
                {errors.checkDatenschutzBilder &&
                  errors.checkDatenschutzBilder.message}
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
              textAlign={"left"}
            >
              Wir willigen ein, dass die von uns im Rahmen der Bewerbung sowie
              Teilnahme am 12. Town &amp; Country Stiftungspreis übermittelten
              personenbezogenen Daten im Rahmen des Town &amp; Country
              Stiftungspreises verarbeitet werden. Die Daten werden von der Town
              &amp; Country Stiftung (Hauptstraße 90E, 99820 Hörselberg-Hainich
              OT Behringen), den Botschaftern der Town &amp; Country Stiftung,
              der Town &amp; Country Haus Lizenzgeber GmbH (Hauptstraße 90E,
              99820 Hörselberg-Hainich OT Behringen), den Lizenz- und Franchise-
              Partnern der Town &amp; Country Haus Lizenzgeber GmbH sowie den
              von der Town &amp; Country Stiftung mit der Durchführung des Town
              &amp; Country Stiftungspreises beauftragten Dritten ausschließlich
              im Zusammenhang mit dem 12. Town &amp; Country Stiftungspreis,
              insbesondere jedoch für die Öffentlichkeitsarbeit im Zusammenhang
              mit dem 12. Town &amp; Country Stiftungspreis verwendet.
              <FormErrorMessage>
                {errors.checkPersonenbezogen &&
                  errors.checkPersonenbezogen.message}
              </FormErrorMessage>
            </Checkbox>
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
              textAlign={"left"}
            >
              Wir haben die{" "}
              <Link
                target="_blank"
                href="https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_DSErklBew_12_STP.pdf"
              >
                hier abrufbare Datenschutzerklärung
              </Link>{" "}
              gelesen und erkennen sie als verbindlich an.
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
                href="https://www.tc-stiftung.de/wp-content/uploads/2025/08/2025_DSErklBew_12_STP.pdf"
              >
                hier abrufbaren Teilnahmebedingungen
              </Link>{" "}
              des 12. Town & Country Stiftungspreises gelesen und erkennen sie
              als verbindlich an.
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

export default Step4;
