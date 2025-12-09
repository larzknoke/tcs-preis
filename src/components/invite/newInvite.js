import Link from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Card,
  CardBody,
  Box,
  Text,
  Alert,
  AlertTitle,
  AlertDescription,
  VStack,
  SimpleGrid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  RadioGroup,
  HStack,
  Radio,
  Checkbox,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { AlertIcon } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { inviteSchema } from "@/lib/formSchema";
import { isObjEmpty, topScroller } from "@/lib/utils";

function NewInvite() {
  const router = useRouter();
  const toast = useToast();
  const [spende, setSpende] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [confirmEmail, setConfirmEmail] = useState();
  const [teilnahmeJa, setTeilnahmeJa] = useState();
  const [begleitungJa, setBegleitungJa] = useState(false);
  const [datenschutzAnzeigen, setDatenschutzAnzeigen] = useState();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(inviteSchema),
    mode: "onChange",
  });

  async function onSubmit(values) {
    try {
      console.log(values);
      setLoading(true);
      const res = await fetch("/api/invite", {
        method: "POST",
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
        const error = await res.json();
        console.log("error", error);
        if (error.msg) {
          setErrorMsg(error.msg);
        }
        setFormError(true);
        setLoading(false);
      } else {
        const resData = await res.json();
        console.log(resData);
        setConfirmEmail(resData?.result?.email);
        if (resData?.result?.teilnahme) {
          setTeilnahmeJa(true);
        } else {
          setTeilnahmeJa(false);
        }
        // router.push(`/anmeldung`);
        topScroller();
        setLoading(false);
        setFormSuccess(true);
        reset();
        setValue("datenschutz", null);
        setValue("teilnahme", null);
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
    <>
      <Card size={"lg"} w={"100%"}>
        <CardBody>
          {!formSuccess && (
            <form id="new-invite-form" onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDir="column" width="100%">
                <VStack gap={10}>
                  <SimpleGrid spacing={6} columns={12} w={"full"}>
                    <GridItem colSpan={12} mb={3}>
                      <FormControl isInvalid={errors.teilnahme}>
                        <FormLabel>
                          <Heading
                            textAlign={"left"}
                            size={"md"}
                            color={"gala.900"}
                          >
                            Teilnahme
                          </Heading>
                        </FormLabel>
                        <Controller
                          control={control}
                          name="teilnahme"
                          render={({ field }) => (
                            <RadioGroup
                              {...field}
                              onChange={(value) => {
                                setDatenschutzAnzeigen(value === "ja");
                                field.onChange(value);
                              }}
                              value={field.value}
                            >
                              <VStack
                                alignItems={"flex-start"}
                                maxW={["100%", "60%"]}
                              >
                                <Radio value={"ja"} variant={"atTop"}>
                                  <strong>Ja</strong>, ich/wir nehme/n an der
                                  Gala zur Preisverleihung des 12. Town &amp;
                                  Country Stiftungspreises am Abend des{" "}
                                  <strong>21. Juni 2024 um 17:30 Uhr</strong>{" "}
                                  teil.
                                </Radio>
                                <Radio value={"nein"} variant={"atTop"}>
                                  <strong>Nein</strong>, ich/wir /bin/sind
                                  leider verhindert und kann/können nicht
                                  teilnehmen.
                                </Radio>
                              </VStack>
                            </RadioGroup>
                          )}
                        />
                        <FormErrorMessage>
                          {errors.teilnahme && errors.teilnahme.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <FormControl isInvalid={errors.spende}>
                        <FormLabel>
                          {" "}
                          <Heading
                            textAlign={"left"}
                            size={"md"}
                            color={"gala.900"}
                          >
                            Spende
                          </Heading>
                        </FormLabel>
                        <Checkbox
                          name="spende"
                          type="checkbox"
                          {...register("spende")}
                          spacing={6}
                          isInvalid={errors.spende}
                          textAlign={"left"}
                          variant={"atTop"}
                          onChange={(e) => setSpende(e.target.checked)}
                        >
                          Ich/wir leisten eine Spende auf das Spendenkonto der
                          Town &amp; Country Stiftung. <br />
                          IBAN: DE25 1012 0100 6156 1780 00 | BIC WELADED1WBB |
                          Betreff: Stiftungspreis <br />
                          <FormErrorMessage>
                            {errors.spende && errors.spende.message}
                          </FormErrorMessage>
                        </Checkbox>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={12} pl={10}>
                      <FormControl mb={4} isInvalid={errors.spendeBetrag}>
                        <FormLabel
                          style={{ color: spende ? "#718096" : "#E2E8F0" }}
                        >
                          Betrag
                        </FormLabel>
                        <Input
                          isDisabled={!spende}
                          name="spendeBetrag"
                          type="text"
                          {...register("spendeBetrag")}
                          maxW={"350px"}
                        />
                        <FormErrorMessage>
                          {errors.spendeBetrag && errors.spendeBetrag.message}
                        </FormErrorMessage>
                      </FormControl>
                      <Link
                        href={
                          "https://www.paypal.com/donate/?hosted_button_id=U5NFSF7NAVGK2"
                        }
                        target="_blank"
                      >
                        <Button color={"gala.900"} variant={"outline"}>
                          Hier direkt per Kreditkarte oder PayPal spenden.
                        </Button>
                      </Link>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <Heading
                        textAlign={"left"}
                        size={"md"}
                        color={"gala.900"}
                      >
                        Teilnehmerdaten
                      </Heading>
                    </GridItem>
                    <GridItem colSpan={[12, 4]}>
                      <FormControl isInvalid={errors.titel}>
                        <FormLabel>Titel</FormLabel>
                        <Input
                          name="titel"
                          type="text"
                          {...register("titel")}
                        />
                        <FormErrorMessage>
                          {errors.titel && errors.titel.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={[12, 4]}>
                      <FormControl isInvalid={errors.vorname}>
                        <FormLabel>Vorname</FormLabel>
                        <Input
                          name="vorname"
                          type="text"
                          {...register("vorname")}
                        />
                        <FormErrorMessage>
                          {errors.vorname && errors.vorname.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={[12, 4]}>
                      <FormControl isInvalid={errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" type="text" {...register("name")} />
                        <FormErrorMessage>
                          {errors.name && errors.name.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <FormControl isInvalid={errors.unternehmen}>
                        <FormLabel>Unternehmen/Institution</FormLabel>
                        <Input
                          name="unternehmen"
                          type="text"
                          {...register("unternehmen")}
                        />
                        <FormErrorMessage>
                          {errors.unternehmen && errors.unternehmen.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={[12, 6]}>
                      <FormControl isInvalid={errors.email}>
                        <FormLabel>E-Mail</FormLabel>
                        <Input
                          name="email"
                          type="text"
                          {...register("email")}
                        />
                        <FormErrorMessage>
                          {errors.email && errors.email.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={[12, 6]}>
                      <FormControl isInvalid={errors.telefon}>
                        <FormLabel>Telefon</FormLabel>
                        <Input
                          name="telefon"
                          type="text"
                          {...register("telefon")}
                        />
                        <FormErrorMessage>
                          {errors.telefon && errors.telefon.message}
                        </FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <Heading
                        textAlign={"left"}
                        size={"md"}
                        color={"gala.900"}
                      >
                        Begleitung
                      </Heading>
                    </GridItem>
                    <GridItem colSpan={12}>
                      {/* <Checkbox
                        color={"gray.500"}
                        onChange={(e) => setBegleitungJa(e.target.checked)}
                      >
                        Ich komme in Begleitung.
                      </Checkbox> */}
                      <FormControl isInvalid={errors.begleitung}>
                        <Checkbox
                          name="begleitung"
                          type="checkbox"
                          {...register("begleitung")}
                          spacing={6}
                          isInvalid={errors.begleitung}
                          textAlign={"left"}
                          variant={"atTop"}
                          onChange={(e) => setBegleitungJa(e.target.checked)}
                        >
                          Ich komme in Begleitung.
                          <FormErrorMessage>
                            {errors.begleitung && errors.begleitung.message}
                          </FormErrorMessage>
                        </Checkbox>
                      </FormControl>
                    </GridItem>

                    {begleitungJa && (
                      <>
                        <GridItem colSpan={[12, 4]}>
                          <FormControl isInvalid={errors.begleitungTitel}>
                            <FormLabel>Titel</FormLabel>
                            <Input
                              name="begleitungTitel"
                              type="text"
                              {...register("begleitungTitel")}
                            />
                            <FormErrorMessage>
                              {errors.begleitungTitel &&
                                errors.begleitungTitel.message}
                            </FormErrorMessage>
                          </FormControl>
                        </GridItem>
                        <GridItem colSpan={[12, 4]}>
                          <FormControl isInvalid={errors.begleitungVorname}>
                            <FormLabel>Vorname</FormLabel>
                            <Input
                              name="begleitungVorname"
                              type="text"
                              {...register("begleitungVorname")}
                            />
                            <FormErrorMessage>
                              {errors.begleitungVorname &&
                                errors.begleitungVorname.message}
                            </FormErrorMessage>
                          </FormControl>
                        </GridItem>
                        <GridItem colSpan={[12, 4]}>
                          <FormControl isInvalid={errors.begleitungName}>
                            <FormLabel>Name</FormLabel>
                            <Input
                              name="begleitungName"
                              type="text"
                              {...register("begleitungName")}
                            />
                            <FormErrorMessage>
                              {errors.begleitungName &&
                                errors.begleitungName.message}
                            </FormErrorMessage>
                          </FormControl>
                        </GridItem>
                      </>
                    )}
                    {datenschutzAnzeigen && (
                      <>
                        <GridItem colSpan={12}>
                          <Heading
                            textAlign={"left"}
                            size={"md"}
                            color={"gala.900"}
                          >
                            Datenschutz & Einverständniserklärung
                          </Heading>
                        </GridItem>
                        <GridItem colSpan={12}>
                          <FormControl isInvalid={errors.datenschutzMedia}>
                            <Checkbox
                              name="datenschutzMedia"
                              type="checkbox"
                              {...register("datenschutzMedia")}
                              spacing={6}
                              isInvalid={errors.datenschutzMedia}
                              textAlign={"left"}
                              variant={"atTop"}
                            >
                              Ich bin einverstanden, dass die Town &amp; Country
                              Stiftung im Rahmen der Veranstaltung Foto-, Film-
                              und Tonaufnahmen zu Marketing- und
                              Informationszwecken anfertigt und diese örtlich,
                              zeitlich und inhaltlich uneingeschränkt zu den
                              vorgenannten Zwecken nutzen darf.
                              <FormErrorMessage>
                                {errors.datenschutzMedia &&
                                  errors.datenschutzMedia.message}
                              </FormErrorMessage>
                            </Checkbox>
                          </FormControl>
                        </GridItem>
                        <GridItem colSpan={12}>
                          <FormControl isInvalid={errors.datenschutz}>
                            <Checkbox
                              name="datenschutz"
                              type="checkbox"
                              {...register("datenschutz")}
                              spacing={6}
                              isInvalid={errors.datenschutz}
                              textAlign={"left"}
                              variant={"atTop"}
                            >
                              Die{" "}
                              <Link
                                href={
                                  "https://www.tc-stiftung.de/datenschutz-gala"
                                }
                                target="_blank"
                              >
                                Datenschutzbestimmungen
                              </Link>{" "}
                              habe ich zur Kenntnis genommen und akzeptiere
                              diese.
                              <FormErrorMessage>
                                {errors.datenschutz &&
                                  errors.datenschutz.message}
                              </FormErrorMessage>
                            </Checkbox>
                          </FormControl>
                        </GridItem>
                      </>
                    )}
                  </SimpleGrid>

                  <Alert status="warning">
                    <AlertIcon />
                    <AlertDescription>
                      Bitte beachten Sie: Nach der Anmeldung erhalten Sie eine
                      Bestätigungs-Mail von uns. Bitte bestätigen Sie den
                      dortigen Link, um Ihre Registrierung abzuschließen.{" "}
                      <strong>
                        Erst dadurch wird die Anmeldung erfolgreich
                        abgeschlossen.
                      </strong>
                    </AlertDescription>
                  </Alert>
                  <Button
                    isDisabled={!isObjEmpty(errors)}
                    isLoading={loading}
                    loadingText="bitte warten"
                    size="md"
                    onClick={() => handleSubmit(onSubmit)()}
                    bg={"gala.800"}
                    _hover={{ bg: "gala.900" }}
                    color={"white"}
                    px={10}
                  >
                    Anmeldung abschicken
                  </Button>
                </VStack>
              </Flex>
            </form>
          )}
          {formSuccess && (
            <VStack gap={10}>
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                // height="200px"
                rounded={"md"}
                bg={"gala.900"}
                color={"white"}
                p={8}
              >
                <AlertIcon boxSize="40px" mr={0} color={"white"} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Anmeldung erfolgreich übermittelt
                </AlertTitle>
                {teilnahmeJa ? (
                  <AlertDescription maxWidth="2xl" mt={2}>
                    Vielen Dank für Ihre Registrierung! <br />
                    Sie haben soeben eine Bestätigungs-Mail an{" "}
                    <strong>{confirmEmail}</strong> von uns erhalten. <br />
                    Bitte bestätigen Sie den dortigen Link, um Ihre Anmeldung
                    abzuschließen.
                  </AlertDescription>
                ) : (
                  <AlertDescription maxWidth="2xl" mt={2}>
                    Vielen Dank für Ihre Nachricht. Schade, dass Sie nicht an
                    der 12. Town & Country Stiftungsgala teilnehmen können.
                  </AlertDescription>
                )}
              </Alert>
              <Button
                ml={"auto"}
                onClick={() => window.location.assign("/anmeldung")}
              >
                Neuen Teilnehmer anmelden
              </Button>
            </VStack>
          )}
          {formError && (
            <Box>
              <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                // height="200px"
                rounded={"md"}
                bg={"red.500"}
                color={"white"}
                p={8}
              >
                <AlertIcon boxSize="40px" mr={0} color={"white"} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  {errorMsg ? errorMsg : "Ein Fehler ist aufgetreten."}
                </AlertTitle>
                {!errorMsg && (
                  <AlertDescription maxWidth="2xl" mt={2}>
                    Bitte überprüft Eure Eingaben oder <br />
                    probiert es zu einem späteren Zeitpunkt erneut.
                  </AlertDescription>
                )}
              </Alert>
            </Box>
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default NewInvite;
