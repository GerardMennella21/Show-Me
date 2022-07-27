import React, { useDisclosure }  from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
  } from '@chakra-ui/react'


  function DrawerProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <div>    
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='bottom'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
         
        </Drawer>
      </div>
    )
  }

  export default DrawerProfile;