import { useEffect, useRef } from 'react';

import { getBoundingClientRectById, getPath } from '../lib/helpers';
import { Onnx, TeachableMachine, type Model } from '../lib/model';
import { useAppState } from '../lib/state';

const TempPath = () => {
  const [state] = useAppState();
  if (!state.points.length) return null;
  return <path d={getPath(state.points)} fill={state.color} />;
};

const Canvas = () => {
  const [state, set] = useAppState();
  const model = useRef<Model | null>(null);
  const initialPointRef = useRef<number[]>();

  useEffect(() => {
    (async () => {
      if (!state.model) {
        if (model.current) model.current = null;
        return;
      }

      const { type, urls, input } = state.model;
      switch (type) {
        case 'onnx':
          model.current = new Onnx(urls['modelUrl'], input);
          break;
        case 'teachable_machine':
          model.current = new TeachableMachine(urls['baseUrl']);
          break;
      }
      await model.current.start();
    })();
  }, [state.model]);

  // TODO: loading

  return (
    <svg
      className="absolute inset-0 h-full w-full z-[9] touch-none"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        const rect = (e.target as any).getBoundingClientRect();
        (e.target as any).setPointerCapture(e.pointerId);
        initialPointRef.current = [e.pageX - rect.x - window.scrollX, e.pageY - rect.y - window.scrollY, e.pressure];
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        if (initialPointRef.current) {
          set.addPoint(initialPointRef.current);
          initialPointRef.current = undefined;
        }
        const rect = (e.target as any).getBoundingClientRect();
        set.addPoint([e.pageX - rect.x - window.scrollX, e.pageY - rect.y - window.scrollY, e.pressure]);
      }}
      onPointerUp={async () => {
        const path = set.createPath();
        if (!path || !state.model || !model.current) return;
        await new Promise((resolve) => setTimeout(resolve, 50)); // next tick

        const { type, input } = state.model;

        const rect = getBoundingClientRectById(path.id);
        if (!rect) return;

        const canvas = document.createElement('canvas');
        canvas.width = input.width;
        canvas.height = input.height;

        const ctx = canvas.getContext('2d')!;
        if (input.background) {
          ctx.fillStyle = input.background;
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
        switch (type) {
          case 'onnx':
            res = model.current.predict(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
            break;
          case 'teachable_machine':
            res = model.current.predict(canvas);
            break;
        }
        res.then((prediction) => {
          if (!prediction) return;
          set.addPrediction(path.id, prediction);
        });
      }}
    >
      <TempPath />
    </svg>
  );
};

export default Canvas;
