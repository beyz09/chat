import moment from "moment";
import TraingleIcon from "../../../svg/triangle";
import { useSelector } from "react-redux";

export default function Message({ message, me }) {
  const { user } = useSelector((state) => state.user);

  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : ""}`}
    >
      {/* Message Container */}
      <div className="relative">
        {/* Sender user message */}
        {!me && message.conversation.isGroup && (
          <div className="absolute top-0.5 left-[-37px]">
            <img
              src={message.sender.picture}
              alt=""
              className="w-8 h-8 rounded-full"
            />
          </div>
        )}

        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`}
        >
          {/* Sender's Name */}
          {!me && message.conversation.isGroup && message.sender && (
            <p className="font-bold text-sm mb-1">
              {message.sender.name}
            </p>
          )}

          {/* Message */}
          <p className="float-left h-full text-sm pb-4 pr-8">
            {message.message}
          </p>

          {/* Message Date */}
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format("HH:mm")}
          </span>

          {/* Traingle */}
          {!me ? (
            <span>
              <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
