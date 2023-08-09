import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  SimpleGrid,
  GridItem,
  Select,
  Heading,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

function Step3() {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
  } = useFormContext();

  return (
    <VStack gap={10}>
      <SimpleGrid spacing={6} columns={4} w={"full"}>
        <GridItem colSpan={3}>
          <Heading size={"md"} color={"gray.500"}>
            Finanzierungskonzept
          </Heading>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.eigenmittel}>
            <FormLabel>Eigenmittel</FormLabel>
            <Input
              name="eigenmittel"
              type="number"
              {...register("eigenmittel", {
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.eigenmittel && errors.eigenmittel.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.oeffentlicheZuwendungen}>
            <FormLabel>
              Öffentliche Zuwendungen (z.B. Landes- oder Bundesmittel)
            </FormLabel>
            <Input
              name="oeffentlicheZuwendungen"
              type="number"
              {...register("oeffentlicheZuwendungen", {
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.oeffentlicheZuwendungen &&
                errors.oeffentlicheZuwendungen.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.privateSpenden}>
            <FormLabel>
              Private Spenden (z.B. Privatpersonen, Unternehmen)
            </FormLabel>
            <Input
              name="privateSpenden"
              type="number"
              {...register("privateSpenden", {
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.privateSpenden && errors.privateSpenden.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.zuwendungAndere}>
            <FormLabel>
              Zuwendungen durch andere gemeinnützige Organisationen (z.B.
              Stiftungen, Vereine)
            </FormLabel>
            <Input
              name="zuwendungAndere"
              type="number"
              {...register("zuwendungAndere", {
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.zuwendungAndere && errors.zuwendungAndere.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4}>
          <FormControl isInvalid={errors.bisherigeFoerderung}>
            <FormLabel>
              Bisherige Förderung Ihres Vereins/Organisation durch die Town &
              Country Stiftung (Wann und welche Zahlungen/Preise haben Sie
              bislang von der Town & Country Stiftung erhalten, beispielsweise
              aus vergangenen Stiftungspreisen?)
            </FormLabel>
            <Input
              name="bisherigeFoerderung"
              type="number"
              {...register("bisherigeFoerderung", {
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.bisherigeFoerderung && errors.bisherigeFoerderung.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        {/* <GridItem colSpan={2}>
          <FormControl isInvalid={errors.weitereDateien}>
            <FormLabel>weitere Dateien</FormLabel>
            <Input
              type="file"
              // multiple
              {...register("weitereDateien")}
              sx={{
                "::file-selector-button": {
                  height: 10,
                  padding: 0,
                  mr: 4,
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                },
              }}
            />
            <FormErrorMessage>
              {errors.weitereDateien && errors.weitereDateien.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isInvalid={errors.weitereDateien2}>
            <FormLabel>weitere Dateien</FormLabel>
            <Input
              type="file"
              // multiple
              {...register("weitereDateien2")}
              sx={{
                "::file-selector-button": {
                  height: 10,
                  padding: 0,
                  mr: 4,
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                },
              }}
            />
            <FormErrorMessage>
              {errors.weitereDateien2 && errors.weitereDateien2.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem> */}
      </SimpleGrid>
    </VStack>
  );
}

export default Step3;
