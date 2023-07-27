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

function NewBotschafterModal({ isOpen, onClose }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(botschafterSchema),
  });

  const toast = useToast();

  async function onSubmit(values) {
    try {
      console.log("values: ", values);
      const res = await fetch("/api/botschafter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status != 200) {
        toast({
          title: "Ein Fehler ist aufgetreten",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        const resData = await res.json();
        console.log("resData: ", resData);
        toast({
          title: `Botschafter ${resData.result.name} erstellt.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
        reset();
        router.push(`/admin/botschafter/${resData.result.id}`);
      }
    } catch (error) {
      console.log("api fetch error");
      console.error("Err", error);
      toast({
        title: "Ein Fehler ist aufgetreten",
        description: JSON.stringify(error),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Neuer Botschafter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-botschafter-form" onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid spacing={6} columns={3} w={"full"}>
                <GridItem colSpan={3}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" type="text" {...register("name")} />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
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
                    <Input name="plz" type="number" {...register("plz")} />
                    <FormErrorMessage>
                      {errors.plz && errors.plz.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.ort}>
                    <FormLabel>Ort</FormLabel>
                    <Input name="ort" type="string" {...register("ort")} />
                    <FormErrorMessage>
                      {errors.ort && errors.ort.message}
                    </FormErrorMessage>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
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
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
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
            >
              Schliessen
            </Button>
            <Button
              size={"md"}
              variant="outline"
              colorScheme="green"
              form="new-botschafter-form"
              type="submit"
            >
              Speichern
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewBotschafterModal;
