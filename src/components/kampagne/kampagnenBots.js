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
  Select,
  MenuDivider,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import { HiBars3, HiOutlineEnvelope } from "react-icons/hi2";
import BotschafterBulkEmailModal from "../botschafter/botschafterBulkEmailModal";
import { dateFormatter } from "@/lib/utils";
import { useState } from "react";
import LetterBulkEmailModal from "../botschafter/letterBulkEmailModal";

function KampagnenBots({ kampagnenBots, kampagne, abgelehntAnzeigen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: letterModalIsOpen,
    onOpen: letterModalOnOpen,
    onClose: letterModalOnClose,
  } = useDisclosure();
  const [sortValue, setSortValue] = useState("name");

  let botcontacts = kampagnenBots
    .filter((bot) => bot.letters.length > 0)
    .map((bot) => bot.botcontacts.length);
  let contactsum = 0;
  if (botcontacts.length > 0) {
    contactsum = botcontacts.reduce(function (a, b) {
      return a + b;
    });
  } else {
    contactsum = 0;
  }
  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading size="md">
            Botschafter mit vorhandenen Bewerbungen (
            {kampagnenBots.filter((bot) => bot.letters.length > 0).length ||
              "0"}
            <Text as={"span"} color={"gray.300"}>
              {" "}
              + {contactsum || "0"} Bot.Ansprechpartner
            </Text>
            )
          </Heading>
          <Select
            w={"250px"}
            ml={"auto"}
            onChange={(e) => {
              setSortValue(e.target.value);
            }}
            value={sortValue}
          >
            <option value="name">Name</option>
            <option value="bundesland">Bundesland</option>
            <option value="typ">Typ</option>
          </Select>
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
                Botschafter Email
              </MenuItem>
              <MenuItem
                onClick={letterModalOnOpen}
                icon={<HiOutlineEnvelope size={"1.4em"} />}
              >
                Bewerbung Email
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <BotschafterBulkEmailModal
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          kampagneId={kampagne.id}
          kampagnenBots={kampagnenBots}
        />
        <LetterBulkEmailModal
          onOpen={letterModalOnOpen}
          isOpen={letterModalIsOpen}
          onClose={letterModalOnClose}
          kampagne={kampagne}
        />
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {kampagnenBots.length > 0 &&
            kampagnenBots
              .filter((bot) => bot.letters.length > 0)
              .sort((a, b) =>
                a[sortValue]
                  .toLowerCase()
                  .localeCompare(b[sortValue].toLowerCase())
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
                        <Text color={"gray.400"}>{bot.typ} </Text>
                        <Text color={"gray.400"}>{bot.bundesland} </Text>
                        {bot.botcontacts.length > 0 ? (
                          <Text color={"gray.300"}>
                            (+ {bot.botcontacts.length}
                            {" Bot.Ansprechpartner "})
                          </Text>
                        ) : (
                          ""
                        )}
                        {/* <Text ml={"auto"} color={"brand.900"}>
                          <Text as={"span"} color={"gray.400"}>
                            Email 1:{" "}
                          </Text>
                          {bot.botmail1 ? dateFormatter(bot.botmail1) : "--"}
                          {", "}
                          <Text as={"span"} color={"gray.400"}>
                            Email 2:{" "}
                          </Text>
                          {bot.botmail2 ? dateFormatter(bot.botmail2) : "--"}
                        </Text> */}
                      </Heading>
                    </Link>
                    {bot.letters
                      .filter((letter) =>
                        abgelehntAnzeigen
                          ? true
                          : [
                              "1111",
                              "5000",
                              "ausland1111",
                              "ausland5000",
                            ].includes(letter.status)
                      )
                      .sort(
                        (a, b) => b.botschafterConfirm - a.botschafterConfirm
                      )
                      .map((letter) => {
                        return (
                          <HStack
                            divider={<StackDivider />}
                            spacing={2}
                            align="stretch"
                            pt={2}
                            fontSize={14}
                          >
                            <Link
                              href={`/admin/bewerbung/${letter.id}`}
                              target="_black"
                              rel="noopener noreferrer"
                              key={letter.id}
                            >
                              <Text
                                width={"30px"}
                                color={
                                  letter.botschafterConfirm
                                    ? "brand.900"
                                    : "red.300"
                                }
                              >
                                {letter.id}
                              </Text>
                            </Link>
                            <Text
                              width={"40px"}
                              whiteSpace={"nowrap"}
                              overflow={"hidden"}
                              textOverflow={"ellipsis"}
                            >
                              {letter.status}
                            </Text>
                            <Text
                              width={"100px"}
                              whiteSpace={"nowrap"}
                              overflow={"hidden"}
                              textOverflow={"ellipsis"}
                            >
                              {letter.bundeslandTraeger}
                            </Text>
                            <Text width={"75px"}>
                              <Tooltip label={"Termin Übergabe"}>
                                {dateFormatter(letter.terminUebergabe, false)}
                              </Tooltip>
                            </Text>
                            <Text width={"75px"}>
                              <Tooltip label={" Termin Geld"}>
                                {dateFormatter(letter.terminGeld, false)}
                              </Tooltip>
                            </Text>
                            <Text
                              width={"450px"}
                              whiteSpace={"nowrap"}
                              overflow={"hidden"}
                              textOverflow={"ellipsis"}
                            >
                              {letter.nameProjekt}
                            </Text>
                            <Text
                              width={"450px"}
                              whiteSpace={"nowrap"}
                              overflow={"hidden"}
                              textOverflow={"ellipsis"}
                            >
                              {letter.nameTraeger}
                            </Text>
                          </HStack>

                          // <Link
                          //   href={`/admin/bewerbung/${letter.id}`}
                          //   target="_black"
                          //   rel="noopener noreferrer"
                          //   key={letter.id}
                          // >
                          //   <Text
                          //     pt="2"
                          //     fontSize="sm"
                          //     color={
                          //       letter.botschafterConfirm
                          //         ? "brand.900"
                          //         : "red.300"
                          //     }
                          //     _hover={{
                          //       textDecoration: "underline",
                          //       color: "gray.500",
                          //     }}
                          //   >
                          //     {`${letter.id} | ${letter.status} | ${
                          //       letter.bundeslandTraeger
                          //     }| ${dateFormatter(
                          //       letter.terminUebergabe,
                          //       false
                          //     )} | ${dateFormatter(
                          //       letter.terminGeld,
                          //       false
                          //     )} | ${letter.nameProjekt} | ${
                          //       letter.nameTraeger
                          //     } `}
                          //   </Text>
                          // </Link>
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
