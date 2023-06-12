import React from 'react';
import { useCountdown } from '../../customHook/useCountDown';

const CountDownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <h1>This countdown ended</h1>;
  } else {
    return (
        <div className="countdownlist">
        <div className="countdownlist-item">
          <div className="count-title">Days</div>
          <div className="count-num">{days}</div>
        </div>
        <div className="countdownlist-item">
          <div className="count-title">Hours</div>
          <div className="count-num">{hours}</div>
        </div>
        <div className="countdownlist-item">
          <div className="count-title">Minutes</div>
          <div className="count-num">{minutes}</div>
        </div>
        <div className="countdownlist-item">
          <div className="count-title">Seconds</div>
          <div className="count-num">{seconds}</div>
        </div>
      </div>
    );
  }
};

export default CountDownTimer