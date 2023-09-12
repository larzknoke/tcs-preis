import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";

function CookieBanner() {
  const [confirmCookie, setConfirmCookie] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  function submitCookie() {
    onClose();
    localStorage.setItem("cookieConfirmed", true);
  }

  useEffect(() => {
    setConfirmCookie(localStorage.getItem("cookieConfirmed"));
    if (confirmCookie === null) {
      onOpen();
    }
  }, [confirmCookie]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cookie / Datenschutz</ModalHeader>
          <ModalBody>
            <VStack gap={6}>
              <Text>
                Wir verwenden nur Cookies für grundlegende Funktionen der
                Website. Mit Klick auf „Akzeptieren“ erlauben Sie uns die
                Nutzung dieser Cookies.
              </Text>
              <Text>
                Wir verwenden keinerlei Analyse- oder Trackingdienste und setzen
                lediglich essenzielle Cookies ein, die für die Betreibung der
                Seite notwendig sind.
              </Text>
              <Text>
                Falls Sie auch die essentiellen Cookies ablehnen, können Sie
                unsere Website leider nicht besuchen.
              </Text>
              <Text>
                Nähere Informationen zu Cookies finden Sie in unserer
                <Link href="/datenshutz"> Datenschutzerklärung</Link>.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            {/* <Button variant="ghost" colorScheme="red" mr={3} onClick={onClose}>
              Ablehnen
            </Button> */}
            <Button colorScheme="green" onClick={submitCookie}>
              Akzeptieren
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CookieBanner;
