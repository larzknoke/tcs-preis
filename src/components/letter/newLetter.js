import { useColorModeValue } from "@chakra-ui/color-mode";
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
} from "@chakra-ui/react";
import { AlertIcon } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormPersist from "react-hook-form-persist";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import { useState } from "react";
import { formSchema } from "@/lib/formSchema";
import { ErrorMessage } from "@hookform/error-message";
import { isObjEmpty, getInternalValue } from "@/lib/utils";

const steps = [
  {
    label: "Träger",
    description: "Angaben zum Träger/Dachverband",
    content: <Step1 />,
  },
  { label: "Projekt", description: "Angaben zum Projekt", content: <Step2 /> },
  {
    label: "Finanzierung",
    description: "Finanzierungskonzept",
    content: <Step3 />,
  },
  {
    label: "Rechtliches",
    description: "Einverständniserklärung & Datenschutz",
    content: <Step4 />,
  },
];

function NewLetter() {
  // const toast = useToast();
  const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(formSchema),
    criteriaMode: "all",
  });

  const { watch, setValue } = methods;

  useFormPersist("storageKey", {
    watch,
    setValue,
    storage: typeof window !== "undefined" ? window.localStorage : "",
  });

  async function onSubmit(values) {
    delete values.emailBestaetigungProjekt;
    try {
      console.log("values: ", values);
      if (activeStep === steps.length - 1) {
        const res = await fetch("/api/letter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.status != 200) {
          setFormError(true);
        } else {
          methods.reset();
          setFormSuccess(true);
        }
      }
      nextStep();
      //   const formData = new FormData();
      //   Object.keys(values).forEach((fieldName) => {
      //     if (fieldName === "mietvertrag") {
      //       formData.append(fieldName, values[fieldName][0]);
      //     } else {
      //       formData.append(fieldName, values[fieldName]);
      //     }
      //   });
      //   const res = await fetch("/api/miet", {
      //     method: "POST",
      //     // headers: { "Content-Type": "application/json" },
      //     body: formData,
      //   });
      //   console.log("api fetch done", await res.json());
      //   if (res.status != 200) {
      //     return toast({
      //       title: "Ein Fehler ist aufgetreten.",
      //       status: "error",
      //       duration: 9000,
      //       isClosable: true,
      //     });
      //   }
      //   toast({
      //     title: "Angebot erstellt.",
      //     status: "success",
      //     isClosable: true,
      //     duration: 2000,
      //   });
      //   onClose();
      //   resetForm();
      //   router.replace(router.asPath);
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
    }
  }

  const handleReset = () => {
    reset();
    methods.reset();
  };

  return (
    <Card size={"lg"} w={"100%"}>
      <CardBody>
        <FormProvider {...methods}>
          <form id="new-letter-form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Flex flexDir="column" width="100%">
              <Steps
                variant={"circles"}
                colorScheme="blue"
                activeStep={activeStep}
                onClickStep={(i) => {
                  setStep(i);
                }}
                size={"sm"}
                sx={{
                  "& .cui-steps__step-icon-container": {
                    bg: "brand2.900",
                    color: "white",
                    border: 0,
                    "&:hover": {
                      bg: "brand.900",
                      cursor: "pointer",
                    },
                    // use _active attribute to target the active step
                    _active: {
                      bg: "brand.900",
                    },
                  },
                }}
              >
                {steps.map(({ label, description, content }, index) => (
                  <Step label={label} key={label} description={description}>
                    <Box my={16}>{content}</Box>
                  </Step>
                ))}
              </Steps>
              {formSuccess && hasCompletedAllSteps && (
                <Box sx={{ my: 8, py: 10, px: 8, rounded: "md" }}>
                  <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    // height="200px"
                    rounded={"md"}
                    bg={"brand.900"}
                    color={"white"}
                    p={8}
                  >
                    <AlertIcon boxSize="40px" mr={0} color={"white"} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Formular erfolgreich übermittelt
                    </AlertTitle>
                    <AlertDescription maxWidth="2xl" mt={2}>
                      Nach Absenden Ihrer Bewerbung und{" "}
                      <Text as="b">
                        Bestätigung des Ihnen zugesandten Links
                      </Text>
                      , <br /> erhalten Sie eine automatisierte
                      Bestätigungs-E-Mail.
                    </AlertDescription>
                  </Alert>
                </Box>
              )}
              {formError && hasCompletedAllSteps && (
                <Box sx={{ my: 8, py: 10, px: 8, rounded: "md" }}>
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
                      Ein Fehler ist aufgetreten.
                    </AlertTitle>
                    <AlertDescription maxWidth="2xl" mt={2}>
                      Bitte überprüfen Sie Ihre eingaben oder <br />
                      probieren Sie es zu einem späteren Zeitpunkt nochmal.
                    </AlertDescription>
                  </Alert>
                </Box>
              )}
              <Flex width="100%" justify="flex-end" gap={4}>
                {!hasCompletedAllSteps && (
                  <>
                    <Button
                      isDisabled={activeStep === 0}
                      onClick={prevStep}
                      size="md"
                      variant="ghost"
                      color={"gray.500"}
                    >
                      Zurück
                    </Button>
                    {!isLastStep && (
                      <Button
                        onClick={() => {
                          nextStep();
                        }}
                      >
                        Weiter
                      </Button>
                    )}
                    {isLastStep && (
                      <Button
                        isDisabled={!isObjEmpty(methods.formState.errors)}
                        isLoading={methods.formState.isSubmitting}
                        loadingText="bitte warten"
                        size="md"
                        onClick={() => methods.handleSubmit(onSubmit)()}
                        bg={isLastStep ? "brand.800" : "gray.400"}
                        _hover={{ bg: isLastStep ? "brand.900" : "gray.500" }}
                        color={"white"}
                      >
                        {isLastStep ? "Bewerbung abschicken" : "Weiter"}
                      </Button>
                    )}
                  </>
                )}
              </Flex>
              {isLastStep && !isObjEmpty(methods.formState.errors) && (
                <Alert status="error" my={6} rounded={"md"}>
                  <AlertIcon />
                  <AlertTitle>Formular unvollständig!</AlertTitle>
                  <AlertDescription>
                    Eigene Felder sind nicht korrekt ausgefüllt. Bitte
                    überprüfen das Formular.
                  </AlertDescription>
                </Alert>
              )}
            </Flex>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}

export default NewLetter;
