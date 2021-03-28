import React , { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import { decode } from 'jsonwebtoken';

const intialState = {
     user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
    if(decodedToken.exp *1000 < Date.now()){
        localStorage.removeItem('jwtToken');
    } else {
        intialState.user = decodedToken
    }

}


const AuthContext = createContext({
    user: null,
    login: (data) => {},
    logout: () => {}
})

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}

const  AuthProvider = ( props) => {
    const [state, dispatch] = useReducer(authReducer,intialState);

    function login(data){
        localStorage.setItem('jwtToken', data.token);
        dispatch({
            type: 'LOGIN',
            payload: data
        })
    }

    function logout(){
        localStorage.removeItem('jwtToken');
         dispatch({type: 'LOGOUT'})
    }

    return(
        <AuthContext.Provider 
            value={{
                user: state?.user,
                login,
                logout
            }}
            {...props}
        />
    )
};

export { AuthContext, AuthProvider};