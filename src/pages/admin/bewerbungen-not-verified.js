import LetterNotVerifiedTable from "@/components/letter/letterNotVerifiedTable";
import { Container, Heading } from "@chakra-ui/react";
import prisma from "@/lib/prisma";

function BewerbungenNichtVerifiziert({ letters }) {
  return (
    <Container display={"flex"} flexDirection={"column"} minW={"100%"}>
      <LetterNotVerifiedTable letters={letters} />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const letters = await prisma.letter.findMany({
    where: {
      verified: false,
    },
    include: {
      botschafter: true,
    },
  });
  return { props: { letters } };
};

export default BewerbungenNichtVerifiziert;
