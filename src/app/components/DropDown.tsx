"use client"
// import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    // DropdownMenuPortal,
    DropdownMenuSeparator,
    // DropdownMenuShortcut,
    // DropdownMenuSub,
    // DropdownMenuSubContent,
    // DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import LogoutButton from "./LogoutButton"
import { useContext, useState } from "react";
import { AuthContext } from "../auth-provider";
import Link from "next/link"

export function UserProfileDropdownMenu({ logoutLabel, createLabel }: { logoutLabel: string, createLabel: string }) {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <a>
                    {/* <Button variant="ghost"> */}
                    <UserAvatar></UserAvatar>
                    {/* </Button> */}
                </a>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-max bg-white" align="start">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {/* <Button variant="outline" asChild> */}
                        <Link href="/property/new" onClick={() => setIsOpen(false)}>{createLabel}</Link>
                        {/* </Button> */}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {/* Log out */}
                        <LogoutButton name={logoutLabel}></LogoutButton>
                        {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
