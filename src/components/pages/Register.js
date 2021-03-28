import React, { useState, useContext} from 'react';
import {Form , Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/auth';



const REGISTER_USER = gql`
    mutation register(
        $username: String!,
        $email: String!,
        $password: String!,
        $confirmPassword: String!,
    ){
        register(
            registerInput:{
                username: $username,
                email: $email,
                password: $password,
                confirmPassword: $confirmPassword,
            }
        ){
            id, email , createdAt , token
        }
    }
`;

function Register(props){

    const [fields , setFields] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const context = useContext(AuthContext);


    const [ errors , setErrors ] = useState('');

    const handleChange =(event) => {
        setFields({...fields,[event.target.name]: event.target.value})
    };

    const [addUser, { loading }] = useMutation(REGISTER_USER,{
        update(proxy, { data : { register}}){
            context.login(register);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables:fields
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        addUser();
    }

    return(
        <div class="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading': ''}>
                <h1>Register</h1>
                <Form.Input
                label='Username' 
                placeholder='Username'
                name='username'
                value={fields.username}
                onChange={handleChange}
                error={errors.username ? true : false}
                type='text' 
                />
                <Form.Input 
                label='email' 
                placeholder='email'
                name='email'
                value={fields.email}
                error={errors.email ? true : false}
                onChange={handleChange}
                type='text' 
                />
                <Form.Input 
                label='password' 
                placeholder='password'
                name='password'
                value={fields.password}
                onChange={handleChange}
                error={errors.password ? true : false}
                type='password' 
                />
                <Form.Input 
                label='Confirm Password' 
                placeholder='ConfirmPassword'
                name='confirmPassword'
                value={fields.confirmPassword}
                error={errors.confirmPassword ? true : false}
                onChange={handleChange}
                type='password' 
                />
                <Button type="submit" primary fluid>
                    Register
                </Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {
                                Object.values(errors).map((value) => (
                                    <li key={value}>{value}</li>
                                ))
                            }

                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Register;