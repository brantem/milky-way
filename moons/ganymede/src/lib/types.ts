export type File = {
  key: string;
  body: string;
};

export type Prediction = {
  label: string | number;
  probability: number;
};

export type Path = {
  id: string;
  color: string;
  d: string;

  prediction?: Prediction;
};

export type ModelOpts = {
  type: 'onnx' | 'teachable_machine';
  urls: {
    [key: string]: string;
  };
  input: {
    width: number;
    height: number;
    background?: string;
  };
};
