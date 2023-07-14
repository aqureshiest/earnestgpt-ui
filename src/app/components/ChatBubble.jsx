const ChatBubble = ({index, message}) => {

    const handleOnClickThumbsUp = () => {
        // TODO INTEGRATE API CALL TO MODEL
        console.log('I liked it!')
    }

    const handleOnClickThumbsDown = () => {
        // TODO INTEGRATE API CALL TO MODEL
        console.log('I disliked it!')
    }

    if (message.role === "user"){
        return (
            <div key={index} className={"flex justify-end"}>
                <div className={"bg-user-bubble text-white rounded-lg p-4 max-w-sm text-sm"}>
                    {message.message}
                </div>
            </div>
        )
    } else {
        return (
            <div>
            <div key={index} className={"flex justify-start"}>
                <div className={"bg-bot-bubble text-black rounded-lg p-4 max-w-sm text-sm"}>
                    {message.message}
                    <div>
                    <button className={"pr-2 pt-2"} onClick={handleOnClickThumbsUp}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="like v2">
                                <path id="thumbs up" d="M6.08062 9.99963L10.1451 0.999634C10.9536 0.999634 11.729 1.3157 12.3006 1.87831C12.8723 2.44092 13.1935 3.20398 13.1935 3.99963V7.99963H18.9447C19.2393 7.99635 19.5311 8.05614 19.7999 8.17485C20.0687 8.29357 20.308 8.46837 20.5013 8.68715C20.6946 8.90593 20.8373 9.16346 20.9194 9.44188C21.0016 9.72031 21.0212 10.013 20.977 10.2996L19.5747 19.2996C19.5012 19.7765 19.2551 20.2112 18.8816 20.5236C18.5082 20.836 18.0326 21.0051 17.5425 20.9996H6.08062M6.08062 9.99963V20.9996M6.08062 9.99963H3.03225C2.49326 9.99963 1.97635 10.2103 1.59523 10.5854C1.21411 10.9605 1 11.4692 1 11.9996V18.9996C1 19.5301 1.21411 20.0388 1.59523 20.4138C1.97635 20.7889 2.49326 20.9996 3.03225 20.9996H6.08062" stroke="#7700CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </button>
                    <button onClick={handleOnClickThumbsDown}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="dislike v2">
                                <path id="thumbs down" d="M15.9194 12L11.8549 21C11.0464 21 10.271 20.6839 9.69936 20.1213C9.12768 19.5587 8.80652 18.7956 8.80652 18V14H3.05526C2.76068 14.0033 2.46889 13.9435 2.20012 13.8248C1.93135 13.7061 1.69201 13.5313 1.4987 13.3125C1.30539 13.0937 1.16272 12.8362 1.08059 12.5577C0.998449 12.2793 0.978804 11.9866 1.02301 11.7L2.42526 2.7C2.49875 2.22309 2.7449 1.78839 3.11836 1.47599C3.49181 1.16359 3.9674 0.994543 4.45751 0.999995H15.9194M15.9194 12V0.999995M15.9194 12H18.6324C19.2075 12.01 19.7663 11.8119 20.2028 11.4432C20.6392 11.0745 20.9229 10.5609 21 10V3C20.9229 2.43905 20.6392 1.9255 20.2028 1.55681C19.7663 1.18813 19.2075 0.989986 18.6324 0.999995H15.9194" stroke="#7700CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </button>
                    </div>
                </div>

            </div>

            </div>
        )
    }
}

export default ChatBubble
