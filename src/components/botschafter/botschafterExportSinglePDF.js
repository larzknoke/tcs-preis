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
  Textarea,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { pdf } from "@react-pdf/renderer";
import { BotschafterPDF } from "@/pdf/botschafterPDF";

function BotschafterExportSinglePDFModal({
  onClose,
  onOpen,
  isOpen,
  botschafter,
}) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [kampagneSelect, setKampagneSelect] = useState([]);
  const [kampagneSelected, setKampagneSelected] = useState(null);
  const [freitext, setFreitext] = useState("");
  const [allLetter, setAllLetter] = useState(false);

  async function kampagneForSelect() {
    const res = await fetch("/api/kampagne", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const selectData = await data.map((kampagne) => {
      return {
        value: kampagne.id,
        label: `${kampagne.name}`,
      };
    });
    setKampagneSelect(selectData);
    const firstOpen = data.find((kampagne) => !kampagne.abgeschlossen);
    if (firstOpen) {
      setKampagneSelected(firstOpen.id);
    }
  }

  useEffect(() => {
    if (isOpen) kampagneForSelect();
  }, [isOpen]);

  async function onSubmit() {
    setLoading(true);

    onClose();
    router.replace(router.asPath);
    setLoading(false);
    toast({
      title: `Botschafter exportiert`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    const botForExport = kampagneSelected
      ? {
          ...botschafter,
          letters: (botschafter.letters || []).filter(
            (letter) => letter.kampagneId === kampagneSelected,
          ),
        }
      : botschafter;

    const blob = await pdf(
      <BotschafterPDF
        bot={botForExport}
        zusatzAngaben={false}
        allLetter={allLetter}
        freitext={freitext}
      />,
    ).toBlob();
    saveAs(
      blob,
      `Botschafter_${botschafter.vorname}_${botschafter.name}_${botschafter.id}.pdf`,
    );
    setFreitext("");
    setAllLetter(false);
    setKampagneSelected(null);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Botschafter PDF exportieren</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} my={4}>
            <FormControl>
              <FormLabel>Kampagne</FormLabel>
              <Select
                name="kampagne"
                options={kampagneSelect}
                placeholder="Kampagne auswählen..."
                closeMenuOnSelect={true}
                onChange={(e) => setKampagneSelected(e.value)}
                value={kampagneSelect.find(
                  (option) => option.value === kampagneSelected,
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Freitext</FormLabel>
              <Textarea
                name="freitext"
                placeholder="Text hier...."
                onChange={(e) => setFreitext(e.target.value)}
                minH={200}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Botschafter Bestätigung ignorieren</FormLabel>
              <Switch
                colorScheme="green"
                name="allLetter"
                type="text"
                onChange={(e) => setAllLetter(e.target.checked)}
              />
            </FormControl>
          </VStack>
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
            PDF Export
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BotschafterExportSinglePDFModal;
