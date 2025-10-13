
"use client"
import { Button } from "@/components/ui/button";
import { logout } from "../lib/action";
import { useContext } from "react";
import { AuthContext } from "../auth-provider";
import { isNullOrEmptyObject } from "../lib/utils";
// import { UserResponse } from "../types/LoginResponse";

export default function LogoutButton() {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    function logoutContext() {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        logout();
    }

    console.log(`===>>> user :: ${JSON.stringify(user)}`)
    console.log(`===>>> isAuthenticated :: ${JSON.stringify(isAuthenticated)}`)
    // if(isNullOrEmptyObject(user) || !isAuthenticated) {
    //     return<></>;
    // }

    if (!isNullOrEmptyObject(user) || isAuthenticated) {
        return (
            <Button variant="outline" asChild>
                {/* <form action={logoutContext}> */}
                {/* <form>
                    <button type="submit" onClick={() => { logoutContext() }}>Logout</button>
                </form> */}
                <a onClick={() => { logoutContext() }}>Logout</a>
            </Button>
        )
    }
    return <></>;
}