"use client"
import { useContext } from "react";
import { AuthContext } from "../auth-provider";
import { isNullOrEmptyObject } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserAvatar() {
    const { user, isAuthenticated } = useContext(AuthContext);
    console.log(`===>>> UserAvatar`);
    if (user !== null && (!isNullOrEmptyObject(user) || isAuthenticated)) {
        return (
            <div>
                <Avatar>
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
            </div>
        )
    }
    return <></>
}