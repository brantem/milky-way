import { useEffect, useRef, useState } from 'react';

import { getBoundingClientRectById, getPath } from '../lib/helpers';
import { Onnx, TeachableMachine, type Model } from '../lib/model';
import { useAppState } from '../lib/state';
import { STROKE_SIZE } from '../lib/constants';
import { Path } from '../lib/types';

type TempPathProps = {
  points: number[][];
};

const TempPath = ({ points }: TempPathProps) => {
  const [state] = useAppState();
  if (!points.length) return null;
  return <path d={getPath(points)} fill={state.color} />;
};

const getPoint = (el: Element, pageX: number, pageY: number, pressure: number) => {
  const rect = el.getBoundingClientRect();
  const x = pageX - rect.x - window.scrollX;
  const y = pageY - rect.y - window.scrollY;
  const min = STROKE_SIZE / 2 - 4;
  const maxX = rect.width - STROKE_SIZE / 2 + 4;
  const maxY = rect.height - STROKE_SIZE / 2 + 4;
  return [x > maxX ? maxX : x < min ? min : x, y > maxY ? maxY : y < min ? min : y, pressure];
};

const Canvas = () => {
  const [state, set] = useAppState();
  const model = useRef<Model | null>(null);
  const initialPointRef = useRef<number[]>();

  const [points, setPoints] = useState<number[][]>([]);

  const predict = (path: Path) => {
    const rect = getBoundingClientRectById(path.id);
    if (!rect) return;

    const canvas = document.createElement('canvas');
    canvas.width = set.model!.input.width;
    canvas.height = set.model!.input.height;

    const ctx = canvas.getContext('2d')!;
    if (set.model!.input.background) {
      ctx.fillStyle = set.model!.input.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const scale = Math.min(scaleX, scaleY);
    ctx.scale(scale, scale);

    const paddingX = (canvas.width - rect.width * scale) / 2;
    const paddingY = (canvas.height - rect.height * scale) / 2;
    ctx.translate(
      -(rect.x - window.scrollX) - rect.width / 2 + paddingX,
      -(rect.y - window.scrollY) - rect.height / 2 + paddingY,
    );

    ctx.fillStyle = '#000';
    ctx.fill(new Path2D(path.d));

    let res;
    switch (set.model!.type) {
      case 'onnx':
        res = model.current!.predict(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
        break;
      case 'teachable_machine':
        res = model.current!.predict(canvas);
        break;
    }
    res.then((prediction) => {
      if (!prediction) return;
      set.addPrediction(path.id, prediction);
    });
  };

  useEffect(() => {
    (async () => {
      if (!state.model) {
        if (model.current) model.current = null;
        return;
      }

      const { type, urls, input } = state.model;
      switch (type) {
        case 'onnx':
          model.current = new Onnx(urls['wasmPath'], urls['modelUrl'], input);
          break;
        case 'teachable_machine':
          model.current = new TeachableMachine(urls['baseUrl']);
          break;
      }
      set.isModelStarting = true;
      await model.current.start();
      set.isModelStarting = false;

      for (const path of state.paths) {
        if ('prediction' in path) continue;
        predict(path);
      }
    })();
  }, [state.model]);

  return (
    <svg
      className="absolute inset-0 h-[calc(100%-theme(spacing.14))] w-full z-[9] touch-none"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        const el = e.target as HTMLElement;
        el.setPointerCapture(e.pointerId);
        initialPointRef.current = getPoint(el, e.pageX, e.pageY, e.pressure);
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        const initialPoint = initialPointRef.current;
        if (initialPoint) {
          setPoints((prev) => [...prev, initialPoint]);
          initialPointRef.current = undefined;
        }
        setPoints((prev) => [...prev, getPoint(e.target as HTMLElement, e.pageX, e.pageY, e.pressure)]);
      }}
      onPointerUp={async () => {
        const path = set.createPath(points);
        setPoints([]);
        if (!path || !set.model || !model.current) return;
        await new Promise((resolve) => setTimeout(resolve, 50)); // next tick
        predict(path);
      }}
    >
      <TempPath points={points} />
    </svg>
  );
};

export default Canvas;
