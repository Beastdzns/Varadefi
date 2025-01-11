"use client";

import ChatMessage, { ChatMessageProps } from "@/components/chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
    messages: ChatMessageProps[];
    isLoading: boolean;
}

export default function ChatMessages({ messages = [], isLoading }: ChatMessagesProps) {

    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false)

    const scrollRef = useRef<ElementRef<"div">>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false)
        }, 1000);

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages.length])

    return (
        <div className="flex-1 overflow-y-auto pr-4 h-[70%]">
            {
                messages.map((message,index) => {
                    return (
                        <ChatMessage
                            key={index}
                            isLoading={isLoading}
                            message={message}
                        />
                    )
                })
            }
            {
                isLoading && (
                    <ChatMessage
                        message={""}
                        isLoading
                    />
                )
            }
            <div ref={scrollRef} />
        </div>
    )
}