import LetterTable from "@/components/letter/letterTable";
import { Container, Heading } from "@chakra-ui/react";
import prisma from "@/lib/prisma";
import FilterTable from "@/components/letter/filterTable";

function Bewerbungen({ letters }) {
  return (
    <Container display={"flex"} flexDirection={"column"} minW={"100%"}>
      <FilterTable letters={letters} />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const letters = await prisma.letter.findMany({
    where: {
      verified: true,
    },
    include: {
      botschafter: true,
    },
  });
  return { props: { letters } };
};

export default Bewerbungen;
