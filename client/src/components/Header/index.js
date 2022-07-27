import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { Flex, Spacer } from '@chakra-ui/react'
import { Tabs, TabList, Tab} from '@chakra-ui/react'

export default function Header() {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header className="">
            <Flex alignItems='center'>
                <Link to="/">
                <h1>Show Me</h1>
                </Link>
                <Spacer />
                <nav className="">
            
                    <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList>
                            <Link to="/"><Tab>Home</Tab></Link>
                            {Auth.loggedIn() ? (
                                <>
                                    <Tab><Link to="/profile">My Profile</Link></Tab>
                                    <Tab><Link to="/post">Create Post</Link></Tab>
                                    <Tab><a href="/" onClick={logout}>Logout</a></Tab>
                                    
                                </>
                            ) : (
                                <>
                                        <Link to="/login"><Tab>Login</Tab></Link>
                                        <Link to="/signup"><Tab>Signup</Tab></Link>

                                        
                                    <Wrap>
                                        
                                            <WrapItem>
                                                                              
                                                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /> 
                                            </WrapItem>
                                          
                                    </Wrap>
                                </>

                            )}
                        </TabList>
                    </Tabs>                   
                </nav>
            </Flex>
        </header>
    );
};