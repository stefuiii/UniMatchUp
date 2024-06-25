import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, database} from "../firebase-config";
import { doc, setDoc, addDoc, collection} from 'firebase/firestore';
import { Box, 
         Heading, 
         FormControl, 
         FormLabel, 
         Input, 
         Button,
         Card, CardHeader, CardBody, CardFooter, Divider, Stack, Text, Flex, StackDivider,
         Select, 
         HStack} from "@chakra-ui/react";
import myAvatar from "../icons/avatar13.svg"

export const CreateProfile = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [major, setMajor] = useState('');
    const [hobby, setHobby] = useState([]);
    const [joined, setJoined] = useState([]);
    const [nickName, setNickName] = useState('');

    const handleSubmit = async(e) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const profile = doc(database, 'userProfile', uid);
        try {
          await setDoc(profile, {
            uid: uid,
            lastName: lastName,
            firstName: firstName,
            Hobbbies: hobby,
            Gender: gender,
            Major: major   
          });
          console.log("Document successfully written!");
          

        } catch (error) {
          console.error("Error writing document: ", error);
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
     <Card>
  <CardHeader>
    <Heading size='md'>Show Your Profile to Your Buddies!</Heading>
  </CardHeader>
  <CardBody>
    <HStack>
    <Stack divider={<StackDivider />} spacing='2'>
      <Box p={3}>
        <Heading mb='8px' size='xs' textTransform='uppercase'>
          First Name
        </Heading>
        <Input 
           isRequired
           bg={'white'}
           color={'black'}
           value={firstName} 
           onChange={(e) => setFirstName(e.target.value)}
           type="text" placeholder="your first name" width={300}/>
      </Box>
      <Box p={3}>
        <Heading mb='8px' size='xs' textTransform='uppercase'>
          Last Name
        </Heading>
        <Input 
           isRequired
           bg={'white'}
           color={'black'}
           value={firstName} 
           onChange={(e) => setFirstName(e.target.value)}
           type="text" placeholder="your last name" width={300} />
      </Box>      
      <Box p={3}>
        <Heading mb='8px' size='xs' textTransform='uppercase'>
          Major
        </Heading>
        <Input 
           isRequired
           bg={'white'}
           color={'black'}
           value={firstName} 
           onChange={(e) => setFirstName(e.target.value)}
           type="text" placeholder="your major" width={300}/>
      </Box>
      <Box p={3}>
        <Heading mb='8px' size='xs' textTransform='uppercase'>
          Gender
        </Heading>
        <Select placeholder='Select option' color={'gray'}>
          <option value='option1'>Male</option>
          <option value='option2'>Female</option>
          <option value='option3'>Unknown</option>
        </Select>
      </Box>
      <Box p={3}>
        <Heading mb='8px' size='xs' textTransform='uppercase'>
          Hobbies
        </Heading>
        <Select placeholder='Select option' color={'gray'}>
          <option value='option1'>Male</option>
          <option value='option2'>Female</option>
          <option value='option3'>Unknown</option>
        </Select>
      </Box>
    </Stack>
    <img src={myAvatar} alt="Avatar" width="100" height="100" justifyContent={'top'}/>
    </HStack>
  </CardBody>
</Card>
    </Flex>
  );
};
