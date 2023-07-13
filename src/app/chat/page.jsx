"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import TypingAnimation from "../components/TypingAnimation";
import earnestIcon from "../../../public/logo.svg";
import sendIcon from "../../../public/send.svg";
import purpleTick from "../../../public/purpleTick.svg";

const modelURL = process.env.NEXT_PUBLIC_MODEL_URL;

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = (message) => {
        const headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MODEL_API_KEY}`
        };
        const data = {
            model: "gpt-3.5-turbo-0301",
            messages: [{ role: "user", content: message }]
        };

        setIsLoading(true);

        axios
            .post(modelURL, data, { headers })
            .then((response) => {
                console.log({ response });
                setChatLog((prevChatLog) => [
                    ...prevChatLog,
                    {
                        type: "bot",
                        message: response.data.choices[0].message.content
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
            type: "user",
            message: inputValue
        }]);
        sendMessage(inputValue);
        setInputValue("");
    };

    return (
        <div className={"flex flex-col h-full decoration-clone bg-white"}>
            <div className={"p-5 shadow-md"}>
                <Image priority src={earnestIcon} alt={"EarnestGPT"} />
            </div>
            <div className={"flex-grow p-6"}>
                <div className={"flex flex-col space-y-4"}>
                    <div>
                        <h1 className={"text-black text-center font-bold text-2xl"}> Welcome
                            to EarnestGPT</h1>
                        <h1 className={"text-gray-500 font-bold text-center text-lg py-2"}> I
                            can share insights on the following Topics:</h1>
                        <div className={"text-center text-purple-800"}>
                            <div className={"inline-flex items-baseline "}>
                                <h1 className={"flex items-center py-2 font-bold text-base"}>
                                    <Image src={purpleTick} className={"self-center"}/>
                                    Deadlines
                                </h1>
                            </div>
                            <h1 className={"text-sm font-medium"}>Example: When is the fasfa due?</h1>
                            <div className={"inline-flex items-baseline"}>
                                <h1 className={"flex items-center py-2 font-bold text-base"}>
                                    <Image src={purpleTick} className={"self-center"}/>
                                    Definitions
                                </h1>
                            </div>
                            <h1 className={"text-sm font-medium"}>Example: What is refinancing?</h1>
                        </div>
                    </div>
                    {chatLog.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.type === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`${
                                    message.type === "user" ? "bg-user-bubble text-white" : "bg-bot-bubble text-black"
                                } rounded-lg p-4 max-w-sm text-sm`}
                            >
                                {message.message}
                            </div>
                        </div>
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
                        onClick={()=> window.open("https://forms.gle/nSSEa9WW4rtyNZrTA")}
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
                                  stroke="#00AD69" stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round" />
                            <path
                                d="M32.0834 2.91663L21.8751 32.0833L16.0417 18.9583L2.91675 13.125L32.0834 2.91663Z"
                                stroke="#00AD69" stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div>
                    <h4 className={"text-xs py-3 text-black"}>Disclaimer:
                        EarnestGPT's advice is meant to inspire and guide you
                        but should not replace personalized guidance from
                        academic advisors, or professional.</h4>
                </div>
            </form>
        </div>
    );
}
