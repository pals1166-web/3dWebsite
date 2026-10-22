/**
 * WebGL Support Verification Utility
 * Checks both WebGLRenderingContext existence and actual context acquisition.
 */
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    const isSupported = Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
    return isSupported;
  } catch {
    return false;
  }
}
