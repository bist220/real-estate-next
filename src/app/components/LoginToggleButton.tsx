"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

// TODO delete later
export default function LoginToggleButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        console.log("===>>> useEffect");
        // async function fetchProperty() {
        // try {
        // const res = await fetch(`/api/properties/${id}`);
        // if (!res.ok) throw new Error('Failed to fetch property');
        // const data = await res.json();
        // setProperty(data);

        // Determine ownership via token
        const token = document.cookie
            .split('; ')
            .find(r => r.startsWith('token='))
            ?.split('=')[1];
        console.log(`===>>> token :: ${JSON.stringify(token)}`);

        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log(`===>>> payload :: ${JSON.stringify(payload)}`);
            if (payload.userId) {
                // setIsOwner(true);
                console.log(`===>>> payload.userId :: ${JSON.stringify(payload.userId)}`);
                setIsLoggedIn(true);
            }
        } else {
            setIsLoggedIn(false);
        }
        // } catch (err: any) {
        //     setError(err.message || 'Something went wrong');
        // } finally {
        //     setLoading(false);
        // }
        // }

        // if (id) fetchProperty();
    }, []);

    if (isLoggedIn) {
        return (
            <Button variant="outline" asChild>
                <Link href="/logout">Logout</Link>
            </Button>
        );
    } else {
        <Button variant="outline" asChild>
            <Link href="/login">Login new</Link>
        </Button>
    }
}