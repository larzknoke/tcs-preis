import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  Text,
  Stack,
  StackDivider,
  Icon,
  Tooltip,
  HStack,
  GridItem,
  Alert,
  AlertIcon,
  AlertDescription,
  VStack,
} from "@chakra-ui/react";
import {
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiXMark,
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlineHashtag,
  HiOutlineTag,
  HiOutlineUserCircle,
  HiCalendarDays,
  HiMiniUserCircle,
} from "react-icons/hi2";
import Link from "next/link";
import { Capatilizer, dateFormatter } from "@/lib/utils";

function BotlettersTable({ botschafter }) {
  return (
    <Card>
      <CardHeader>
        <Heading
          size="sm"
          color="gray.500"
          fontWeight={"600"}
          textTransform={"uppercase"}
        >
          Verknüpfte Projekte
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {botschafter.letters.length > 0 ? (
            botschafter.letters.map((letter) => {
              return (
                <HStack justify={"space-between"} key={letter.id}>
                  <VStack alignItems={"self-start"} w={"100%"}>
                    <Link
                      target="_black"
                      rel="noopener noreferrer"
                      href={`/admin/bewerbung/${letter.id}`}
                      color={"gray.500"}
                    >
                      <Text as={"b"} fontSize={"lg"}>
                        {letter.organisationProjekt} | {letter.nameProjekt}
                      </Text>
                    </Link>
                    <HStack gap={6} w={"100%"}>
                      <HStack color={"gray.500"} gap={1}>
                        <Icon as={HiOutlineHashtag} />
                        <Text as={"b"} minW={"20px"}>
                          {letter.id}
                        </Text>
                      </HStack>
                      <HStack color={"gray.500"} gap={1}>
                        <Icon as={HiOutlineTag} />
                        <Text as={"b"}>{Capatilizer(letter.status)}</Text>
                      </HStack>
                      <Tooltip label={"Termin Übergabe"}>
                        <HStack color={"gray.500"} gap={1}>
                          <Icon as={HiCalendarDays} />
                          <Text as={"b"}>
                            {letter.terminUebergabe
                              ? dateFormatter(letter.terminUebergabe, false)
                              : "-"}
                          </Text>
                        </HStack>
                      </Tooltip>
                      <HStack>
                        {letter.botschafterConfirm ? (
                          <Tooltip label={"Botschafter bestätigt"}>
                            <div>
                              <Icon
                                fontSize={"xl"}
                                as={HiOutlineCheckCircle}
                                color={"green.500"}
                              />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip label={"Botschafter nicht bestätigt"}>
                            <div>
                              <Icon
                                fontSize={"lg"}
                                as={HiXMark}
                                color={"red.500"}
                              />
                            </div>
                          </Tooltip>
                        )}
                      </HStack>
                    </HStack>

                    <VStack alignItems={"start"} w={"100%"} gap={1}>
                      <Text as={"b"} color={"gray.500"}>
                        Kontakt:
                      </Text>
                      <HStack color={"gray.400"} gap={1}>
                        <Icon as={HiOutlineMapPin} />
                        <Text>
                          {`${letter.plzTraeger} ${letter.ortTraeger}, ${letter.bundeslandTraeger}`}
                        </Text>
                      </HStack>
                      <HStack
                        as={"span"}
                        color={"gray.400"}
                        gap={5}
                        alignItems={"start"}
                        minW={"50%"}
                      >
                        <HStack>
                          <Icon as={HiOutlineEnvelope} />
                          <Text>{letter.emailProjekt || "-"}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiOutlinePhone} />
                          <Text>{letter.telefonnummerProjekt || "-"}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiDevicePhoneMobile} />
                          <Text>{letter.mobilProjekt || "-"}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiOutlineGlobeAlt} />
                          <Text>{letter.wwwProjekt || "-"}</Text>
                        </HStack>
                      </HStack>
                      <VStack alignItems={"start"} gap={1} mt={2}>
                        {letter && letter.lettercontacts.length > 0 && (
                          <Text as={"b"} color={"gray.500"}>
                            weiterer Botschafter-Kontakt:
                          </Text>
                        )}
                        {letter &&
                          letter.lettercontacts.length > 0 &&
                          letter.lettercontacts.map((contact) => {
                            return (
                              <HStack
                                alignItems={"start"}
                                gap={4}
                                color={"gray.400"}
                              >
                                <Text color={"gray.500"}>{contact.name}</Text>
                                <HStack>
                                  <Icon as={HiOutlineUserCircle} />
                                  <Text>{contact.funktion || "-"}</Text>
                                </HStack>
                                <HStack>
                                  <Icon as={HiOutlineEnvelope} />
                                  <Text>{contact.email || "-"}</Text>
                                </HStack>
                                <HStack>
                                  <Icon as={HiOutlinePhone} />
                                  <Text>{contact.telefon || "-"}</Text>
                                </HStack>
                                <HStack>
                                  <Icon as={HiDevicePhoneMobile} />
                                  <Text>{contact.mobil || "-"}</Text>
                                </HStack>
                              </HStack>
                            );
                          })}
                      </VStack>
                      <HStack color={"gray.400"} gap={1}>
                        <Text as={"b"} color={"gray.500"}>
                          Kampagne:{" "}
                        </Text>
                        <Text>{letter.kampagne.name || "-"}</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </HStack>
              );
            })
          ) : (
            <Alert status="warning">
              <AlertIcon />
              <AlertDescription>
                Keine verknüpften Projekte vorhanden
              </AlertDescription>
            </Alert>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default BotlettersTable;
