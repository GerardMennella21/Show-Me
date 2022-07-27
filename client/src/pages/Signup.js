import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { FormControl, Button, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react'

const Signup = () => {
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
      <div className=''>
        <div className=''>
          <h4 className=''>Sign Up</h4>
          <div className=''>
            <FormControl>
              <Input
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <Input
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <Input
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              </FormControl>
              <Button onClick={handleFormSubmit}>
                Submit
              </Button>
            
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
  );
};

export default Signup;
