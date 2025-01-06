import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export default async function (req, res, next) {
  try {
    // Authorization header kontrolü
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw createHttpError.Unauthorized("Authorization header is missing.");
    }

    // Bearer Token kontrolü
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw createHttpError.Unauthorized("Token is missing from the header.");
    }

    // Token doğrulama
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // Hata durumunda, daha açıklayıcı bir mesaj
        const errorMessage =
          err.name === "TokenExpiredError"
            ? "Token has expired."
            : "Invalid token.";
        throw createHttpError.Unauthorized(errorMessage);
      }
      req.user = payload; // Doğrulanan kullanıcı bilgilerini req.user'a ekle
      next();
    });
  } catch (error) {
    next(error); // Hataları bir sonraki middleware'e ilet
  }
  console.log("Headers:", req.headers);

}
