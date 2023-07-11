import Layout from "@/components/layout";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Open_Sans } from "next/font/google";

const opensans = Open_Sans({ subsets: ["latin"] });
const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    brand: {
      900: "#b2c243",
    },
    brand2: {
      900: "#284879",
    },
  },
  fonts: {
    body: opensans.style.fontFamily,
    heading: opensans.style.fontFamily,
  },
  styles: {
    global: {
      "html, body": {
        background: "gray.100",
      },
      a: {
        color: "brand.900",
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
