import {
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  HStack,
  StatHelpText,
  useDisclosure,
  Tooltip,
  IconButton,
  useClipboard,
  Flex,
  Table,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useEffect } from "react";
import { Checker, dateFormatter } from "@/lib/utils";
import InternEditModal from "./internEditModal";
import SocialEditModal from "./socialEditModal";

function InternDetail({ letter }) {
  const {
    isOpen: internIsOpen,
    onOpen: internOnOpen,
    onClose: internOnClose,
  } = useDisclosure();
  const {
    isOpen: socialIsOpen,
    onOpen: socialOnOpen,
    onClose: socialOnClose,
  } = useDisclosure();
  const { onCopy, setValue, hasCopied } = useClipboard();

  useEffect(() => {
    setValue(letter.emailProjekt);
  }, []);
  return (
    <SimpleGrid
      spacing={6}
      columns={{ sm: 1, md: 2 }}
      // minChildWidth={"500px"}
      //   templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Card>
        <CardHeader>
          <HStack justifyContent={"space-between"}>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Interne Daten
            </Heading>
            <Tooltip label="Bearbeiten">
              <IconButton
                onClick={internOnOpen}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                color="gray.600"
                icon={<HiOutlinePencilSquare size={20} />}
              />
            </Tooltip>
            <InternEditModal
              onClose={internOnClose}
              isOpen={internIsOpen}
              letter={letter}
            />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Freistellungsbescheid geprüft</StatLabel>
              <StatNumber>
                <Checker bool={letter.checkFreistellung} />
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Jury Vorauswahl</StatLabel>
              <StatNumber>
                <Checker bool={letter.jury} />
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Jury Status</StatLabel>
              <StatNumber>
                {letter.juryStatus ? (
                  <Text as={"span"} style={{ textTransform: "capitalize" }}>
                    {letter.juryStatus}
                  </Text>
                ) : (
                  <Checker bool={letter.juryStatus} />
                )}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bildmaterial/Medien erhalten</StatLabel>
              <StatNumber>
                <Checker bool={letter.bildmaterial} />{" "}
                {letter.bildmaterial &&
                  dateFormatter(letter.bildmaterial, false)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Termin Übergabe</StatLabel>
              <StatNumber>
                {dateFormatter(letter.terminUebergabe, false)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Überweisung 1.111€</StatLabel>
              <StatNumber>{dateFormatter(letter.terminGeld, false)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>ZWB 1.111€</StatLabel>
              <StatNumber>{dateFormatter(letter.zwb1000, false)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Überweisung 5.000€</StatLabel>
              <StatNumber>
                {dateFormatter(letter.terminGeld5000, false)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>ZWB 5.000€</StatLabel>
              <StatNumber>{dateFormatter(letter.zwb5000, false)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Projekt Email 1</StatLabel>
              <StatNumber>
                {dateFormatter(letter.letteremail1, false)}
              </StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <HStack justifyContent={"space-between"}>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Social Media
            </Heading>
            <Tooltip label="Bearbeiten">
              <IconButton
                onClick={socialOnOpen}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                color="gray.600"
                icon={<HiOutlinePencilSquare size={20} />}
              />
            </Tooltip>
            <SocialEditModal
              onClose={socialOnClose}
              isOpen={socialIsOpen}
              letter={letter}
            />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>
                Social Media <Text as={"b"}>TCS</Text>
              </StatLabel>
              <StatNumber>{dateFormatter(letter.socialTCS, false)} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Social Media <Text as={"b"}>Fremd</Text>
              </StatLabel>
              <StatNumber>
                {dateFormatter(letter.socialFremd, false)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Social Media Notiz</StatLabel>
              <StatNumber fontSize={15}>{letter.socialNotiz}</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
      {letter.originalLetter && (
        <Card>
          <CardHeader>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Original Bewerbung
            </Heading>
          </CardHeader>
          <CardBody>
            <Table>
              <Tbody>
                {Object.entries(letter.originalLetter).map(([k, v]) => {
                  return (
                    <Tr key={k}>
                      <Td textAlign={"left"}>{k}</Td>
                      <Td textAlign={"left"}>{JSON.stringify(v)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </SimpleGrid>
  );
}

export default InternDetail;
