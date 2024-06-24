import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import { Box, 
         Heading, 
         FormControl, 
         FormLabel, 
         Input, 
         Button } from "@chakra-ui/react";


export const Login = (props) => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
            alert('Login successfull!');
            navigate('/home');
          })
          .catch((error) => {
            console.log(error);
            setError(true);
            alert('Login failed. Please try again.');
          });
    };

    const handleRegisterClick = () => {
        console.log('Button clicked!'); 
        props.onFormSwitch('register');
        navigate('/register');
    };

    return (
        <Box className="auth-form-container" 
        p={10} 
        borderWidth={3} 
        borderRadius="20px"
        width={400}>
            <Heading as="h1" mb={4}>Login</Heading>
        <form className="login-form" action="" onSubmit={handleSubmit}>
          <FormControl id="email" mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              bg={'white'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="yourname@email.com"
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
          <Button className="login-btn" type="submit" colorScheme="blue" w="full" mb={4}>
            <strong>Log In</strong>
          </Button>
        </form>
        <Button className="link-btn" onClick={handleRegisterClick} colorScheme="teal" variant="link" w="full">
          Don't have an account? Register here!
        </Button>
      </Box>
    );
}


/*
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email);

        try {
            const response = await fetch('http://localhost:9091/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, pass})
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            setEmail('');
            setPass('');

            alert('Login successfull!');
            navigate('/post');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }

        
    }
    


    const handleRegisterClick = () => {
        console.log('Button clicked!'); // 添加这行来检查点击事件是否被触发
        props.onFormSwitch('register');
        navigate('/register');
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
          <form className="login-form" action="" onSubmit={handleSubmit}>
              <label htmlFor="email">NUS Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder = "nusnetid@u.nus.edu" id = "email" name = "email" /> 
              <label htmlFor="password">Password</label>
              <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />  
              <button className="login-dic" type="submit"><strong>Log In</strong></button>
          </form>
          <button className="link-btn" onClick={handleRegisterClick}>Don't have an account? Register here!</button>
        </div>
    );
}
    */