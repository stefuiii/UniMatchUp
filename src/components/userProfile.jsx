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
         Button } from "@chakra-ui/react";

export const createProfile = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [major, setMajor] = useState('');
    const [hobby, setHobby] = useState([]);
    const [skill, setSkill] = useState([]);
    const [grabPost, setGrabPost] = useState([]);
    const [foodPost, setFoodPost] = useState([]);
    const [sportPost, setSportPost] = useState([]);
    const [tutPost, setTutPost] = useState([]);
    const toast = useToast();

    const handleSubmit = async(e) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        try {
          await addDoc(collection(database, "foodPost"), {
            uid: uid,
            Title: title,
            Description: description,
            Location: location,
            Date: date.toISOString(),
            Number: parseFloat(number),
            Menu: menu
          });
          console.log("Document successfully written!");
          
          toast({
            title: "Post created.",
            description: "Your post has been successfully created.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
  
          setTitle('');
          setDescription('');
          setLocation('');
          setDate('');
          setNumber(0);
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
    >
     <Container width={400}
     backdropBlur={'true'}
     backgroundColor={'lightgray'}
     alignContent={'center'}
     justifyContent="center"
     display={'flex'}
     flexDirection={'column'}
     bg='bisque' 
     color='white' 
     border ='2px solid'
     borderRadius={'20px'}
     p={0}>
      
       <Box
         bg="#F4A460"
         width={396}
         color="white"
         p={0}
         padding={4}
         borderTopRadius="20px"
         textAlign="center"
         alignItems= "center"
       >
         <Text fontSize="2xl" fontWeight="bold">Discover More Food</Text>
       </Box>

      <Box maxWidth="1000px" 
           mx="auto" 
           mt="auto" 
           alignItems= 'center'
           alignContent= "center"
           p={8}
           display= "flex"
           color={'gray'}
           flexDirection={'column'}>
       <form style={{ marginTop: '0px' }} onSubmit={handleSubmit}>
         <FormControl id="title" mb="3" isRequired>
           <FormLabel mb={'0'}>Title</FormLabel>
           <Input 
           bg={'white'}
           value={title} 
           onChange={(e) => setTitle(e.target.value)}
           type="text" placeholder="Event Title" width={320}/>
         </FormControl>

         <FormControl id="description" mb="3" isRequired>
           <FormLabel mb={'0'}>Description</FormLabel>
           <Textarea value={description} 
           bg={'white'}
           onChange={(e) => setDescription(e.target.value)}
           placeholder="Type the event description here." 
           width={320}
           height={100}/>
         </FormControl>

        <FormControl id="location" mb="3" isRequired>
          <FormLabel mb={'0'}>Place to Take Your Food</FormLabel>
          <Input value={location}
          bg={'white'}
          onChange={(e) => setLocation(e.target.value)}
          type="text" placeholder="Location" width={320}/>
        </FormControl>

        <Box display="flex" justifyContent="space-between" mb="-2" width="340px">
          <FormControl 
          id="date" 
          mb="3" 
          width="180px"
          isRequired>
            <FormLabel mb={'0'}>Date and Time</FormLabel>
            <DatePicker
              popperPlacement="bottom-end"
              width='300px'
              selected={date}
              onChange={(date) => setDate(date)}
              showTimeSelect
              dateFormat="Pp"
              customInput={<Input bg="white" color="black"/>}
            />
          </FormControl>

          <FormControl 
          id="number" 
          mb="5" 
          width="120px"
          justifyContent="flex-end" isRequired>
            <FormLabel mb={'0'}>Number</FormLabel>
            <NumberInput
              color={'black'}
              value={number}
              onChange={(value) => setNumber(value)}
              min={0}
              max={100}
              maxW={100}
              maxH={50}
            >
            <NumberInputField bg="white"/>
              <NumberInputStepper sx={{ transform: 'scale(0.75)' }}>
              <NumberIncrementStepper color={'gray'} />
              <NumberDecrementStepper color={'gray'} />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        </Box>
        <FormControl id="find" mb="3" isRequired>
          <FormLabel  mb={'0'} mt={'0'}>View the Menu
          <Input 
           bg={'white'}
           value={menu} 
           onChange={(e) => setMenu(e.target.value)}
           type="text" placeholder="Copy the menu URL here" width={320}/>
          </FormLabel>
        </FormControl>
        <Box display="flex" 
          justifyContent={'flex-end'}
          width="100%" 
          color={'black'}
          mt={0}>
        <Button
        mr={5}
        colorScheme='black' 
        bg={'white'}
        variant='outline' 
        type="submit"
        size='sm'
        height='48px'
        width='150px'
        border='2px'
        borderColor='green.500'
        padding={'0.8rem'} borderRadius={'20px'} w={'200px'} 
        alignItems={'center'}
        mb={3}
        >Find Your Buddies!</Button>
        </Box>
        
      </form>
      </Box>
    </Container>
    </Flex>
  );
};
