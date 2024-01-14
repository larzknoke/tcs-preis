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
  const [freitext, setFreitext] = useState("");

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

    const blob = await pdf(
      <BotschafterPDF
        bot={botschafter}
        zusatzAngaben={false}
        allLetter={false}
        freitext={freitext}
      />
    ).toBlob();
    saveAs(
      blob,
      `Botschafter_${botschafter.vorname}_${botschafter.name}_${botschafter.id}.pdf`
    );
    setFreitext("");
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
              <FormLabel>Freitext</FormLabel>
              <Textarea
                name="freitext"
                placeholder="Text hier...."
                onChange={(e) => setFreitext(e.target.value)}
                minH={200}
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
