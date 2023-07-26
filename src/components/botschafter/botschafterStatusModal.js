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

function BotschafterModal({ botschafterOnClose, botschafterIsOpen, letter }) {
  const router = useRouter();
  const toast = useToast();
  const [botschafterSelect, setBotschafterSelect] = useState([]);
  const [botschafterSelected, setBotschafterSelected] = useState(null);

  console.log("letter", letter);

  async function botschafterForSelect() {
    const res = await fetch("/api/botschafter", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const selectData = await data.map((bot) => {
      return { value: bot.id, label: bot.name };
    });
    setBotschafterSelect(selectData);
  }

  useEffect(() => {
    if (botschafterIsOpen) botschafterForSelect();
  }, [botschafterIsOpen]);

  async function onSubmit() {
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
    }
  }

  return (
    <Modal isOpen={botschafterIsOpen} onClose={botschafterOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {letter.botschafter
            ? "Botschafter bearbeiten"
            : "Botschafter verknüpfen"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} my={4}>
            <FormControl>
              <FormLabel htmlFor="email-alerts">Botschafter</FormLabel>
              <Select
                name="colors"
                options={botschafterSelect}
                placeholder="Botschafter auswählen..."
                closeMenuOnSelect={true}
                onChange={(e) => setBotschafterSelected(e.value)}
                defaultValue={{
                  label: letter.botschafter?.name || "",
                  value: letter.botschafter?.id || "",
                }}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            size={"md"}
            colorScheme="gray"
            mr={3}
            onClick={botschafterOnClose}
            variant={"outline"}
          >
            Schliessen
          </Button>
          <Button
            size={"md"}
            variant="outline"
            colorScheme="green"
            onClick={onSubmit}
          >
            Speichern
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BotschafterModal;
