import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { Flex, Spacer } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

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
                            <Tab><Link to="/">Home</Link></Tab>
                            {Auth.loggedIn() ? (
                                <>
                                    <Link to="/profile">My Profile</Link>
                                    <a href="/" onClick={logout}>Logout</a>
                                </>
                            ) : (
                                <>
                                    <Tab><Link to="/login">Login</Link></Tab>
                                    <Tab><Link to="/signup">Signup</Link></Tab>
                                </>
                            )}
                        </TabList>
                    </Tabs>    
                        
                    
                </nav>
            </Flex>
        </header>
    );
};