import {
  SimpleGrid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "chakra-react-select";
import { bundeslaender } from "@/lib/data";
import { botschafterSchema } from "@/lib/formSchema";
import { useRouter } from "next/router";
import { useState } from "react";

function FormBotschafterModal({ isOpen, onClose, isNew, botschafter = null }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(botschafterSchema),
    defaultValues: botschafter,
  });

  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [selectedAnrede, setSelectedAnrede] = useState(
    botschafter
      ? {
          value: botschafter?.anrede,
          label: botschafter?.anrede,
        }
      : ""
  );
  const [selectedBundesland, setSelectedBundesland] = useState(
    botschafter
      ? {
          value: botschafter?.bundesland,
          label: botschafter?.bundesland,
        }
      : ""
  );

  async function onSubmit(values) {
    try {
      setLoading(true);
      console.log("values: ", values);
      const res = await fetch("/api/botschafter", {
        method: isNew ? "POST" : "PUT",
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
        setLoading(false);
      } else {
        const resData = await res.json();
        console.log("resData: ", resData);
        toast({
          title: `Botschafter ${resData.name} erstellt.`,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
        reset();
        router.push(`/admin/botschafter/${resData.id}`);
        setLoading(false);
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
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isNew ? "Neuer Botschafter" : "Botschafter bearbeiten"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-botschafter-form" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacing={6} columns={4} w={"full"}>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.primaryId}>
                    <FormLabel>Primary ID</FormLabel>
                    <Input
                      name="primaryId"
                      type="text"
                      {...register("primaryId")}
                    />
                    <FormErrorMessage>
                      {errors.primaryId && errors.primaryId.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.typ}>
                    <FormLabel>Typ</FormLabel>
                    <Input name="typ" type="text" {...register("typ")} />
                    <FormErrorMessage>
                      {errors.typ && errors.typ.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl isInvalid={errors.firma}>
                    <FormLabel>Firma</FormLabel>
                    <Input name="firma" type="text" {...register("firma")} />
                    <FormErrorMessage>
                      {errors.firma && errors.firma.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <Controller
                    control={control}
                    name="anrede"
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { error },
                    }) => {
                      return (
                        <FormControl isInvalid={!!error} id="anrede">
                          <FormLabel>Anrede</FormLabel>
                          <Select
                            name={name}
                            ref={ref}
                            onChange={(e) => {
                              setValue("anrede", e.value);
                              setSelectedAnrede(e);
                            }}
                            onBlur={onBlur}
                            value={selectedAnrede}
                            options={[
                              { label: "Frau", value: "Frau" },
                              { label: "Herr", value: "Herr" },
                            ]}
                            placeholder="Bitte auswählen..."
                          />
                          <FormErrorMessage>
                            {errors.anrede && errors.anrede.message}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                </GridItem>
                <GridItem colSpan={2}>
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
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type="text" {...register("name")} />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl isInvalid={errors.strasse}>
                    <FormLabel>Straße</FormLabel>
                    <Input
                      name="strasse"
                      type="text"
                      {...register("strasse")}
                    />
                    <FormErrorMessage>
                      {errors.strasse && errors.strasse.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl isInvalid={errors.plz}>
                    <FormLabel>PLZ</FormLabel>
                    <Input name="plz" type="text" {...register("plz")} />
                    <FormErrorMessage>
                      {errors.plz && errors.plz.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.ort}>
                    <FormLabel>Ort</FormLabel>
                    <Input name="ort" type="string" {...register("ort")} />
                    <FormErrorMessage>
                      {errors.ort && errors.ort.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <Controller
                    control={control}
                    name="bundesland"
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
                            onChange={(e) => {
                              setValue("bundesland", e.value);
                              setSelectedBundesland(e);
                            }}
                            onBlur={onBlur}
                            value={selectedBundesland}
                            options={bundeslaender}
                            placeholder="Bitte auswählen..."
                          />
                          <FormErrorMessage>
                            {errors.bundesland && errors.bundesland.message}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                </GridItem>
                <GridItem colSpan={2}>
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
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.mobil}>
                    <FormLabel>Mobil</FormLabel>
                    <Input name="mobil" type="text" {...register("mobil")} />
                    <FormErrorMessage>
                      {errors.mobil && errors.mobil.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="text" {...register("email")} />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={4}>
                  <FormControl isInvalid={errors.region}>
                    <FormLabel>Region</FormLabel>
                    <Input name="region" type="text" {...register("region")} />
                    <FormErrorMessage>
                      {errors.region && errors.region.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              size={"md"}
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              variant={"outline"}
              isDisabled={loading}
            >
              Schliessen
            </Button>
            <Button
              size={"md"}
              variant="outline"
              colorScheme="green"
              form="new-botschafter-form"
              type="submit"
              isLoading={loading}
            >
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormBotschafterModal;
