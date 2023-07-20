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
