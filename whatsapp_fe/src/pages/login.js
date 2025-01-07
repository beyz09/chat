import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div
      className="h-screen flex items-center justify-center py-[19px] overflow-hidden"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/due4rheog/image/upload/v1736213301/app/njhyq7wcdwso121i4sed.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/*Container*/}
      <div className="flex w-[1600px] mx-auto h-full">
        {/*Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}

