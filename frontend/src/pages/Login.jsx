import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";

export const Login = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        w={{ base: "90%", md: "400px" }}
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="md"
      >
        <VStack spacing={4}>
          <Heading as="h1" size="lg" mb={6}>
            Login
          </Heading>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button colorScheme="teal" w="full" mt={4}>
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
