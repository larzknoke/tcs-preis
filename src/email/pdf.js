import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export const LetterPDF = ({ letter }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{letter.id}</Text>
        {Object.entries(letter).map(([k, v]) => {
          return (
            <Text>
              {k}: {JSON.stringify(v)}
            </Text>
          );
        })}
      </View>
    </Page>
  </Document>
);
