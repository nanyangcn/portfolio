import { useEffect, useState } from 'react';

function DragTest() {
  const [listState, setListState] = useState([1, 2, 3]);

  function switchTwoItemsInList<T>(list: T[], index1: number, index2: number) {
    if (index1 < 0 || index1 >= list.length || index2 < 0 || index2 >= list.length) {
      throw new Error('Invalid indices');
    }
    const newList = [...list];
    [newList[index1], newList[index2]] = [newList[index2], newList[index1]];

    return newList;
  }

  useEffect(() => {
    let dragged: HTMLElement;
    const handleDragStart = (event: DragEvent) => {
      dragged = event.target as HTMLElement;
    };

    const handleDrag = (event: DragEvent) => {
      // console.log('drag');
    };

    const handleDragEnter = (event: DragEvent) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement.id !== dragged.id) {
        targetElement.style.backgroundColor = 'red';
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDragLeave = (event: DragEvent) => {
      const targetElement = event.target as HTMLElement;
      targetElement.removeAttribute('style');
    };

    const handleDrop = (event: DragEvent) => {
      const targetElement = event.target as HTMLElement;
      targetElement.removeAttribute('style');
      const draggedIndex = Number(dragged.id.split('-').at(-1));
      const targetIndex = Number(targetElement.id.split('-').at(-1));
      if (!draggedIndex || !targetIndex) return;
      const newList = switchTwoItemsInList<number>(listState, draggedIndex - 1, targetIndex - 1);
      setListState(newList);
    };

    const handleDragEnd = () => {
      // console.log('dragend');
    };

    const dragItems = listState.map((item) => document.getElementById(`drag-item-${item}`));
    const addDragEvents = (element: HTMLElement | null) => {
      if (!element) return;
      element.addEventListener('dragstart', handleDragStart);
      element.addEventListener('drag', handleDrag);
      element.addEventListener('dragenter', handleDragEnter);
      element.addEventListener('dragover', handleDragOver);
      element.addEventListener('dragleave', handleDragLeave);
      element.addEventListener('drop', handleDrop);
      element.addEventListener('dragend', handleDragEnd);
    };

    const removeDragEvents = (element: HTMLElement | null) => {
      if (!element) return;
      element.removeEventListener('dragstart', handleDragStart);
      element.removeEventListener('drag', handleDrag);
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('drop', handleDrop);
      element.removeEventListener('dragend', handleDragEnd);
    };

    dragItems.forEach((item) => {
      addDragEvents(item);
    });

    return () => {
      dragItems.forEach((item) => {
        removeDragEvents(item);
      });
    };
  }, [listState]);

  return (
    <div
      id="drag-container"
      className="flex w-min gap-x-4 border-2 border-primary p-2"
    >
      {listState.map((item) => (
        <div
          key={item}
          id={`drag-item-${item}`}
          className="flex h-12 w-20 select-all items-center justify-center border-2 border-primary hover:cursor-pointer"
          draggable="true"
        >
          <p className="pointer-events-none select-none">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DragTest;
