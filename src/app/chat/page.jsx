"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import TypingAnimation from "../components/TypingAnimation";
import purpleTick from "../../../public/purpleTick.svg";
import ChatBubble from "../components/ChatBubble";
import Banner from "@/app/components/Banner";
import WelcomeMessage from "@/app/components/WelcomeMessage";
import Subtitle from "@/app/components/Subtitle";
import Disclaimer from "@/app/components/Disclaimer";

const modelURL = process.env.NEXT_PUBLIC_MODEL_URL;

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = (message) => {
        const headers = {
            "Content-type": "application/json",
        };
        const data = {
            messages: [...chatLog, {role:"user", content:message}]
        };
        setIsLoading(true);
        axios.post(`https://earnestgpt-llm.vercel.app/earnestgpt2`, data, headers)
        //axios.get(`https://a279-2603-7000-9c00-6348-ed12-8570-48a1-8b45.ngrok-free.app/earnestgpt/${message}`)
            .then((response) => {
                console.log({ response });
                setChatLog((prevChatLog) => [
                    ...prevChatLog,
                    {
                        role: "bot",
                        //message: response.data
                        message: response.data.answer
                    }
                ]);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setChatLog((prevChatLog) => [...prevChatLog, {
            role: "user",
            message: inputValue
        }]);
        sendMessage(inputValue);
        setInputValue("");
    };

    return (
        <div className={"flex flex-col h-full decoration-clone bg-white"}>
            <Banner />
            <div className={"flex-grow p-4"}>
                <div className={"flex flex-col space-y-4"}>
                    <div className={"p-4"}>
                        <WelcomeMessage />
                        <Subtitle
                            text={"I can share insights on the following Topics:"} />
                        <div className={"text-center text-purple-800"}>
                            <div className={"inline-flex items-baseline "}>
                                <h1 className={"flex items-center py-2 font-bold text-base"}>
                                    <Image src={purpleTick}
                                           className={"self-center"} alt={""} />
                                    Deadlines
                                </h1>
                            </div>
                            <h1 className={"text-sm font-medium"}>Example: When
                                is the fasfa due?</h1>
                            <div className={"inline-flex items-baseline"}>
                                <h1 className={"flex items-center py-2 font-bold text-base"}>
                                    <Image src={purpleTick}
                                           className={"self-center"} alt={""} />
                                    Definitions
                                </h1>
                            </div>
                            <h1 className={"text-sm font-medium"}>Example: What
                                is refinancing?</h1>
                        </div>
                    </div>
                    {chatLog.map((message, index) => (
                        <ChatBubble index={index} message={message} />
                    ))}
                    {isLoading && (
                        <div key={chatLog.length}
                             className={"flex justify-start"}>
                            <div
                                className={"bg-gray-200 rounded-lg p-4 max-w-sm"}>
                                <TypingAnimation />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit}
                  className={"flex-none p-4 shadow-inner"}>
                <div className={"p-4 text-center"}>
                    <button
                        type={"button"}
                        onClick={() => window.open("https://forms.gle/nSSEa9WW4rtyNZrTA")}
                        className={"bg-transparent rounded px-4 py-2 text-sm text-earnest-green font-semibold border border-earnest-green-light"
                        }>
                        Give us feedback

                    </button>
                </div>
                <div
                    className={"text-black flex rounded-md border border-gray-300 bg-white"}>
                    <input
                        className={
                            "flex-grow px-4 py-2 bg-transparent focus:outline:none border-transparent focus:border-transparent focus:ring-0"
                        }
                        type="text"
                        placeholder={"Ask me a question"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        className={
                            "p-4 bg-transparent rounded-lg px-4 py-2 focus:outline-none"
                        }
                        type={"submit"}
                    >
                        <svg width="35" height="35" viewBox="0 0 35 35"
                             fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.0834 2.91663L16.0417 18.9583"
                                  stroke="#00AD69" strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round" />
                            <path
                                d="M32.0834 2.91663L21.8751 32.0833L16.0417 18.9583L2.91675 13.125L32.0834 2.91663Z"
                                stroke="#00AD69" strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div>
                    <Disclaimer />
                </div>
            </form>
        </div>
    );
}
