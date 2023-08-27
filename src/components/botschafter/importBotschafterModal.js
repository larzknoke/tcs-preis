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
import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";

function ImportBotschafterModal({ isOpen, onClose }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const fileInput = useRef(null);

  async function onSubmit() {
    try {
      // console.log("file: ", file);
      // setLoading(true);
      console.log("file: ", fileInput.current?.files[0]);
      Papa.parse(fileInput.current?.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          console.log("results.data", results.data);
          setParsedData(results.data);
          console.log("parsedData: ", parsedData);
          if (parsedData.length > 0) {
            const res = await fetch("/api/botschafter/import", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(parsedData),
            });
            if (res.status == 401) {
              toast({
                title: "Sie sind nicht berechtigt diese Funktion auszuführen.",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            } else if (res.status != 200) {
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
                title: `${resData.botschafter?.count} Botschafter erfolgreich importiert.`,
                status: "success",
                duration: 4000,
                isClosable: true,
              });
              onClose();
              router.push(`/admin/botschafter`);
              setLoading(false);
            }
          }
        },
      });
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
          <ModalHeader>Botschafter importieren</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Bitte CSV Datei auswählen:</Text>
            <Input
              ref={fileInput}
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
