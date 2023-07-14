import { Container, Heading } from "@chakra-ui/react";
import BotschafterTable from "@/components/botschafterTable";

function Botschafter() {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"8xl"}>
      <BotschafterTable />
    </Container>
  );
}

export default Botschafter;
