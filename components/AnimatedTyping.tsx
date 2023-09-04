import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AnimatedTypingProps {
  textList: string[];
  triggerIndex?: number;
  speed?: number;
  showTime?: number;
  className?: string;
}
function AnimatedTyping({
  textList, triggerIndex, showTime, speed = 200, className = '',
}: AnimatedTypingProps) {
  const [textState, setTextState] = useState('');

  useEffect(() => {
    let textIndex = 0;
    let typingIndex = 0;

    const delay = (ms: number) => new Promise((resolve) => { setTimeout(resolve, ms); });
    const addCharToTextState = () => new Promise<void>((resolve) => {
      setTextState((prev) => {
        const newTextState = `${prev}${textList[textIndex]![typingIndex]!}`;
        typingIndex += 1;
        resolve();
        return newTextState;
      });
    });

    const typing = async () => {
      if (typingIndex < 0 || typingIndex >= textList[textIndex]!.length) {
        setTextState(textList[textIndex]!);
        typingIndex -= 1;
        return;
      }
      await addCharToTextState();
      await delay(speed);
      await typing();
    };

    const removeCharFromStringTail = () => new Promise<void>((resolve) => {
      setTextState((prev) => {
        const newTextState = prev.slice(0, -1);
        typingIndex -= 1;
        resolve();
        return newTextState;
      });
    });

    const deleting = async () => {
      if (typingIndex < 0 || typingIndex >= textList[textIndex]!.length) {
        setTextState('');
        typingIndex += 1;
        return;
      }
      await removeCharFromStringTail();
      await delay(speed);
      await deleting();
    };

    const typingAndDeleting = async () => {
      await typing();
      await new Promise((resolve) => { setTimeout(resolve, showTime); });
      if (showTime) await deleting();
    };

    const typingAndDeletingLoop = async () => {
      await typingAndDeleting();
      await new Promise((resolve) => {
        setTimeout(resolve, 50);
        textIndex += 1;
        textIndex = textIndex >= textList.length ? textIndex % textList.length : textIndex;
      });
      if (showTime && textIndex < textList.length) await typingAndDeletingLoop();
    };

    typingAndDeletingLoop().catch(() => { });

    return () => {
    };
  }, [triggerIndex, speed, showTime, textList]);

  return (
    <div className={twMerge('', className)}>
      {textState}
    </div>
  );
}

export default AnimatedTyping;
