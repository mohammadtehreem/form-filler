import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const actionNames = ["Action 1", "Action 2", "Action 3"];
const actionTypes = ["Type 1", "Type 2", "Type 3"];

const BASEURL = "https://form-filler-gjkj.onrender.com";
const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));

const getCurrentMonth = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[new Date().getMonth()];
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const DataForm = () => {
  const [formData, setFormData] = useState({
    quantity: "",
    amount: "",
    postingYear: getCurrentYear(),
    postingMonth: getCurrentMonth(),
    actionType: "",
    actionNumber: "",
    actionName: "",
    status: "",
    impact: "",
  });
  const toast = useToast();

  const postedToast = () => {
    toast({
      title: "Success!",
      description: "Data posted successfully!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const failToast = () => {
    toast({
      title: "Posting Failed",
      description: "Please try again.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(formData);
      const res = await axios.post(`${BASEURL}/data`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      postedToast();
      console.log(res);
    } catch (error) {
      failToast();
    }
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      mt={50}
    >
      <Box
        w={{ base: "90%", md: "400px" }}
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="md"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="quantity" isRequired>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="amount" isRequired>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="postingYear" isRequired>
              <FormLabel>Posting Year</FormLabel>
              <Input
                type="number"
                name="postingYear"
                value={formData.postingYear}
                readOnly
              />
            </FormControl>
            <FormControl id="postingMonth" isRequired>
              <FormLabel>Posting Month</FormLabel>
              <Input
                type="text"
                name="postingMonth"
                value={formData.postingMonth}
                readOnly
              />
            </FormControl>
            <FormControl id="actionType" isRequired>
              <FormLabel>Action Type</FormLabel>
              <Select
                name="actionType"
                value={formData.actionType}
                onChange={handleChange}
              >
                {actionTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="actionNumber" isRequired>
              <FormLabel>Action Number</FormLabel>
              <Input
                type="text"
                name="actionNumber"
                value={formData.actionNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="actionName" isRequired>
              <FormLabel>Action Name</FormLabel>
              <Select
                name="actionName"
                value={formData.actionName}
                onChange={handleChange}
              >
                {actionNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="status" isRequired>
              <FormLabel>Status</FormLabel>
              <Input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="impact" isRequired>
              <FormLabel>Impact</FormLabel>
              <Select
                name="impact"
                value={formData.impact}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Mid">Mid</option>
                <option value="High">High</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" mt={4}>
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
