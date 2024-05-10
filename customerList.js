import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";



//...........................................................................................................................

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const CustomerList = () => {
  const [silverCustomers, setSilverCustomers] = useState([]);
  const [bronzeCustomers, setBronzeCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/customers");
        const customers = response.data;

        setSilverCustomers(customers.filter((customer) => customer.badge === "silver"));
        setBronzeCustomers(customers.filter((customer) => customer.badge === "bronze"));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filterCustomersWithBirthdays = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
  
    const nextWeekMonth = nextWeek.getMonth();
    const nextWeekDate = nextWeek.getDate();
  
    setSilverCustomers(silverCustomers.filter(customer => {
      const birthdate = new Date(customer.birthdate);
      const birthMonth = birthdate.getMonth();
      const birthDate = birthdate.getDate();
      return birthMonth === nextWeekMonth && birthDate >= nextWeekDate - 7 && birthDate <= nextWeekDate;
    }));
  
    setBronzeCustomers(bronzeCustomers.filter(customer => {
      const birthdate = new Date(customer.birthdate);
      const birthMonth = birthdate.getMonth();
      const birthDate = birthdate.getDate();
      return birthMonth === nextWeekMonth && birthDate >= nextWeekDate - 7 && birthDate <= nextWeekDate;
    }));
  };
  

//...........................................................................................................................


  return (
    <CustomerListContainer>
      <Button onClick={filterCustomersWithBirthdays}>Customers with Birthdays in Next 7 Days</Button>
      <SectionHeader>Silver Badge Holders</SectionHeader>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <CustomerTable>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>Birthdate</TableHeader>
              <TableHeader>Postal Code</TableHeader>
              <TableHeader>Points</TableHeader>
            </tr>
          </thead>
          <tbody>
            {silverCustomers.map((customer) => (
              <tr key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{formatDate(customer.birthdate)}</TableCell>
                <TableCell>{customer.postalCode}</TableCell>
                <TableCell>{customer.points}</TableCell>
              </tr>
            ))}
          </tbody>
        </CustomerTable>
      )}
      <SectionHeader>Bronze Badge Holders</SectionHeader>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <CustomerTable>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>Birthdate</TableHeader>
              <TableHeader>Postal Code</TableHeader>
              <TableHeader>Points</TableHeader>
            </tr>
          </thead>
          <tbody>
            {bronzeCustomers.map((customer) => (
              <tr key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{formatDate(customer.birthdate)}</TableCell>
                <TableCell>{customer.postalCode}</TableCell>
                <TableCell>{customer.points}</TableCell>
              </tr>
            ))}
          </tbody>
        </CustomerTable>
      )}
    </CustomerListContainer>
  );
};

export default CustomerList;


//...........................................................................................................................


const CustomerListContainer = styled.div`
  margin-top: 20px;
`;

const SectionHeader = styled.h2`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const CustomerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  background-color: #333; /* Dark background color */
`;

const TableHeader = styled.th`
  background-color: #555; /* Darker header color */
  border: 1px solid #dddddd;
  text-align: left;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff; /* White text color */
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 15px;
  font-size: 16px;
  color: #ffffff; /* White text color */
`;

const LoadingMessage = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #FF0000;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
