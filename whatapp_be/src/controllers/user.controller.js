import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { searchUsers as searchUsersService } from "../services/user.service.js";

export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search; // Arama anahtar kelimesini al

    // Eğer anahtar kelime yoksa hata döndür
    if (!keyword) {
      logger.error("No search query provided"); // Loglama
      throw createHttpError.BadRequest("Arama terimi girilmedi. Lütfen bir terim girin.");
    }

    // Kullanıcıları arama servisini çağırarak al
    const users = await searchUsersService(keyword, req.user.id); // userId yerine id kullandık
    if (!users || users.length === 0) {
      throw createHttpError.NotFound("Hiçbir kullanıcı bulunamadı.");
    }

    // Bulunan kullanıcıları döndür
    res.status(200).json(users);

  } catch (error) {
    // Hataları merkezi hata yönetimi ile işleme
    next(error);
  }
};
