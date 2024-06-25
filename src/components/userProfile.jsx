import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { auth, database} from "../firebase-config";
import { doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';
import { Box, Heading, FormControl, FormLabel, 
         Input, Button, Card, CardHeader, CardBody, Stack, Flex,
         Select, HStack, useToast } from "@chakra-ui/react";
import myAvatar from "../icons/avatar13.svg"

export const CreateProfile = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [major, setMajor] = useState('');
    const [nickName, setNickName] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      console.log('Button Clicked');
      e.preventDefault();
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const profile = doc(database, 'userProfile', uid);
        const checkExistence = await getDoc(profile);
        
        if (!checkExistence.exists()) {
          try {
            await setDoc(profile, {
              uid: uid,
              lastName: lastName,
              firstName: firstName,
              nickName: nickName,
              Gender: gender,
              Major: major,
              events: []  
            });
            console.log("Document successfully written!");
            
            toast({
              title: "Profile Created.",
              description: "Your profile has been successfully created.",
              status: "success",
              duration: 2000,
              isClosable: true,
              onCloseComplete: () => {
                navigate('/home');
              },
            });

  
          } catch (error) {
            console.error("Error writing document: ", error);
            toast({
              title: "Failed to Create",
              description: "Your are failed to write your profile",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
            await updateDoc(profile, {
              lastName: lastName,
              firstName: firstName,
              nickName: nickName,
              Gender: gender,
              Major: major,
            });

            toast({
              title: "Profile Created.",
              description: "Your profile has been successfully created.",
              status: "success",
              duration: 2000,
              isClosable: true,
              onCloseComplete: () => {
                navigate('/home');
              },
            });
        }
        
        
      }
      
    }

  
   return (
    <Flex 
    height="100vh" 
    alignItems="center" 
    justifyContent="center"
    bg={'#E8D4B8'}
    >
     <Card border={'gray'} borderRadius={20} width={500}>
  <CardHeader>
    <Heading size='md' mt={5} mb={-3} >Show Your Profile to Your Buddies!</Heading>
  </CardHeader>
  <CardBody>
    <Stack>
      <HStack spacing={10}>
      <Box>
        <FormControl isRequired>
        <FormLabel mb='8px' size='xs' textTransform='uppercase'>
          First Name
        </FormLabel>
        <Input 
           bg={'white'}
           color={'black'}
           value={firstName} 
           onChange={(e) => setFirstName(e.target.value)}
           type="text" placeholder="your first name" width={300}/>
        </FormControl>
      </Box>
      <img src={myAvatar} alt="Avatar" width="100" height="100"/>
      </HStack>
      <Box>
        <FormControl isRequired>
        <FormLabel mb='8px' size='xs' textTransform='uppercase'>
          Last Name
        </FormLabel>
        <Input 
           bg={'white'}
           color={'black'}
           value={lastName} 
           onChange={(e) => setLastName(e.target.value)}
           type="text" placeholder="your last name" width={300} />
        </FormControl>
      </Box>     
      <Box >
        <FormControl isRequired>
        <FormLabel mb='8px' size='xs' textTransform='uppercase'>
          Nick Name
        </FormLabel>
        <Input 
           bg={'white'}
           color={'black'}
           value={nickName} 
           onChange={(e) => setNickName(e.target.value)}
           type="text" placeholder="what will be shown to your buddies" width={300}/>
        </FormControl>
      </Box> 
      <Box>
        <FormControl isRequired>
        <FormLabel mb='8px' size='xs' textTransform='uppercase'>
          Major
        </FormLabel>
        <Input 
           isRequired
           bg={'white'}
           color={'black'}
           value={major} 
           onChange={(e) => setMajor(e.target.value)}
           type="text" placeholder="your major" width={300}/>
        </FormControl>
      </Box>
      <Box>
        <FormControl isRequired>
        <FormLabel mb='8px' size='xs' textTransform='uppercase'>
          Gender
        </FormLabel>
        <Select placeholder='Select option' color={'gray'} width={300}
        onChange={(e) => setGender(e.target.value)}>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Unknown'>Unknown</option>
        </Select>
        </FormControl>
      </Box>
      <Button onClick={handleSubmit}
      p={3} mt={5}>Save Your Profile</Button>
    </Stack>
  </CardBody>
</Card>
    </Flex>
  );
};
