"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Banner from "@/app/components/Banner";
import WelcomeMessage from "@/app/components/WelcomeMessage";
import Subtitle from "@/app/components/Subtitle";
import Disclaimer from "@/app/components/Disclaimer";

export default function Home() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    async function getUser() {
        const {
            data: { session },
            error
        } = await supabase.auth.getSession();

        if (session?.user) {
            router.replace("/chat");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const redirectURL = () => {
        let url =
            process?.env?.NEXT_PUBLIC_OAUTH_REDIRECT_URL ?? // Manually set in vercel
            process?.env?.NEXT_PUBLIC_SITE_URL ?? // This points to prod url
            "http://localhost:3000"; // local
        // Make sure to include `https://` when not localhost.
        url = url.includes("http") ? url : `https://${url}`;
        // Make sure to including trailing `/`.
        // url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
        return url;
    };

    const signin = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: redirectURL()
            }
        });
    };

    return (
        <div>
            <Banner />
            <WelcomeMessage />
            <Subtitle text={"Your College Journey Guru."} />
            <div className={"grid place-items-center"}>
            <div className="p-6 container max-w-xl h-auto bg-bot-bubble text-black text-base">
                <h1 className={"font-bold pb-2"}>Hi fellow Earnies!</h1>
                <p className={"pb-4"}>
                    Thank you for helping make the EarnestGPT internal prototype
                    better before we launch it live to real customers late this
                    quarter. Your help is invaluable. We need you to ask as many
                    questions as you can and rate the responses (thumbs up or
                    thumbs down). And then we would love to hear your feedback.
                    This EarnestGPT internal-preview-prototype does X (basically
                    say what we would have said on the earnest.com landing page-
                    deadlines and decision questions)
                </p>
                <h1 className={"font-bold pb-2"}>Disclosure</h1>
                <p className={"pb-4"}>
                    Thank you for using EarnestGPT, our new AI enhanced chat
                    tool to help you stay informed about a variety of
                    educational and financial planning topics, beyond even
                    Earnest-specific information! As this tool is brand new and
                    in the experimental stage, we encourage you to verify the
                    information provided. We’d love to hear your feedback and
                    see how we can help you get the most accurate information,
                    efficiently.
                </p>
            </div>
            </div>
            <div className="border-t text-center pt-6 text-black">
                <div className="grid place-items-center p-6">
                    <button
                        className="bg-teal-700 text-white font-semibold hover:bg-teal-800 px-4 py-2 rounded-md"
                        onClick={() => signin()}
                    >
                        Sign in Using Google
                    </button>
                </div>
                <Disclaimer />

            </div>
        </div>
    );
}
