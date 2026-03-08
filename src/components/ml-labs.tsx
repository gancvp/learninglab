"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { learningPath, sectionCards } from "@/lib/content";
import {
  computeNeuralNetworkStep,
  crossEntropyLoss,
  generateClassificationData,
  generateLinearData,
  gradientStep,
  mean,
  projectPcaLike,
  runGradientDescent,
  simulateCentralLimit,
  simulateCoinTosses,
  sigmoid,
  simpleTrainValidationTestSplit,
  zScoreScale,
  variance,
} from "@/lib/ml";

type DashboardSectionProps = {
  onJump: (sectionId: string) => void;
};

export function DashboardSection({ onJump }: DashboardSectionProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Home Dashboard</p>
          <h2>AI Learning Lab</h2>
          <p className="muted">
            A local-first study space for AI/ML interviews, fundamentals, and hands-on demos.
          </p>
        </div>
        <div className="hero-chip-row">
          <span className="chip">Local Ollama-ready</span>
          <span className="chip">Interactive visuals</span>
          <span className="chip">Beginner-safe explanations</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {sectionCards.map((card) => (
          <button
            key={card.id}
            className="dashboard-card"
            onClick={() => onJump(card.id)}
            style={{ borderColor: card.accent }}
          >
            <span className="card-accent" style={{ background: card.accent }} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </button>
        ))}
      </div>

      <div className="learning-path">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Suggested Order</p>
            <h3>Learning Path</h3>
          </div>
        </div>
        <div className="path-grid">
          {learningPath.map((step, index) => (
            <div key={step} className="path-step">
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="panel inset-panel">
        <h3>Vibe-coding workflow in VS Code / Codex</h3>
        <p>
          Start with one small request, ask Codex to explain the changed files, run the app after each step, and keep prompts focused on one safe incremental feature at a time.
        </p>
        <div className="path-grid">
          {[
            "Describe the current app state",
            "Request one small feature",
            "Ask for the exact files changed",
            "Run and verify locally",
            "Refine based on what you observed",
          ].map((step, index) => (
            <div key={step} className="path-step">
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LossGradientLab() {
  const [learningRate, setLearningRate] = React.useState(0.01);
  const [epochs, setEpochs] = React.useState(24);
  const [noise, setNoise] = React.useState(2);
  const [classificationLogit, setClassificationLogit] = React.useState(0.4);
  const [truth, setTruth] = React.useState<0 | 1>(1);

  const data = React.useMemo(() => generateLinearData(noise), [noise]);
  const history = React.useMemo(
    () => runGradientDescent(data, learningRate, epochs),
    [data, learningRate, epochs],
  );
  const current = history[Math.min(1, history.length - 1)];
  const next = history[Math.min(2, history.length - 1)];
  const firstStep = React.useMemo(() => gradientStep(data, 0, 0, learningRate), [data, learningRate]);
  const probability = sigmoid(classificationLogit);
  const ceLoss = crossEntropyLoss(probability, truth);
  const logitGradient = probability - truth;

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Important Lesson</p>
          <h2>Loss Function + Gradient Descent</h2>
          <p className="muted">
            Loss tells us how wrong we are. Gradient tells us which way to move. Learning rate tells us how big a step to take.
          </p>
        </div>
      </div>

      <div className="concept-grid">
        <article className="concept-card">
          <h3>Simple explanation</h3>
          <p>Prediction is the model&apos;s guess. True value is the correct answer. Error is guess minus truth. Loss turns that error into one number to optimize.</p>
        </article>
        <article className="concept-card">
          <h3>Intuition</h3>
          <p>Imagine walking downhill in fog. The gradient is the slope under your feet, and the learning rate decides whether you take tiny steps or giant risky steps.</p>
        </article>
        <article className="concept-card">
          <h3>Interview takeaway</h3>
          <p>Say this: &quot;Training is repeated prediction, loss measurement, gradient calculation, and parameter updates.&quot;</p>
        </article>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Linear regression with mean squared error</h3>
          <div className="control-grid">
            <label>
              Learning rate
              <input
                type="range"
                min="0.01"
                max="0.2"
                step="0.01"
                value={learningRate}
                onChange={(event) => setLearningRate(Number(event.target.value))}
              />
              <span>{learningRate.toFixed(2)}</span>
            </label>
            <label>
              Epochs
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={epochs}
                onChange={(event) => setEpochs(Number(event.target.value))}
              />
              <span>{epochs}</span>
            </label>
            <label>
              Noise
              <input
                type="range"
                min="0"
                max="4"
                step="0.5"
                value={noise}
                onChange={(event) => setNoise(Number(event.target.value))}
              />
              <span>{noise.toFixed(1)}</span>
            </label>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>Current prediction</span>
              <strong>{(current.weight * 4 + current.bias).toFixed(2)}</strong>
            </div>
            <div className="stat-card">
              <span>True value at x = 4</span>
              <strong>{data.find((point) => point.x === 4)?.y ?? "n/a"}</strong>
            </div>
            <div className="stat-card">
              <span>Loss value</span>
              <strong>{current.loss.toFixed(2)}</strong>
            </div>
            <div className="stat-card">
              <span>Gradient direction</span>
              <strong>{firstStep.weightGradient < 0 ? "Increase weight" : "Decrease weight"}</strong>
            </div>
            <div className="stat-card">
              <span>Updated weight</span>
              <strong>{next.weight.toFixed(2)}</strong>
            </div>
            <div className="stat-card">
              <span>Updated bias</span>
              <strong>{next.bias.toFixed(2)}</strong>
            </div>
          </div>

          <div className="chart-card">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="loss" stroke="#d97757" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="caption">Live chart: as gradient descent progresses, the loss should usually move downward.</p>
        </div>

        <div className="panel inset-panel">
          <h3>Classification with cross-entropy</h3>
          <div className="control-grid">
            <label>
              Model logit
              <input
                type="range"
                min="-4"
                max="4"
                step="0.1"
                value={classificationLogit}
                onChange={(event) => setClassificationLogit(Number(event.target.value))}
              />
              <span>{classificationLogit.toFixed(1)}</span>
            </label>
            <label>
              True label
              <select value={truth} onChange={(event) => setTruth(Number(event.target.value) as 0 | 1)}>
                <option value={1}>1</option>
                <option value={0}>0</option>
              </select>
            </label>
          </div>

          <div className="formula-box">
            <p>Current prediction: <strong>{probability.toFixed(3)}</strong></p>
            <p>True value: <strong>{truth}</strong></p>
            <p>Loss value: <strong>{ceLoss.toFixed(3)}</strong></p>
            <p>Gradient direction: <strong>{logitGradient > 0 ? "Move probability down" : "Move probability up"}</strong></p>
            <p>Updated parameter after one step: <strong>{(classificationLogit - 0.2 * logitGradient).toFixed(3)}</strong></p>
          </div>

          <div className="mini-lesson">
            <h4>Mathematically honest version</h4>
            <p>MSE squares regression errors, so bigger mistakes hurt more. Cross-entropy punishes confident wrong classification much more strongly than small uncertainty.</p>
          </div>
          <div className="mini-lesson">
            <h4>Tiny example</h4>
            <p>If the truth is spam = 1 but the model says 0.10, cross-entropy is high because the model is confidently wrong.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProbabilityStatsLab() {
  const [coinBias, setCoinBias] = React.useState(0.5);
  const [trials, setTrials] = React.useState(40);
  const [sampleSize, setSampleSize] = React.useState(5);

  const scoreSample = [62, 68, 70, 72, 75, 80, 85];
  const scoreMean = mean(scoreSample);
  const scoreVariance = variance(scoreSample);
  const scoreStd = Math.sqrt(scoreVariance);
  const coinHistory = React.useMemo(
    () => simulateCoinTosses(trials, coinBias),
    [trials, coinBias],
  );
  const cltSamples = React.useMemo(
    () => simulateCentralLimit(sampleSize, 24),
    [sampleSize],
  );
  const pcaPoints = React.useMemo(
    () =>
      projectPcaLike([
        { x: 1.2, y: 1.5 },
        { x: 1.9, y: 2.2 },
        { x: 2.6, y: 2.8 },
        { x: 3.2, y: 3.6 },
        { x: 3.9, y: 4.2 },
      ]),
    [],
  );

  const hamPrior = 0.6;
  const spamPrior = 0.4;
  const freeGivenSpam = 0.8;
  const freeGivenHam = 0.1;
  const offerGivenSpam = 0.7;
  const offerGivenHam = 0.2;
  const spamScore = spamPrior * freeGivenSpam * offerGivenSpam;
  const hamScore = hamPrior * freeGivenHam * offerGivenHam;

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Interview Fundamentals</p>
          <h2>Probability + Statistics</h2>
          <p className="muted">
            These are common screening topics because they test whether you understand uncertainty, averages, spread, and dimensionality reduction.
          </p>
        </div>
      </div>

      <div className="concept-grid">
        <article className="concept-card">
          <h3>Probability</h3>
          <p>How likely something is. Values live between 0 and 1.</p>
        </article>
        <article className="concept-card">
          <h3>Statistics</h3>
          <p>Use data to estimate patterns, parameters, and uncertainty.</p>
        </article>
        <article className="concept-card">
          <h3>Expected value</h3>
          <p>The long-run average you expect if the process repeats many times.</p>
        </article>
        <article className="concept-card">
          <h3>Variance</h3>
          <p>How spread out values are around the mean.</p>
        </article>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Basic probability intuition</h3>
          <div className="control-grid">
            <label>
              Probability of heads
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.1"
                value={coinBias}
                onChange={(event) => setCoinBias(Number(event.target.value))}
              />
              <span>{coinBias.toFixed(1)}</span>
            </label>
            <label>
              Trials
              <input
                type="range"
                min="10"
                max="80"
                step="10"
                value={trials}
                onChange={(event) => setTrials(Number(event.target.value))}
              />
              <span>{trials}</span>
            </label>
          </div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={coinHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trial" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="empirical" stroke="#d97757" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="theoretical" stroke="#183b4e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="caption">As trials increase, empirical probability usually gets closer to the theoretical probability.</p>
        </div>

        <div className="panel inset-panel">
          <h3>Mean, variance, and standard deviation</h3>
          <div className="formula-box">
            <p>Sample scores: <strong>{scoreSample.join(", ")}</strong></p>
            <p>Mean: <strong>{scoreMean.toFixed(2)}</strong></p>
            <p>Variance: <strong>{scoreVariance.toFixed(2)}</strong></p>
            <p>Standard deviation: <strong>{scoreStd.toFixed(2)}</strong></p>
          </div>
          <div className="mini-lesson">
            <h4>Interview-safe answer</h4>
            <p>Mean tells you the center. Variance and standard deviation tell you how spread out the data is around that center.</p>
          </div>
          <div className="mini-lesson">
            <h4>Conditional probability</h4>
            <p>P(A | B) means the probability of A after learning B is true. This is the setup for Bayes&apos; theorem.</p>
          </div>
        </div>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Central Limit Theorem</h3>
          <div className="control-grid">
            <label>
              Sample size
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={sampleSize}
                onChange={(event) => setSampleSize(Number(event.target.value))}
              />
              <span>{sampleSize}</span>
            </label>
          </div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={cltSamples}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sample" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="mean" fill="#7cc6fe" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="caption">Each bar is a sample mean. As sample size grows, these means cluster more tightly and look more bell-shaped.</p>
        </div>

        <div className="panel inset-panel">
          <h3>Naive Bayes toy classifier</h3>
          <div className="formula-box">
            <p>Class priors: spam = <strong>{spamPrior}</strong>, ham = <strong>{hamPrior}</strong></p>
            <p>P(free | spam) = <strong>{freeGivenSpam}</strong>, P(free | ham) = <strong>{freeGivenHam}</strong></p>
            <p>P(offer | spam) = <strong>{offerGivenSpam}</strong>, P(offer | ham) = <strong>{offerGivenHam}</strong></p>
            <p>Spam score = <strong>{spamScore.toFixed(3)}</strong></p>
            <p>Ham score = <strong>{hamScore.toFixed(3)}</strong></p>
            <p>Prediction = <strong>{spamScore > hamScore ? "Spam" : "Ham"}</strong></p>
          </div>
          <div className="mini-lesson">
            <h4>Why it is called naive</h4>
            <p>It assumes words behave independently inside a class, which is not fully true but often good enough for a strong baseline.</p>
          </div>
        </div>
      </div>

      <div className="panel inset-panel">
        <h3>PCA intuition</h3>
        <p className="muted">PCA keeps the directions with the most variance and can project correlated 2D data down to a simpler 1D view.</p>
        <div className="two-column">
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={240}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis dataKey="y" />
                <Tooltip />
                <Scatter data={pcaPoints} fill="#3fa796" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={240}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="projectedX" />
                <YAxis dataKey="projectedY" />
                <Tooltip />
                <Scatter data={pcaPoints} fill="#f4b942" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="caption">Left: original correlated points. Right: projection onto one main direction, which is the core PCA idea.</p>
      </div>
    </section>
  );
}

export function ClassicMlLab() {
  const [noise, setNoise] = React.useState(1);
  const [learningRate, setLearningRate] = React.useState(0.01);
  const [epochs, setEpochs] = React.useState(24);
  const [featureCount, setFeatureCount] = React.useState(2);

  const regressionData = React.useMemo(() => generateLinearData(noise), [noise]);
  const regressionHistory = React.useMemo(
    () => runGradientDescent(regressionData, learningRate, epochs),
    [regressionData, learningRate, epochs],
  );
  const finalModel = regressionHistory[regressionHistory.length - 1];
  const scaledFeatures = zScoreScale([12, 18, 42, 57, 63]);
  const split = simpleTrainValidationTestSplit(regressionData);
  const classificationData = React.useMemo(() => generateClassificationData(noise), [noise]);
  const logisticCurve = Array.from({ length: 17 }, (_, index) => {
    const x = -4 + index * 0.5;
    return {
      x: Number(x.toFixed(1)),
      probability: Number(sigmoid(x).toFixed(3)),
    };
  });
  const splitData = [
    { name: "Train", size: split.train.length },
    { name: "Validation", size: split.validation.length },
    { name: "Test", size: split.test.length },
  ];
  const fittingCurves = [
    { complexity: 1, trainingLoss: 8.5, validationLoss: 9.2 },
    { complexity: 2, trainingLoss: 6.1, validationLoss: 6.3 },
    { complexity: 3, trainingLoss: 4.4, validationLoss: 4.9 },
    { complexity: 4, trainingLoss: 3.2, validationLoss: 4.2 },
    { complexity: 5, trainingLoss: 2.1, validationLoss: 5.6 },
    { complexity: 6, trainingLoss: 1.2, validationLoss: 7.1 },
  ];
  const featureScalingData = [12, 18, 42, 57, 63].map((value, index) => ({
    name: `F${index + 1}`,
    original: value,
    scaled: scaledFeatures[index],
  }));

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Module 1</p>
          <h2>Classic ML Basics</h2>
          <p className="muted">
            Feature = input clue. Label or target = correct answer. Prediction = model guess. Error = guess minus truth. Loss = summary of error.
          </p>
        </div>
      </div>

      <div className="control-grid">
        <label>
          Learning rate
          <input
            type="range"
            min="0.01"
            max="0.15"
            step="0.01"
            value={learningRate}
            onChange={(event) => setLearningRate(Number(event.target.value))}
          />
          <span>{learningRate.toFixed(2)}</span>
        </label>
        <label>
          Epochs
          <input
            type="range"
            min="4"
            max="30"
            step="1"
            value={epochs}
            onChange={(event) => setEpochs(Number(event.target.value))}
          />
          <span>{epochs}</span>
        </label>
        <label>
          Noise
          <input
            type="range"
            min="0"
            max="4"
            step="0.5"
            value={noise}
            onChange={(event) => setNoise(Number(event.target.value))}
          />
          <span>{noise.toFixed(1)}</span>
        </label>
        <label>
          Number of features
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={featureCount}
            onChange={(event) => setFeatureCount(Number(event.target.value))}
          />
          <span>{featureCount}</span>
        </label>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Linear regression</h3>
          <p className="muted">Fit a straight line to predict a numeric value.</p>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={regressionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="Feature" />
                <YAxis dataKey="y" name="Label" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={regressionData} fill="#d97757" />
                <Line
                  type="monotone"
                  data={[
                    { x: 0, y: finalModel.bias },
                    { x: 12, y: finalModel.weight * 12 + finalModel.bias },
                  ]}
                  dataKey="y"
                  stroke="#183b4e"
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="caption">Toy dataset generated in code. Final model: y = {finalModel.weight.toFixed(2)}x + {finalModel.bias.toFixed(2)}</p>
        </div>

        <div className="panel inset-panel">
          <h3>Logistic regression</h3>
          <p className="muted">Predict a class probability between 0 and 1.</p>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={logisticCurve}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Line type="monotone" dataKey="probability" stroke="#3fa796" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="formula-box">
            <p>Example features: attendance, assignment completion, revision hours</p>
            <p>Feature count in this toy setup: <strong>{featureCount}</strong></p>
            <p>Predicted probability for a study score of 1.2: <strong>{sigmoid(1.2).toFixed(3)}</strong></p>
            <p>Decision rule: above 0.50 = class 1, else class 0</p>
          </div>
          <div className="mini-lesson">
            <h4>Interview takeaway</h4>
            <p>Linear regression predicts a number. Logistic regression predicts a probability and is often used for binary classification.</p>
          </div>
        </div>
      </div>

      <div className="three-column">
        <article className="panel inset-panel">
          <h3>Train / validation / test split</h3>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={splitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="size" fill="#7cc6fe" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p>Train: {split.train.length} points</p>
          <p>Validation: {split.validation.length} points</p>
          <p>Test: {split.test.length} points</p>
          <p className="muted">Train teaches, validation tunes, test is the final honest check.</p>
        </article>

        <article className="panel inset-panel">
          <h3>Overfitting vs underfitting</h3>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={fittingCurves}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="complexity" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="trainingLoss" stroke="#183b4e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="validationLoss" stroke="#f28b82" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p>Underfitting: model too simple, misses the pattern.</p>
          <p>Overfitting: model fits training noise too closely.</p>
          <p className="muted">Signal to watch: training loss low but validation loss rising.</p>
        </article>

        <article className="panel inset-panel">
          <h3>Feature scaling</h3>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={featureScalingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="original" fill="#f4b942" radius={[6, 6, 0, 0]} />
                <Bar dataKey="scaled" fill="#3fa796" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p>Original: 12, 18, 42, 57, 63</p>
          <p>Scaled: {scaledFeatures.join(", ")}</p>
          <p className="muted">Scaling helps gradient descent behave more smoothly when features have very different ranges.</p>
        </article>
      </div>

      <div className="panel inset-panel">
        <h3>Classification decision boundary</h3>
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis dataKey="y" />
              <Tooltip />
              <ReferenceLine x={2.2} stroke="#183b4e" strokeDasharray="4 4" label="Boundary" />
              <Scatter
                name="Class 0"
                data={classificationData.filter((point) => point.label === 0)}
                fill="#183b4e"
              />
              <Scatter
                name="Class 1"
                data={classificationData.filter((point) => point.label === 1)}
                fill="#3fa796"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export function NeuralNetworkLab() {
  const [inputs, setInputs] = React.useState<[number, number]>([1.2, 0.7]);
  const [target, setTarget] = React.useState(1);
  const [animationStep, setAnimationStep] = React.useState(0);

  const step = React.useMemo(() => computeNeuralNetworkStep(inputs, target), [inputs, target]);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setAnimationStep((current) => (current + 1) % 4);
    }, 1400);

    return () => window.clearInterval(timer);
  }, []);

  const phases = [
    "1. Input layer receives numbers",
    "2. Hidden layer computes weighted sums",
    "3. Activation keeps positive values via ReLU",
    "4. Output compares prediction with target and updates weights",
  ];

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Module 2</p>
          <h2>Neural Networks Basics</h2>
          <p className="muted">
            A tiny network with an input layer, one hidden layer, and one output. The animation below shows one training iteration.
          </p>
        </div>
      </div>

      <div className="control-grid">
        <label>
          Input 1
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={inputs[0]}
            onChange={(event) => setInputs([Number(event.target.value), inputs[1]])}
          />
          <span>{inputs[0].toFixed(1)}</span>
        </label>
        <label>
          Input 2
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={inputs[1]}
            onChange={(event) => setInputs([inputs[0], Number(event.target.value)])}
          />
          <span>{inputs[1].toFixed(1)}</span>
        </label>
        <label>
          Target
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={target}
            onChange={(event) => setTarget(Number(event.target.value))}
          />
          <span>{target.toFixed(1)}</span>
        </label>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Step-by-step training iteration</h3>
          <div className="network-visual">
            <div className={`network-column ${animationStep === 0 ? "active" : ""}`}>
              <strong>Input layer</strong>
              <span>x1 = {inputs[0].toFixed(1)}</span>
              <span>x2 = {inputs[1].toFixed(1)}</span>
            </div>
            <div className={`network-column ${animationStep === 1 ? "active" : ""}`}>
              <strong>Hidden layer</strong>
              <span>z1 = {step.hiddenLinear[0]}</span>
              <span>z2 = {step.hiddenLinear[1]}</span>
            </div>
            <div className={`network-column ${animationStep === 2 ? "active" : ""}`}>
              <strong>Activation</strong>
              <span>ReLU(h1) = {step.hiddenActivation[0]}</span>
              <span>ReLU(h2) = {step.hiddenActivation[1]}</span>
            </div>
            <div className={`network-column ${animationStep === 3 ? "active" : ""}`}>
              <strong>Output</strong>
              <span>Prediction = {step.output}</span>
              <span>Loss = {step.loss}</span>
            </div>
          </div>
          <p className="caption">{phases[animationStep]}</p>
        </div>

        <div className="panel inset-panel">
          <h3>Key terms</h3>
          <div className="mini-lesson">
            <h4>Neuron</h4>
            <p>A small compute unit that multiplies inputs by weights, adds bias, and optionally applies an activation function.</p>
          </div>
          <div className="mini-lesson">
            <h4>Activation function</h4>
            <p>Adds non-linearity so the network can learn more than a straight line.</p>
          </div>
          <div className="mini-lesson">
            <h4>ReLU</h4>
            <p>Returns max(0, x). It is simple and common in hidden layers.</p>
          </div>
          <div className="mini-lesson">
            <h4>Sigmoid</h4>
            <p>Squashes a value to the 0 to 1 range. Useful for probabilities.</p>
          </div>
          <div className="mini-lesson">
            <h4>Softmax</h4>
            <p>Turns scores into probabilities across multiple classes.</p>
          </div>
          <div className="mini-lesson">
            <h4>Backpropagation</h4>
            <p>Sends error information backward so each weight gets credit or blame for the final loss.</p>
          </div>
        </div>
      </div>

      <div className="panel inset-panel">
        <h3>Gradient update snapshot</h3>
        <p>Output gradient: <strong>{step.outputGradient}</strong></p>
        <p>Weight update suggestions: <strong>{step.outputWeightUpdates.join(", ")}</strong></p>
        <p className="muted">Weights that support a wrong output get pushed more strongly during gradient descent.</p>
      </div>
    </section>
  );
}
