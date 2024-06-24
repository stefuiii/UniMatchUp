import React, { useState } from "react"
import { Box, ChakraProvide, ChakraProvider, Flex, HStack, IconButton, Stack } from '@chakra-ui/react'
import {
  Button,
  useDisclosure,
  Heading, Highlight,
  Checkbox, Tooltip
} from '@chakra-ui/react'
import { ShowAll } from "./CreatedEvents"
import { ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import headIcon from "../icons/工作.svg"
import myAvatar from "../icons/avatar13.svg"
import smalldeco from "../icons/页头箭头.svg"
import grabIcon from "../icons/打车场景.svg"
import foodIcon from "../icons/一起吃饭.svg"
import sportIcon from "../icons/体育锻炼.svg"
import groupIcon from "../icons/工作汇报.svg"
import profile from "../icons/人员.svg"

export const Landing = () =>  {
  const [size, setSize] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  
  const handleLogin = () => {
    console.log("Click to login");
    navigate('/login');
  }

  return (
    <ChakraProvider>
    <Flex
    bg={"#FFEFDA"}
    width='100vw'
    height='100vh'
    display="flex"
    flexDirection="column"
    justifyContent="center" 
    alignItems="center"
    alignContent="center"
    >
      <Box 
      width="1200px"
      height="auto"
      justifyContent={'center'}
      alignContent={'center'}
      display={'flex'}
      p={20}
      borderRadius={20}
      bg="rgba(255, 255, 255, 0.4)"
      boxShadow="md">
      <HStack spacing={35}
      position="relative"
      top="-50px"
      marginRight={10}>
      <img src={headIcon} alt="Avatar" width="600" height="600"/>
      <Stack marginInline={0} spacing={5}>
      <img src={smalldeco} alt="Avatar" width="80" height="80"/>
      <Heading lineHeight='tall' whiteSpace ='pre-line'>
        <Highlight
        query='Best-fit'
        styles={{ px: '2', py: '1', rounded: 'full', bg: '#FFBF6A'}}
        >
        {`With UniMatchUp to\nfind your Best-fit Buddies!`}
        </Highlight>
      </Heading>
          <Button onClick={handleLogin} bg={'white'} borderRadius={'10'}>Start Your Journey</Button>
      <Box mt={2}>
        <Tooltip hasArrow bg="white" color="black" label="Please agree to the terms of service" aria-label="A tooltip">
            <Checkbox defaultChecked color={"gray"}>You are agreed with our Terms of Service</Checkbox>
        </Tooltip>
      </Box>
      </Stack>
      </HStack>
      </Box>
    </Flex>
    </ChakraProvider>
  )
}