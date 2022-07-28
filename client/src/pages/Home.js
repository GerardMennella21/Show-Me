import React from 'react';
import { Container } from '@chakra-ui/react';
import { Image, Box } from '@chakra-ui/react';
import Auth from '../utils/auth';



const Home = () => {
    
    const loggedIn = Auth.loggedIn();

    return (
        <div className="flex-row justify-center">
        <Box boxSize='sm'>
            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Box>
        </div>
    );
};

export default Home;