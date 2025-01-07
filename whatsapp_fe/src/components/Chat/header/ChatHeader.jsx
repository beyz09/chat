import { useSelector } from "react-redux";
import {
  CallIcon,
  DotsIcon,
  SearchLargeIcon,
  VideoCallIcon,
} from "../../../svg";
import { capitalize } from "../../../utils/string";
import { useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { getConversationName, getConversationPicture } from "../../../utils/chat";

function ChatHeader({ online, callUser, socket }) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const [showMembersModal, setShowMembersModal] = useState(false); // Modal açma durumu

  const toggleMembersModal = () => {
    setShowMembersModal(!showMembersModal); // Modal'ı aç veya kapat
  };

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/*Container*/}
      <div className="w-full flex items-center justify-between">
        {/*left*/}
        <div className="flex items-center gap-x-4">
          {/*Conversation image*/}
          <button className="btn" onClick={toggleMembersModal}> {/* Grup üyelerini gösteren buton */}
            <img
              src={
                activeConversation.isGroup
                  ? activeConversation.picture
                  : getConversationPicture(user, activeConversation.users)
              }
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/*Conversation name and online status*/}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {activeConversation.isGroup
                ? activeConversation.name
                : capitalize(
                    getConversationName(user, activeConversation.users).split(
                      " "
                    )[0]
                  )}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">
              {online ? "online" : ""}
            </span>
          </div>
        </div>
        {/*Right*/}
        <ul className="flex items-center gap-x-2.5">
          {1 == 1 ? (
            <li onClick={() => callUser()}>
              <button className="btn">
                <VideoCallIcon />
              </button>
            </li>
          ) : null}
         
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>

      {/* Grup üyelerinin gösterileceği Modal */}
      {showMembersModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Grup Üyeleri</h2>
            <ul className="space-y-2">
              {activeConversation.users.map((user) => (
                <li key={user._id} className="flex items-center gap-x-2">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.name}</span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 py-2 px-4 bg-gray-600 text-white rounded-full"
              onClick={toggleMembersModal}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const ChatHeaderWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatHeader {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatHeaderWithSocket;
