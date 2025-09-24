(function () {
  // Design reference resolution (portrait)
  const DESIGN_W = 720;
  const DESIGN_H = 1280;
  const canvas = document.getElementById("unity-canvas");
  const overlay = document.getElementById("rotate-overlay");

  function resizeCanvas() {
    // compute scale to fit viewport while preserving portrait aspect
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Show overlay if device is landscape (width > height)
    if (vw > vh) {
      overlay.classList.remove("hidden");
    } else {
      overlay.classList.add("hidden");
    }

    // Calculate scale so that full design fits inside viewport
    const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H);

    const cssW = Math.floor(DESIGN_W * scale);
    const cssH = Math.floor(DESIGN_H * scale);

    // Set CSS size so the canvas scales cleanly (Unity internal resolution remains the same)
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";

    // Also set canvas style transform to crisp: center
    canvas.style.margin = "0";
    canvas.style.display = "block";
  }

  // Initial resize and on changes
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("orientationchange", () => {
    // small delay to allow orientation to settle
    setTimeout(resizeCanvas, 200);
  });

  // crisp on load
  document.addEventListener("DOMContentLoaded", resizeCanvas);
  // also call immediately if DOM already parsed
  resizeCanvas();
})();
