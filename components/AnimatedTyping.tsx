import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AnimatedTypingProps {
  textList: string[];
  triggerIndex?: number;
  typingSpeed?: number;
  deletingSpeed?: number;
  showTimeList?: (number)[];
  classNameList?: string[];
  isUnderlying?: boolean;
}
function AnimatedTyping({
  textList,
  triggerIndex,
  showTimeList,
  typingSpeed = 200,
  deletingSpeed = 50,
  classNameList = [],
  isUnderlying = false,
}: AnimatedTypingProps) {
  const [textState, setTextState] = useState('');
  const textIndex = useRef(0);

  useEffect(() => {
    let typingIndex = 0;
    let stop = false;
    let deleteAllFlag = false;

    const delay = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });
    const addCharToTextState = () => new Promise<void>((resolve) => {
      setTextState((prev) => {
        const newTextState = `${prev}${textList[textIndex.current]![typingIndex]!}`;
        resolve();
        return newTextState;
      });
    });

    const typing = async () => {
      if (stop) return;
      if (typingIndex < 0 || typingIndex >= textList[textIndex.current]!.length) {
        typingIndex -= 1;
        return;
      }
      await addCharToTextState();
      await delay(typingSpeed);
      typingIndex += 1;
      await typing();
    };

    const removeCharFromStringTail = () => new Promise<void>((resolve) => {
      setTextState((prev) => {
        const newTextState = prev.slice(0, -1);
        if (newTextState.length === prev.length) {
          deleteAllFlag = false;
        }
        resolve();
        return newTextState;
      });
    });

    const deleting = async () => {
      if (stop) return;
      if (typingIndex < 0 || typingIndex >= textList[textIndex.current]!.length) {
        typingIndex += 1;
        return;
      }
      await removeCharFromStringTail();
      await delay(deletingSpeed);
      typingIndex -= 1;
      await deleting();
    };

    const deletingAll = async () => {
      if (stop || !deleteAllFlag) {
        typingIndex = 0;
        return;
      }
      await removeCharFromStringTail();
      await delay(deletingSpeed);
      await deletingAll();
    };

    const typingAndDeleting = async () => {
      await typing();
      if (!showTimeList?.[textIndex.current]) {
        typingIndex = 0;
        return;
      }
      await new Promise((resolve) => { setTimeout(resolve, showTimeList[textIndex.current]); });
      await deleting();
    };

    const typingAndDeletingLoop = async () => {
      if (stop) return;
      await typingAndDeleting();
      if (!showTimeList) return;
      await new Promise((resolve) => {
        setTimeout(resolve, 50);
        textIndex.current += 1;
        if (textIndex.current >= textList.length) {
          textIndex.current %= textList.length;
          if (showTimeList?.[textList.length - 1] !== 0) {
            deleteAllFlag = true;
          } else {
            stop = true;
          }
        }
      });
      await deletingAll();
      await typingAndDeletingLoop();
    };

    setTimeout(() => {
      typingAndDeletingLoop().catch(() => { });
    }, 100);

    return () => {
      stop = true;
      setTextState('');
    };
  }, [triggerIndex, typingSpeed, deletingSpeed, showTimeList, textList]);

  return (
    <div
      className={twMerge(
        'inline w-fit h-[72px] font-mono tracking-wide font-bold',
        classNameList[textIndex.current],
      )}
    >
      <span>{textState}</span>
      <span
        className={twMerge(
          'animate-cursor-pulse border-l-4 border-text-primary',
          isUnderlying && 'border-secondary',
        )}
      />
    </div>
  );
}

export default AnimatedTyping;
