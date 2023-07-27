import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const pathname = req.nextUrl.pathname;
      console.log("token middlware: ", token, pathname);

      if (token) return true;

      return false;
    },
  },
  pages: {
    signIn: "auth/signin",
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
