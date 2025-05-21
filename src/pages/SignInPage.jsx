import { useState, useContext } from "react";
import { AccountContext } from "../context/Account";
import { getUsers } from "../utils/api";
import Header from "../components/Header";

function SignInPage() {
    const { loggedUser, setLoggedUser } = useContext(AccountContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    
    function handleSubmit(event){
        event.preventDefault()
        const loginForm = new FormData(event.target);
        const usernameFromInput = loginForm.get("username-from-input"); 

        if(usernameFromInput) {
            setIsLoading(true)
            getUsers()
                .then((users) => {
                    return users.find((user)=>{
                        return user.username === usernameFromInput
                    })
                })
                .then((user) => {
                    if(!user) {
                        setLoggedUser(null)
                    } else (
                        setLoggedUser(user.username)
                    )
                })
                .catch(()=>{
                    setError(true)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    function handleClick(){
        setLoggedUser("");
    }

    if(error) {
        return <Error error ={error} />
    }
    if(isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <>
        <Header />
        {!loggedUser ? (
            <form className="input-form" onSubmit={handleSubmit}>
                <label>Enter you username:</label>
                <input name="username-from-input" type="text"></input>
                <input type="submit" id="username-input" value="Sign in"></input>
            </form>
        ) : (
            <div>
                <p>Signed in as {loggedUser}!</p>
                <button onClick={handleClick}>Sign out</button>
            </div>
        )}
        </>
    )
}

export default SignInPage