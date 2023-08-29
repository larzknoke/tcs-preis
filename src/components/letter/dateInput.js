import { Button, ButtonGroup, Input } from "@chakra-ui/react";
import { useState } from "react";

function DateInput({ id, typ }) {
  const [date, setDate] = useState();

  async function submitDate() {
    console.log("id: ", id);
    console.log("typ: ", typ);
    console.log("date: ", date);
    const res = await fetch("/api/letter/updateDate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, date, typ }),
    });
  }

  return (
    <>
      <Input
        placeholder="Datum..."
        onChange={(e) => {
          setDate(e.target.value);
          console.log("date: ", date);
        }}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        {/* <Button variant="outline">Abbrechen</Button> */}
        <Button colorScheme="green" onClick={submitDate}>
          Speichern
        </Button>
      </ButtonGroup>
    </>
  );
}

export default DateInput;
