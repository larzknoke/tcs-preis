import { Button, ButtonGroup, Input } from "@chakra-ui/react";
import { useState } from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Month_Names_Short, Weekday_Names_Short } from "@/lib/utils";

function DateInput({ id, typ, submitDate }) {
  const [date, setDate] = useState();

  return (
    <>
      <SingleDatepicker
        placeholder="Datum auswählen..."
        name="date-input"
        date={date}
        onDateChange={setDate}
        configs={{
          dateFormat: "dd.MM.yyyy",
          dayNames: Weekday_Names_Short, // length of 7
          monthNames: Month_Names_Short, // length of 12
          firstDayOfWeek: 1, // default is 0, the dayNames[0], which is Sunday if you don't specify your own dayNames,
        }}
        propsConfigs={{
          inputProps: {
            placeholder: "Datum auswählen...",
          },
          dayOfMonthBtnProps: {
            defaultBtnProps: {
              _hover: {
                background: "brand.900",
                color: "white",
              },
            },
            todayBtnProps: {
              background: "brand2.900",
              color: "white",
            },
            selectedBtnProps: {
              background: "brand.900",
              color: "white",
            },
          },
        }}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button colorScheme="green" onClick={() => submitDate(id, date, typ)}>
          Speichern
        </Button>
      </ButtonGroup>
    </>
  );
}

export default DateInput;
