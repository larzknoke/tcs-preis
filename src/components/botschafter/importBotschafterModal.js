import {
  Input,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Papa from "papaparse";

function ImportBotschafterModal({ isOpen, onClose }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [parsedData, setParsedData] = useState([]);

  async function onSubmit(values) {
    try {
      setLoading(true);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(results.data);
          setParsedData(results.data);
        },
      });
      const res = await fetch("/api/botschafter/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
      if (res.status == 401) {
        toast({
          title: "Sie sind nicht berechtigt diese Funktion auszuführen.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (res.status != 200) {
        toast({
          title: "Ein Fehler ist aufgetreten",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      } else {
        const resData = await res.json();
        console.log("resData: ", resData);
        toast({
          title: `Botschafter erfolgreich importiert.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
        router.push(`/admin/botschafter`);
        setLoading(false);
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
          <ModalHeader>Botschafter importieren</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Bitte CSV Datei auswählen:</Text>
            <Input
              onChange={(e) => setFile(e.target.files[0])}
              name="importBotschafterFile"
              type="file"
              sx={{
                "::file-selector-button": {
                  height: 10,
                  padding: 0,
                  mr: 4,
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                },
              }}
            />
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
              type="submit"
              isLoading={loading}
              onClick={() => onSubmit()}
            >
              Importieren
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImportBotschafterModal;
