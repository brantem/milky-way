import { InferenceSession, Tensor } from 'onnxruntime-web';

import { Model } from './shared';

import { Prediction, ModelOpts } from '../types';

const softmax = (arr: number[]) => {
  const C = Math.max(...arr);
  const d = arr.map((y) => Math.exp(y - C)).reduce((a, b) => a + b);
  return arr.map((value) => Math.exp(value - C) / d);
};

const getResult = (output: number[]): Prediction => {
  if (output.reduce((a, b) => a + b, 0) === 0) return { label: -1, probability: 1 };
  return output.reduce(
    (prediction, probability, label) => {
      if (probability > output[prediction.label]) return { label, probability };
      return prediction;
    },
    { label: 0, probability: 1 },
  );
};

export class Onnx extends Model {
  #modelUrl: string;
  #input: ModelOpts['input'];
  #session: InferenceSession | null = null;

  constructor(modelUrl: string, input: ModelOpts['input']) {
    super();
    this.#modelUrl = modelUrl;
    this.#input = input;
  }

  async start() {
    if (!this.#modelUrl) return;
    const response = await fetch(this.#modelUrl);
    const buf = await response.arrayBuffer();
    this.#session = await InferenceSession.create(buf);

    const size = this.#input.width * this.#input.height;
    const tensor = new Tensor('float32', new Float32Array(size), [1, 1, this.#input.width, this.#input.height]);
    for (let i = 0; i < size; i++) tensor.data[i] = Math.random() * 2.0 - 1.0;
    try {
      await this.#session.run({ [this.#session.inputNames[0]]: tensor });
    } catch (e) {
      console.error(e);
    }
  }

  async predict(data: ImageData['data']) {
    if (!this.#session) return null;

    const input = new Float32Array(this.#input.width * this.#input.height);
    for (let i = 0, len = data.length; i < len; i += 4) {
      input[i / 4] = data[i + 3] / 255;
    }
    const tensor = new Tensor('float32', input, [1, 1, this.#input.width, this.#input.height]);

    try {
      const output = (await this.#session.run({ [this.#session.inputNames[0]]: tensor }))[this.#session.outputNames[0]];
      const a = softmax(Array.prototype.slice.call(output.data));
      return getResult(a);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
