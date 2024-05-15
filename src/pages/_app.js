import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Open_Sans } from "next/font/google";
import { StepsTheme as Steps } from "chakra-ui-steps";
import { statTheme } from "@/lib/themeStat";
import { alertTheme } from "@/lib/themeAlert";
import ProgressBar from "@/components/ProgressBar";

const opensans = Open_Sans({ subsets: ["latin"] });

const formStyles = {
  baseStyle: {
    container: {
      label: {
        color: "gray.500",
      },
    },
  },
};

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    brand: {
      800: "#c3d551",
      900: "#b2c243",
    },
    brand2: {
      900: "#284879",
    },
    gala: {
      800: "#026A56",
      900: "#025C4D",
    },
  },
  fonts: {
    body: opensans.style.fontFamily,
    heading: opensans.style.fontFamily,
  },
  styles: {
    global: {
      "html, body": {
        background: "gray.50",
      },
      a: {
        color: "brand.900",
      },
    },
  },
  components: {
    Steps,
    Form: formStyles,
    Stat: statTheme,
    Alert: alertTheme,
    Radio: {
      parts: ["control"],
      variants: {
        atTop: {
          control: {
            alignSelf: "start",
            mt: "1",
          },
        },
      },
    },
    Checkbox: {
      parts: ["control"],
      variants: {
        atTop: {
          control: {
            alignSelf: "start",
            mt: "1",
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <ProgressBar />
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}
