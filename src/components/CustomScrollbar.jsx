import React, { useCallback, useEffect, useRef, useState } from 'react';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function CustomScrollbar({
  children,
  className = '',
  viewportClassName = '',
  contentClassName = '',
  orientation = 'horizontal',
}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const dragStateRef = useRef({
    pointerId: null,
    startClient: 0,
    startScroll: 0,
  });

  const [thumbState, setThumbState] = useState({
    size: 0,
    position: 0,
    visible: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  const isHorizontal = orientation === 'horizontal';

  const readSizes = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return null;
    }

    const viewportSize = isHorizontal ? viewport.clientWidth : viewport.clientHeight;
    const scrollSize = isHorizontal ? viewport.scrollWidth : viewport.scrollHeight;
    const scrollPosition = isHorizontal ? viewport.scrollLeft : viewport.scrollTop;
    const trackSize = isHorizontal ? track.clientWidth : track.clientHeight;

    return {
      viewport,
      viewportSize,
      scrollSize,
      scrollPosition,
      trackSize,
    };
  }, [isHorizontal]);

  const updateThumb = useCallback(() => {
    const sizes = readSizes();

    if (!sizes) {
      return;
    }

    const { viewportSize, scrollSize, scrollPosition, trackSize } = sizes;

    if (scrollSize <= viewportSize + 1 || trackSize <= 0) {
      setThumbState({ size: 0, position: 0, visible: false });
      return;
    }

    const minThumbSize = 34;
    const thumbSize = Math.max((viewportSize / scrollSize) * trackSize, minThumbSize);
    const maxScroll = Math.max(scrollSize - viewportSize, 1);
    const maxThumbTravel = Math.max(trackSize - thumbSize, 1);
    const thumbPosition = (scrollPosition / maxScroll) * maxThumbTravel;

    setThumbState({
      size: thumbSize,
      position: thumbPosition,
      visible: true,
    });
  }, [readSizes]);

  const handlePointerMove = useCallback((event) => {
    const sizes = readSizes();

    if (!sizes || dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    const { viewport, viewportSize, scrollSize, trackSize } = sizes;

    if (scrollSize <= viewportSize || trackSize <= 0) {
      return;
    }

    const pointerPosition = isHorizontal ? event.clientX : event.clientY;
    const pointerDelta = pointerPosition - dragStateRef.current.startClient;

    const minThumbSize = 34;
    const thumbSize = Math.max((viewportSize / scrollSize) * trackSize, minThumbSize);
    const maxThumbTravel = Math.max(trackSize - thumbSize, 1);
    const maxScroll = Math.max(scrollSize - viewportSize, 1);

    const scrollDelta = (pointerDelta / maxThumbTravel) * maxScroll;
    const nextScroll = dragStateRef.current.startScroll + scrollDelta;

    if (isHorizontal) {
      viewport.scrollLeft = nextScroll;
    } else {
      viewport.scrollTop = nextScroll;
    }
  }, [isHorizontal, readSizes]);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', stopDragging);
    window.removeEventListener('pointercancel', stopDragging);
  }, [handlePointerMove]);

  const onThumbPointerDown = useCallback(
    (event) => {
      const viewport = viewportRef.current;

      if (!viewport) {
        return;
      }

      event.preventDefault();

      dragStateRef.current = {
        pointerId: event.pointerId,
        startClient: isHorizontal ? event.clientX : event.clientY,
        startScroll: isHorizontal ? viewport.scrollLeft : viewport.scrollTop,
      };

      setIsDragging(true);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', stopDragging);
      window.addEventListener('pointercancel', stopDragging);
    },
    [handlePointerMove, isHorizontal, stopDragging],
  );

  const onTrackPointerDown = useCallback(
    (event) => {
      if (!trackRef.current || !viewportRef.current) {
        return;
      }

      if (event.target !== trackRef.current) {
        return;
      }

      const sizes = readSizes();

      if (!sizes) {
        return;
      }

      const { viewport, viewportSize, scrollSize, trackSize } = sizes;

      if (scrollSize <= viewportSize || trackSize <= 0) {
        return;
      }

      const rect = trackRef.current.getBoundingClientRect();
      const clickPosition = isHorizontal ? event.clientX - rect.left : event.clientY - rect.top;

      const minThumbSize = 34;
      const thumbSize = Math.max((viewportSize / scrollSize) * trackSize, minThumbSize);
      const maxThumbTravel = Math.max(trackSize - thumbSize, 1);
      const maxScroll = Math.max(scrollSize - viewportSize, 1);

      const thumbOffset = clamp(clickPosition - thumbSize / 2, 0, maxThumbTravel);
      const nextScroll = (thumbOffset / maxThumbTravel) * maxScroll;

      if (isHorizontal) {
        viewport.scrollTo({ left: nextScroll, behavior: 'smooth' });
      } else {
        viewport.scrollTo({ top: nextScroll, behavior: 'smooth' });
      }
    },
    [isHorizontal, readSizes],
  );

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    updateThumb();
    viewport.addEventListener('scroll', updateThumb, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateThumb();
    });

    resizeObserver.observe(viewport);
    if (viewport.firstElementChild) {
      resizeObserver.observe(viewport.firstElementChild);
    }

    return () => {
      viewport.removeEventListener('scroll', updateThumb);
      resizeObserver.disconnect();
      stopDragging();
    };
  }, [stopDragging, updateThumb]);

  const thumbStyle = isHorizontal
    ? {
        width: `${thumbState.size}px`,
        transform: `translateX(${thumbState.position}px)`,
      }
    : {
        height: `${thumbState.size}px`,
        transform: `translateY(${thumbState.position}px)`,
      };

  return (
    <div className={`custom-scrollbar ${isHorizontal ? 'custom-scrollbar--horizontal' : 'custom-scrollbar--vertical'} ${className}`.trim()}>
      <div
        ref={viewportRef}
        className={`custom-scrollbar__viewport ${viewportClassName}`.trim()}
      >
        <div className={contentClassName}>{children}</div>
      </div>

      {thumbState.visible && (
        <div
          ref={trackRef}
          className={`custom-scrollbar__track ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={onTrackPointerDown}
        >
          <div
            className="custom-scrollbar__thumb"
            style={thumbStyle}
            onPointerDown={onThumbPointerDown}
          />
        </div>
      )}
    </div>
  );
}
