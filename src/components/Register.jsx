import React, { Component, useState } from "react";
//import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config.js";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { Box, 
    Heading, 
    FormControl, 
    FormLabel, 
    Input, 
    Button } from "@chakra-ui/react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
         createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const currentUser = userCredential.user;
          alert('Register successfull!');
          navigate('/login');
        });
    }

    const handleLoginClick = () => {
        console.log('Button clicked!'); // 添加这行来检查点击事件是否被触发
        props.onFormSwitch('login');
        navigate('/login');
    }
    
    
    return (
        <Box className="auth-form-container" 
        p={10} 
        borderWidth={3} 
        borderRadius="20px"
        width={400}>
        <Heading as="h2" mb={5}>Register</Heading>
        <form className="register-form" action="" onSubmit={handleSubmit}>
          <FormControl id="name" mb={4} isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              bg={'white'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
            />
          </FormControl>
          <FormControl id="email" mb={4} isRequired>
            <FormLabel>Your Email</FormLabel>
            <Input
              bg={'white'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="youremail@email.com"
              name="email"
            />
          </FormControl>
          <FormControl id="password" mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              bg={'white'}
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="********"
              name="password"
            />
          </FormControl>
          <Button className="register-btn" type="submit" colorScheme="blue" w="full" mb={4}>
            <strong>Register</strong>
          </Button>
        </form>
        <Button className="link-btn" onClick={handleLoginClick} colorScheme="teal" variant="link" w="full">
          Already have an account? Login here!
        </Button>
      </Box>
    );

}