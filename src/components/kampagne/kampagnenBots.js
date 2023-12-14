import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Box,
  Heading,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

function KampagnenBots({ kampagnenBots }) {
  let botcontacts = kampagnenBots.map((bot) => bot.botcontacts.length);
  let contactsum = botcontacts.reduce(function (a, b) {
    return a + b;
  });
  console.log("contactsum: ", contactsum);
  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {" "}
          Botschafter mit vorhandenen Bewerbungen ({kampagnenBots.length}
          <Text as={"span"} color={"gray.300"}>
            {" "}
            + {contactsum} Bot.Ansprechpartner
          </Text>
          )
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {kampagnenBots.length > 0 &&
            kampagnenBots
              .sort((a, b) => [
                a.bundesland
                  .toLowerCase()
                  .localeCompare(b.bundesland.toLowerCase()),
                a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
              ])
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
                            {`${letter.id} | ${letter.bundeslandTraeger} | ${letter.nameProjekt} | ${letter.nameTraeger} `}
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
