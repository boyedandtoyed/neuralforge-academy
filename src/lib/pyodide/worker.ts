// Web Worker: runs CPython (via Pyodide WASM) in an isolated thread
// so Python execution never blocks the main UI thread

let pyodide: any = null;

async function loadPyodideIfNeeded() {
  if (pyodide) return pyodide;

  // @ts-ignore — importScripts is available in Web Workers
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.0/full/pyodide.js');

  // @ts-ignore
  pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/',
  });

  // Pre-load common ML packages
  await pyodide.loadPackage(['numpy', 'scikit-learn', 'matplotlib']);

  return pyodide;
}

self.onmessage = async (event: MessageEvent) => {
  const { id, code } = event.data;

  try {
    const py = await loadPyodideIfNeeded();

    // Capture stdout
    py.runPython(`
      import sys
      from io import StringIO
      _stdout_capture = StringIO()
      sys.stdout = _stdout_capture
    `);

    await py.runPythonAsync(code);

    // Restore stdout and get output
    const output = py.runPython(`
      sys.stdout = sys.__stdout__
      _stdout_capture.getvalue()
    `);

    self.postMessage({ id, success: true, output });
  } catch (error: any) {
    self.postMessage({ id, success: false, error: error.message });
  }
};
