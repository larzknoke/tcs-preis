import prisma from "@/lib/prisma";
import { Container, Heading } from "@chakra-ui/react";
import BotschafterTable from "@/components/botschafter/botschafterTable";
import UserTable from "@/components/users/userTable";

function Users({ users }) {
  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"7xl"}>
      <UserTable users={users} />
      {/* {JSON.stringify(users)} */}
    </Container>
  );
}

export const getServerSideProps = async () => {
  const users = await prisma.user.findMany();
  return { props: { users } };
};

export default Users;
