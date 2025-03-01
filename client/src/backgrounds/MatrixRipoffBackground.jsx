import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

export default function MatrixRipoffBackground() {
  const canvasRef = useRef();
  useEffect(() => {
    const sketch = (p) => {
      const pointList = [];
      const numPoints = 500;
      const pointRadius = 15;
      const speed = 1;
      const fontSize = 24;
      const textColor = p.color(0, 255, 0);
      const backgroundColor = p.color(16, 16, 16);
      const makePoint = (canvasWidth, canvasHeight) => {
        return {
          x: p.random(pointRadius, canvasWidth - pointRadius),
          y: p.random(pointRadius, canvasHeight - pointRadius),
          vX: p.random(-1, 1) * speed,
          vY: p.random(-1, 1) * speed,
          val: Math.floor(Math.random() * 2).toString()
        };
      };
      p.setup = () => {
        const canvasWidth = canvasRef.current.clientWidth;
        const canvasHeight = canvasRef.current.clientHeight;
        const canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent(canvasRef.current);
        for (let i = 0; i < numPoints; ++i) {
          pointList.push(makePoint(canvasWidth, canvasHeight));
        }
      };
      p.draw = () => {
        const canvasWidth = canvasRef.current.clientWidth;
        const canvasHeight = canvasRef.current.clientHeight;
        p.background(backgroundColor);
        p.stroke(0);
        p.fill(textColor);
        p.textSize(fontSize);
        for (let i = 0; i < pointList.length; ++i) {
          pointList[i].x += pointList[i].vX;
          pointList[i].y += pointList[i].vY;
          if (pointList[i].x - pointRadius <= 0 || pointList[i].x + pointRadius >= canvasWidth) {
            pointList[i].vX *= -1;
          }
          if (pointList[i].y - pointRadius <= 0 || pointList[i].y + pointRadius >= canvasHeight) {
            pointList[i].vY *= -1;
          }
          p.text(pointList[i].val, pointList[i].x, pointList[i].y);
        }
      };
      const handleResize = () => {
        const newCanvasWidth = canvasRef.current.clientWidth;
        const newCanvasHeight = canvasRef.current.clientHeight;
        const widthUpperBound = newCanvasWidth - pointRadius - 1;
        const heightUpperBound = newCanvasHeight - pointRadius - 1;
        p.resizeCanvas(newCanvasWidth, newCanvasHeight);
        for (let i = 0; i < pointList.length; ++i) {
          pointList[i].x = p.constrain(pointList[i].x, pointRadius, widthUpperBound);
          pointList[i].y = p.constrain(pointList[i].y, pointRadius, heightUpperBound);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => {
        p.remove();
        window.removeEventListener('resize', handleResize);
      };
    };
    const p5Instance = new p5(sketch);
    return () => {
      p5Instance.remove();
    };
  }, []);
  return (
    <div ref={canvasRef} className="w-full h-screen"/>
  );
}