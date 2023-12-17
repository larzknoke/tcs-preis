import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Box,
  Heading,
  StackDivider,
  Text,
  HStack,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { HiBars3, HiOutlineEnvelope } from "react-icons/hi2";
import BotschafterBulkEmailModal from "../botschafter/botschafterBulkEmailModal";
import { dateFormatter } from "@/lib/utils";

function KampagnenBots({ kampagnenBots, kampagneId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let botcontacts = kampagnenBots.map((bot) => bot.botcontacts.length);
  let contactsum = botcontacts.reduce(function (a, b) {
    return a + b;
  });
  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading size="md">
            Botschafter mit vorhandenen Bewerbungen ({kampagnenBots.length}
            <Text as={"span"} color={"gray.300"}>
              {" "}
              + {contactsum} Bot.Ansprechpartner
            </Text>
            )
          </Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HiBars3 />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                onClick={onOpen}
                icon={<HiOutlineEnvelope size={"1.4em"} />}
              >
                Email versenden
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <BotschafterBulkEmailModal
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          kampagneId={kampagneId}
          kampagnenBots={kampagnenBots}
        />
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {kampagnenBots.length > 0 &&
            kampagnenBots
              .sort((a, b) =>
                a.bundesland
                  .toLowerCase()
                  .localeCompare(b.bundesland.toLowerCase())
              )
              .map((bot) => {
                return (
                  <Box key={bot.id}>
                    <Link
                      href={`/admin/botschafter/${bot.id}`}
                      target="_black"
                      rel="noopener noreferrer"
                    >
                      <Heading size="sm" display={"flex"} gap={2}>
                        <Text color={"gray.400"}>{bot.id} </Text>
                        <Text>
                          {bot.vorname} {bot.name}
                        </Text>
                        <Text color={"gray.400"}>{bot.bundesland} </Text>
                        {bot.botcontacts.length > 0 ? (
                          <Text color={"gray.300"}>
                            (+ {bot.botcontacts.length}
                            {" Bot.Ansprechpartner "})
                          </Text>
                        ) : (
                          ""
                        )}
                        <Text
                          ml={"auto"}
                          color={bot.botmail1 ? "brand.900" : "gray.400"}
                        >
                          E-Mail versendet am:{" "}
                          {bot.botmail1 ? dateFormatter(bot.botmail1) : "--"}
                        </Text>
                      </Heading>
                    </Link>
                    {bot.letters.map((letter) => {
                      return (
                        <Link
                          href={`/admin/bewerbung/${letter.id}`}
                          target="_black"
                          rel="noopener noreferrer"
                          key={letter.id}
                        >
                          <Text
                            pt="2"
                            fontSize="sm"
                            color={"gray.600"}
                            _hover={{
                              textDecoration: "underline",
                              color: "gray.900",
                            }}
                          >
                            {`${letter.id} | ${letter.status} | ${letter.bundeslandTraeger} | ${letter.nameProjekt} | ${letter.nameTraeger} `}
                          </Text>
                        </Link>
                      );
                    })}
                  </Box>
                );
              })}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default KampagnenBots;
