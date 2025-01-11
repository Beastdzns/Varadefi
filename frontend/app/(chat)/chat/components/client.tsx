"use client"
import ChatHeader from "@/components/chat-header";
import { FormEvent, useState } from "react";
import ChatForm from "@/components/chat-form";
import ChatMessages from "@/components/chat-messages";
import { useUIState, useActions } from "ai/rsc";
import type { AI } from "../../../action";


interface ChatClientProps {

};

export default function ChatClient({ }: ChatClientProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useUIState<typeof AI>();
    const { submitUserMessage } = useActions<typeof AI>();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        setInput(e.target.value)
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        // @ts-ignore
        setMessages((currentMessages) => [
            ...currentMessages,
            {
                id: Date.now(),
                display: <div>{input}</div>,
                role:"user"
            },
        ]);

        const responseMessage = await submitUserMessage(input);
        // @ts-ignore
        setMessages((currentMessages) => [
            ...currentMessages,
            responseMessage,
        ]);
        setIsLoading(false);
        setInput('');

    }


    return (
        <div className="flex flex-col h-full w-full">
            <ChatHeader />
            <ChatMessages
                isLoading={isLoading}
                messages={messages}
            />
            {/* {
                // View messages in UI state
                // @ts-ignore
                messages.map((message) => {
                    return (
                        <div key={message.id} className="border-2">
                            {message.display}
                        </div>
                    )
                })
            } */}
            <ChatForm
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                handleOnSubmit={onSubmit}
                setInput={setInput}
            />
        </div>
    )
}