import React, { FC, ReactNode, useEffect } from "react";
import TextField from "./components/TextField";
import FlexBox from "./components/FlexBox";
import { onlyNumbers } from "./utils/regex";
import { calcEndTime, calculateTimeLeft, convertTimeToString, convertTo12HourFormat } from "./utils/calculator";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
type Time = {
  hour: number;
  minute: number;
};

const App: React.FC = () => {
  const [totalTime, setTotalTime] = React.useState<string | undefined>(undefined);
  const [week, setWeek] = React.useState<string | undefined>(undefined);
  const [time, setTime] = React.useState<Time[]>([]);
  const [result, setResult] = React.useState<Time | undefined>(undefined);
  const [leftTime, setLeftTime] = React.useState<Time | undefined>(undefined);

  const getTime = () => {
    const calc = calcEndTime(time[0], time[1], Number(totalTime) * Number(week), new Date());
    setResult(calc);
    const left = calculateTimeLeft(time[0], time[1], Number(totalTime) * Number(week));
    setLeftTime(left);
  };

  useEffect(() => {
    if (week === undefined) return;
    const time = Array.from({ length: Number(week) }, () => ({ hour: 0, minute: 0 }));
    setTime(time);
  }, [week]);

  return (
    <FlexBox direction="column" gap={1}>
      <TextField
        label="주 몇시간 근무하세요?"
        placeholder="80"
        value={totalTime}
        type="number"
        onChange={e => setTotalTime(e.target.value)}
      />
      <TextField
        label="정산 단위는 몇 주세요?"
        placeholder="80"
        value={week}
        onChange={e => setWeek(onlyNumbers(e.target.value))}
      />
      <AnimatePresence>
        {time.map((t, index) => (
          <Item key={index}>
            <FlexBox gap={1}>
              <TextField
                label={`${index + 1}주차 시작 시간`}
                placeholder="09:00"
                value={t.hour}
                onChange={e => {
                  setTime(prev => {
                    const newTime = [...prev];
                    newTime[index].hour = Number(e.target.value);
                    return newTime;
                  });
                }}
              />
              <TextField
                label="분"
                placeholder="00"
                value={t.minute}
                onChange={e => {
                  setTime(prev => {
                    const newTime = [...prev];
                    newTime[index].minute = Number(e.target.value);
                    return newTime;
                  });
                }}
              />
            </FlexBox>
          </Item>
        ))}
      </AnimatePresence>

      <button onClick={getTime}>계산하기</button>
      <h3>{!!leftTime && convertTimeToString(leftTime, "hourMinute") + " 남았습니다."}</h3>
      <h3>{!!result && convertTo12HourFormat(result) + "에 퇴근하시면 됩니다!"}</h3>
    </FlexBox>
  );
};

export default App;

const Item: FC<{ children: ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  const isPresent = useIsPresent();
  const animations = {
    style: {
      position: isPresent ? "static" : ("absolute" as any),
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 900, damping: 40 },
  };
  return (
    <motion.div {...animations} layout onClick={onClick}>
      {children}
    </motion.div>
  );
};
