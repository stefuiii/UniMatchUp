import React, { Component, useEffect, useState } from "react";
//import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "../firebase-config.js";
import { collection, addDoc, doc, setDoc, getDoc, getDocs, orderBy, query} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { Box, Heading, FormControl, FormLabel, Button, 
         Stack, Text, Divider, ButtonGroup,
         HStack, PostCard, 
         InputGroup,
         InputLeftElement,
         ChakraProvider,
         Input, Flex } from "@chakra-ui/react";
import { CalendarIcon, InfoIcon, SearchIcon, PhoneIcon } from "@chakra-ui/icons";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import "../format/oneLineDescription.css"
import postAvatar from "../icons/avatar13.svg"
import grabHeading from "../icons/打车场景.svg"

const ShowPosts = ({post}) => {
    const date = post.Date.toDate().toLocaleString();
    return (
    <Card maxW='sm' width="300px" height="280px" justifyContent={'center'}>
      <CardBody>
        <Stack mt='2' spacing='3'>
          <HStack spacing={100}>
            <Heading size='md'>{post.Title}</Heading>
            <img src={postAvatar} alt="Avatar" width="50" height="50"/>
          </HStack>
          <Text className="one-line-description" fontSize="sm">
            {post.Description}
          </Text>
      </Stack>
      <HStack mt={'4'} spacing={'3'}>
        <CalendarIcon boxSize={4} color={"gray.600"}/>
        <Text fontSize="sm">{date}</Text>
      </HStack>
      <HStack mt={'3'} spacing={'3'}>
        <InfoIcon boxSize={4} color={"gray.600"}/>
        <Text fontSize="sm">{post.Location}</Text>
      </HStack>
      </CardBody>
      <CardFooter style={{ marginTop: '-20px' }}
        justifyContent={'left'} mt={'0'}>
        <ButtonGroup spacing='4' justifyContent={'flex-start'}>
          <Button variant='solid' colorScheme='blue' fontSize="xs">
            Join Us(1/6)
          </Button>
          <Button variant='ghost' colorScheme='blue' fontSize="xs">
            View Event Details
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
    );
    

}

export const ShowGrab = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const postsPerPage = 4;

    useEffect (() => {
        const fetchPosts = async () => {
            const postsCollection = query(collection(database, "postInfo"), orderBy("Date", "asc"));
            const querySnapshot = await getDocs(postsCollection);
            const postsData = querySnapshot.docs.map(doc => doc.data());
            setPosts(postsData);
        };
        fetchPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const filteredPosts = posts.filter(post => 
      post.Title.toLowerCase().includes(search.toLowerCase())
    );
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handleNextPage = () => {
      if (currentPage < Math.ceil(posts.length / postsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

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
          p={10}>
          <Box 
            style={{ display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column', 
            marginTop: '100px',
            gap: '20px', height: '80vh' }}>
            <Box mt={-10}>
              <img src={grabHeading} alt="Avatar" width="200" height="80"/>
            </Box>
            <HStack spacing={'4'}>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon marginTop={'3'}color='gray.300' />
              </InputLeftElement>
              <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
              width={'600px'}
              borderRadius={'15'}
              bg={"white"}
              placeholder='Search for Your Buddies' />
            </InputGroup>
            </HStack>
          <HStack marginTop={5} spacing={4} overflowX="auto">
            {currentPosts.map((post, index) => (
            <ShowPosts key={index} post={post} />
            ))}
          </HStack>
          <Box style={{ display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column',
            marginTop: '30px'}}>
          <ButtonGroup spacing='4'>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
            Next
          </Button>
        </ButtonGroup>
          </Box>
          </Box>
          </Flex>
        </ChakraProvider>
    );
}
