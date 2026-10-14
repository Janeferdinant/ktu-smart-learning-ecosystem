/**
 * Neural Network Mathematical Engine & Code Generator for 3D Demo
 * Computes exact matrix forward propagation: Z = WX + b, A = f(Z)
 * Provides pedagogical trace for KTU CST305 / CST401 Machine Learning curriculum.
 */

export type ActivationFn = 'relu' | 'sigmoid' | 'tanh' | 'leaky_relu';

export interface LayerTrace {
  layerIndex: number;
  layerName: string;
  zValues: number[];
  aValues: number[];
  nodeCount: number;
}

export interface ForwardPassResult {
  inputVector: number[];
  activation: ActivationFn;
  layerTraces: LayerTrace[];
  outputProbabilities: number[];
  predictedClass: number;
  predictedLabel: string;
  pythonCode: string;
  mathFormulaLatex: string;
}

// Fixed deterministic weights calibrated for network traffic anomaly detection
export const PRESET_WEIGHTS = {
  W1: [
    [0.45, -0.32, 0.78, 0.12, -0.55, 0.62],
    [-0.22, 0.65, -0.18, 0.84, 0.31, -0.47],
    [0.71, -0.15, 0.54, -0.38, 0.69, 0.28],
    [-0.53, 0.42, -0.67, 0.29, -0.19, 0.81]
  ], // 4 x 6
  B1: [0.10, -0.05, 0.20, -0.15, 0.08, -0.12], // 6

  W2: [
    [0.35, -0.42, 0.28, 0.51, -0.19, 0.63],
    [-0.18, 0.55, -0.31, 0.24, 0.48, -0.37],
    [0.62, -0.21, 0.49, -0.15, 0.33, 0.52],
    [-0.29, 0.38, -0.44, 0.67, -0.25, 0.19],
    [0.41, -0.17, 0.58, -0.33, 0.72, -0.28],
    [-0.52, 0.61, -0.22, 0.45, -0.14, 0.39]
  ], // 6 x 6
  B2: [-0.08, 0.12, -0.04, 0.18, -0.11, 0.06], // 6

  W3: [
    [0.72, -0.68],
    [-0.59, 0.64],
    [0.81, -0.77],
    [-0.48, 0.53],
    [0.65, -0.61],
    [-0.73, 0.79]
  ], // 6 x 2
  B3: [0.15, -0.15] // 2
};

export function applyActivation(x: number, fn: ActivationFn): number {
  switch (fn) {
    case 'relu':
      return Math.max(0, x);
    case 'sigmoid':
      return 1 / (1 + Math.exp(-Math.max(-50, Math.min(50, x))));
    case 'tanh':
      return Math.tanh(x);
    case 'leaky_relu':
      return x > 0 ? x : 0.05 * x;
  }
}

export function softmax(values: number[]): number[] {
  const maxVal = Math.max(...values);
  const exps = values.map(v => Math.exp(v - maxVal));
  const sumExps = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / (sumExps || 1));
}

/**
 * Computes forward pass matrix multiplication:
 * Layer 0: Input X (4)
 * Layer 1: A1 = act(X . W1 + B1) (6)
 * Layer 2: A2 = act(A1 . W2 + B2) (6)
 * Layer 3: Output = softmax(A2 . W3 + B3) (2)
 */
