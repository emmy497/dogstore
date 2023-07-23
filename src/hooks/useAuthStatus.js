import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(true)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    })
  return {loggedIn, checkingStatus}
  
}
