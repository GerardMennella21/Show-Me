import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const Signup = () => {
  const formBackground = useColorModeValue('gray.100, gray.700')
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e)
    }

    setFormState({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
    <Flex
      flexDirection="column"
      bg={formBackground}
      p={12}
      borderRadius={8}
      boxShadow="lg"
    >
      <Heading mb={6}>Sign Up</Heading>
      <Input 
        placeholder="username"
        type="username"
        variant="filled"
        name="username"
        id="username"
        mb={3}
        value={formState.username}
        onChange={handleChange}
      />
      <Input
        placeholder="johndoe@gmail.com"
        type="email"
        variant="filled"
        name="email"
        id="email"
        mb={3}
        value={formState.email}
        onChange={handleChange}
      />
      <Input
        placeholder="**********"
        type="password"
        variant="filled"
        mb={6}
        name="password"
        id="password"
        value={formState.password}
        onChange={handleChange}
      />
      <Button colorScheme="teal" mb={8} onClick={handleFormSubmit}>
        Sign Up
      </Button>
      {error && <div>Login failed</div>}
    </Flex>
  </Flex>
);
};

export default Signup;
