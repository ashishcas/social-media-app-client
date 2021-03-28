import React, { useState, useContext } from 'react';
import {Form , Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/auth';

const LOGIN_USER = gql`
    mutation login(
        $username: String,
        $email: String,
        $password: String!
    ){
        login(
                username: $username,
                email: $email,
                password: $password
        ){
            id, 
            email ,
            createdAt , token, username
        }
    }
`;

function Login(props){

    const context = useContext(AuthContext);
    const [fields , setFields] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [ errors , setErrors ] = useState('');

    const handleChange =(event) => {
        setFields({...fields,[event.target.name]: event.target.value})
    };

    const [addUser, { loading }] = useMutation(LOGIN_USER,{
        update(proxy, result){
            context.login(result.data.login);
            props.history.push('/');
        },
        onError(err){
            setErrors(err?.graphQLErrors[0]?.extensions?.exception.errors)
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
                <h1>Login</h1>
                <Form.Input
                label='Username' 
                placeholder='Username'
                name='username'
                value={fields.username}
                onChange={handleChange}
                error={errors.username ? true : false}
                type='text' 
                />
                <h3>OR</h3>
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
                <Button type="submit" primary fluid>
                    Submit
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

export default Login;