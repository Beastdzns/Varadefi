"use client"
import React from 'react'
import { useRecoilState } from "recoil";
import { messagesAtom } from "@/store/atoms/chatAtoms";
import { EmptyChat } from "@/components/chat/EmptyChat";
import Message from './Message';
import { ThreeDotLoading } from './ThreeDotLoading';

function ChatContainer({
  isLoading,
  isError,
  isLoggedIn,
}: {
  isLoading: Boolean;
  isError: Boolean;
  isLoggedIn: Boolean;
}) {
  const [messages, setMessages] = useRecoilState(messagesAtom);

  return (
    <div className="flex flex-col">
      {messages.length === 0 && !isLoading && !isError && isLoggedIn && (
        <EmptyChat />
      )}
      {messages.length === 0 && !isLoading && !isError && !isLoggedIn && (
        <div className="text-gray-500 text-center py-8  mx-auto">
          You need to log in to continue the conversation. Please log in to
          access the chat and interact with me.
        </div>
      )}
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          userName="User"
          aiName="AI"
          userAvatar="/user_logo.png"
          aiAvatar="/ai_logo.png"
        />
      ))}
      {isLoading && <ThreeDotLoading />}
      {isError && <div>Error loading messages</div>}
    </div>
  );
}

export default ChatContainer