export const COURSE_TITLES: Record<string, string> = {
  'math-foundations': 'Math Foundations',
  'ml-fundamentals': 'ML Fundamentals',
  'classical-ml': 'Classical ML',
  'deep-learning': 'Deep Learning',
  'transformers-llms': 'Transformers & LLMs',
};

export const COURSE_LESSONS: Record<string, { slug: string; title: string }[]> = {
  'math-foundations': [
    { slug: '01-vectors-matrices', title: 'Vectors & Matrices' },
    { slug: '02-derivatives-gradients', title: 'Derivatives & Gradients' },
    { slug: '03-probability-stats', title: 'Probability & Statistics' },
    { slug: '04-gradient-descent', title: 'Gradient Descent' },
  ],
  'ml-fundamentals': [
    { slug: '05-linear-regression', title: 'Linear Regression' },
    { slug: '06-logistic-regression', title: 'Logistic Regression' },
    { slug: '07-model-evaluation', title: 'Model Evaluation' },
    { slug: '08-bias-variance', title: 'Bias-Variance Tradeoff' },
  ],
  'classical-ml': [
    { slug: '09-decision-trees', title: 'Decision Trees' },
    { slug: '10-svms', title: 'Support Vector Machines' },
    { slug: '11-clustering', title: 'Clustering' },
    { slug: '12-dimensionality-reduction', title: 'Dimensionality Reduction' },
  ],
  'deep-learning': [
    { slug: '13-neural-networks', title: 'Neural Networks' },
    { slug: '14-backpropagation', title: 'Backpropagation' },
    { slug: '15-cnns', title: 'Convolutional Neural Networks' },
    { slug: '16-rnns-lstm', title: 'RNNs & LSTM' },
  ],
  'transformers-llms': [
    { slug: '17-attention', title: 'Attention Mechanism' },
    { slug: '18-transformer-arch', title: 'Transformer Architecture' },
    { slug: '19-bert', title: 'BERT & Masked LM' },
    { slug: '20-gpt', title: 'GPT & Autoregressive LMs' },
    { slug: '21-rlhf', title: 'RLHF & Alignment' },
    { slug: '22-rag', title: 'RAG & Retrieval' },
    { slug: '23-agents', title: 'LLM Agents' },
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
// Full lesson content for implemented lessons; undefined for others (shows "coming soon")
export const LESSON_CONTENT: Record<string, LessonSection[]> = {
  'math-foundations/01-vectors-matrices': [
    {
      type: 'prose',
      content: `A **vector** is an ordered list of numbers. In machine learning, vectors represent data points, features, and model weights. Understanding vectors is the foundation of everything that follows — from linear regression to transformer attention.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathbf{v} = \begin{bmatrix} 1.2 \\ -0.5 \\ 3.7 \end{bmatrix} \in \mathbb{R}^3`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Dot Product',
    },
    {
      type: 'prose',
      content: `The **dot product** is the most fundamental operation in ML. It measures how aligned two vectors are. A neural network layer is nothing more than a batch of dot products:`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i = \|\mathbf{a}\| \|\mathbf{b}\| \cos\theta`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Define two vectors
a = np.array([1.0, 2.0, 3.0])
b = np.array([4.0, 5.0, 6.0])

# Dot product
dot = np.dot(a, b)
print(f"a · b = {dot}")  # 32.0

# Cosine similarity
cos_sim = dot / (np.linalg.norm(a) * np.linalg.norm(b))
print(f"cos(θ) = {cos_sim:.4f}")

# A dense layer: y = Wx + b
W = np.random.randn(4, 3)  # 4 neurons, 3 input features
x = np.array([1.0, 2.0, 3.0])
b_bias = np.zeros(4)
y = W @ x + b_bias
print(f"Layer output: {y.round(4)}")`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'Matrix Multiplication',
    },
    {
      type: 'prose',
      content: `Matrix multiplication is how we process entire batches at once. If **X** has shape (batch, features) and **W** has shape (features, neurons), then **XW** computes all dot products simultaneously:`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`(XW)_{ij} = \sum_{k=1}^{d} X_{ik} W_{kj}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# Batch of 32 examples, 10 features each
X = np.random.randn(32, 10)
W = np.random.randn(10, 16)   # 16 neurons
b = np.zeros(16)

# Process entire batch in one operation
Z = X @ W + b                 # shape: (32, 16)
A = np.maximum(0, Z)          # ReLU activation

print(f"Input batch shape:  {X.shape}")
print(f"Weight shape:       {W.shape}")
print(f"Output shape:       {A.shape}")
print(f"Sparsity after ReLU: {(A == 0).mean():.1%}")`,
    },
    {
      type: 'quiz',
      question: 'A weight matrix W has shape (512, 768). This layer maps from how many input features to how many output neurons?',
      options: [
        { label: '768 inputs → 512 outputs', correct: true },
        { label: '512 inputs → 768 outputs', correct: false },
        { label: 'Both are valid depending on convention', correct: false },
        { label: 'Shape alone cannot determine this', correct: false },
      ],
      explanation: 'In the operation y = Wx, W has shape (out_features, in_features). For X @ W (used in NumPy/PyTorch Linear), W has shape (in_features, out_features), so 512 → 768 would apply there. Context: for W @ x notation, (512, 768) means 768 inputs → 512 outputs.',
    },
  ],

  'math-foundations/02-derivatives-gradients': [
    {
      type: 'prose',
      content: `The **derivative** tells us how a function changes as its input changes. In machine learning, we need to know how the loss changes with respect to every weight — that's what training is. The gradient is the multi-dimensional generalization of the derivative.`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Derivative',
    },
    {
      type: 'math',
      display: true,
      content: String.raw`f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}`,
    },
    {
      type: 'prose',
      content: `For ML, we care about three derivatives above all others: the derivative of **ReLU**, **sigmoid**, and **cross-entropy loss**.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\frac{d}{dx}\text{ReLU}(x) = \begin{cases} 1 & x > 0 \\ 0 & x \leq 0 \end{cases} \qquad \frac{d}{dx}\sigma(x) = \sigma(x)(1 - \sigma(x))`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Chain Rule',
    },
    {
      type: 'prose',
      content: `The chain rule is the engine of backpropagation. If z = f(g(x)), then:`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\frac{dz}{dx} = \frac{dz}{dg} \cdot \frac{dg}{dx}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_grad(x):
    s = sigmoid(x)
    return s * (1 - s)

def relu(x):
    return np.maximum(0, x)

def relu_grad(x):
    return (x > 0).astype(float)

# Numerical gradient check (finite differences)
def numerical_grad(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)

x = np.array([0.5, -1.2, 2.3, 0.0])

print("Sigmoid gradients:")
print(f"  Analytical: {sigmoid_grad(x).round(4)}")
print(f"  Numerical:  {np.array([numerical_grad(sigmoid, xi) for xi in x]).round(4)}")

print("\\nReLU gradients:")
print(f"  Analytical: {relu_grad(x)}")
print(f"  Numerical:  {np.array([numerical_grad(relu, xi) for xi in x]).round(4)}")`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Gradient',
    },
    {
      type: 'prose',
      content: `For a function f: R^n → R, the gradient is the vector of all partial derivatives. It points in the direction of steepest ascent:`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\nabla f(\mathbf{x}) = \begin{bmatrix} \frac{\partial f}{\partial x_1} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{bmatrix}`,
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

# MSE loss gradient with respect to weights
def mse_loss(y_pred, y_true):
    return np.mean((y_pred - y_true) ** 2)

# Linear model: y_pred = X @ w
X = np.random.randn(100, 5)
w_true = np.array([1.0, -0.5, 2.0, 0.3, -1.2])
y = X @ w_true + 0.1 * np.random.randn(100)

# Initialize random weights
w = np.random.randn(5)

# Analytical gradient: dL/dw = (2/n) * X^T (Xw - y)
n = len(y)
y_pred = X @ w
grad = (2 / n) * X.T @ (y_pred - y)

print(f"Loss: {mse_loss(y_pred, y):.4f}")
print(f"Gradient norm: {np.linalg.norm(grad):.4f}")
print(f"Gradient: {grad.round(4)}")

# One gradient descent step
lr = 0.01
w_new = w - lr * grad
print(f"\\nLoss after one step: {mse_loss(X @ w_new, y):.4f}")`,
    },
    {
      type: 'quiz',
      question: 'Why do we subtract the gradient (not add) when doing gradient descent?',
      options: [
        { label: 'The gradient points toward lower loss, so we follow it directly', correct: false },
        { label: 'The gradient points toward higher loss (steepest ascent), so we move opposite to it', correct: true },
        { label: 'It is just a convention with no mathematical reason', correct: false },
        { label: 'Subtracting ensures the weights stay in a bounded range', correct: false },
      ],
      explanation: "The gradient points in the direction of steepest *ascent* — toward increasing loss. To minimize loss, we move in the opposite direction: w ← w − η∇f(w). This is why it's called gradient *descent*.",
    },
  ],

  'deep-learning/14-backpropagation': [
    {
      type: 'prose',
      content: `**Backpropagation** is the algorithm that makes training deep networks possible. It efficiently computes the gradient of the loss with respect to every weight in the network using the chain rule — without recomputing anything twice.`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Computation Graph',
    },
    {
      type: 'prose',
      content: `Every neural network forward pass can be represented as a **directed acyclic graph** (DAG) of operations. Backprop traverses this graph in reverse, propagating gradients from the loss back to the inputs.`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\mathcal{L} = \frac{1}{n}\sum_{i} \ell(\hat{y}_i, y_i) \qquad \frac{\partial \mathcal{L}}{\partial W^{(l)}} = \frac{\partial \mathcal{L}}{\partial Z^{(l)}} \cdot \frac{\partial Z^{(l)}}{\partial W^{(l)}}`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'Forward Pass Equations',
    },
    {
      type: 'prose',
      content: `For a 2-layer network with ReLU:`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`Z^{(1)} = XW^{(1)} + b^{(1)} \quad A^{(1)} = \text{ReLU}(Z^{(1)}) \quad Z^{(2)} = A^{(1)}W^{(2)} + b^{(2)} \quad \hat{y} = \sigma(Z^{(2)})`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'Backward Pass Equations',
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\delta^{(2)} = \hat{y} - y \qquad \frac{\partial \mathcal{L}}{\partial W^{(2)}} = \frac{1}{n}(A^{(1)})^\top \delta^{(2)}`,
    },
    {
      type: 'math',
      display: true,
      content: String.raw`\delta^{(1)} = (\delta^{(2)} (W^{(2)})^\top) \odot \mathbf{1}[Z^{(1)} > 0] \qquad \frac{\partial \mathcal{L}}{\partial W^{(1)}} = \frac{1}{n} X^\top \delta^{(1)}`,
    },
    {
      type: 'heading',
      level: 2,
      content: 'Complete NumPy Implementation',
    },
    {
      type: 'code',
      language: 'python',
      content: `import numpy as np

class TwoLayerNet:
    """2-layer neural net with ReLU + binary cross-entropy — from scratch."""

    def __init__(self, input_dim, hidden_dim, output_dim, lr=0.01):
        scale1 = np.sqrt(2.0 / input_dim)
        scale2 = np.sqrt(2.0 / hidden_dim)
        self.W1 = np.random.randn(input_dim, hidden_dim) * scale1
        self.b1 = np.zeros(hidden_dim)
        self.W2 = np.random.randn(hidden_dim, output_dim) * scale2
        self.b2 = np.zeros(output_dim)
        self.lr = lr
        self.cache = {}

    def _sigmoid(self, x):
        return 1.0 / (1.0 + np.exp(-np.clip(x, -500, 500)))

    def forward(self, X):
        Z1 = X @ self.W1 + self.b1
        A1 = np.maximum(0, Z1)
        Z2 = A1 @ self.W2 + self.b2
        A2 = self._sigmoid(Z2)
        self.cache = {'X': X, 'Z1': Z1, 'A1': A1, 'Z2': Z2, 'A2': A2}
        return A2

    def backward(self, y):
        n = y.shape[0]
        X, Z1, A1, A2 = (self.cache[k] for k in ['X', 'Z1', 'A1', 'A2'])
        eps = 1e-15
        loss = -np.mean(y * np.log(A2 + eps) + (1 - y) * np.log(1 - A2 + eps))
        dZ2 = (A2 - y) / n
        dW2 = A1.T @ dZ2
        db2 = dZ2.sum(axis=0)
        dA1 = dZ2 @ self.W2.T
        dZ1 = dA1 * (Z1 > 0).astype(float)
        dW1 = X.T @ dZ1
        db1 = dZ1.sum(axis=0)
        self.W2 -= self.lr * dW2
        self.b2 -= self.lr * db2
        self.W1 -= self.lr * dW1
        self.b1 -= self.lr * db1
        return float(loss)

    def accuracy(self, X, y):
        probs = self.forward(X)
        preds = (probs > 0.5).astype(int)
        return float((preds.flatten() == y.flatten()).mean())


# Train on XOR
np.random.seed(42)
X = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=float)
y = np.array([[0],[1],[1],[0]], dtype=float)
X_train = np.tile(X, (250, 1)) + 0.05 * np.random.randn(1000, 2)
y_train = np.tile(y, (250, 1))

net = TwoLayerNet(input_dim=2, hidden_dim=8, output_dim=1, lr=0.5)

print(f"{'Epoch':>6}  {'Loss':>8}  {'Accuracy':>10}")
print("-" * 30)
for epoch in range(1001):
    net.forward(X_train)
    loss = net.backward(y_train)
    if epoch % 200 == 0:
        acc = net.accuracy(X_train, y_train)
        print(f"{epoch:>6}  {loss:>8.4f}  {acc:>9.1%}")

print("\\nXOR predictions:")
for xi, yi in zip(X, y):
    pred = net.forward(xi.reshape(1, -1))[0, 0]
    print(f"  {xi} -> {pred:.3f}  (true: {int(yi[0])})")`,
    },
    {
      type: 'quiz',
      question: 'During backpropagation, why do we multiply by the ReLU derivative (the indicator function 1[z > 0])?',
      options: [
        { label: 'To normalize the gradients so they do not explode', correct: false },
        { label: "Because the chain rule requires multiplying by the local derivative, and ReLU's derivative is 0 for z≤0", correct: true },
        { label: 'To prevent negative gradients from propagating', correct: false },
        { label: 'It is optional — just a training speed optimization', correct: false },
      ],
      explanation: "The chain rule says: to backprop through ReLU, multiply the upstream gradient by ReLU's local derivative. Since ReLU(z) = max(0,z), its derivative is 1 when z>0 and 0 when z≤0. Dead neurons (z≤0) receive zero gradient — they don't update. This is the 'dying ReLU' problem.",
    },
  ],
};
