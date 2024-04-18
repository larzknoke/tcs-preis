import { Container, Heading } from "@chakra-ui/react";
import prisma from "@/lib/prisma";
import FilterTableInvite from "@/components/invite/filterTableInvite";

function Einladungen({ invites }) {
  return (
    <Container display={"flex"} flexDirection={"column"} minW={"100%"}>
      <FilterTableInvite invites={invites} />
    </Container>
  );
}

export const getServerSideProps = async () => {
  const invites = await prisma.invite.findMany();
  console.log(invites);
  return { props: { invites } };
};

export default Einladungen;
