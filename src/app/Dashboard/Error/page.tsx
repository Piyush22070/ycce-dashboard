"use client"
import { useSession } from "next-auth/react"
export default function Error(){
    const { data: session } = useSession()
    return <div>
        {session?.user?.email}
        error
        </div>
}