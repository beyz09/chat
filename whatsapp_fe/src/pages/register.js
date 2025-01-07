import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden"
    style={{
      backgroundImage: "url('https://res.cloudinary.com/due4rheog/image/upload/v1736213301/app/njhyq7wcdwso121i4sed.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    >
      {/*Container*/}
      <div className="flex w-[1600px] mx-auto h-full">
        {/*Register form */}
        <RegisterForm />
      </div>
    </div>
  );
}
