import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext.jsx";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user && !loading) {
                const docRef = doc(db, 'users', user.uid)
                const userDoc = await getDoc(docRef);
                if (userDoc.exists()) {
                    const user = userDoc.data();
                    setUser(user)
                    setLoading(false)
                } else {
                    setUser(null)
                    setLoading(false)
                }
            } else {
                setUser(null);
                setLoading(false)
            }
            setInitialLoading(false)

        })
        return () => unsubscribe();
    }, [loading])


    const loginWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error(error)
        }
    }

    const signUpWithEmail = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential
        } catch (error) {
            throw new Error(error)
        }
    }

    const logOut = async () => {
        await signOut(auth)
        console.log('signout');
        
    }

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, loginWithEmail, signUpWithEmail, initialLoading, logOut }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider