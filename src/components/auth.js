import { useState } from "react";
import { auth, googleAuthProvider } from "../config/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //console.log(auth?.currentUser?.email);

    const signIn = async () =>{
        await createUserWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = async () =>{
        await signInWithPopup(auth, googleAuthProvider);
    }
    const logout = async () =>{
        await signOut(auth);
    }

    return (
        <div>
            <h1>Welcome {auth?.currentUser?.displayName}</h1>
            <img src={auth?.currentUser?.photoURL}></img>
            <input placeholder="Email..." onChange={(e)=> setEmail(e.target.value)}></input>
            <input placeholder="Password..." onChange={(e)=> setPassword(e.target.value)} type="password"></input>
            <button onClick={()=> signIn()}>Sign in</button> <br></br>
            <button onClick={()=> signInWithGoogle()}>Sign in with google</button>
            <button onClick={()=> logout()}>Logout</button>
        </div>
    );
}