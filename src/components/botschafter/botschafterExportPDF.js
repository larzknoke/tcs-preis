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
import JSZip from "jszip";
import { pdf } from "@react-pdf/renderer";
import { BotschafterPDF } from "@/pdf/botschafterPDF";

function BotschafterExportPDFModal({ onClose, onOpen, isOpen }) {
  const router = useRouter();
  const toast = useToast();
  const [kampagneSelect, setKampagneSelect] = useState([]);
  const [kampagneSelected, setKampagneSelected] = useState(null);
  const [loading, setLoading] = useState(false);

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
  }

  useEffect(() => {
    if (isOpen) kampagneForSelect();
  }, [isOpen]);

  async function onSubmit() {
    setLoading(true);
    const res = await fetch("/api/botschafter/exportBotPDF", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kampagneId: kampagneSelected,
      }),
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
      const zip = new JSZip();
      const resData = await res.json();

      toast({
        title: `Botschafter exportiert`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      resData.map((bot) => {
        zip.file(
          `Botschafter_${bot.id}.pdf`,
          pdf(<BotschafterPDF bot={bot} />).toBlob()
        );
      });

      onClose();
      router.replace(router.asPath);
      setLoading(false);

      return zip.generateAsync({ type: "blob" }).then((blob) => {
        const date = new Date().toLocaleDateString("de-DE").replace(/\./g, "-");
        saveAs(blob, `Botschafter_PDF-Export_${date}.zip`);
      });
    }
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
                name="colors"
                options={kampagneSelect}
                placeholder="Kampagne auswählen..."
                closeMenuOnSelect={true}
                onChange={(e) => setKampagneSelected(e.value)}
                // defaultValue={{
                //   label:
                //     letter.botschafter?.vorname +
                //       " " +
                //       letter.botschafter?.name || "",
                //   value: letter.botschafter?.id || "",
                // }}
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

export default BotschafterExportPDFModal;
