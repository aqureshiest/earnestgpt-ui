"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    async function getUser() {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (session?.user) {
            router.replace("/chat");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const signin = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    return (
        <div>
            <div className="container mx-auto h-96">
                <div className="grid h-full place-items-center">
                    <button
                        className="bg-teal-700 text-white font-semibold hover:bg-teal-800 px-4 py-2 rounded-md"
                        onClick={() => signin()}
                    >
                        Sign in Using Google
                    </button>
                </div>
            </div>
            <div className="border-t text-center pt-10">Disclaimer Area</div>
        </div>
    );
}
