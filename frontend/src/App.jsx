import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import Welcome from "./components/Welcome";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div
        className="relative flex h-screen w-screen items-center justify-center font-sans overflow-hidden"
        style={{ backgroundColor: "#0b141a" }}
      >
        {/* Background gradient */}
        <div
          className="absolute top-0 left-0 z-0 h-[222px] w-full"
          style={{
            background:
              "linear-gradient(to bottom, #00a884 0%, rgba(0, 168, 132, 0.9) 100%)",
          }}
        />

        {/* Main container */}
        <div
          className="relative z-10 flex h-[calc(100%-38px)] w-[calc(100%-38px)] max-w-[1600px] overflow-hidden rounded-lg bg-white animate-fade-in
                      sm:h-screen sm:w-screen sm:max-w-full sm:rounded-none sm:shadow-none
                      md:h-[calc(100%-38px)] md:w-[calc(100%-38px)] md:max-w-[1600px] md:rounded-lg"
          style={{
            boxShadow: "0 6px 18px rgba(11, 20, 26, 0.15)",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <Routes>
            <Route
              path="/chat/:conversationId"
              element={
                <>
                  <Sidebar />
                  <ChatArea />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Sidebar />
                  <Welcome />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