export function executeForwardPass(
  inputs: [number, number, number, number],
  activation: ActivationFn
): ForwardPassResult {
  // Layer 1: 4 -> 6
  const z1: number[] = [];
  const a1: number[] = [];
  for (let j = 0; j < 6; j++) {
    let sum = PRESET_WEIGHTS.B1[j];
    for (let i = 0; i < 4; i++) {
      sum += inputs[i] * PRESET_WEIGHTS.W1[i][j];
    }
    z1.push(parseFloat(sum.toFixed(4)));
    a1.push(parseFloat(applyActivation(sum, activation).toFixed(4)));
  }

  // Layer 2: 6 -> 6
  const z2: number[] = [];
  const a2: number[] = [];
  for (let j = 0; j < 6; j++) {
    let sum = PRESET_WEIGHTS.B2[j];
    for (let i = 0; i < 6; i++) {
      sum += a1[i] * PRESET_WEIGHTS.W2[i][j];
    }
    z2.push(parseFloat(sum.toFixed(4)));
    a2.push(parseFloat(applyActivation(sum, activation).toFixed(4)));
  }

  // Layer 3 (Output): 6 -> 2
  const z3: number[] = [];
  for (let j = 0; j < 2; j++) {
    let sum = PRESET_WEIGHTS.B3[j];
    for (let i = 0; i < 6; i++) {
      sum += a2[i] * PRESET_WEIGHTS.W3[i][j];
    }
    z3.push(parseFloat(sum.toFixed(4)));
  }

  const outputProbabilities = softmax(z3).map(p => parseFloat(p.toFixed(4)));
  const predictedClass = outputProbabilities[0] >= outputProbabilities[1] ? 0 : 1;
  const predictedLabel = predictedClass === 0 ? 'Normal Network Traffic (Safe)' : 'Anomalous Intrusion Detected (Alert)';

  const layerTraces: LayerTrace[] = [
    {
      layerIndex: 0,
      layerName: 'Input Layer (Features)',
      zValues: [...inputs],
      aValues: [...inputs],
      nodeCount: 4
    },
    {
      layerIndex: 1,
      layerName: `Hidden Layer 1 (${activation.toUpperCase()})`,
      zValues: z1,
      aValues: a1,
      nodeCount: 6
    },
    {
      layerIndex: 2,
      layerName: `Hidden Layer 2 (${activation.toUpperCase()})`,
      zValues: z2,
      aValues: a2,
      nodeCount: 6
    },
    {
      layerIndex: 3,
      layerName: 'Output Classification (Softmax)',
      zValues: z3,
      aValues: outputProbabilities,
      nodeCount: 2
    }
  ];

  const pythonCode = `# ==============================================================
# KTU CST305/CST401 — Deep Neural Network Forward Pass
# Faculty Lead: Jane Rose Ferdinant | Dept. of CSE
# Architecture: 4-6-6-2 Feedforward Network
# ==============================================================
import numpy as np

def ${activation}(z):
${activation === 'relu' ? '    return np.maximum(0, z)' : activation === 'sigmoid' ? '    return 1 / (1 + np.exp(-np.clip(z, -50, 50)))' : activation === 'tanh' ? '    return np.tanh(z)' : '    return np.where(z > 0, z, 0.05 * z)'}

def softmax(z):
    exp_z = np.exp(z - np.max(z))
    return exp_z / np.sum(exp_z)

# 1. Input Tensor [Latency, Packet Loss, Bandwidth, CPU Load]
X = np.array([${inputs.map(n => n.toFixed(2)).join(', ')}])

# 2. Layer 1 Affine Transform & Activation
Z1 = np.dot(X, W1) + B1  # Z1 = [${z1.map(v => v.toFixed(2)).join(', ')}]
A1 = ${activation}(Z1)              # A1 = [${a1.map(v => v.toFixed(2)).join(', ')}]

# 3. Layer 2 Deep Synapse Transformation
Z2 = np.dot(A1, W2) + B2 # Z2 = [${z2.map(v => v.toFixed(2)).join(', ')}]
A2 = ${activation}(Z2)              # A2 = [${a2.map(v => v.toFixed(2)).join(', ')}]

# 4. Output Layer & Softmax Classification
Z3 = np.dot(A2, W3) + B3 # Z3 = [${z3.map(v => v.toFixed(2)).join(', ')}]
Y_hat = softmax(Z3)       # Output Probabilities = [${outputProbabilities.map(p => (p * 100).toFixed(1) + '%').join(', ')}]

print("Predicted Class:", "${predictedLabel}")
`;

  return {
    inputVector: [...inputs],
    activation,
    layerTraces,
    outputProbabilities,
    predictedClass,
    predictedLabel,
    pythonCode,
    mathFormulaLatex: 'A^{(l)} = \\sigma\\left(W^{(l)} A^{(l-1)} + b^{(l)}\\right)'
  };
}
