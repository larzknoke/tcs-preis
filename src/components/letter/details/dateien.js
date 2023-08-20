import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Flex,
  Tooltip,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineClipboard, HiCheck, HiOutlinePlus } from "react-icons/hi2";
import NewFileModal from "../newFileModal";
import FileTable from "../fileTable";

function DateienDetail({ letter }) {
  const {
    isOpen: fileIsOpen,
    onOpen: fileOnOpen,
    onClose: fileOnClose,
  } = useDisclosure();
  return (
    <Card>
      <CardHeader>
        <Flex justify={"space-between"}>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Dateien
          </Heading>
          <Tooltip label="Neue Datei" placement="top">
            <IconButton
              size={"sm"}
              variant="outline"
              colorScheme="green"
              aria-label="See menu"
              icon={<HiOutlinePlus />}
              onClick={() => fileOnOpen()}
            />
          </Tooltip>
          <NewFileModal
            letter={letter}
            isOpen={fileIsOpen}
            onClose={fileOnClose}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <FileTable letter={letter} />
      </CardBody>
    </Card>
  );
}

export default DateienDetail;
