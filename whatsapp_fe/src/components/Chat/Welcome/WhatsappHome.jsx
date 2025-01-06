import { Logo } from "../../../svg";

export default function WhatsappHome() {
  return (
    <div className="h-full w-full dark:bg-dark_bg_2 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2">
      {/*Container*/}
      <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
        <span>
          <Logo />
        </span>
        {/*Infos*/}
        <div className="mt-1 text-center space-y-[12px]">
          <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">
            Chat-App
          </h1>
          <p className="text-sm dark:text-dark_text_4">
            Bir sohbete başlayın
          </p>
        </div>
      </div>
    </div>
  );
}
