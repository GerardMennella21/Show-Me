import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { Flex, Spacer } from '@chakra-ui/react'
import { Tabs, TabList, Tab, Button } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup, Wrap, WrapItem } from '@chakra-ui/react'
import DrawerProfile from "../ProfileDrawer";


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
                                    <Tab><Link to="/profile">My Profile</Link></Tab>
                                    <Tab><Link to="/post">Create Post</Link></Tab>
                                    <Tab><a href="/" onClick={logout}>Logout</a></Tab>
                                    <Wrap>                                       
                                        <WrapItem>                                                                              
                                            <Avatar/> 
                                        </WrapItem>
                                    </Wrap>
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
