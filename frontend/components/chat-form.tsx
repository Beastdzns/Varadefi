"use client";

import type { ChatRequestOptions } from "ai";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { Microphone } from "./microphone";
import { useRecordVoice } from "@/hooks/useRecordVoice";

interface ChatFormProps {
    input: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    handleOnSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    isLoading: boolean;
    setInput: (input: string) => void;
}

export default function ChatForm({ input, handleInputChange, handleOnSubmit, isLoading, setInput }: ChatFormProps) {
    const { startRecording, stopRecording, text } = useRecordVoice();

    useEffect(() => {
        if (text) {
            setInput(text);
        }
    }, [text])

    return (

        <form
            onSubmit={handleOnSubmit}
            className="border-t border-primary/10 py-4 flex items-center gap-x-2 px-4"
        >
            <Input
                disabled={isLoading}
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message"
                className="rounded-lg bg-primary/10"
            />
            <Button disabled={isLoading} variant={"ghost"} size={"icon"}>
                <SendHorizonal
                    className="h-4 w-4"
                />
            </Button>

            <Microphone
                
                startRecording={startRecording}
                stopRecording={stopRecording}
            />
        </form>


    )
}