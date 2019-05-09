import React from 'react'
import NavBar from './navbar';
import UserForm from './userForm';


const App = (props) => {
    return (
        <div className='container'>
            <NavBar />
            <UserForm />
        </div>
    )
}

export default App;