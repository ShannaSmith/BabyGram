import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import './SignupPage.css';

export default function SignUpPage(props) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [state, setState] = useState({
    username:'',
    email:'',
    password:'',
    passwordConf: '',
    bio: ''
  })
  const [selectedFile, setSelectedFile] = useState('');
  async function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData();
    formData.append('photo', selectedFile);
    for(let fieldName in state){
      formData.append(fieldName, state[fieldName])
    }
    try {
      await userService.signup(formData)
      props.handleSignUpOrLogin();
      navigate('/')
    }catch(err){
      console.log(err.message);
      setError(err.message)
    }
  }
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
   <Grid.Column style={{ maxWidth: 450 }}>
   <Header as="h1" color="teal" textAlign="center">Babygram</Header>
   <span> Confidently Share posts of your bundle of joy
        with family and friends.</span>
     <Header as="h2" color="teal" textAlign="center">
       
       <Icon name='signup'></Icon>Sign Up 
     </Header>
     <Form autoComplete="off" onSubmit={handleSubmit}>
       <Segment stacked>
         <Form.Input
           name="username"
           placeholder="username"
           value={state.username}
           onChange={handleChange}
           required
         />
         <Form.Input
           type="email"
           name="email"
           placeholder="email"
           value={state.email}
           onChange={handleChange}
           required
         />
         <Form.Input
           name="password"
           type="password"
           placeholder="password"
           value={state.password}
           onChange={handleChange}
           required
         />
         <Form.Input
           name="passwordConf"
           type="password"
           placeholder="Confirm Password"
           value={state.passwordConf}
           onChange={handleChange}
           required
         />
         {/* <Form.Input
           name="accessCode"
           type="password"
           placeholder="enter access code"
           value={state.accessCode}
           onChange={handleChange}
           required
         /> */}
         <Form.TextArea id="bio"
           label="bio"
           name="bio"
           placeholder="Tell about yourself "
           onChange={handleChange}
         />
         <Form.Field>
         
           <Form.Input 
             type="file"
             name="photo"
             placeholder="upload Avatar"
             onChange={handleFileInput}
           />
         </Form.Field>
         <Button basic color="pink item" type="submit" className="btn">
           Signup
         </Button>
       </Segment>
       {error ? <ErrorMessage error={error} /> : null}
     </Form>
   </Grid.Column>
 </Grid>

   );

}
