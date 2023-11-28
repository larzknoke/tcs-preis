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
  HiOutlineNoSymbol,
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlineHashtag,
  HiOutlineTag,
} from "react-icons/hi2";
import Link from "next/link";
import { Capatilizer } from "@/lib/utils";

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
                  <VStack alignItems={"self-start"}>
                    <HStack gap={6}>
                      <HStack color={"gray.400"} gap={1}>
                        <Icon as={HiOutlineHashtag} />
                        <Text as={"b"} minW={"20px"}>
                          {letter.id}
                        </Text>
                      </HStack>
                      <HStack color={"gray.400"} gap={1}>
                        <Icon as={HiOutlineTag} />
                        <Text>{Capatilizer(letter.status)}</Text>
                      </HStack>
                      <HStack gap={1}>
                        <Icon as={HiOutlineMapPin} color={"gray.400"} />
                        <Text as={"span"} color={"gray.400"}>
                          {`${letter.plzTraeger} ${letter.ortTraeger}, ${letter.bundeslandTraeger}`}
                        </Text>
                      </HStack>
                    </HStack>
                    <Text as={"b"} fontSize={"lg"}>
                      {letter.organisationProjekt} | {letter.nameProjekt}
                    </Text>
                    <HStack as={"span"} color={"gray.400"} gap={5}>
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
                  </VStack>
                  <HStack gap={6}>
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
                            fontSize={"xl"}
                            as={HiOutlineNoSymbol}
                            color={"red.500"}
                          />
                        </div>
                      </Tooltip>
                    )}
                    <Button
                      as={Link}
                      href={`/admin/bewerbung/${letter.id}`}
                      size={"sm"}
                      variant={"outline"}
                      leftIcon={<HiOutlineDocumentText />}
                    >
                      Details
                    </Button>
                  </HStack>
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
