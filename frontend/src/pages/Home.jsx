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
} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { DataForm } from "../components/DataForm";
const BASEURL = "https://form-filler-gjkj.onrender.com";
const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));

export const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASEURL}/data`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(res);
    };
    fetchData();
  }, []);
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
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
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <DataForm />
    </div>
  );
};
