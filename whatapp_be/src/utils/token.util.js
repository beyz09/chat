import jwt from "jsonwebtoken";
import logger from "../configs/logger.config.js";
export const sign = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: expiresIn,
      },
      (error, token) => {
        if (error) {
          logger.error(error);
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const verify = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        logger.error(error);
        resolve(null);
      } else {
        resolve(payload);
      }
    });
  });
};

const deleteConversationHandler = async () => {
  try {
    const response = await fetch(`/api/conversations/${convo._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Sunucudan konuşma silinemedi.");
    }

    await dispatch(deleteConversation(convo._id));
    socket.emit("leave conversation", convo._id);
    console.log("Konuşma sunucudan ve istemciden silindi.");
  } catch (error) {
    console.error("Konuşmayı silerken hata:", error);
  }
};

