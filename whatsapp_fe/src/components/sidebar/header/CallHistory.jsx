
export default function CallHistory({ callHistory, setShowCallHistory, user }) {
  if (!Array.isArray(callHistory)) {
    console.error("CallHistory beklenen formatta değil:", callHistory);
    return <p>Geçmiş Yükleme Hatası</p>;
  }



  // Kullanıcının çağrılarını filtreleme
  const filteredCallHistory = callHistory.filter((call) => {

    // İki karşılaştırmayı da konsola yazdırıyoruz
    const isCallerIdMatch = call.callerId === user._id;
    const isUserIdMatch = call.userId === user._id;
    // Sonuçları döndürüyoruz
    return isCallerIdMatch || isUserIdMatch;
  });

 




  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white dark:bg-dark_bg_1 p-6 rounded-xl shadow-2xl w-96 max-w-full">
    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Arama Geçmişi</h2>
    
    <ul className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
      {filteredCallHistory.length > 0 ? (
        filteredCallHistory.map((call) => (
          <li
            key={call._id || call.id}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-r dark:from-dark_bg_2 dark:to-dark_bg_3 rounded-xl shadow-md hover:shadow-xl transition-shadow"
          >
            {/* Arayan ve Aranan Kişi */}
            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <p className="text-lg font-medium text-gray-800 dark:text-white">{call.callerName}</p>
              </div>

              {/* Ok simgesi */}
              <div className="w-6 h-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-full h-full text-gray-700 dark:text-white transform rotate-90"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l4 4a1 1 0 11-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L6.707 8.707a1 1 0 11-1.414-1.414l4-4A1 1 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-lg font-medium text-gray-800 dark:text-white">{call.recever}</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-xs text-gray-600 dark:text-dark_svg_2">
                {new Date(call.callTime).toLocaleDateString()} at{" "}
                {new Date(call.callTime).toLocaleTimeString()}
              </p>

              {/* Durum */}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full mt-1 ${call.status === "Missed"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {call.status}
              </span>
            </div>
          </li>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">Geçmiş Arama Yok.</p>
      )}
    </ul>

    {/* Close Button */}
    <div className="flex justify-end mt-6">
      <button
        className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        onClick={() => setShowCallHistory(false)}
      >
        Kapat
      </button>
    </div>
  </div>
</div>

  );
}
