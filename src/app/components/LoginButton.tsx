"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthContext } from "../auth-provider";
import { useContext } from "react";
import { isNullOrEmptyObject } from "../lib/utils";

export default function LoginButton() {
    const { user, isAuthenticated } = useContext(AuthContext);
    console.log("===>>> LoginButton")
    console.log(`===>>> user :: ${JSON.stringify(user)}`);
    console.log(`===>>> isAuthenticated :: ${isAuthenticated}`);

    // if(!isNullOrEmptyObject(user) || isAuthenticated) {
    //     return<></>;
    // }

    if (isNullOrEmptyObject(user) || !isAuthenticated) {
        return (
            <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
            </Button>
        )
    }
    return <></>;
}