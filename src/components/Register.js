import React, { useState } from 'react';
import styled from 'styled-components'
// import ReactDOM from 'react-dom';


// const StyledForm = styled.div` 
//   border: 2px solid black;
//   background-color: pink;
// `

// const StyledInputs = styled.div`
//   display: flex;
//   flex-direction; column
//   justify-content: center;
//   margin: 0px auto;


const Register = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('');


  return (
     <div>
       <form>
        <label htmlFor='registerInput'>Register here:</label>
          <input
           onChange={event => {
            setFname(event.target.value)
        }}
            name='fname'
            type='text' 
            // value={values.text}
            placeholder='First name'
           /><br />

           <input
            onChange={event => {
             setLname(event.target.value)
            }}
             name='lname'
             type='text'
            //  value={values.text}
             placeholder='Last name'
            /><br />

           <input
            onChange={event => {
             setEmail(event.target.value)
           }}
             email='email'
             type='text'
            //  value={values.text}
             placeholder='Email address'
           /><br />

          <label htmlFor='userInput'>Choose one:
          <select onChange={event => {
              setUserRole(event.target.value);
          }}> 
             <option>I am a student.</option>
             <option>I am an instructor.</option> 
             </select>
          </label>
          <input type='submit' />
      </form>
     </div>
  );
}

export default Register
