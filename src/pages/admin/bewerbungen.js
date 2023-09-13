import LetterTable from "@/components/letter/letterTable";
import { Container, Heading } from "@chakra-ui/react";
import prisma from "@/lib/prisma";

function Bewerbungen({ letters }) {
  return (
    <Container display={"flex"} flexDirection={"column"} minW={"100%"}>
      <LetterTable letters={letters} />
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
