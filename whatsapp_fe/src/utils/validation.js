import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("İsim gereklidir")
    .matches(/^[a-zA-Z_ ]*$/, "Özel karakterlere izin verilmez.")
    .min(2, "İsim 2 ile 16 karakter arasında olmalıdır.")
    .max(25, "İsim 2 ile 16 karakter arasında olmalıdır."),
  email: Yup.string()
    .required("E-posta adresi gereklidir.")
    .email("Geçersiz e-posta adresi."),
  status: Yup.string().max(64, "Durum 64 karakterden az olmalıdır."),
  password: Yup.string()
    .required("Şifre gereklidir.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Şifre en az 6 karakter, 1 büyük harf, 1 küçük harf, 1 sayı ve 1 özel karakter içermelidir."
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("E-posta adresi gereklidir.")
    .email("Geçersiz e-posta adresi."),
  password: Yup.string().required("Şifre gereklidir."),
});