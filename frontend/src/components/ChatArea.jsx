import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { MoreVertical, Phone, Video, ArrowLeft, Search } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

function ChatArea() {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [contactName, setContactName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChatData();
  }, [conversationId]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      setContactName(newMessage.customer_name);
    });

    socket.on("updateMessage", (updatedFields, id) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, ...updatedFields } : msg))
      );
    });

    socket.on("deletedMessage", (id) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    });

    return () => {
      socket.off("newMessage");
      socket.off("updateMessage");
      socket.off("deletedMessage");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchChatData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/chat/${conversationId}`
      );
      setMessages(res.data);
      setContactName(res.data.length > 0 ? res.data[0].customer_name : "");
    } catch (e) {
      setError("Error fetching chat");
    } finally {
      setLoading(false);
    }
  }

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const newMessage = {
      message_id: Date.now().toString(),
      conversation_id: conversationId,
      customer_name: contactName,
      content: messageText,
      direction: "outbound",
      status: "sent",
      timestamp: new Date().toISOString(),
    };
    try {
      const res = await axios.post("http://localhost:3000/chat", newMessage);
      await fetchChatData();
    } catch (e) {
      toast("Error sending message", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div
      className="flex-1 flex flex-col relative"
      style={{ backgroundColor: "white" }}
    >
      {/* Header */}
      <div
        className="p-3 px-4 flex items-center border-b"
        style={{
          backgroundColor: "#f0f2f5",
          borderColor: "#e9edef",
          boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <Link to="/" className="lg:hidden md:hidden sm:flex mr-3">
          <button
            className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
            style={{ color: "#667781" }}
          >
            <ArrowLeft size={20} />
          </button>
        </Link>

        <div className="flex items-center gap-[15px] flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, #00a884 0%, rgba(0, 168, 132, 0.8) 100%)",
            }}
          >
            {contactName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-medium truncate"
              style={{ color: "#111b21" }}
            >
              {contactName}
            </h3>
            <p className="text-[13px]" style={{ color: "#667781" }}>
              online
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
            style={{ color: "#667781" }}
          >
            <Video size={20} />
          </button>
          <button
            className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
            style={{ color: "#667781" }}
          >
            <Phone size={20} />
          </button>
          <button
            className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
            style={{ color: "#667781" }}
          >
            <Search size={20} />
          </button>
          <button
            className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
            style={{ color: "#667781" }}
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto relative"
        style={{ backgroundColor: "#e5ddd5" }}
      >
        <div className="p-4 px-[8%] sm:px-4 flex flex-col gap-2">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div
                className="rounded-full h-8 w-8 border-b-2 animate-spin"
                style={{ borderColor: "#00a884" }}
              ></div>
            </div>
          ) : messages.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-32"
              style={{ color: "#667781" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#f0f2f5" }}
              >
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-sm text-center">
                {error ? error : "No messages yet"}
              </p>
              <p className="text-xs text-center opacity-70">
                {!error && "Start a conversation!"}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                className={`flex mb-1  ${
                  message.direction === "outbound"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[65%] sm:max-w-[85%] py-2 px-3 rounded-lg relative break-words`}
                  style={{
                    backgroundColor:
                      message.direction === "outbound" ? "#d9fdd3" : "white",
                    boxShadow: "0 1px 0.5px rgba(0, 0, 0, 0.13)",
                  }}
                >
                  <p
                    className="text-[14.2px] leading-[19px] pr-[80px] "
                    style={{ color: "#111b21" }}
                  >
                    {message.content}
                  </p>
                  <span
                    className="text-[11px] pl-1.5 absolute bottom-1 right-2 flex items-center"
                    style={{ color: "#667781" }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                    {message.direction === "outbound" && (
                      <MessageBubble status={message.status} />
                    )}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatArea;
