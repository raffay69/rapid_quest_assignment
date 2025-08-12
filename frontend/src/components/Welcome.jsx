function Welcome() {
  return (
    <div
      className="flex-1 flex flex-col justify-center items-center relative overflow-hidden"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-10 left-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: "#00a884" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-24 h-24 rounded-full"
          style={{ backgroundColor: "#00a884" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full"
          style={{ backgroundColor: "#00a884" }}
        ></div>
      </div>

      <div className="text-center max-w-[460px] px-6 sm:px-8 relative z-10">
        <div className="mb-8 animate-bounce-in">
          <div
            className="w-[150px] h-[150px] sm:w-[120px] sm:h-[120px] rounded-full flex items-center justify-center mx-auto text-6xl sm:text-5xl text-white shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #00a884 0%, rgba(0, 168, 132, 0.8) 100%)",
            }}
          >
            <span>💬</span>
          </div>
        </div>

        <h2
          className="text-[32px] sm:text-[28px] font-light mb-4 animate-fade-in"
          style={{ color: "#111b21" }}
        >
          WhatsApp Web
        </h2>

        <div
          className="space-y-3 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <p
            className="text-sm sm:text-xs leading-6"
            style={{ color: "#667781" }}
          >
            Send and receive messages without keeping your phone online.
          </p>
          <p
            className="text-sm sm:text-xs leading-6"
            style={{ color: "#667781" }}
          >
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </p>
        </div>

        <div
          className="mt-8 pt-6 border-t animate-fade-in"
          style={{
            animationDelay: "0.4s",
            borderColor: "rgba(233, 237, 239, 0.3)",
          }}
        >
          <p className="text-xs" style={{ color: "rgba(102, 119, 129, 0.7)" }}>
            Select a chat to start messaging
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(to right, #00a884, #43c960, #00a884)",
        }}
      ></div>
    </div>
  );
}

export default Welcome;
