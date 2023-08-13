import { Icon } from "@chakra-ui/react";
import { HiOutlineCheckCircle, HiXMark } from "react-icons/hi2";

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function getInternalValue({ allOptions, isMulti, value }) {
  if (isMulti) {
    if (!value) {
      return null;
    }
    return value
      .map((optionValue) =>
        allOptions.find((option) => option.value === optionValue)
      )
      .reduce((valueItems, valueItem) => {
        if (!valueItem) {
          return valueItems;
        }

        return [...valueItems, valueItem];
      }, []);
  }
  return allOptions.find((option) => option.value === value) || null;
}

export function dateFormatter(date) {
  return new Date(date).toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function currencyFormatter(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function Checker(bool) {
  if (bool == "nein" || bool === false) {
    return <Icon as={HiXMark} color={"red.500"} />;
  } else {
    return <Icon as={HiOutlineCheckCircle} color={"green.500"} />;
  }
}

export function Capatilizer(text) {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  } else {
    return text;
  }
}
