import * as tmImage from '@teachablemachine/image';

import { Model } from './shared';

export class TeachableMachine extends Model {
  #baseUrl: string;
  #model: tmImage.CustomMobileNet | null = null;

  constructor(baseUrl: string) {
    super();
    this.#baseUrl = baseUrl;
  }

  async start() {
    this.#model = await tmImage.load(`${this.#baseUrl}/model.json`, `${this.#baseUrl}/metadata.json`);
  }

  async predict(canvas: HTMLCanvasElement) {
    const [prediction] = (await this.#model?.predictTopK(canvas, 1)) || [];
    if (!prediction) return null;
    return { label: prediction.className, probability: prediction.probability };
  }
}
