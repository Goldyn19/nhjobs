import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date | string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const end = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const totalSeconds = Math.max(Math.floor((end - now) / 1000), 0);

      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown(); // run on mount
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-4xl  text-white font-semibold text-center">
      {timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0 ? (
        "Time's up!"
      ) : (
        <div className="flex space-x-5">
          <div className="flex flex-col align-middle justify-center space-y-2">
            <h1 className="">{timeLeft.days}</h1>
            <h1 className="text-sm">Days</h1>
          </div>
          <div className="flex flex-col align-middle justify-center space-y-2">
            <h1>{timeLeft.hours}</h1>
            <h1 className="text-sm">Hours</h1>
          </div>
          <div className="flex flex-col align-middle justify-center space-y-2">
            <h1>{timeLeft.minutes}</h1>
            <h1 className="text-sm">minutes</h1>
          </div>
          <div className="flex flex-col align-middle justify-center space-y-2">
            <h1>{timeLeft.seconds}</h1>
            <h1 className="text-sm">seconds</h1>
          </div>
          <h1 className="mt-3 text-2xl">left</h1>
        </div>

      )}
    </div>
  );
};

export default Countdown;
