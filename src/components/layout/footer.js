import { Text, Divider, VStack, HStack, Flex } from "@chakra-ui/react";
import Image from "next/image";

function Footer() {
  return (
    <Flex mt={12} py={12} gap={6} px={"8%"} direction={"column"}>
      <Divider />
      <Flex
        gap={{ base: 5, md: 20 }}
        justifyContent={"center"}
        direction={{ base: "column", md: "row" }}
      >
        <Image
          src="/tcs_logo.svg"
          alt="TCS Logo"
          width={120}
          height={24}
          priority
        />
        <Text color={"gray.400"}>
          Town & Country Stiftung <br />
          bürgerlichen Rechts
          <br /> Anger 55/56
          <br /> 99084 Erfurt
        </Text>
        <Text color={"gray.400"}>
          Telefon: 03 61 / 644 78 914 <br />
          Telefax: 03 61 / 644 78 915 <br />
          <a href="mailto:stiftungspreis@tc-stiftung.de">
            stiftungspreis@tc-stiftung.de
          </a>
          <br />
          <a href="https://www.tc-stiftung.de">www.tc-stiftung.de</a>
        </Text>
        <Text color={"gray.400"}>
          Vorstand: <br />
          Christian Treumann (Vorsitzender) <br />
          Sylvia Wagner <br />
          Dietmar Jonas
        </Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
