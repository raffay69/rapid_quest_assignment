import { useState } from "react";
import { Send, Paperclip, Smile, Mic } from "lucide-react";

function MessageInput({ onSendMessage }) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };

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
      className="py-3 px-4 border-t flex items-center gap-3"
      style={{ backgroundColor: "#f0f2f5", borderColor: "#e9edef" }}
    >
      <button
        className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
        style={{ color: "#667781" }}
      >
        <Smile size={24} />
      </button>
      <button
        className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
        style={{ color: "#667781" }}
      >
        <Paperclip size={24} />
      </button>

      <form className="flex-1 flex items-center" onSubmit={handleSubmit}>
        <div
          className="flex-1 flex items-center rounded-lg py-2 px-3 shadow-sm border transition-all duration-200"
          style={{
            backgroundColor: "white",
            borderColor: "rgba(233, 237, 239, 0.5)",
          }}
        >
          <textarea
            className="flex-1 border-none outline-none text-[15px] leading-5 resize-none bg-transparent max-h-32 min-h-[20px] py-1"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{
              color: "#111b21",
              height: "auto",
              minHeight: "20px",
              maxHeight: "120px",
            }}
          />
        </div>
      </form>

      {text.trim() ? (
        <button
          type="button"
          className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear shadow-sm btn-whatsapp"
          style={{
            backgroundColor: "#00a884",
            color: "white",
          }}
          onClick={handleSendClick}
        >
          <Send size={20} />
        </button>
      ) : (
        <button
          type="button"
          className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
          style={{ color: "#667781" }}
          onClick={() => setIsRecording(!isRecording)}
        >
          <Mic
            size={24}
            style={{ color: isRecording ? "#ef4444" : "#667781" }}
          />
        </button>
      )}
    </div>
  );
}
export default MessageInput;
