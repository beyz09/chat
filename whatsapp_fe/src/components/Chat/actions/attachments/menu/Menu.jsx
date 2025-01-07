import {
  CameraIcon,
  ContactIcon,
  DocumentIcon,
  PollIcon,
  StickerIcon,
} from "../../../../../svg";
import DocumentAttachment from "./DocumentAttachment";
import PhotoAttachment from "./PhotoAttachment";

export default function Menu() {
  const handlePollClick = () => {
    alert("Anket oluşturma özelliği yakında eklenecek!");
  };

  const handleContactClick = () => {
    alert("Kişi ekleme özelliği yakında eklenecek.");
  };

  const handleCameraClick = () => {
    console.log("Fotoğraf çekme veya yükleme özelliği yakında eklenecek.");
  };

  const handleStickerClick = () => {
    alert("Çıkartma seçme özelliği yakında eklenecek.");
  };

  return (
    <ul className="absolute bottom-14 openEmojiAnimation">
      <li>
        <button type="button" className="rounded-full" onClick={handlePollClick}>
          <PollIcon />
        </button>
      </li>
      <li>
        <button
          type="button"
          className="bg-[#0EABF4] rounded-full"
          onClick={handleContactClick}
        >
          <ContactIcon />
        </button>
      </li>
      <DocumentAttachment />
      <li>
        <button
          type="button"
          className="bg-[#D3396D] rounded-full"
          onClick={handleCameraClick}
        >
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full" onClick={handleStickerClick}>
          <StickerIcon />
        </button>
      </li>
      <PhotoAttachment />
    </ul>
  );
}

