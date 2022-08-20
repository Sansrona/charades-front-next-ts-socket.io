import React from "react";
import styles from "./Canvas.module.scss";

export type PaintProps = {
  x: number;
  y: number;
  mx: number;
  my: number;
};

type CanvasProps = {
  onMouseMove: (data: PaintProps) => void;
  onInit: (ref: CanvasRenderingContext2D) => void;
  onClear: () => void;
};

const Canvas: React.FC<CanvasProps> = ({ onMouseMove, onInit, onClear }) => {
  const rootRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (rootRef.current) {
      const ctx = rootRef.current.getContext("2d");
      rootRef.current.width = 1000;
      rootRef.current.height = 600;

      if (ctx) {
        onInit(ctx);
        ctx.lineCap = "round";
        ctx.lineWidth = 8;
        ctx.strokeStyle = "red";

        rootRef.current.addEventListener("mousemove", (e) => {
          const x = e.offsetX;
          const y = e.offsetY;
          const mx = e.movementX;
          const my = e.movementY;
          if (e.buttons > 0) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - mx, y - my);
            ctx.stroke();
            ctx.closePath();
            onMouseMove({ x, y, mx, my });
          }
        });
      }
    }
  }, []);

  return (
    <div>
      <canvas ref={rootRef} className={styles.root} />
      <button onClick={onClear}>Clear</button>
    </div>
  );
};

export default Canvas;
