import { useEffect, useRef, useState } from "react";

const Counter = ({ className, start, end, delay }) => {
  const [count, setCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const parentEl = useRef(null);

  const startCounter = () => {
    let increment = start;
    const timer = setInterval(() => {
      if (increment < end) {
        increment++;
        setCount(increment);
      } else {
        clearInterval(timer);
      }
    }, delay);
  };

  const resetCounter = () => {
    setCount(start);
    setIsEnd(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!isEnd) {
            setIsEnd(true);
            startCounter();
          }
        }
      },
      { rootMargin: "0px 0px -100px 0px" }
    );

    if (parentEl.current) {
      observer.observe(parentEl.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    resetCounter();
  }, [start]);

  return (
    <span ref={parentEl} className={className}>
      {count}
    </span>
  );
};

export default Counter;
