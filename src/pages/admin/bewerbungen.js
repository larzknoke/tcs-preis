import LetterTable from "@/components/letter/letterTable";
import { Container, Heading } from "@chakra-ui/react";
import prisma from "@/lib/prisma";

function Bewerbungen({ letters }) {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"8xl"}>
      <LetterTable letters={letters} />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const letters = await prisma.letter.findMany();
  return { props: { letters } };
};

export default Bewerbungen;
