export type Point = {
  x: number;
  y: number;
  label?: 0 | 1;
};

export type RegressionHistoryPoint = {
  epoch: number;
  loss: number;
  weight: number;
  bias: number;
};

const round = (value: number, digits = 3) =>
  Number(value.toFixed(digits));

export function generateLinearData(noise: number, count = 24): Point[] {
  return Array.from({ length: count }, (_, index) => {
    const x = index / 2;
    const jitter = Math.sin(index * 1.7) * noise;
    return { x: round(x), y: round(1.8 * x + 6 + jitter) };
  });
}

export function meanSquaredError(
  data: Point[],
  weight: number,
  bias: number,
): number {
  const total = data.reduce((sum, point) => {
    const prediction = weight * point.x + bias;
    return sum + (prediction - point.y) ** 2;
  }, 0);

  return total / data.length;
}

export function gradientStep(
  data: Point[],
  weight: number,
  bias: number,
  learningRate: number,
) {
  const size = data.length;
  const gradients = data.reduce(
    (accumulator, point) => {
      const prediction = weight * point.x + bias;
      const error = prediction - point.y;
      return {
        weightGradient: accumulator.weightGradient + (2 / size) * point.x * error,
        biasGradient: accumulator.biasGradient + (2 / size) * error,
      };
    },
    { weightGradient: 0, biasGradient: 0 },
  );

  const nextWeight = weight - learningRate * gradients.weightGradient;
  const nextBias = bias - learningRate * gradients.biasGradient;

  return {
    weightGradient: round(gradients.weightGradient),
    biasGradient: round(gradients.biasGradient),
    nextWeight: round(nextWeight),
    nextBias: round(nextBias),
  };
}

export function runGradientDescent(
  data: Point[],
  learningRate: number,
  epochs: number,
): RegressionHistoryPoint[] {
  const history: RegressionHistoryPoint[] = [];
  let weight = 0;
  let bias = 0;

  for (let epoch = 0; epoch <= epochs; epoch += 1) {
    history.push({
      epoch,
      loss: round(meanSquaredError(data, weight, bias)),
      weight: round(weight),
      bias: round(bias),
    });

    const step = gradientStep(data, weight, bias, learningRate);
    weight = step.nextWeight;
    bias = step.nextBias;
  }

  return history;
}

export function sigmoid(value: number) {
  return 1 / (1 + Math.exp(-value));
}

export function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function variance(values: number[]) {
  const avg = mean(values);
  return values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / values.length;
}

export function crossEntropyLoss(probability: number, truth: 0 | 1) {
  const clipped = Math.min(0.999, Math.max(0.001, probability));
  return -(truth * Math.log(clipped) + (1 - truth) * Math.log(1 - clipped));
}

export function generateClassificationData(noise: number): Point[] {
  return Array.from({ length: 20 }, (_, index) => {
    const x = index % 5;
    const yBase = Math.floor(index / 5);
    const wave = Math.sin(index * 1.5) * noise;
    const y = yBase + wave;
    const label = x + y > 3.8 ? 1 : 0;
    return { x: round(x), y: round(y), label };
  });
}

export function zScoreScale(values: number[]) {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  const std = Math.sqrt(variance) || 1;

  return values.map((value) => round((value - mean) / std));
}

export function simpleTrainValidationTestSplit<T>(items: T[]) {
  const trainEnd = Math.floor(items.length * 0.6);
  const validationEnd = Math.floor(items.length * 0.8);
  return {
    train: items.slice(0, trainEnd),
    validation: items.slice(trainEnd, validationEnd),
    test: items.slice(validationEnd),
  };
}

export function simulateCoinTosses(trials: number, headProbability: number) {
  let heads = 0;
  const history = Array.from({ length: trials }, (_, index) => {
    // We use a deterministic wave instead of Math.random so the chart is stable for teaching.
    const pseudoRandom = (Math.sin((index + 1) * 12.9898) + 1) / 2;
    if (pseudoRandom < headProbability) {
      heads += 1;
    }
    return {
      trial: index + 1,
      empirical: round(heads / (index + 1), 3),
      theoretical: round(headProbability, 3),
    };
  });

  return history;
}

export function simulateCentralLimit(sampleSize: number, repetitions = 20) {
  return Array.from({ length: repetitions }, (_, sampleIndex) => {
    const sample = Array.from({ length: sampleSize }, (_, itemIndex) => {
      const raw = (Math.sin((sampleIndex + 1) * (itemIndex + 2) * 1.7) + 1) / 2;
      return round(raw * 10, 2);
    });
    return {
      sample: sampleIndex + 1,
      mean: round(mean(sample), 2),
    };
  });
}

export function projectPcaLike(points: Array<{ x: number; y: number }>) {
  return points.map((point) => ({
    ...point,
    projectedX: round((point.x + point.y) / Math.sqrt(2), 2),
    projectedY: 0,
  }));
}

export function computeNeuralNetworkStep(inputs: [number, number], target: number) {
  const inputToHidden = [
    [0.8, -0.3],
    [0.4, 0.6],
  ];
  const hiddenBias = [0.1, -0.2];
  const hiddenLinear = inputToHidden.map(
    (weights, index) => weights[0] * inputs[0] + weights[1] * inputs[1] + hiddenBias[index],
  );
  const hiddenActivation = hiddenLinear.map((value) => Math.max(0, value));
  const outputWeights = [1.1, -0.7];
  const outputBias = 0.05;
  const output =
    hiddenActivation[0] * outputWeights[0] + hiddenActivation[1] * outputWeights[1] + outputBias;
  const loss = 0.5 * (output - target) ** 2;
  const outputGradient = output - target;
  const outputWeightUpdates = hiddenActivation.map(
    (activation) => round(outputGradient * activation),
  );

  return {
    hiddenLinear: hiddenLinear.map((value) => round(value)),
    hiddenActivation: hiddenActivation.map((value) => round(value)),
    output: round(output),
    loss: round(loss),
    outputGradient: round(outputGradient),
    outputWeightUpdates,
  };
}
