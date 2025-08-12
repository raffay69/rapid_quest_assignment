import { Check, CheckCheck } from "lucide-react";

function MessageBubble({ status }) {
  return (
    <span className="pl-1 flex items-center">
      {status === "delivered" ? (
        <CheckCheck size={16} style={{ color: "#667781" }} />
      ) : status === "read" ? (
        <CheckCheck size={16} style={{ color: "#027eb5" }} />
      ) : (
        <Check size={16} style={{ color: "#667781" }} />
      )}
    </span>
  );
}

export default MessageBubble;
