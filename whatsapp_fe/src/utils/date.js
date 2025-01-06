import moment from "moment";

export const dateHandler = (date) => {
  let now = moment();
  let momentDate = moment(date);
  let time = momentDate.fromNow(true);
  let dateByHourAndMin = momentDate.format("HH:mm");
  const getDay = () => {
    let days = time.split(" ")[0];
    if (Number(days) < 8) {
      return now.subtract(Number(days), "days").format("dddd");
    } else {
      return momentDate.format("DD/MM/YYYY");
    }
  };
  if (time === "birkaç saniye") {
    return "Şimdi";
  }
  if (time.search("dakika") !== -1) {
    let mins = time.split(" ")[0];
    if (mins === "bir") {
      return "1 dk";
    } else {
      return `${mins} dk`;
    }
  }
  if (time.search("saat") !== -1) {
    return dateByHourAndMin;
  }
  if (time === "bir gün") {
    return "Dün";
  }
  if (time.search("gün") !== -1) {
    return getDay();
  }
  return time;
};
