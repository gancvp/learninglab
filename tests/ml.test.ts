import { describe, expect, it } from "vitest";
import {
  crossEntropyLoss,
  generateLinearData,
  gradientStep,
  meanSquaredError,
  projectPcaLike,
  runGradientDescent,
  simulateCentralLimit,
} from "@/lib/ml";

describe("ml utilities", () => {
  it("reduces loss over gradient descent history on toy linear data", () => {
    const data = generateLinearData(0.4, 18);
    const history = runGradientDescent(data, 0.01, 18);
    expect(history[history.length - 1].loss).toBeLessThan(history[0].loss);
  });

  it("computes a useful first gradient step", () => {
    const data = generateLinearData(0, 12);
    const initialLoss = meanSquaredError(data, 0, 0);
    const step = gradientStep(data, 0, 0, 0.05);
    const nextLoss = meanSquaredError(data, step.nextWeight, step.nextBias);
    expect(nextLoss).toBeLessThan(initialLoss);
  });

  it("punishes confident wrong classification with larger cross-entropy", () => {
    const wrong = crossEntropyLoss(0.05, 1);
    const better = crossEntropyLoss(0.8, 1);
    expect(wrong).toBeGreaterThan(better);
  });

  it("creates central-limit sample means", () => {
    const samples = simulateCentralLimit(4, 10);
    expect(samples).toHaveLength(10);
    expect(samples.every((sample) => typeof sample.mean === "number")).toBe(true);
  });

  it("projects pca-like points into a simpler axis", () => {
    const projected = projectPcaLike([{ x: 1, y: 1 }]);
    expect(projected[0].projectedY).toBe(0);
  });
});
