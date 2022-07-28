import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
  const formBackground = useColorModeValue('gray.100, gray.700');
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState }
      });
  
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
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
        <Heading mb={6}>Log In</Heading>

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
          Log In
        </Button>
        {error && <div>Login failed</div>}
      </Flex>
    </Flex>
  );
};

export default Login;
