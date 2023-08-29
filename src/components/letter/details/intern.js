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
import { HiOutlineClipboard, HiCheck, HiOutlinePlus } from "react-icons/hi2";
import { useEffect } from "react";
import { Checker, dateFormatter } from "@/lib/utils";

function InternDetail({ letter }) {
  const {
    isOpen: botschafterIsOpen,
    onOpen: botschafterOnOpen,
    onClose: botschafterOnClose,
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
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Interne Daten
          </Heading>
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
                <Checker bool={letter.bildmaterial} />
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Termin Überweisung 1.000€</StatLabel>
              <StatNumber>
                {dateFormatter(letter.terminGeld, false) || "01.02.2024"}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Termin Übergabe</StatLabel>
              <StatNumber>{letter.terminUebergabe || "08.09.2023"} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>ZWB 1000</StatLabel>
              <StatNumber>{letter.zwb1000 || "08.09.2023"} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>ZWB 5000</StatLabel>
              <StatNumber>{letter.zwb5000 || "08.09.2023"} </StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Social Media & Presse
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>
                Social Media <Text as={"b"}>TCS</Text>
              </StatLabel>
              <StatNumber>{letter.zwb1000 || "08.09.2023"} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Social Media <Text as={"b"}>Fremd</Text>
              </StatLabel>
              <StatNumber>{letter.zwb1000 || "08.09.2023"} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Social Media Notiz</StatLabel>
              <StatNumber fontSize={15}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.{" "}
              </StatNumber>
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
                    {letter.presseEinladung || "08.09.2023"}{" "}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pressemitteilung erstellt</StatLabel>
                  <StatNumber>
                    {letter.presseMitteilung || "08.09.2023"}{" "}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pressemitteilung freigegeben</StatLabel>
                  <StatNumber>
                    {letter.presseFreigabe || "09.09.2023"}{" "}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pressemitteilung versendet</StatLabel>
                  <StatNumber>
                    {letter.presseVersendet || "10.09.2023"}{" "}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Pressearbeit erledigt</StatLabel>
                  <StatNumber>
                    {letter.presseErledigt || "11.09.2023"}{" "}
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
