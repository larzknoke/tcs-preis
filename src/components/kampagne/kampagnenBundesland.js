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
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";

function KampagnenBundesland({ groupLetters }) {
  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading size="md">Bewerbungen nach Bundesland</Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {Object.entries(groupLetters).map(([bundesland, letters]) => {
            return (
              <Box key={bundesland}>
                <Heading size="sm" display={"flex"} gap={2} color={"brand.900"}>
                  <Text>{bundesland}</Text>
                </Heading>
                {letters.map((letter) => {
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
                        {`${letter.id} | ${letter.status} | Träger: ${
                          letter.bundeslandTraeger
                        } | Projekt: ${letter.bundeslandProjekt || "-"} | ${
                          letter.nameProjekt
                        } | ${letter.nameTraeger} `}
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

export default KampagnenBundesland;
