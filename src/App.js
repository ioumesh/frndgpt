import "./App.css";
import ChatSection from "./components/ChatSection/ChatSection";
import SideBar from "./components/Sidebar/SideBar";

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <ChatSection />
      </div>
    </div>
  );
}

export default App;
