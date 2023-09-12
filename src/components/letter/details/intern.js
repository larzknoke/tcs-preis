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
              <StatLabel>Bildmaterial/Medien erhalten</StatLabel>
              <StatNumber>
                <Checker bool={letter.bildmaterial} />{" "}
                {letter.bildmaterial &&
                  dateFormatter(letter.bildmaterial, false)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Termin Überweisung 1.000€</StatLabel>
              <StatNumber>{dateFormatter(letter.terminGeld, false)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Termin Übergabe</StatLabel>
              <StatNumber>
                {dateFormatter(letter.terminUebergabe, false)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>ZWB 1111</StatLabel>
              <StatNumber>{dateFormatter(letter.zwb1000, false)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>ZWB 5000</StatLabel>
              <StatNumber>{dateFormatter(letter.zwb5000, false)}</StatNumber>
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
              Social Media & Presse
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
            <Stat>
              <StatLabel>Pressearbeit erwünscht</StatLabel>
              <StatNumber>
                <Checker bool={letter.presseErlaubt} />
              </StatNumber>
              <Flex direction={"column"} my={4} gap={2}>
                <Text as={"b"}>Presse Daten:</Text>
                <Stat>
                  <StatLabel>Presseeinladung versendet</StatLabel>
                  <StatNumber>
                    {dateFormatter(letter.presseEinladung, false)}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pressemitteilung erstellt</StatLabel>
                  <StatNumber>
                    {dateFormatter(letter.presseMitteilung, false)}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pressemitteilung freigegeben</StatLabel>
                  <StatNumber>
                    {dateFormatter(letter.presseFreigabe, false)}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pressemitteilung versendet</StatLabel>
                  <StatNumber>
                    {dateFormatter(letter.presseVersendet, false)}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pressearbeit erledigt</StatLabel>
                  <StatNumber>
                    {dateFormatter(letter.presseErledigt, false)}
                  </StatNumber>
                </Stat>
              </Flex>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}

export default InternDetail;
