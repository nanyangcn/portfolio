import { useEffect } from 'react';

interface DragProviderProps<T> {
  list: T[],
  swapItems: (index1: number, index2: number) => void
  draggableId: string
  children: React.ReactNode;
}

function DragProvider<T>({
  list, swapItems, draggableId, children,
}: DragProviderProps<T>) {
  useEffect(() => {
    let dragged: HTMLElement;
    const handleDragStart = (event: DragEvent) => {
      dragged = event.target as HTMLElement;
    };

    // const handleDrag = (event: DragEvent) => {
    // };

    const handleDragEnter = (event: DragEvent) => {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.classList.contains(`${draggableId}-drop-zone`)) return;
      if (targetElement.id !== dragged.id) {
        targetElement.style.backgroundColor = '#4E4E4E';
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDragLeave = (event: DragEvent) => {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.classList.contains(`${draggableId}-drop-zone`)) return;
      targetElement.removeAttribute('style');
    };

    const handleDrop = (event: DragEvent) => {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.classList.contains(`${draggableId}-drop-zone`)) return;
      targetElement.removeAttribute('style');
      const draggedIndex = Number(dragged.id.split('-').at(-1));
      const targetIndex = Number(targetElement.id.split('-').at(-1));
      swapItems(draggedIndex, targetIndex);
    };

    // const handleDragEnd = () => {
    // };

    const addDragEvents = (element: HTMLElement | null) => {
      if (!element) return;
      element.addEventListener('dragstart', handleDragStart);
      // element.addEventListener('drag', handleDrag);
      element.addEventListener('dragenter', handleDragEnter);
      element.addEventListener('dragover', handleDragOver);
      element.addEventListener('dragleave', handleDragLeave);
      element.addEventListener('drop', handleDrop);
      // element.addEventListener('dragend', handleDragEnd);
    };

    const removeDragEvents = (element: HTMLElement | null) => {
      if (!element) return;
      element.removeEventListener('dragstart', handleDragStart);
      // element.removeEventListener('drag', handleDrag);
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('drop', handleDrop);
      // element.removeEventListener('dragend', handleDragEnd);
    };

    const draggableItems = list.map((_, index) => document.getElementById(`${draggableId}-${index}`));

    draggableItems.forEach((item) => {
      addDragEvents(item);
    });

    return () => {
      draggableItems.forEach((item) => {
        removeDragEvents(item);
      });
    };
  }, [list, swapItems, draggableId]);
  return (
    children
  );
}

export default DragProvider;
