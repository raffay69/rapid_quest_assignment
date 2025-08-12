import { useState } from "react";
import { Send, Paperclip, Smile, Mic } from "lucide-react";

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSendClick = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div
      className="py-2 px-2 sm:px-4 border-t flex items-center gap-1 sm:gap-2 w-full"
      style={{ backgroundColor: "#f0f2f5", borderColor: "#e9edef" }}
    >
      {/* Emoji button */}
      <button
        className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
        style={{ color: "#667781" }}
      >
        <Smile size={16} className="sm:w-5 sm:h-5" />
      </button>

      {/* Attachment button */}
      <button
        className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
        style={{ color: "#667781" }}
      >
        <Paperclip size={16} className="sm:w-5 sm:h-5" />
      </button>

      <div className="flex items-center flex-1 min-w-0 gap-1 sm:gap-2">
        <div
          className="flex-1 flex items-center rounded-lg py-1.5 sm:py-2 px-2 sm:px-3 shadow-sm border min-w-0"
          style={{
            backgroundColor: "white",
            borderColor: "rgba(233, 237, 239, 0.5)",
          }}
        >
          <textarea
            className="flex-1 border-none outline-none text-sm sm:text-[15px] leading-5 resize-none bg-transparent max-h-16 sm:max-h-24 min-h-[18px] overflow-y-auto min-w-0"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{
              color: "#111b21",
              wordWrap: "break-word",
              width: "100%",
            }}
          />
        </div>

        {/* Send or Mic button */}
        {text.trim() ? (
          <button
            type="button"
            className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shadow-sm hover:shadow-md transition-shadow"
            style={{
              backgroundColor: "#00a884",
              color: "white",
            }}
            onClick={handleSendClick}
          >
            <Send size={14} className="sm:w-4 sm:h-4" />
          </button>
        ) : (
          <button
            type="button"
            className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            style={{ color: "#667781" }}
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic
              size={16}
              className="sm:w-5 sm:h-5"
              style={{ color: isRecording ? "#ef4444" : "#667781" }}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default MessageInput;
