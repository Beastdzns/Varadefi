"use client";

import { useRecordVoice } from "@/hooks/useRecordVoice";
import { Mic } from "lucide-react";
import { Button } from "./ui/button";

type MicrophoneProps = {
    startRecording:any;
    stopRecording: () => void;
}

const Microphone = ({
    startRecording,
    stopRecording
}:MicrophoneProps) => {

  return (
    // Button for starting and stopping voice recording
    <Button
      type="button"
      onMouseDown={startRecording}    // Start recording when mouse is pressed
      onMouseUp={stopRecording}        // Stop recording when mouse is released
      onTouchStart={startRecording}    // Start recording when touch begins on a touch device
      onTouchEnd={stopRecording}        // Stop recording when touch ends on a touch device
      variant={"ghost"}
    >
      {/* Microphone icon component */}
      <Mic 
        className="h-4 w-4"
      />
    </Button>
  );
};

export { Microphone };