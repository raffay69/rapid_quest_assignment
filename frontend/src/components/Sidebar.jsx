import { useEffect, useState } from "react";
import { MoreVertical, Search, Filter, Menu, X } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function Sidebar() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const { conversationId: activeConversationId } = useParams();

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    socket.on("newMessage", async () => {
      await fetchChats();
    });
    socket.on("updateMessage", async () => {
      await fetchChats();
    });
    socket.on("deletedMessage", async () => {
      await fetchChats();
    });

    return () => {
      socket.off("newMessage");
      socket.off("updatedMessage");
      socket.off("deletedMessage");
    };
  });

  async function fetchChats() {
    try {
      const res = await axios.get("http://localhost:3000/chat");
      setConversations(res.data);
      console.log(res.data);
    } catch (e) {
      setError("Error fetching conversations");
    } finally {
      setLoading(false);
    }
  }

  const filteredConversations = conversations.filter((convo) =>
    convo.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarClasses = `
    w-[400px] min-w-[320px] bg-white flex flex-col border-r
    lg:w-[400px] lg:min-w-[320px] lg:relative lg:z-auto lg:translate-x-0
    md:w-[350px] md:min-w-[280px] md:relative md:z-auto md:translate-x-0
    sm:w-full sm:min-w-full sm:absolute sm:inset-0 sm:z-[100] sm:transform sm:transition-transform sm:duration-300 sm:ease-in-out
    ${isMobileMenuOpen ? "sm:translate-x-0" : "sm:-translate-x-full"}
  `;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="hidden sm:block fixed inset-0 z-[150]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={sidebarClasses} style={{ borderColor: "#e9edef" }}>
        {/* Header */}
        <div
          className="p-3 px-4 flex justify-between items-center"
          style={{
            backgroundColor: "#f0f2f5",
            boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-lg font-semibold" style={{ color: "#111b21" }}>
            Chats
          </h2>
          <div className="flex gap-2">
            <button
              className="h-10 w-10 border-none rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-linear btn-whatsapp"
              style={{ color: "#667781" }}
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div
          className="p-2 px-3 flex gap-2 border-b"
          style={{ backgroundColor: "white", borderColor: "#e9edef" }}
        >
          <div
            className="flex-1 relative flex items-center rounded-lg pl-[65px] transition-all duration-200"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <Search
              size={18}
              style={{ color: "#667781", position: "absolute", left: "20px" }}
            />
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none outline-none w-full text-[15px] bg-transparent py-3 px-0"
              style={{ color: "#111b21" }}
            />
          </div>
          <button
            className="w-10 h-10 border-none bg-transparent rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 btn-whatsapp"
            style={{ color: "#667781" }}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Conversations list */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: "white" }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div
                className="rounded-full h-8 w-8 border-b-2 animate-spin"
                style={{ borderColor: "#00a884" }}
              ></div>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-32"
              style={{ color: "#667781" }}
            >
              <Search size={48} className="mb-2 opacity-50" />
              <p className="text-sm">
                {error ? error : "No conversations found"}
              </p>
            </div>
          ) : (
            filteredConversations.map((convo) => (
              <Link
                to={`/chat/${convo.conversation_id}`}
                key={convo.conversation_id}
                className="no-underline text-inherit"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div
                  className="flex items-center gap-[15px] cursor-pointer border-b p-3 px-4 transition-all duration-200 ease-linear"
                  style={{
                    borderColor: "#e9edef",
                    backgroundColor:
                      convo.conversation_id === activeConversationId
                        ? "#f0f2f5"
                        : "transparent",
                  }}
                >
                  <div
                    className="w-[49px] h-[49px] rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #00a884 0%, rgba(0, 168, 132, 0.8) 100%)",
                    }}
                  >
                    {convo.customer_name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span
                        className="text-[17px] font-medium truncate"
                        style={{ color: "#111b21" }}
                      >
                        {convo.customer_name}
                      </span>
                      <span
                        className="text-xs whitespace-nowrap ml-2"
                        style={{ color: "#667781" }}
                      >
                        {new Date(convo.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p
                        className="text-sm whitespace-nowrap overflow-hidden text-ellipsis flex-1"
                        style={{ color: "#667781" }}
                      >
                        {convo.latest_message}
                      </p>
                      {convo.message_count > 0 && (
                        <span
                          className="ml-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] animate-pulse-green"
                          style={{ backgroundColor: "#00a884" }}
                        >
                          {convo.message_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default Sidebar;
