import {
  addTimes,
  calculateTimeLeft,
  convertDateToTime,
  convertTimeToString,
  convertTo12HourFormat,
  calcEndTime,
} from "../utils/calculator";

test("시간 더하기 테스트", () => {
  const firstTime = { hour: 40, minute: 30 };
  const secondTime = { hour: 30, minute: 30 };
  const totalWorkedTime = addTimes(firstTime, secondTime);
  expect(totalWorkedTime).toEqual({ hour: 71, minute: 0 });
});

test("계산 테스트", () => {
  const firstTime = { hour: 40, minute: 30 };
  const secondTime = { hour: 30, minute: 30 };
  const totalWorkingTime = 80;
  const result = calculateTimeLeft(firstTime, secondTime, totalWorkingTime);
  expect(result).toEqual({ hour: 9, minute: 0 });
});

test("만약에 남은 시간이 음수면 0시간을 리턴한다.", () => {
  const firstTime = { hour: 40, minute: 30 };
  const secondTime = { hour: 30, minute: 30 };
  const totalWorkingTime = 70;
  const result = calculateTimeLeft(firstTime, secondTime, totalWorkingTime);
  expect(result).toEqual({ hour: 0, minute: 0 });
});

test("시간을 글자로 돌려주는 함수 테스트", () => {
  const time = { hour: 9, minute: 32 };
  const result = convertTimeToString(time, "hourMinute");
  expect(result).toBe("09시간 32분");
});

test("Date를 시간으로 변환하는 함수 테스트", () => {
  const date = new Date("2021-06-15T09:32:00");
  const result = convertDateToTime(date);
  expect(result).toEqual({ hour: 9, minute: 32 });
});

test("끝나는 시간을 알려주는 함수", () => {
  const firstTime = { hour: 40, minute: 30 };
  const secondTime = { hour: 30, minute: 30 };
  const totalWorkingTime = 80;
  const result = calcEndTime(firstTime, secondTime, totalWorkingTime, new Date("2021-06-15T09:32:00"));
  expect(result).toEqual({ hour: 18, minute: 32 });
  expect(convertTimeToString(result, "clock")).toBe("18시 32분");
});

test("12시간 포멧으로 바꿔주는 함수 테스트 (오후)", () => {
  const time = { hour: 13, minute: 32 };
  const result = convertTo12HourFormat(time);
  expect(result).toBe("오후 1시 32분");
});

test("12시간 포멧으로 바꿔주는 함수 테스트 (오전)", () => {
  const time = { hour: 3, minute: 0 };
  const result = convertTo12HourFormat(time);
  expect(result).toBe("오전 3시 0분");
});

test("최종 테스트", () => {
  const firstTime = { hour: 40, minute: 30 };
  const secondTime = { hour: 30, minute: 30 };
  const totalWorkingTime = 80;
  const result = calcEndTime(firstTime, secondTime, totalWorkingTime, new Date("2021-06-15T09:32:00"));
  expect(result).toEqual({ hour: 18, minute: 32 });
  expect(convertTimeToString(result, "clock")).toBe("18시 32분");
  expect(convertTo12HourFormat(result)).toBe("오후 6시 32분");
});
