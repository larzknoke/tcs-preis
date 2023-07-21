import { Container, Heading } from "@chakra-ui/react";
import BotschafterTable from "@/components/botschafter/botschafterTable";

function Botschafter({ botschafters }) {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"8xl"}>
      <BotschafterTable botschafters={botschafters} />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const botschafters = await prisma.botschafter.findMany();
  console.log("botschafters: ", botschafters);
  return { props: { botschafters } };
};

export default Botschafter;
