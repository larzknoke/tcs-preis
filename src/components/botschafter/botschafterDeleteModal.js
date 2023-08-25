import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Switch,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function BotschafterDeleteModal({ onClose, isOpen, botschafter }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    const res = await fetch("/api/letter/updateBotschafter", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        botschafterId: botschafterSelected,
        letterId: letter.id,
      }),
    });
    if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } else {
      // const resData = await res.json();
      toast({
        title: `Botschafter geändert`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      botschafterOnClose();
      router.replace(router.asPath);
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Botschafter löschen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <VStack spacing={6} my={4}>
            <FormControl>
              <FormLabel htmlFor="email-alerts">Botschafter</FormLabel>
              <Select
                name="colors"
                options={botschafterSelect}
                placeholder="Botschafter auswählen..."
                closeMenuOnSelect={true}
                onChange={(e) => setBotschafterSelected(e.value)}
                defaultValue={{
                  label:
                    letter.botschafter?.vorname +
                      " " +
                      letter.botschafter?.name || "",
                  value: letter.botschafter?.id || "",
                }}
              />
            </FormControl>
          </VStack> */}
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
            onClick={onSubmit}
            isLoading={loading}
          >
            Speichern
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BotschafterDeleteModal;
