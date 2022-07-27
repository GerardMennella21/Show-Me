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
                            <Link to="/"><Tab>Home</Tab></Link>
                            {Auth.loggedIn() ? (
                                <>
                                    <Link to="/profile"><Tab>My Profile</Tab></Link>
                                    <a href="/" onClick={logout}><Tab>Logout</Tab></a>
                                </>
                            ) : (
                                <>
                                    <Link to="/login"><Tab>Login</Tab></Link>
                                    <Link to="/signup"><Tab>Signup</Tab></Link>
                                </>
                            )}
                        </TabList>
                    </Tabs>    
                        
                    
                </nav>
            </Flex>
        </header>
    );
};