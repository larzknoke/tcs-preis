import TeaserText from "@/components/teaser-text";
import { Container, VStack, Heading, Divider } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
        <VStack gap={6}>
          <Image
            src="/tcs_logo.svg"
            alt="TCS Logo"
            width={180}
            height={24}
            priority
          />
          <Heading color={"gray.700"} size={"xl"} textAlign={"center"} mb={8}>
            11. Town & Country Stiftungspreis
          </Heading>
          <TeaserText />
        </VStack>
      </Container>
    </main>
  );
}
