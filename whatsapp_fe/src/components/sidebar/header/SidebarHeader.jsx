import { useSelector } from "react-redux";
import { CallIcon, ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import { CreateGroup } from "./createGroup";
import CallHistory from "./CallHistory"; // Import CallHistory component
import io from "socket.io-client";

// Backend'deki socket.io server'ına bağlantı
const socket = io("http://localhost:8000");

export default function SidebarHeader() {
  const { user } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCallHistory, setShowCallHistory] = useState(false); // State for showing call history
  const [callHistory, setCallHistory] = useState([]); // Call history state


  useEffect(() => {
    if (user._id) {
      // Backend'e çağrı geçmişi isteği gönderme
      socket.emit("getCallHistory", { userId: user._id });

      // Backend'den gelen çağrı geçmişini işleme
      socket.on("callHistory", (data) => {
        
        if (data && Array.isArray(data)) {
          setCallHistory(data); // Veriyi state'e kaydet
        } else {
          console.error("Veri beklenen formatta değil:", data);
        }
      });

      // Cleanup
      return () => {
        socket.off("callHistory");
      };
    }
  }, [user._id]); // user._id değiştiğinde yeniden çalışır


  return (
    <>
      {/* Sidebar header */}
<div className="h-[50px] dark:bg-dark_bg_2 flex items-center p-4">
  {/* container */}
  <div className="w-full flex items-center justify-between">
    {/* user image */}
    <button className="btn flex-shrink-0">
      <img
        src={user.picture}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover"
      />
    </button>

    {/* Kullanıcı Adı */}
    <div className="ml-4 text-white font-bold truncate">
      {user?.name || "Kullanıcı"}
    </div>

    {/* user icons */}
    <ul className="flex items-center gap-x-2.5 ml-auto">
      <li>
        <button className="btn" onClick={() => setShowCallHistory(true)}>
          <img 
            src="/call-history-icon.png" 
            alt="Call History Icon" 
            className="w-8 h-8"
          />
              </button>
            </li>
           
            <li
              className="relative"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <button className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}>
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
              {showMenu ? (
                <Menu setShowCreateGroup={setShowCreateGroup} />
              ) : null}
            </li>
          </ul>
        </div>
      </div>

      {/* Create Group */}
      {showCreateGroup && <CreateGroup setShowCreateGroup={setShowCreateGroup} />}

      {/* Call History Popup */}
      {showCallHistory && (
        <CallHistory callHistory={callHistory} setShowCallHistory={setShowCallHistory} user={user} />
      )}
    </>
  );
}
