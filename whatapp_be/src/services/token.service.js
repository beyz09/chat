import jwt from 'jsonwebtoken';  // JWT modülünü import ediyoruz

// Token oluşturma fonksiyonu
export const generateToken = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) {
        reject(err);  // Hata oluşursa reject
      } else {
        resolve(token);  // Token başarılı bir şekilde oluşturulursa resolve
      }
    });
  });
};

// Token doğrulama fonksiyonu
export const verifyToken = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);  // Hata oluşursa reject
      } else {
        resolve(decoded);  // Token geçerli ise decoded verisini döndür
      }
    });
  });
};
