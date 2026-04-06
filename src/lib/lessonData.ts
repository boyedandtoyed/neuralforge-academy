// ============================================================
// lessonData.ts — NeuralForge Academy curriculum (9 phases, 25 lessons)
// ============================================================

export const COURSE_TITLES: Record<string, string> = {
  'introduction':   'Introduction',
  'neuron-model':   'Neuron Model & Architectures',
  'regression':     'Regression',
  'optimization':   'Optimization',
  'cnns':           'Convolutional Neural Networks',
  'autoencoders':   'Autoencoders & VAEs',
  'rnns':           'Recurrent Networks',
  'transformers':   'Transformers',
  'generative':     'Generative Models',
};

export const COURSE_LESSONS: Record<string, { slug: string; title: string }[]> = {
  'introduction': [
    { slug: '00-setup',           title: 'Python, NumPy & Matplotlib Setup' },
    { slug: '01-history-biology', title: 'History & Biological Neurons' },
    { slug: '02-probability',     title: 'Probability & Statistics' },
    { slug: '03-matrix-ops',      title: 'Matrix Operations' },
  ],
  'neuron-model': [
    { slug: '04-single-neuron',    title: 'The Artificial Neuron' },
    { slug: '05-activation-fns',   title: 'Activation / Transfer Functions' },
    { slug: '06-network-topology', title: 'Network Topology & Architectures' },
  ],
  'regression': [
    { slug: '07-linear-regression', title: 'Linear Regression' },
    { slug: '08-logistic-softmax',  title: 'Logistic Regression, CrossEntropy & Softmax' },
  ],
  'optimization': [
    { slug: '09-backprop-compgraph', title: 'Backpropagation & Computation Graphs' },
    { slug: '10-taylor-hessian',     title: 'Taylor Series, Hessian & Quadratic Surfaces' },
    { slug: '11-optimizers',         title: 'SGD, Momentum, Nesterov, AdaGrad, RMSProp, Adam' },
    { slug: '12-lr-schedules',       title: 'Learning Rate Schedules & Batch Training' },
    { slug: '13-gradients-reg',      title: 'Vanishing Gradients & Regularization' },
  ],
  'cnns': [
    { slug: '14-convolution',      title: 'Convolution, Padding, Stride & Pooling' },
    { slug: '15-cnn-architectures', title: 'LeNet → AlexNet → VGG → ResNet' },
  ],
  'autoencoders': [
    { slug: '16-autoencoders', title: 'Autoencoders' },
    { slug: '17-vaes',         title: 'Variational Autoencoders — KL Divergence & ELBO' },
  ],
  'rnns': [
    { slug: '18-rnns',    title: 'Recurrent Neural Networks' },
    { slug: '19-lstm-gru', title: 'LSTM & GRU' },
  ],
  'transformers': [
    { slug: '20-embeddings',      title: 'Embeddings & Positional Encoding' },
    { slug: '21-attention',       title: 'Attention Mechanisms' },
    { slug: '22-transformer-arch', title: 'Transformer Architecture' },
  ],
  'generative': [
    { slug: '23-gans',      title: 'GANs — Generator, Discriminator & Training' },
    { slug: '24-diffusion', title: 'Diffusion Models — Forward/Reverse Process & Score Matching' },
  ],
};

// Type definitions
export interface LessonSection {
  type: 'prose' | 'heading' | 'math' | 'code' | 'quiz';
  content?: string;
  level?: number;
  display?: boolean;
  language?: string;
  question?: string;
  options?: { label: string; correct: boolean }[];
  explanation?: string;
}

