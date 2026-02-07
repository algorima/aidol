import { useRef, useState } from "react";

interface UseDragScrollOptions {
  sensitivity?: number;
}

export const useDragScroll = ({ sensitivity = 1.5 }: UseDragScrollOptions = {}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    setHasDragged(true);
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * sensitivity;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    scrollRef,
    isDragging,
    hasDragged,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
