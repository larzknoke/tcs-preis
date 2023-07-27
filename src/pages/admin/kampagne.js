import { Container } from "@chakra-ui/react";
import KampagnenTable from "@/components/kampagne/kampagneTable";
import prisma from "@/lib/prisma";

function Kampagne({ kampagnes }) {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"8xl"}>
      <KampagnenTable kampagnes={kampagnes} />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const kampagnes = await prisma.kampagne.findMany();
  console.log("kampagnes: ", kampagnes);
  return { props: { kampagnes } };
};

export default Kampagne;
