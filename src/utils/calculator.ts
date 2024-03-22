type Time = {
  hour: number;
  minute: number;
};

// 90 => { hour: 1, minute: 30 }
const minutesToHoursAndMinutes = (minutes: number): Time => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return { hour, minute };
};

// { hour: 1, minute: 30 } => 90
const timeToMinutes = (time: Time): number => {
  return time.hour * 60 + time.minute;
};

// { hour: 1, minute: 30 } + { hour: 1, minute: 30 } => { hour: 3, minute: 0 }
export const addTimes = (firstTime: Time, secondTime: Time): Time => {
  const totalMinutes = timeToMinutes(firstTime) + timeToMinutes(secondTime);
  return minutesToHoursAndMinutes(totalMinutes);
};

// 480, 450 => { hour: 1, minute: 30 }
export const calcTimeLeft = (
  totalWorkingTime: number,
  totalWorkedMinutes: number
): Time => {
  const remainingMinutes = totalWorkingTime * 60 - totalWorkedMinutes;
  return minutesToHoursAndMinutes(remainingMinutes);
};

// { hour: 1, minute: 30 }, { hour: 1, minute: 30 }, 8 => { hour: 5, minute: 0 }
export const calculateTimeLeft = (
  firstTime: Time,
  secondTime: Time,
  totalWorkingTime: number
): Time => {
  const totalWorkedTime = addTimes(firstTime, secondTime);
  const totalWorkedMinutes = timeToMinutes(totalWorkedTime);

  if (totalWorkedMinutes > totalWorkingTime * 60) {
    return { hour: 0, minute: 0 };
  }

  return calcTimeLeft(totalWorkingTime, totalWorkedMinutes);
};

type ConvertTimeToStringFormat = "clock" | "hour" | "minute" | "hourMinute";

// { hour: 9, minute: 32 }, "hourMinute" => "09시간 32분"
export const convertTimeToString = (
  time: Time,
  format: ConvertTimeToStringFormat
): string => {
  const hour = time.hour.toString().padStart(2, "0");
  const minute = time.minute.toString().padStart(2, "0");

  switch (format) {
    case "clock":
      return `${hour}시 ${minute}분`;
    case "hour":
      return `${hour}시간`;
    case "minute":
      return `${minute}분`;
    case "hourMinute":
      return `${hour}시간 ${minute}분`;
    default:
      throw new Error("Invalid format");
  }
};

// new Date("2021-06-15T09:32:00") => { hour: 9, minute: 32 }
export const convertDateToTime = (date: Date): Time => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return { hour, minute };
};

// { hour: 40, minute: 30 }, { hour: 30, minute: 30 }, 80, new Date("2021-06-15T09:32:00") => { hour: 18, minute: 32 }
export const calcEndTime = (
  firstTime: Time,
  secondTime: Time,
  totalWorkingTime: number,
  date: Date = new Date()
): Time => {
  const currentTime = convertDateToTime(date);
  const leftTime = calculateTimeLeft(firstTime, secondTime, totalWorkingTime);
  const finishTime = addTimes(currentTime, leftTime);
  return finishTime;
};

// { hour: 13, minute: 32 } => "오후 1시 32분"
// { hour: 3, minute: 0 } => "오전 3시 0분"
export const convertTo12HourFormat = (time: Time): string => {
  const { hour, minute } = time;
  const hour12 = hour % 12 || 12;
  const ampm = hour < 12 ? "오전" : "오후";
  return `${ampm} ${hour12}시 ${minute}분`;
};
