import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataForm } from "../components/DataForm";
const BASEURL = "https://form-filler-gjkj.onrender.com";
const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));

export const Home = () => {
  const [data, setData] = useState([]);
  const toast = useToast();

  const deletedToast = () => {
    toast({
      title: "Success!",
      description: "Data deleted successfully!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const failedDeleteToast = () => {
    toast({
      title: "Fail!",
      description: "Couldn't delete data, please try again",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASEURL}/data`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setData(res.data);
    };
    fetchData();
  }, []);

  //deletion
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASEURL}/data/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      deletedToast();
      console.log(res);
    } catch (error) {
      failedDeleteToast();
    }
  };
  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Fill in the form below to post data</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Amount</Th>
              <Th isNumeric>Posting Year</Th>
              <Th>Posting Month</Th>
              <Th>Action Type</Th>
              <Th>Action Number</Th>
              <Th>Action Name</Th>
              <Th>Status</Th>
              <Th>Impact</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((elem) => {
              return (
                <Tr key={elem._id}>
                  <Td>{elem._id}</Td>
                  <Td>{elem.quantity}</Td>
                  <Td>{elem.amount}</Td>
                  <Td>{elem.postingYear}</Td>
                  <Td>{elem.postingMonth}</Td>
                  <Td>{elem.actionType}</Td>
                  <Td>{elem.actionNumber}</Td>
                  <Td>{elem.actionName}</Td>
                  <Td>{elem.status}</Td>
                  <Td>{elem.impact}</Td>
                  <Button colorScheme="blue">Edit</Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(elem._id)}
                  >
                    Delete
                  </Button>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <DataForm />
    </div>
  );
};