// Lesson content map — key is "courseSlug/lessonSlug"
export const LESSON_CONTENT: Record<string, LessonSection[]> = {

  // ================================================================
  // PHASE 0 — Introduction
  // ================================================================

  'introduction/00-setup': [
    {
      type: 'prose',
      content: `This course uses Python 3.11+, NumPy, Matplotlib, and PyTorch as its primary tools. All code in the browser runs via Pyodide (CPython WASM) — no installation needed for the interactive cells. For local development, use the setup below.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{z-score: } \hat{x} = \frac{x - \mu}{\sigma}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np
import sys

# Verify your environment
print(f"Python {sys.version}")
print(f"NumPy {np.__version__}")

# NumPy fundamentals
arr = np.array([1, 2, 3, 4, 5], dtype=np.float32)
print(f"\\nArray: {arr}")
print(f"Shape: {arr.shape}")
print(f"Mean: {arr.mean():.2f}")
print(f"Std:  {arr.std():.2f}")

# Matrix creation patterns used throughout the course
zeros = np.zeros((3, 4))
ones  = np.ones((3, 4))
eye   = np.eye(4)
rand  = np.random.randn(3, 4)

print(f"\\nRandom matrix shape: {rand.shape}")
print(f"Min: {rand.min():.3f}  Max: {rand.max():.3f}")

# Broadcasting — core NumPy concept
X = np.random.randn(100, 5)   # 100 samples, 5 features
mu = X.mean(axis=0)           # mean per feature
std = X.std(axis=0)           # std per feature
X_norm = (X - mu) / (std + 1e-8)  # z-score normalization
print(f"\\nNormalized X — mean: {X_norm.mean(axis=0).round(3)}")
print(f"Normalized X — std:  {X_norm.std(axis=0).round(3)}")`,
    },
    {
      type: 'quiz',
      question: 'What does `np.random.randn(3, 4)` return?',
      options: [
        { label: 'A (3,4) matrix of samples from a standard normal distribution', correct: true },
        { label: 'A (3,4) matrix of uniform random values between 0 and 1', correct: false },
        { label: '3 random integers each in range [0,4)', correct: false },
        { label: 'A (4,3) matrix (shape is columns-first)', correct: false },
      ],
      explanation: 'randn draws from N(0,1). Shape (3,4) = 3 rows, 4 cols.',
    },
  ],

  'introduction/01-history-biology': [
    {
      type: 'prose',
      content: `Neural networks trace their origins to 1943 (McCulloch & Pitts neuron), 1958 (Rosenblatt perceptron), through the AI winters to the deep learning renaissance triggered by AlexNet (2012). The key insight: artificial neurons mimic the integrate-and-fire behavior of biological neurons.`,
    },
    {
      type: 'prose',
      content: `A biological neuron receives signals through **dendrites**, integrates them in the **soma**, and if the total exceeds a threshold, fires an action potential through the **axon** to **synaptic terminals**. Synaptic weights correspond to the strength of connections.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`z = \sum_{i=1}^{n} w_i x_i + b \qquad \hat{y} = f(z)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Simulate a McCulloch-Pitts neuron (1943)
# Fires if weighted sum exceeds threshold theta
def mcculloch_pitts(inputs, weights, theta):
    z = np.dot(weights, inputs)
    return 1 if z >= theta else 0

# AND gate
inputs  = np.array([1, 1])
weights = np.array([1, 1])
theta   = 2
print(f"AND(1,1) = {mcculloch_pitts(inputs, weights, theta)}")

inputs = np.array([1, 0])
print(f"AND(1,0) = {mcculloch_pitts(inputs, weights, theta)}")

# OR gate
theta = 1
print(f"OR(1,0)  = {mcculloch_pitts(inputs, weights, theta)}")
print(f"OR(0,0)  = {mcculloch_pitts(np.array([0,0]), weights, theta)}")`,
    },
    {
      type: 'quiz',
      question: 'What was the first trainable single-layer neural network called?',
      options: [
        { label: 'Perceptron (Rosenblatt, 1958)', correct: true },
        { label: 'McCulloch-Pitts neuron', correct: false },
        { label: 'Boltzmann machine', correct: false },
        { label: 'Hopfield network', correct: false },
      ],
      explanation: "Rosenblatt's perceptron (1958) introduced a learning rule. The M-P neuron (1943) was fixed.",
    },
  ],

  'introduction/02-probability': [
    {
      type: 'prose',
      content: `ML is fundamentally probabilistic. We model data as samples from unknown distributions and use probability theory to reason under uncertainty.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`P(A|B) = \frac{P(B|A)\,P(A)}{P(B)} \qquad \mathbb{E}[X] = \sum_x x\,P(X{=}x)`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathcal{N}(x;\mu,\sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

rng = np.random.default_rng(42)

# Central Limit Theorem demo
n_samples, n_dice = 10000, 30
rolls = rng.integers(1, 7, size=(n_samples, n_dice))
means = rolls.mean(axis=1)

print(f"Mean of dice means:  {means.mean():.3f}  (expected 3.5)")
print(f"Std of dice means:   {means.std():.4f}  (expected {3.5/np.sqrt(n_dice*35/12):.4f})")

# MLE for Gaussian
data = rng.normal(loc=5.0, scale=2.0, size=1000)
mu_mle    = data.mean()
sigma_mle = data.std(ddof=0)
print(f"\\nMLE estimates — mu: {mu_mle:.3f} (true 5.0), sigma: {sigma_mle:.3f} (true 2.0)")

# KL divergence (discrete)
p = np.array([0.4, 0.3, 0.2, 0.1])
q = np.array([0.25, 0.25, 0.25, 0.25])
kl_pq = np.sum(p * np.log(p / q))
print(f"\\nKL(P||Q) = {kl_pq:.4f}  (0 when P==Q)")`,
    },
    {
      type: 'quiz',
      question: "In Bayes theorem P(A|B) = P(B|A)P(A)/P(B), what is P(A) called?",
      options: [
        { label: 'The prior', correct: true },
        { label: 'The likelihood', correct: false },
        { label: 'The posterior', correct: false },
        { label: 'The evidence', correct: false },
      ],
      explanation: 'P(A) = prior (belief before seeing data). P(A|B) = posterior (after). P(B|A) = likelihood. P(B) = marginal evidence.',
    },
  ],

  'introduction/03-matrix-ops': [
    {
      type: 'prose',
      content: `Every neural network computation reduces to matrix operations. Understanding shapes and broadcasting prevents the most common bugs.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathbf{y} = W\mathbf{x} + \mathbf{b} \qquad W \in \mathbb{R}^{m \times n},\; \mathbf{x} \in \mathbb{R}^n,\; \mathbf{b} \in \mathbb{R}^m`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\frac{\partial}{\partial W}(W\mathbf{x}) = \mathbf{x}^\top \qquad \frac{\partial}{\partial \mathbf{x}}(W\mathbf{x}) = W^\top`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Shape rules for matrix multiplication
A = np.random.randn(4, 3)   # (out, in)
x = np.random.randn(3)
b = np.random.randn(4)

y = A @ x + b
print(f"A:{A.shape} @ x:{x.shape} + b:{b.shape} = y:{y.shape}")

# Batch processing — (batch, features) @ (features, neurons)
X_batch = np.random.randn(32, 3)
Y_batch  = X_batch @ A.T + b   # A.T shape: (3,4) -> output (32,4)
print(f"Batch: X:{X_batch.shape} @ A.T:{A.T.shape} = {Y_batch.shape}")

# Eigendecomposition — used in PCA and understanding optimization
M = np.random.randn(4, 4)
S = M.T @ M   # symmetric positive semi-definite
eigenvalues, eigenvectors = np.linalg.eigh(S)
print(f"\\nEigenvalues of S: {eigenvalues.round(3)}")
print(f"S approx V L V^T error: {np.linalg.norm(S - eigenvectors @ np.diag(eigenvalues) @ eigenvectors.T):.2e}")`,
    },
    {
      type: 'quiz',
      question: 'If X has shape (64, 128) and W has shape (128, 256), what is the shape of X @ W?',
      options: [
        { label: '(64, 256)', correct: true },
        { label: '(128, 128)', correct: false },
        { label: '(64, 128)', correct: false },
        { label: '(256, 64)', correct: false },
      ],
      explanation: 'Matrix multiply (m,k) @ (k,n) = (m,n). Here (64,128)@(128,256) = (64,256).',
    },
  ],

  // ================================================================
  // PHASE 1 — Neuron Model & Architectures
  // ================================================================

  'neuron-model/04-single-neuron': [
    {
      type: 'prose',
      content: `The artificial neuron is the fundamental computing unit of all neural networks. It computes a weighted sum of its inputs, adds a bias, and passes the result through a nonlinear activation function.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`a = f\!\left(\sum_{i=1}^{n} w_i x_i + b\right) = f(w^\top x + b)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

class Neuron:
    """Single artificial neuron with configurable activation."""
    def __init__(self, n_inputs: int, activation: str = 'relu'):
        rng = np.random.default_rng(0)
        self.w = rng.standard_normal(n_inputs) * np.sqrt(2 / n_inputs)
        self.b = 0.0
        self.activation = activation

    def _activate(self, z: float) -> float:
        if self.activation == 'relu':    return max(0.0, z)
        if self.activation == 'sigmoid': return 1 / (1 + np.exp(-z))
        if self.activation == 'tanh':    return float(np.tanh(z))
        if self.activation == 'linear':  return z
        raise ValueError(f"Unknown activation: {self.activation}")

    def forward(self, x: np.ndarray) -> float:
        z = float(np.dot(self.w, x) + self.b)
        return self._activate(z)

n = Neuron(n_inputs=4, activation='relu')
x = np.array([0.5, -1.2, 0.8, 0.3])
out = n.forward(x)
print(f"Neuron output: {out:.4f}")
print(f"Weights: {n.w.round(4)}")
print(f"Bias: {n.b}")`,
    },
    {
      type: 'quiz',
      question: 'What is the purpose of the bias term b in a neuron?',
      options: [
        { label: 'It shifts the activation function, allowing the decision boundary to be offset from the origin', correct: true },
        { label: 'It prevents overfitting', correct: false },
        { label: 'It scales the output to [0,1]', correct: false },
        { label: 'It is always zero-initialized and never updated', correct: false },
      ],
      explanation: 'Without bias, all decision boundaries pass through the origin. Bias allows the hyperplane w^T x + b = 0 to be translated freely.',
    },
  ],

  'neuron-model/05-activation-fns': [
    {
      type: 'prose',
      content: `Activation functions introduce nonlinearity, which is what makes deep networks capable of learning complex functions. Without nonlinearity, any stack of linear layers collapses to a single linear transformation.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{ReLU}(z) = \max(0,z) \qquad \sigma(z) = \frac{1}{1+e^{-z}} \qquad \tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{Softmax}(\mathbf{z})_i = \frac{e^{z_i}}{\sum_j e^{z_j}}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

z = np.linspace(-4, 4, 9)

def relu(z):     return np.maximum(0, z)
def sigmoid(z):  return 1 / (1 + np.exp(-z))
def tanh(z):     return np.tanh(z)
def leaky_relu(z, alpha=0.01): return np.where(z > 0, z, alpha * z)
def gelu(z):     return 0.5 * z * (1 + np.tanh(np.sqrt(2/np.pi) * (z + 0.044715 * z**3)))
def softmax(z):
    e = np.exp(z - z.max())   # numerically stable
    return e / e.sum()

print(f"{'z':>6} | {'ReLU':>6} | {'Sigmoid':>7} | {'Tanh':>6} | {'GELU':>6}")
print("-" * 45)
for zi, r, s, t, g in zip(z, relu(z), sigmoid(z), tanh(z), gelu(z)):
    print(f"{zi:>6.1f} | {r:>6.3f} | {s:>7.4f} | {t:>6.3f} | {g:>6.3f}")

logits = np.array([2.0, 1.0, 0.1])
probs  = softmax(logits)
print(f"\\nSoftmax([2, 1, 0.1]) = {probs.round(4)}")
print(f"Sum = {probs.sum():.6f}")`,
    },
    {
      type: 'quiz',
      question: 'Why does the dying ReLU problem occur?',
      options: [
        { label: 'Neurons with z≤0 receive zero gradient and can stop updating permanently', correct: true },
        { label: 'ReLU outputs can exceed 1, destabilizing training', correct: false },
        { label: 'ReLU is not differentiable and cannot be used with backpropagation', correct: false },
        { label: 'ReLU causes vanishing gradients for large positive z', correct: false },
      ],
      explanation: "When z≤0, ReLU'=0. If a neuron's pre-activation is always negative (e.g. due to large negative bias), it receives zero gradient forever — it 'dies'. Leaky ReLU fixes this with a small slope for z<0.",
    },
  ],

  'neuron-model/06-network-topology': [
    {
      type: 'prose',
      content: `Neural networks differ in how neurons are connected. The topology — which neurons connect to which — determines what kinds of patterns the network can learn. The three fundamental topologies are feedforward, recurrent, and convolutional.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathbf{h}^{(l)} = f^{(l)}\!\left(W^{(l)}\mathbf{h}^{(l-1)} + \mathbf{b}^{(l)}\right), \quad l = 1,\ldots,L`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def relu(x): return np.maximum(0, x)
def sigmoid(x): return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

class MLP:
    """Feedforward multilayer perceptron — arbitrary depth."""
    def __init__(self, layer_sizes):
        rng = np.random.default_rng(42)
        self.weights = []
        self.biases  = []
        for fan_in, fan_out in zip(layer_sizes[:-1], layer_sizes[1:]):
            W = rng.standard_normal((fan_in, fan_out)) * np.sqrt(2 / fan_in)
            b = np.zeros(fan_out)
            self.weights.append(W)
            self.biases.append(b)

    def forward(self, x, verbose=False):
        h = x
        for i, (W, b) in enumerate(zip(self.weights, self.biases)):
            z = h @ W + b
            h = relu(z) if i < len(self.weights) - 1 else sigmoid(z)
            if verbose:
                print(f"  Layer {i+1}: {z.shape} -> active: {(h > 0).mean():.1%}")
        return h

# Architecture: 784 -> 256 -> 128 -> 10
mlp = MLP([784, 256, 128, 10])
x   = np.random.randn(32, 784)  # batch of 32 MNIST-like images
out = mlp.forward(x, verbose=True)
print(f"\\nOutput shape: {out.shape}")

total_params = sum(W.size + b.size for W, b in zip(mlp.weights, mlp.biases))
print(f"Total parameters: {total_params:,}")`,
    },
    {
      type: 'quiz',
      question: "What is the 'depth' of a neural network?",
      options: [
        { label: 'The number of hidden layers (not counting input/output)', correct: true },
        { label: 'The number of neurons in the widest layer', correct: false },
        { label: 'The total number of parameters', correct: false },
        { label: 'The number of training epochs', correct: false },
      ],
      explanation: 'Depth = number of hidden layers. A network with 1 hidden layer is shallow. Modern deep networks have dozens to thousands of layers.',
    },
  ],

  // ================================================================
  // PHASE 2 — Regression
  // ================================================================

  'regression/07-linear-regression': [
    {
      type: 'prose',
      content: `Linear regression finds the best-fit line (or hyperplane) through data by minimizing the Mean Squared Error. It has a closed-form solution via the normal equation and is the foundation for understanding all supervised learning.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathcal{L}(w,b) = \frac{1}{n}\sum_{i=1}^n (y_i - \hat{y}_i)^2 \qquad \hat{y}_i = w^\top x_i + b`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`w^* = (X^\top X)^{-1} X^\top y \quad \text{(Normal Equation)}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

rng = np.random.default_rng(42)
n = 200

# True relationship: y = 2x1 - 0.5x2 + 1 + noise
X = rng.standard_normal((n, 2))
w_true = np.array([2.0, -0.5])
b_true = 1.0
y = X @ w_true + b_true + 0.3 * rng.standard_normal(n)

# Normal equation: w* = (X^T X)^{-1} X^T y
X_aug = np.column_stack([X, np.ones(n)])  # add bias column
w_star = np.linalg.lstsq(X_aug, y, rcond=None)[0]
print(f"True:      w={w_true}, b={b_true}")
print(f"Estimated: w={w_star[:2].round(4)}, b={w_star[2]:.4f}")

# MSE
y_pred = X_aug @ w_star
mse = np.mean((y - y_pred)**2)
r2  = 1 - np.sum((y - y_pred)**2) / np.sum((y - y.mean())**2)
print(f"\\nMSE: {mse:.4f}  R2: {r2:.4f}")`,
    },
    {
      type: 'quiz',
      question: 'The normal equation (X^T X)^{-1} X^T y solves for weights exactly — when would you NOT use it?',
      options: [
        { label: 'When n or d is very large, since it requires O(d^3) matrix inversion', correct: true },
        { label: 'When the loss is MSE', correct: false },
        { label: 'When the data is normalized', correct: false },
        { label: 'When there are more samples than features', correct: false },
      ],
      explanation: 'The normal equation is O(nd^2 + d^3). For large d (e.g. d=10^6 features), gradient descent is far more practical.',
    },
  ],

  'regression/08-logistic-softmax': [
    {
      type: 'prose',
      content: `Logistic regression is linear regression adapted for classification. The sigmoid squashes the linear output into a probability, and binary cross-entropy loss measures how well predicted probabilities match the true labels.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\hat{p} = \sigma(w^\top x + b) \qquad \mathcal{L} = -\frac{1}{n}\sum_{i}[y_i \log\hat{p}_i + (1-y_i)\log(1-\hat{p}_i)]`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\frac{\partial \mathcal{L}}{\partial w} = \frac{1}{n}X^\top(\hat{p} - y) \quad \text{(remarkably clean!)}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

rng = np.random.default_rng(0)
n   = 300

# Generate linearly separable data
X0 = rng.standard_normal((n//2, 2)) + np.array([-1, -1])
X1 = rng.standard_normal((n//2, 2)) + np.array([1,  1])
X  = np.vstack([X0, X1])
y  = np.hstack([np.zeros(n//2), np.ones(n//2)])

def sigmoid(z): return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
def bce(p, y):  return -np.mean(y*np.log(p+1e-15) + (1-y)*np.log(1-p+1e-15))

# Mini-batch gradient descent
w = np.zeros(2);  b = 0.0;  lr = 0.5
for epoch in range(501):
    p    = sigmoid(X @ w + b)
    loss = bce(p, y)
    grad_w = X.T @ (p - y) / n
    grad_b = (p - y).mean()
    w -= lr * grad_w
    b -= lr * grad_b
    if epoch % 100 == 0:
        acc = ((p > 0.5) == y).mean()
        print(f"Epoch {epoch:4d}  loss={loss:.4f}  acc={acc:.1%}")`,
    },
    {
      type: 'quiz',
      question: 'Why is cross-entropy preferred over MSE for classification?',
      options: [
        { label: 'Cross-entropy is the negative log-likelihood under a Bernoulli model — its gradients are large when confidently wrong', correct: true },
        { label: 'MSE cannot be computed for binary targets', correct: false },
        { label: 'Cross-entropy is faster to compute', correct: false },
        { label: 'MSE gradients vanish near the decision boundary', correct: false },
      ],
      explanation: "With sigmoid output and MSE, gradients are multiplied by σ'(z)=σ(1-σ) which is small when z is large. Cross-entropy cancels this term, giving gradient (p-y) — clean and large when wrong.",
    },
  ],

  // ================================================================
  // PHASE 3 — Optimization
  // ================================================================

  'optimization/09-backprop-compgraph': [
    {
      type: 'prose',
      content: `Backpropagation efficiently computes gradients by traversing the computation graph in reverse (reverse-mode automatic differentiation). Every modern deep learning framework (PyTorch autograd, TensorFlow GradientTape) implements this.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\frac{\partial \mathcal{L}}{\partial W^{(l)}} = \frac{1}{n}\left(A^{(l-1)}\right)^\top \delta^{(l)} \qquad \delta^{(l)} = \left(\delta^{(l+1)} W^{(l+1)\top}\right) \odot f'\!\left(Z^{(l)}\right)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def relu(z): return np.maximum(0, z)
def relu_grad(z): return (z > 0).astype(float)
def sigmoid(z): return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

class TwoLayerNet:
    def __init__(self, d_in, d_hid, d_out, lr=0.01):
        s1, s2 = np.sqrt(2/d_in), np.sqrt(2/d_hid)
        self.W1 = np.random.randn(d_in,  d_hid) * s1
        self.b1 = np.zeros(d_hid)
        self.W2 = np.random.randn(d_hid, d_out) * s2
        self.b2 = np.zeros(d_out)
        self.lr = lr
        self._cache = {}

    def forward(self, X):
        Z1 = X @ self.W1 + self.b1
        A1 = relu(Z1)
        Z2 = A1 @ self.W2 + self.b2
        A2 = sigmoid(Z2)
        self._cache = dict(X=X, Z1=Z1, A1=A1, Z2=Z2, A2=A2)
        return A2

    def backward(self, y):
        n = y.shape[0]
        X  = self._cache['X']
        Z1 = self._cache['Z1']
        A1 = self._cache['A1']
        A2 = self._cache['A2']
        loss = -np.mean(y*np.log(A2+1e-15) + (1-y)*np.log(1-A2+1e-15))
        d2   = (A2 - y) / n
        dW2  = A1.T @ d2
        db2  = d2.sum(0)
        d1   = (d2 @ self.W2.T) * relu_grad(Z1)
        dW1  = X.T @ d1
        db1  = d1.sum(0)
        self.W1 -= self.lr * dW1;  self.b1 -= self.lr * db1
        self.W2 -= self.lr * dW2;  self.b2 -= self.lr * db2
        return loss

rng = np.random.default_rng(42)
X_xor = np.array([[0.,0],[0,1],[1,0],[1,1]])
y_xor = np.array([[0.],[1.],[1.],[0.]])
X_tr  = np.tile(X_xor,(200,1)) + 0.05*rng.standard_normal((800,2))
y_tr  = np.tile(y_xor,(200,1))

net = TwoLayerNet(2, 8, 1, lr=0.8)
for ep in range(2001):
    net.forward(X_tr)
    loss = net.backward(y_tr)
    if ep % 500 == 0:
        preds = (net.forward(X_xor) > 0.5).astype(int)
        print(f"Epoch {ep:4d}  loss={loss:.4f}  XOR preds={preds.flatten().tolist()}")`,
    },
    {
      type: 'quiz',
      question: "In backprop, what is a 'computation graph'?",
      options: [
        { label: 'A DAG where nodes are operations and edges carry gradients during the backward pass', correct: true },
        { label: 'A plot of loss vs. epoch', correct: false },
        { label: 'A diagram of network topology showing neuron connections', correct: false },
        { label: 'A graph of compute time vs. batch size', correct: false },
      ],
      explanation: 'The computation graph records every operation in the forward pass. Backprop traverses it in reverse, applying the chain rule at each node. PyTorch builds this dynamically; TensorFlow (v1) built it statically.',
    },
  ],

  'optimization/10-taylor-hessian': [
    {
      type: 'prose',
      content: `The Taylor series is the mathematical foundation for understanding why gradient descent works and why second-order methods can converge faster. The Hessian matrix captures the curvature of the loss surface.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`f(x + \Delta x) \approx f(x) + \nabla f(x)^\top \Delta x + \tfrac{1}{2}\Delta x^\top H \Delta x`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`H_{ij} = \frac{\partial^2 f}{\partial x_i \,\partial x_j} \qquad H = \nabla^2 f`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Quadratic function: f(x) = x^T A x + b^T x + c
A = np.array([[3., 1.], [1., 2.]])  # Hessian
b = np.array([-4., -3.])
c = 5.0

def f(x):      return x @ A @ x + b @ x + c
def grad_f(x): return 2 * A @ x + b
def hess_f():  return 2 * A   # constant for quadratic

# Analytic minimum: x* = -0.5 A^{-1} b
x_star = -0.5 * np.linalg.inv(A) @ b
print(f"Exact minimum x* = {x_star.round(4)}")
print(f"f(x*) = {f(x_star):.4f}")

# Gradient descent vs Newton's method
x_gd = np.array([3., 3.])
x_nt = np.array([3., 3.])
H = hess_f()
H_inv = np.linalg.inv(H)

print(f"\\n{'Step':>4}  {'GD x':>14}  {'f(GD)':>8}  {'Newton x':>14}  {'f(NT)':>8}")
for i in range(6):
    x_gd = x_gd - 0.1 * grad_f(x_gd)
    x_nt = x_nt - H_inv @ grad_f(x_nt)   # Newton step
    print(f"{i+1:>4}  {str(x_gd.round(3)):>14}  {f(x_gd):>8.4f}  {str(x_nt.round(3)):>14}  {f(x_nt):>8.4f}")`,
    },
    {
      type: 'quiz',
      question: "Newton's method converges in one step for quadratic functions. Why?",
      options: [
        { label: "The second-order Taylor expansion is exact for quadratics, so the Newton step lands precisely at the minimum", correct: true },
        { label: "Newton's method uses a larger learning rate than gradient descent", correct: false },
        { label: "Newton's method uses the gradient squared, which is exact for any function", correct: false },
        { label: 'It is a coincidence specific to 2D problems', correct: false },
      ],
      explanation: "Newton step is -H^{-1} grad f. For f(x) = x^T A x + b^T x, grad = 2Ax+b and H = 2A (constant). So x - H^{-1} grad = x - (2A)^{-1}(2Ax+b) = -A^{-1}b/2 = x* exactly.",
    },
  ],

  'optimization/11-optimizers': [
    {
      type: 'prose',
      content: `Choosing an optimizer is one of the most important practical decisions in deep learning. Vanilla SGD is simple but slow. Adaptive methods like Adam are the default choice for most architectures.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{SGD: } \theta \leftarrow \theta - \eta\,g_t`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{Adam: } m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t \quad v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2 \quad \theta \leftarrow \theta - \eta\frac{\hat m_t}{\sqrt{\hat v_t}+\varepsilon}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Compare optimizers on a 2D Rosenbrock-like function
# f(x,y) = (1-x)^2 + 10(y - x^2)^2
def f(p):     x,y = p;  return (1-x)**2 + 10*(y-x**2)**2
def grad(p):
    x,y = p
    dx = -2*(1-x) - 40*x*(y-x**2)
    dy = 20*(y-x**2)
    return np.array([dx, dy])

def run_optimizer(name, steps=200):
    p = np.array([-1.5, 1.5])
    lr, beta1, beta2, eps = 0.001, 0.9, 0.999, 1e-8
    m = np.zeros(2); v = np.zeros(2)
    for t in range(1, steps+1):
        g = grad(p)
        if name == 'sgd':
            p = p - 0.01 * g
        elif name == 'momentum':
            m = beta1*m + (1-beta1)*g
            p = p - 0.01 * m
        elif name == 'adam':
            m  = beta1*m + (1-beta1)*g
            v  = beta2*v + (1-beta2)*g**2
            mh = m / (1 - beta1**t)
            vh = v / (1 - beta2**t)
            p  = p - lr * mh / (np.sqrt(vh) + eps)
    return f(p), p

for opt in ['sgd', 'momentum', 'adam']:
    final_loss, final_p = run_optimizer(opt)
    print(f"{opt:>10}: final loss={final_loss:.6f}  pos={final_p.round(4)}")

print("\\nTrue minimum: f(1,1) = 0.0")`,
    },
    {
      type: 'quiz',
      question: "What problem does Adam's bias correction (dividing by 1-β^t) solve?",
      options: [
        { label: 'Early iterations have near-zero estimates m and v since they start at 0 — bias correction rescales them to be accurate', correct: true },
        { label: 'It prevents the learning rate from increasing over time', correct: false },
        { label: 'It ensures gradients stay within [-1, 1]', correct: false },
        { label: 'It corrects for batch size differences', correct: false },
      ],
      explanation: 'At t=1, m_1 = (1-β₁)g. Without correction, this underestimates the true gradient. Dividing by (1-β₁^1) = (1-β₁) recovers g. As t→∞ the correction → 1.',
    },
  ],

  'optimization/12-lr-schedules': [
    {
      type: 'prose',
      content: `The learning rate is the single most important hyperparameter. Too large: divergence. Too small: slow convergence. Schedules reduce it over time. Batch size controls the gradient noise-to-signal ratio.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\eta_t = \eta_0 \cdot \gamma^{\lfloor t/k \rfloor} \quad\text{(step decay)} \qquad \eta_t = \eta_0 \cdot \frac{1}{1 + \alpha t} \quad\text{(inverse decay)}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Simulate loss curves for different LR schedules
def cosine_schedule(lr0, t, T): return lr0 * 0.5 * (1 + np.cos(np.pi * t / T))
def step_schedule(lr0, t, drop=0.5, every=50): return lr0 * (drop ** (t // every))
def warmup_cosine(lr0, t, T, warmup=20):
    if t < warmup: return lr0 * t / warmup
    return lr0 * 0.5 * (1 + np.cos(np.pi * (t - warmup) / (T - warmup)))

T = 200
ts = np.arange(T)
lr_const   = np.full(T, 0.01)
lr_step    = np.array([step_schedule(0.01, t) for t in ts])
lr_cosine  = np.array([cosine_schedule(0.01, t, T) for t in ts])
lr_warmup  = np.array([warmup_cosine(0.01, t, T) for t in ts])

print(f"{'Schedule':>15}  {'lr[0]':>8}  {'lr[50]':>8}  {'lr[100]':>9}  {'lr[199]':>9}")
for name, lrs in [('constant', lr_const), ('step', lr_step), ('cosine', lr_cosine), ('warmup+cos', lr_warmup)]:
    print(f"{name:>15}  {lrs[0]:.5f}  {lrs[50]:.5f}  {lrs[100]:.6f}  {lrs[199]:.6f}")

# Batch size effect on gradient noise
print("\\nGradient noise proportional to 1/sqrt(batch_size):")
for bs in [1, 8, 32, 128, 512]:
    noise = 1.0 / np.sqrt(bs)
    print(f"  batch={bs:>4}: relative noise = {noise:.4f}")`,
    },
    {
      type: 'quiz',
      question: 'What is the key advantage of cosine annealing over step decay?',
      options: [
        { label: 'Cosine decay is smooth and continuous, avoiding sudden lr drops that can destabilize training', correct: true },
        { label: 'Cosine annealing uses less memory', correct: false },
        { label: 'Cosine schedule always converges faster than step decay', correct: false },
        { label: 'It automatically selects the best learning rate', correct: false },
      ],
      explanation: 'Step decay causes abrupt changes that can destabilize the loss. Cosine annealing smoothly reduces lr to near zero, often yielding better final performance and easier tuning.',
    },
  ],

  'optimization/13-gradients-reg': [
    {
      type: 'prose',
      content: `Vanishing gradients occur when gradients shrink exponentially as they propagate backward through many layers, making deep networks nearly impossible to train. Exploding gradients cause NaN values. Regularization prevents overfitting.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\|\nabla_{W^{(1)}} \mathcal{L}\| \approx \prod_{l=2}^{L} \|W^{(l)}\| \cdot \|f'^{(l)}\| \quad\text{(can shrink to } \approx 0\text{)}`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathcal{L}_{\text{reg}} = \mathcal{L} + \lambda\|W\|_2^2 \quad\text{(L2)} \qquad \mathcal{L}_{\text{reg}} = \mathcal{L} + \lambda\|W\|_1 \quad\text{(L1)}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Demonstrate vanishing gradients with sigmoid
def sigmoid(z): return 1/(1+np.exp(-np.clip(z,-500,500)))
def sigmoid_grad(z): s=sigmoid(z); return s*(1-s)

n_layers = 10
x = np.random.randn(32, 64)
grad_norm = 1.0
print("Vanishing gradient through sigmoid layers:")
for l in range(n_layers):
    W = np.random.randn(64, 64) * 0.1   # small weights
    x = sigmoid(x @ W)
    local_grad = sigmoid_grad(x @ W).mean()
    grad_norm *= local_grad
    print(f"  Layer {l+1:>2}: grad_norm approx {grad_norm:.2e}")

# ReLU + He init avoids this
print("\\nWith ReLU + He initialization:")
x_r = np.random.randn(32, 64)
for l in range(n_layers):
    W_he = np.random.randn(64, 64) * np.sqrt(2/64)
    z = x_r @ W_he
    x_r = np.maximum(0, z)
    active_frac = (z > 0).mean()
    print(f"  Layer {l+1:>2}: active={active_frac:.1%}")

# L2 regularization effect on weights
w_noreg = np.array([3.0, -2.0, 5.0, -1.0])
lr, lam = 0.1, 0.1
grad_loss = np.array([0.5, -0.3, 0.8, -0.1])
w_reg = w_noreg - lr*(grad_loss + 2*lam*w_noreg)
print(f"\\nBefore L2 reg: {w_noreg}")
print(f"After  L2 reg: {w_reg.round(4)}  (weights shrink toward 0)")`,
    },
    {
      type: 'quiz',
      question: 'Batch Normalization helps with vanishing gradients because:',
      options: [
        { label: 'It re-centers and rescales layer inputs to unit variance, keeping activations in the linear region of sigmoid/tanh', correct: true },
        { label: 'It adds a gradient clipping step after each layer', correct: false },
        { label: 'It increases the learning rate automatically', correct: false },
        { label: 'It removes the need for activation functions', correct: false },
      ],
      explanation: 'BN normalizes Z^(l) before activation to ~N(0,1). Sigmoid has its steepest gradient near 0 (gradient ≈ 0.25). By keeping inputs centered, BN prevents saturation and maintains healthy gradients.',
    },
  ],

  // ================================================================
  // PHASE 4 — CNNs
  // ================================================================

  'cnns/14-convolution': [
    {
      type: 'prose',
      content: `Convolution is the fundamental operation in CNNs. A filter slides over the input, computing dot products at each position. This gives CNNs translation equivariance — they detect the same feature regardless of where it appears.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`(I * K)_{i,j} = \sum_{m}\sum_{n} I_{i+m,\,j+n} \cdot K_{m,n}`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`H_{\text{out}} = \left\lfloor\frac{H_{\text{in}} + 2p - k}{s}\right\rfloor + 1 \quad \text{(output size formula)}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def conv2d(image, kernel, stride=1, padding=0):
    """2D convolution — single channel."""
    if padding > 0:
        image = np.pad(image, padding, mode='constant')
    h_in, w_in = image.shape
    k = kernel.shape[0]
    h_out = (h_in - k) // stride + 1
    w_out = (w_in - k) // stride + 1
    out = np.zeros((h_out, w_out))
    for i in range(h_out):
        for j in range(w_out):
            patch = image[i*stride:i*stride+k, j*stride:j*stride+k]
            out[i, j] = (patch * kernel).sum()
    return out

def max_pool2d(x, pool_size=2, stride=2):
    h_out = (x.shape[0] - pool_size) // stride + 1
    w_out = (x.shape[1] - pool_size) // stride + 1
    return np.array([[x[i*stride:i*stride+pool_size, j*stride:j*stride+pool_size].max()
                      for j in range(w_out)] for i in range(h_out)])

# Edge detection with Sobel
image = np.array([
    [0,0,0,255,255,255,0,0],
    [0,0,0,255,255,255,0,0],
    [0,0,0,255,255,255,0,0],
], dtype=float)

sobel_x = np.array([[-1,0,1],[-2,0,2],[-1,0,1]])
edges   = conv2d(image, sobel_x, padding=1)
pooled  = max_pool2d(np.abs(edges))

print(f"Input:  {image.shape}")
print(f"After conv (same padding): {conv2d(image, sobel_x, padding=1).shape}")
print(f"After max pool (2x2):      {pooled.shape}")

# Output size formula
for k, s, p in [(3,1,0),(3,1,1),(5,2,2)]:
    h_in = 32
    h_out = (h_in + 2*p - k)//s + 1
    print(f"  H_in={h_in}, k={k}, s={s}, p={p}  ->  H_out={h_out}")`,
    },
    {
      type: 'quiz',
      question: "What is 'same' padding?",
      options: [
        { label: 'Padding that preserves the input spatial size (H_out = H_in when stride=1)', correct: true },
        { label: 'Padding with the same value as the input mean', correct: false },
        { label: 'Using a padding size equal to the kernel size', correct: false },
        { label: 'Padding applied only on the right and bottom edges', correct: false },
      ],
      explanation: "'Same' padding adds p = (k-1)/2 zeros on each side. With stride=1: H_out = (H + 2*(k-1)/2 - k)/1 + 1 = H. This preserves spatial resolution through the layer.",
    },
  ],

  'cnns/15-cnn-architectures': [
    {
      type: 'prose',
      content: `CNN architectures evolved from LeNet-5 (1998, 60K params) to ResNet-152 (2015, 60M params). Each generation introduced a key innovation: local receptive fields (LeNet), ReLU+dropout (AlexNet), depth with small kernels (VGG), skip connections (ResNet).`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{ResNet block: } \mathbf{y} = F(\mathbf{x}, \{W_i\}) + \mathbf{x} \quad\Rightarrow\quad \frac{\partial \mathcal{L}}{\partial \mathbf{x}} = \frac{\partial \mathcal{L}}{\partial \mathbf{y}}\left(\frac{\partial F}{\partial \mathbf{x}} + I\right)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Parameter counts for key architectures
architectures = {
    'LeNet-5 (1998)': {
        'params': 61706,
        'top5_imagenet': None,
        'key_idea': 'Convolution + pooling for images',
    },
    'AlexNet (2012)': {
        'params': 61_000_000,
        'top5_imagenet': 15.3,
        'key_idea': 'ReLU, dropout, GPU training',
    },
    'VGG-16 (2014)': {
        'params': 138_000_000,
        'top5_imagenet': 7.3,
        'key_idea': 'Depth with uniform 3x3 kernels',
    },
    'ResNet-50 (2015)': {
        'params': 25_000_000,
        'top5_imagenet': 5.3,
        'key_idea': 'Skip connections — train 100+ layers',
    },
}

print(f"{'Architecture':>20}  {'Params':>12}  {'Top-5 err':>10}  Key idea")
for name, info in architectures.items():
    err = f"{info['top5_imagenet']}%" if info['top5_imagenet'] else 'N/A'
    print(f"{name:>20}  {info['params']:>12,}  {err:>10}  {info['key_idea']}")

# ResNet skip connection gradient — why it solves vanishing gradients
print("\\nResNet gradient flow:")
print("dL/dx = dL/dy * (dF/dx + I)")
print("Even if dF/dx approx 0, gradient dL/dy flows through the identity (I)")
print("This is why ResNets can train 1000+ layers.")`,
    },
    {
      type: 'quiz',
      question: 'What fundamental problem do ResNet skip connections solve?',
      options: [
        { label: 'Vanishing gradients — the identity shortcut guarantees at least dL/dy flows back unchanged', correct: true },
        { label: 'Overfitting — skip connections act as a form of regularization', correct: false },
        { label: 'Computational cost — shortcuts reduce the number of multiplications', correct: false },
        { label: 'Exploding gradients — the identity dampens large gradient values', correct: false },
      ],
      explanation: 'In a residual block y = F(x) + x, the gradient is dL/dx = dL/dy(dF/dx + I). The +I term means gradient flows back through the identity even when dF/dx ≈ 0. This enables training networks with hundreds of layers.',
    },
  ],

  // ================================================================
  // PHASE 5 — Autoencoders & VAEs
  // ================================================================

  'autoencoders/16-autoencoders': [
    {
      type: 'prose',
      content: `An autoencoder learns to compress data into a lower-dimensional latent space (encoding) and reconstruct it back (decoding). The bottleneck forces the network to learn the most important features of the data.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`z = f_\phi(x) \quad \hat{x} = g_\theta(z) \quad \mathcal{L} = \|x - \hat{x}\|^2`,
    },
    {
      type: 'prose',
      content: `Autoencoders are used for dimensionality reduction, denoising, anomaly detection, and as a building block for VAEs and generative models.`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def relu(x): return np.maximum(0, x)
def sigmoid(x): return 1/(1+np.exp(-np.clip(x,-500,500)))

class Autoencoder:
    """Simple 3-layer autoencoder: 20 -> 4 -> 20"""
    def __init__(self):
        rng = np.random.default_rng(42)
        self.We = rng.standard_normal((20, 4)) * 0.1  # encoder weights
        self.be = np.zeros(4)
        self.Wd = rng.standard_normal((4, 20)) * 0.1  # decoder weights
        self.bd = np.zeros(20)
        self.lr = 0.05

    def forward(self, X):
        self.Z   = X @ self.We + self.be         # (n, 4) latent
        self.H   = relu(self.Z)
        self.Zd  = self.H @ self.Wd + self.bd    # (n, 20) reconstruction
        self.Xh  = sigmoid(self.Zd)
        return self.Xh

    def backward(self, X):
        n    = X.shape[0]
        dXh  = (self.Xh - X) * (self.Xh * (1-self.Xh)) / n
        dWd  = self.H.T @ dXh;  dbd = dXh.sum(0)
        dH   = dXh @ self.Wd.T * (self.Z > 0)
        dWe  = X.T  @ dH;       dbe = dH.sum(0)
        self.We -= self.lr * dWe;  self.be -= self.lr * dbe
        self.Wd -= self.lr * dWd;  self.bd -= self.lr * dbd
        return np.mean((X - self.Xh)**2)

# Synthetic data: 100 samples on a 4D manifold embedded in 20D
rng = np.random.default_rng(0)
z_true = rng.standard_normal((200, 4))
A = rng.standard_normal((4, 20)) * 0.3
X = sigmoid(z_true @ A + 0.05*rng.standard_normal((200,20)))

ae = Autoencoder()
for ep in range(2001):
    ae.forward(X)
    loss = ae.backward(X)
    if ep % 500 == 0:
        print(f"Epoch {ep:4d}  recon_loss={loss:.5f}")

z_encoded = relu(X @ ae.We + ae.be)
print(f"\\nLatent shape: {z_encoded.shape}")`,
    },
    {
      type: 'quiz',
      question: 'What makes an autoencoder learn useful representations?',
      options: [
        { label: 'The bottleneck (latent dimension smaller than input) forces it to compress, keeping only the most important structure', correct: true },
        { label: 'The MSE loss explicitly penalizes features that are not informative', correct: false },
        { label: 'Autoencoders use a special regularization term that promotes disentangled representations', correct: false },
        { label: 'Symmetric encoder-decoder weights guarantee useful features', correct: false },
      ],
      explanation: "Without a bottleneck, the autoencoder could simply copy the input (identity mapping). The bottleneck forces information compression, so the network learns to preserve the most important structure.",
    },
  ],

  'autoencoders/17-vaes': [
    {
      type: 'prose',
      content: `A VAE is a generative model that learns a probability distribution over the latent space. Instead of encoding to a single point, it encodes to a distribution (mean + variance). This allows sampling new data points.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathcal{L}_{\text{ELBO}} = \mathbb{E}_{q_\phi(z|x)}[\log p_\theta(x|z)] - D_{\text{KL}}(q_\phi(z|x) \| p(z))`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`D_{\text{KL}}(\mathcal{N}(\mu,\sigma^2)\|\mathcal{N}(0,1)) = \frac{1}{2}\sum_j\!\left(\mu_j^2 + \sigma_j^2 - \log\sigma_j^2 - 1\right)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def sigmoid(x): return 1/(1+np.exp(-np.clip(x,-500,500)))
def relu(x):    return np.maximum(0, x)

def kl_gaussian(mu, log_var):
    """KL divergence between N(mu, sigma^2) and N(0,1)."""
    return 0.5 * np.sum(mu**2 + np.exp(log_var) - log_var - 1, axis=-1)

def reparameterize(mu, log_var):
    """Reparameterization trick: z = mu + eps * sigma, eps ~ N(0,1)."""
    eps = np.random.randn(*mu.shape)
    return mu + eps * np.exp(0.5 * log_var)   # sigma = exp(log_var / 2)

# Simple VAE forward pass
rng = np.random.default_rng(42)
batch, d_in, d_lat = 16, 20, 2

# Encoder outputs mean and log-variance
We_mu  = rng.standard_normal((d_in, d_lat)) * 0.1
We_lv  = rng.standard_normal((d_in, d_lat)) * 0.1

X = rng.standard_normal((batch, d_in))
mu      = X @ We_mu
log_var = X @ We_lv

# Sample latent code via reparameterization
z = reparameterize(mu, log_var)

kl = kl_gaussian(mu, log_var)
print(f"mu shape:      {mu.shape}")
print(f"log_var shape: {log_var.shape}")
print(f"z shape:       {z.shape}")
print(f"KL divergence per sample: {kl.round(4)}")
print(f"Mean KL: {kl.mean():.4f}")

print("\\nReparameterization: z = mu + eps * sigma")
print("Gradient flows through mu and sigma — NOT through the random eps")`,
    },
    {
      type: 'quiz',
      question: 'What is the reparameterization trick and why is it needed?',
      options: [
        { label: 'It expresses z = mu + eps*sigma so gradients can flow through mu and sigma, avoiding backprop through a discrete sampling operation', correct: true },
        { label: 'It re-scales the KL term to balance reconstruction vs. regularization loss', correct: false },
        { label: 'It initializes the encoder weights using the prior distribution', correct: false },
        { label: 'It replaces the Gaussian prior with a uniform distribution for easier sampling', correct: false },
      ],
      explanation: 'Sampling z ~ N(mu, sigma^2) is not differentiable w.r.t. mu, sigma. The trick rewrites it as z = mu + eps*sigma where eps ~ N(0,1) is fixed randomness. Now dz/dmu = 1 and dz/dsigma = eps — both computable.',
    },
  ],

  // ================================================================
  // PHASE 6 — Recurrent Networks
  // ================================================================

  'rnns/18-rnns': [
    {
      type: 'prose',
      content: `RNNs process sequential data by maintaining a hidden state that is updated at each time step. They are the basis for language models, speech recognition, and time-series analysis.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h) \qquad \hat{y}_t = W_{hy} h_t + b_y`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def tanh(x): return np.tanh(x)
def softmax(x): e=np.exp(x-x.max()); return e/e.sum()

class SimpleRNN:
    def __init__(self, d_in, d_hid, d_out):
        s = 0.01
        rng = np.random.default_rng(1)
        self.Wxh = rng.standard_normal((d_in, d_hid)) * s
        self.Whh = rng.standard_normal((d_hid, d_hid)) * s
        self.bh  = np.zeros(d_hid)
        self.Why = rng.standard_normal((d_hid, d_out)) * s
        self.by  = np.zeros(d_out)

    def forward(self, xs):
        """xs: list of input vectors."""
        h = np.zeros(self.bh.shape)
        hs, ys = [], []
        for x in xs:
            h = tanh(x @ self.Wxh + h @ self.Whh + self.bh)
            y = h @ self.Why + self.by
            hs.append(h.copy())
            ys.append(softmax(y))
        return hs, ys

# Character-level language model on "hello"
chars   = list("hello ")
ch2idx  = {c: i for i, c in enumerate(set(chars))}
idx2ch  = {i: c for c, i in ch2idx.items()}
vocab   = len(ch2idx)

def one_hot(i, n): v=np.zeros(n); v[i]=1; return v

rnn = SimpleRNN(d_in=vocab, d_hid=16, d_out=vocab)
xs  = [one_hot(ch2idx[c], vocab) for c in chars[:-1]]
hs, ys = rnn.forward(xs)

print(f"Sequence length: {len(xs)}")
print(f"Hidden state shape: {hs[0].shape}")
print(f"Output probs shape: {ys[0].shape}")
print(f"\\nFirst output distribution (untrained):")
for i, p in enumerate(ys[0]):
    print(f"  '{idx2ch[i]}': {p:.4f}")`,
    },
    {
      type: 'quiz',
      question: "Why do vanilla RNNs struggle to learn long-range dependencies?",
      options: [
        { label: 'Gradients are multiplied by Whh at each step — if ||Whh|| < 1 they vanish; if > 1 they explode over long sequences', correct: true },
        { label: 'RNNs process tokens in parallel, losing sequence order', correct: false },
        { label: 'The hidden state size is fixed, limiting long-term memory capacity', correct: false },
        { label: 'tanh saturates at ±1, preventing any long-range information flow', correct: false },
      ],
      explanation: 'Backprop-through-time multiplies by Whh^T at each step. After T steps: product of T copies of Whh. Eigenvalues < 1 → vanishing; > 1 → exploding. This is the fundamental challenge LSTM was designed to solve.',
    },
  ],

  'rnns/19-lstm-gru': [
    {
      type: 'prose',
      content: `LSTM (Hochreiter & Schmidhuber, 1997) solves the vanishing gradient problem through gating mechanisms. The cell state acts as a "conveyor belt" that can carry information across thousands of time steps unchanged. GRU (2014) is a simpler variant with fewer parameters.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{LSTM:}\quad f_t = \sigma(W_f[h_{t-1},x_t]) \quad i_t = \sigma(W_i[\cdot]) \quad c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t \quad h_t = o_t \odot \tanh(c_t)`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{GRU:}\quad z_t = \sigma(W_z[h_{t-1},x_t]) \quad r_t = \sigma(W_r[\cdot]) \quad h_t = (1-z_t)\odot h_{t-1} + z_t\odot\tilde{h}_t`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def sigmoid(x): return 1/(1+np.exp(-np.clip(x,-500,500)))

class LSTMCell:
    def __init__(self, d_in, d_hid):
        rng = np.random.default_rng(0)
        c = 0.1
        s = d_in + d_hid
        # Combined weight matrix for all 4 gates: [f, i, g, o]
        self.W = rng.standard_normal((s, 4*d_hid)) * c
        self.b = np.zeros(4*d_hid)
        self.d_hid = d_hid

    def forward(self, x, h_prev, c_prev):
        xh  = np.concatenate([h_prev, x])
        raw = xh @ self.W + self.b
        d   = self.d_hid
        f = sigmoid(raw[:d])     # forget gate
        i = sigmoid(raw[d:2*d])  # input gate
        g = np.tanh(raw[2*d:3*d])# candidate
        o = sigmoid(raw[3*d:])   # output gate
        c = f * c_prev + i * g
        h = o * np.tanh(c)
        return h, c, dict(f=float(f.mean()), i=float(i.mean()), g=float(g.mean()), o=float(o.mean()))

# Run LSTM on a sequence
lstm = LSTMCell(d_in=10, d_hid=32)
T    = 20
xs   = [np.random.randn(10) for _ in range(T)]
h, c = np.zeros(32), np.zeros(32)

print(f"{'Step':>4}  {'forget':>8}  {'input':>8}  {'output':>8}  {'||h||':>8}")
for t, x in enumerate(xs):
    h, c, gates = lstm.forward(x, h, c)
    if t % 4 == 0:
        print(f"{t:>4}  {gates['f']:>8.4f}  {gates['i']:>8.4f}  {gates['o']:>8.4f}  {np.linalg.norm(h):>8.4f}")

print(f"\\nFinal cell state ||c||: {np.linalg.norm(c):.4f}")
print(f"Final hidden state ||h||: {np.linalg.norm(h):.4f}")`,
    },
    {
      type: 'quiz',
      question: 'What does the forget gate do in an LSTM?',
      options: [
        { label: 'It decides what fraction of the previous cell state c_{t-1} to retain — values near 1 keep it, near 0 erase it', correct: true },
        { label: 'It removes the least important neurons from the hidden state', correct: false },
        { label: 'It applies dropout to prevent overfitting in the cell state', correct: false },
        { label: 'It forgets the input x_t when the hidden state is already saturated', correct: false },
      ],
      explanation: 'f_t = σ(W_f[h_{t-1}, x_t]). This is multiplied elementwise with c_{t-1}. When f_t ≈ 1: memory preserved. When f_t ≈ 0: memory erased. The sigmoid gate is differentiable, so the network learns WHEN to forget.',
    },
  ],

  // ================================================================
  // PHASE 7 — Transformers
  // ================================================================

  'transformers/20-embeddings': [
    {
      type: 'prose',
      content: `Embeddings convert discrete tokens (words, characters, subwords) into continuous vectors that capture semantic relationships. Positional encoding adds information about token position since the transformer has no inherent notion of order.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{PE}_{(pos, 2i)} = \sin\!\left(\frac{pos}{10000^{2i/d}}\right) \qquad \text{PE}_{(pos, 2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/d}}\right)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def positional_encoding(seq_len, d_model):
    PE = np.zeros((seq_len, d_model))
    pos = np.arange(seq_len)[:, None]
    div = np.exp(np.arange(0, d_model, 2) * (-np.log(10000) / d_model))
    PE[:, 0::2] = np.sin(pos * div)
    PE[:, 1::2] = np.cos(pos * div[:d_model//2])
    return PE

# Simulate token embedding + positional encoding
vocab_size = 1000
d_model    = 64
seq_len    = 16

rng = np.random.default_rng(42)
E   = rng.standard_normal((vocab_size, d_model)) * 0.02  # embedding table
tokens = rng.integers(0, vocab_size, seq_len)            # random token ids

token_emb = E[tokens]                                    # (seq_len, d_model)
PE        = positional_encoding(seq_len, d_model)
X         = token_emb + PE                               # add positional info

print(f"Token embeddings:    {token_emb.shape}")
print(f"Positional encoding: {PE.shape}")
print(f"Input to transformer:{X.shape}")
print(f"\\nPE range: [{PE.min():.3f}, {PE.max():.3f}]  (all values in [-1,1])")

# Verify: PE at pos 0 and pos 1 differ
cos_sim = (PE[0] @ PE[1]) / (np.linalg.norm(PE[0]) * np.linalg.norm(PE[1]))
print(f"Cosine similarity PE[0] vs PE[1]: {cos_sim:.4f}")
cos_far = (PE[0] @ PE[15]) / (np.linalg.norm(PE[0]) * np.linalg.norm(PE[15]))
print(f"Cosine similarity PE[0] vs PE[15]: {cos_far:.4f}  (should be lower)")`,
    },
    {
      type: 'quiz',
      question: 'Why do transformers need explicit positional encoding while RNNs do not?',
      options: [
        { label: 'RNNs process tokens sequentially so position is implicit in the recurrence; transformers process all tokens in parallel so must encode position explicitly', correct: true },
        { label: 'Transformers use floating-point embeddings which cannot encode position natively', correct: false },
        { label: 'Positional encoding improves attention scores regardless of architecture', correct: false },
        { label: 'RNNs have positional encoding built into their weight matrices', correct: false },
      ],
      explanation: "In a transformer, all tokens are processed simultaneously via attention. Without PE, the model is permutation-invariant — it can't tell 'cat sat on mat' from 'mat on sat cat'. PE injects order information into the input.",
    },
  ],

  'transformers/21-attention': [
    {
      type: 'prose',
      content: `Attention allows a model to focus on relevant parts of the input when producing each output. Scaled dot-product attention computes a weighted average of value vectors, with weights determined by query-key compatibility.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_1,\ldots,\text{head}_h)W^O \quad \text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def softmax_rows(x):
    e = np.exp(x - x.max(axis=-1, keepdims=True))
    return e / e.sum(axis=-1, keepdims=True)

def attention(Q, K, V, mask=None):
    d_k = Q.shape[-1]
    scores = Q @ K.transpose(0, 2, 1) / np.sqrt(d_k)  # (B, T_q, T_k)
    if mask is not None:
        scores = scores + mask * -1e9
    weights = softmax_rows(scores)
    return weights @ V, weights

# Single-head attention
B, T, d_k = 2, 8, 16
rng = np.random.default_rng(0)

Q = rng.standard_normal((B, T, d_k))
K = rng.standard_normal((B, T, d_k))
V = rng.standard_normal((B, T, d_k))

out, attn_weights = attention(Q, K, V)
print(f"Q: {Q.shape}  K: {K.shape}  V: {V.shape}")
print(f"Output: {out.shape}")
print(f"Attention weights: {attn_weights.shape}")
print(f"Weight row sums (should be 1): {attn_weights[0, 0].sum():.6f}")

# Causal mask (for GPT-style decoder)
mask = np.triu(np.ones((T, T)), k=1)[None]  # upper triangle = 1 -> masked
out_causal, w_causal = attention(Q, K, V, mask=mask)
print(f"\\nCausal attention — future tokens masked:")
print(f"Weights[0,0] (position 0 can only attend to itself):")
print(f"  {w_causal[0, 0].round(4)}")`,
    },
    {
      type: 'quiz',
      question: 'Why do we divide by sqrt(d_k) in scaled dot-product attention?',
      options: [
        { label: 'For large d_k, dot products grow large and push softmax into regions of tiny gradients — dividing by sqrt(d_k) keeps variance stable', correct: true },
        { label: 'To normalize the query and key vectors to unit length', correct: false },
        { label: 'To ensure attention weights sum to d_k instead of 1', correct: false },
        { label: 'It is a learnable parameter initialized to 1/sqrt(d_k)', correct: false },
      ],
      explanation: 'If Q,K ~ N(0,1) and d_k is large, Q·K ~ N(0, d_k). The variance grows with d_k, pushing softmax inputs to large values where gradients vanish. Dividing by sqrt(d_k) restores unit variance.',
    },
  ],

  'transformers/22-transformer-arch': [
    {
      type: 'prose',
      content: `The full transformer combines multi-head attention, feed-forward layers, residual connections, and layer normalization. The encoder processes input; the decoder generates output autoregressively using both self-attention and cross-attention.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\text{FFN}(x) = \text{ReLU}(xW_1 + b_1)W_2 + b_2 \qquad \text{LayerNorm}(x) = \frac{x - \mu}{\sigma} \cdot \gamma + \beta`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def relu(x): return np.maximum(0, x)
def layer_norm(x, eps=1e-5):
    mu = x.mean(-1, keepdims=True)
    std = x.std(-1, keepdims=True)
    return (x - mu) / (std + eps)
def softmax_rows(x):
    e = np.exp(x - x.max(-1, keepdims=True))
    return e / e.sum(-1, keepdims=True)

class TransformerBlock:
    def __init__(self, d_model, n_heads, d_ff):
        rng = np.random.default_rng(0)
        s = 0.02
        self.d_k = d_model // n_heads
        self.n_heads = n_heads
        # MHA weights
        self.Wq = rng.standard_normal((d_model, d_model)) * s
        self.Wk = rng.standard_normal((d_model, d_model)) * s
        self.Wv = rng.standard_normal((d_model, d_model)) * s
        self.Wo = rng.standard_normal((d_model, d_model)) * s
        # FFN weights
        self.W1 = rng.standard_normal((d_model, d_ff)) * s
        self.b1 = np.zeros(d_ff)
        self.W2 = rng.standard_normal((d_ff, d_model)) * s
        self.b2 = np.zeros(d_model)

    def mha(self, X):
        Q = X @ self.Wq;  K = X @ self.Wk;  V = X @ self.Wv
        heads = []
        for h in range(self.n_heads):
            s, e = h*self.d_k, (h+1)*self.d_k
            scores = Q[:,:,s:e] @ K[:,:,s:e].transpose(0,2,1) / np.sqrt(self.d_k)
            w = softmax_rows(scores)
            heads.append(w @ V[:,:,s:e])
        return np.concatenate(heads, axis=-1) @ self.Wo

    def ffn(self, X):
        return relu(X @ self.W1 + self.b1) @ self.W2 + self.b2

    def forward(self, X):
        X = layer_norm(X + self.mha(X))   # Add & Norm
        X = layer_norm(X + self.ffn(X))   # Add & Norm
        return X

block = TransformerBlock(d_model=64, n_heads=4, d_ff=256)
X = np.random.randn(2, 8, 64)   # (batch, seq, d_model)
out = block.forward(X)
print(f"Input:  {X.shape}")
print(f"Output: {out.shape}")
print(f"Output mean (should be approx 0 after LayerNorm): {out.mean():.4f}")
print(f"Output std  (should be approx 1): {out.std():.4f}")`,
    },
    {
      type: 'quiz',
      question: 'In the Pre-LN vs Post-LN transformer debate, what is the key advantage of Pre-LN (LayerNorm before attention)?',
      options: [
        { label: 'Gradients flow more smoothly to early layers, enabling training without learning rate warm-up', correct: true },
        { label: 'Pre-LN uses fewer parameters', correct: false },
        { label: 'Post-LN was shown to be more accurate on BERT benchmarks', correct: false },
        { label: 'Pre-LN is always used in modern architectures', correct: false },
      ],
      explanation: "Post-LN (original 'Attention is All You Need') requires careful lr warm-up. Pre-LN (GPT-2, modern LLMs) has gradients bounded by the layer norm, making training more stable and eliminating the need for warm-up.",
    },
  ],

  // ================================================================
  // PHASE 8 — Generative Models
  // ================================================================

  'generative/23-gans': [
    {
      type: 'prose',
      content: `Generative Adversarial Networks (Goodfellow et al., 2014) train two networks in competition: a generator that creates fake data and a discriminator that tries to distinguish real from fake. The generator improves by fooling the discriminator.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\min_G \max_D \; \mathbb{E}_{x\sim p_{\text{data}}}[\log D(x)] + \mathbb{E}_{z\sim p_z}[\log(1-D(G(z)))]`,
    },
    {
      type: 'prose',
      content: `Training instability is the main challenge. Mode collapse (generator produces few modes), vanishing gradients when D is too strong, and oscillation are common failure modes. Wasserstein GAN addresses many of these.`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def relu(x): return np.maximum(0, x)
def sigmoid(x): return 1/(1+np.exp(-np.clip(x,-500,500)))

class Generator:
    """Maps noise z ~ N(0,1) to data space."""
    def __init__(self, d_noise, d_out):
        rng = np.random.default_rng(1)
        self.W1 = rng.standard_normal((d_noise, 32)) * 0.1
        self.b1 = np.zeros(32)
        self.W2 = rng.standard_normal((32, d_out)) * 0.1
        self.b2 = np.zeros(d_out)

    def forward(self, z):
        h = relu(z @ self.W1 + self.b1)
        return np.tanh(h @ self.W2 + self.b2)

class Discriminator:
    """Maps data x to probability of being real."""
    def __init__(self, d_in):
        rng = np.random.default_rng(2)
        self.W1 = rng.standard_normal((d_in, 32)) * 0.1
        self.b1 = np.zeros(32)
        self.W2 = rng.standard_normal((32, 1)) * 0.1
        self.b2 = np.zeros(1)

    def forward(self, x):
        h = relu(x @ self.W1 + self.b1)
        return sigmoid(h @ self.W2 + self.b2).flatten()

# Simulate training dynamics on 1D Gaussian data
rng  = np.random.default_rng(42)
G, D = Generator(d_noise=4, d_out=1), Discriminator(d_in=1)
lr   = 0.005

print(f"{'Step':>6}  {'D_real':>8}  {'D_fake':>8}  {'G_loss':>8}")
for step in range(1, 6):
    # Real data ~ N(2, 0.5)
    x_real = rng.normal(2.0, 0.5, (64, 1))
    z      = rng.standard_normal((64, 4))
    x_fake = G.forward(z)

    d_real = D.forward(x_real).mean()
    d_fake = D.forward(x_fake).mean()
    d_loss = -np.log(d_real + 1e-8) - np.log(1 - d_fake + 1e-8)
    g_loss = -np.log(d_fake + 1e-8)
    print(f"{step:>6}  {d_real:>8.4f}  {d_fake:>8.4f}  {g_loss:>8.4f}")

print("\\nNote: real GAN training requires autograd for backprop through both networks.")
print("At Nash equilibrium: D(x)=0.5 everywhere, G generates the true distribution.")`,
    },
    {
      type: 'quiz',
      question: "What is 'mode collapse' in GAN training?",
      options: [
        { label: 'The generator learns to produce only a few output modes (e.g., one digit) instead of the full data distribution', correct: true },
        { label: 'The discriminator collapses to always outputting 0.5', correct: false },
        { label: 'The generator and discriminator reach Nash equilibrium too quickly', correct: false },
        { label: 'Training diverges due to the minimax objective having no saddle point', correct: false },
      ],
      explanation: 'If G finds one fake that consistently fools D, it may always generate that same output. D eventually detects it, but G just switches to another single mode. WGAN-GP, diversity penalties, and minibatch discrimination are common fixes.',
    },
  ],

  'generative/24-diffusion': [
    {
      type: 'prose',
      content: `Diffusion models (Ho et al., 2020 — DDPM) learn to reverse a gradual noising process. The forward process adds Gaussian noise over T steps until data becomes pure noise. The model learns to reverse this: starting from noise, iteratively denoising to generate data.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`q(x_t | x_0) = \mathcal{N}(x_t;\, \sqrt{\bar\alpha_t}\, x_0,\, (1-\bar\alpha_t)I) \qquad \bar\alpha_t = \prod_{s=1}^{t}(1-\beta_s)`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathcal{L}_{\text{simple}} = \mathbb{E}_{t,x_0,\epsilon}\!\left[\|\epsilon - \epsilon_\theta(x_t, t)\|^2\right] \quad \epsilon\sim\mathcal{N}(0,I)`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# DDPM forward and reverse process on 1D data
T    = 1000
beta = np.linspace(1e-4, 0.02, T)         # linear noise schedule
alpha     = 1 - beta
alpha_bar = np.cumprod(alpha)              # cumulative product

def q_sample(x0, t):
    """Add noise to x0 at timestep t (forward process)."""
    sqrt_ab   = np.sqrt(alpha_bar[t])
    sqrt_1mab = np.sqrt(1 - alpha_bar[t])
    eps = np.random.randn(*x0.shape)
    return sqrt_ab * x0 + sqrt_1mab * eps, eps

def show_noising(x0, steps):
    print(f"x0 (clean):  {x0:.4f}")
    for t in steps:
        xt, _ = q_sample(np.array([x0]), t)
        snr = alpha_bar[t] / (1 - alpha_bar[t])
        print(f"  t={t:>4}: x_t={xt[0]:>7.4f}  signal_ratio={alpha_bar[t]:.4f}  SNR={snr:.4f}")

# Show how data becomes noise
show_noising(2.0, [0, 100, 250, 500, 750, 999])

# DDPM reverse step (given true eps for demo)
print("\\nReverse denoising (using true noise — demo only):")
x0_true = np.array([2.0])
xt, eps_true = q_sample(x0_true, t=500)
print(f"Noisy x_500: {xt[0]:.4f}")

# Reverse formula: x_{t-1} = (1/sqrt(alpha_t)) * (x_t - beta_t/sqrt(1-alpha_bar_t) * eps)
t = 500
mu_t = (1/np.sqrt(alpha[t])) * (xt - (beta[t]/np.sqrt(1-alpha_bar[t])) * eps_true)
print(f"Denoised to x_499: {mu_t[0]:.4f}  (true x0: {x0_true[0]:.4f})")`,
    },
    {
      type: 'quiz',
      question: "What does the diffusion model's neural network actually predict?",
      options: [
        { label: 'The noise epsilon that was added to x0 to get x_t — then we can subtract it to recover the clean signal', correct: true },
        { label: 'The clean image x0 directly from x_t in one step', correct: false },
        { label: 'The score function grad log p(x_t), which is equivalent but requires different parameterization', correct: false },
        { label: 'The diffusion timestep t given a noisy image', correct: false },
      ],
      explanation: 'DDPM trains eps_theta(x_t, t) to predict the noise eps added at step t. Given this prediction, we can compute x0 estimate or take a denoising step. Score matching (score = -eps/sqrt(1-alpha_bar)) is mathematically equivalent.',
    },
  ],

};
