Exit code: 0
Wall time: 1 seconds
Output:
(() => {
  const TWO_PI = Math.PI * 2;
  const DEG = Math.PI / 180;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const clampByte = (value) => Math.max(0, Math.min(255, Math.round(value)));

  function mountGlobe(stage) {
    if (stage.dataset.globeMounted === "true") return;

    const shell = stage.querySelector(".globe-shell, .hero-globe-shell");
    const canvas = stage.querySelector(".globe-canvas, .hero-globe-canvas");
    const badges = [...stage.querySelectorAll(".detection-badge, .detection-marker")];
    if (!shell || !canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    stage.dataset.globeMounted = "true";

    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 2048;
    textureCanvas.height = 1024;
    const textureContext = textureCanvas.getContext("2d", {
      alpha: true,
      willReadFrequently: true,
    });

    let texture = null;
    let resolution = 0;
    let imageData = null;
    let longitudeMap = null;
    let latitudeMap = null;
    let shadeMap = null;
    let highlightMap = null;
    let edgeMap = null;
    let rotation = -0.14;
    let paused = false;
    let dragging = false;
    let startX = 0;
    let startRotation = rotation;
    let dirty = true;
    let lastTick = performance.now();
    let lastPaint = 0;

    const rebuildProjection = () => {
      const rect = shell.getBoundingClientRect();
      const qualityScale = Math.max(
        1.5,
        Math.min(window.devicePixelRatio || 1, 2),
      );
      const nextResolution = Math.max(
        420,
        Math.min(1024, Math.round(rect.width * qualityScale)),
      );
      if (nextResolution === resolution) return;

      resolution = nextResolution;
      canvas.width = resolution;
      canvas.height = resolution;
      imageData = context.createImageData(resolution, resolution);

      const pixelCount = resolution * resolution;
      longitudeMap = new Float32Array(pixelCount);
      latitudeMap = new Uint16Array(pixelCount);
      shadeMap = new Float32Array(pixelCount);
      highlightMap = new Float32Array(pixelCount);
      edgeMap = new Uint8Array(pixelCount);

      const radius = resolution * 0.495;
      const center = resolution / 2;

      for (let y = 0; y < resolution; y += 1) {
        const ny = (center - (y + 0.5)) / radius;
        for (let x = 0; x < resolution; x += 1) {
          const index = y * resolution + x;
          const nx = (x + 0.5 - center) / radius;
          const rr = nx * nx + ny * ny;
          if (rr > 1) continue;

          const z = Math.sqrt(1 - rr);
          const latitude = Math.asin(ny);
          longitudeMap[index] = Math.atan2(nx, z);
          latitudeMap[index] = Math.max(
            0,
            Math.min(
              textureCanvas.height - 1,
              Math.round((0.5 - latitude / Math.PI) * (textureCanvas.height - 1)),
            ),
          );

          const light = Math.max(0, nx * -0.42 + ny * 0.52 + z * 0.74);
          const rim = 0.86 + Math.pow(z, 0.38) * 0.14;
          shadeMap[index] = (0.85 + light * 0.15) * rim;
          highlightMap[index] = Math.pow(
            Math.max(0, nx * -0.46 + ny * 0.56 + z * 0.69),
            18,
          );
          edgeMap[index] = rr < 0.965
            ? 255
            : clampByte(255 * (1 - (rr - 0.965) / 0.035));
        }
      }
      dirty = true;
    };

    const project = (longitude, latitude) => {
      const lambda = longitude * DEG + rotation;
      const phi = latitude * DEG;
      const cosPhi = Math.cos(phi);
      return {
        x: cosPhi * Math.sin(lambda),
        y: Math.sin(phi),
        z: cosPhi * Math.cos(lambda),
      };
    };

    const placeBadges = () => {
      const shellRect = shell.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const radius = Math.min(shellRect.width, shellRect.height) * 0.455;
      const offsetX = shellRect.left - stageRect.left + shellRect.width / 2;
      const offsetY = shellRect.top - stageRect.top + shellRect.height / 2;

      badges.forEach((badge) => {
        const longitude = Number(badge.dataset.lon);
        const latitude = Number(badge.dataset.lat);
        const point = project(longitude, latitude);
        const badgeOffsetX = Number(badge.dataset.offsetX) || 0;
        const badgeOffsetY = Number(badge.dataset.offsetY) || 0;
        const visibility = Math.max(0, Math.min(1, (point.z - 0.06) / 0.18));
        badge.style.left = `${offsetX + point.x * radius}px`;
        badge.style.top = `${offsetY - point.y * radius}px`;
        badge.style.opacity = `${visibility}`;
        badge.style.zIndex = point.z > 0.5 ? "8" : "5";
        badge.style.pointerEvents = visibility > 0.9 ? "auto" : "none";
        badge.style.transform = `translate(-50%, -50%) translate(${badgeOffsetX}px, ${badgeOffsetY}px) scale(${0.94 + visibility * 0.06})`;
      });
    };

    const render = () => {
      if (!texture || !imageData || !longitudeMap || !latitudeMap || !shadeMap || !highlightMap || !edgeMap) {
        return;
      }

      const output = imageData.data;
      const textureWidth = textureCanvas.width;
      const textureData = texture.data;

      for (let index = 0; index < longitudeMap.length; index += 1) {
        const outputIndex = index * 4;
        const edge = edgeMap[index];
        if (edge === 0) {
          output[outputIndex] = 0;
          output[outputIndex + 1] = 0;
          output[outputIndex + 2] = 0;
          output[outputIndex + 3] = 0;
          continue;
        }

        let u = longitudeMap[index] - rotation;
        u = u / TWO_PI + 0.5;
        u -= Math.floor(u);
        const textureX = Math.min(textureWidth - 1, Math.floor(u * textureWidth));
        const textureIndex = (latitudeMap[index] * textureWidth + textureX) * 4;
        const land = textureData[textureIndex + 3] / 255;
        const shade = shadeMap[index];
        const highlight = highlightMap[index] * 19;

        const oceanR = 237;
        const oceanG = 241;
        const oceanB = 239;
        const landR = 192;
        const landG = 201;
        const landB = 198;

        output[outputIndex] = clampByte((oceanR + (landR - oceanR) * land) * shade + highlight);
        output[outputIndex + 1] = clampByte((oceanG + (landG - oceanG) * land) * shade + highlight);
        output[outputIndex + 2] = clampByte((oceanB + (landB - oceanB) * land) * shade + highlight);
        output[outputIndex + 3] = edge;
      }

      context.clearRect(0, 0, resolution, resolution);
      context.putImageData(imageData, 0, 0);
      placeBadges();
      stage.classList.add("is-ready");
    };

    const tick = (now) => {
      const delta = Math.min(48, now - lastTick);
      lastTick = now;
      if (!paused && !dragging && !reducedMotion.matches) {
        rotation += 5 * DEG * (delta / 1000);
        dirty = true;
      }
      if (dirty && now - lastPaint >= 32) {
        render();
        dirty = false;
        lastPaint = now;
      }
      requestAnimationFrame(tick);
    };

    const image = new Image();
    image.onload = () => {
      if (!textureContext) return;
      textureContext.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
      textureContext.imageSmoothingEnabled = true;
      textureContext.imageSmoothingQuality = "high";
      textureContext.drawImage(image, 0, 0, textureCanvas.width, textureCanvas.height);
      texture = textureContext.getImageData(0, 0, textureCanvas.width, textureCanvas.height);
      rebuildProjection();
      dirty = true;
    };
    image.onerror = () => stage.classList.add("is-error");
    image.src = window.__WORLD_MAP_DATA_URI__ || stage.dataset.mapSrc || "/world-map.svg";

    const pointerIsOnGlobe = (event) => {
      const rect = shell.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2),
      );
      return distance <= rect.width / 2 || Boolean(event.target?.closest?.("[data-detection-marker]"));
    };

    const pointerDown = (event) => {
      if (!pointerIsOnGlobe(event)) return;
      dragging = true;
      paused = true;
      startX = event.clientX;
      startRotation = rotation;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("is-dragging");
    };
    const pointerMove = (event) => {
      if (dragging) {
        rotation = startRotation + (event.clientX - startX) * 0.008;
        dirty = true;
      } else {
        paused = event.pointerType !== "touch" && pointerIsOnGlobe(event);
      }
    };
    const pointerUp = (event) => {
      dragging = false;
      stage.classList.remove("is-dragging");
      if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
      }
      if (event.pointerType !== "mouse") paused = false;
    };

    stage.addEventListener("pointerleave", () => {
      paused = false;
      dragging = false;
      stage.classList.remove("is-dragging");
    });
    stage.addEventListener("pointerdown", pointerDown);
    stage.addEventListener("pointermove", pointerMove);
    stage.addEventListener("pointerup", pointerUp);
    stage.addEventListener("pointercancel", pointerUp);
    stage.addEventListener("focus", () => { paused = true; });
    stage.addEventListener("blur", () => { paused = false; });
    stage.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      rotation += event.key === "ArrowLeft" ? -0.13 : 0.13;
      dirty = true;
    });

    const resizeObserver = new ResizeObserver(() => rebuildProjection());
    resizeObserver.observe(shell);
    rebuildProjection();
    requestAnimationFrame(tick);
  }

  const mountAll = () => {
    document.querySelectorAll(".globe-stage, .hero-globe-stage").forEach(mountGlobe);
  };

  window.FlyPixGlobe = { mountAll };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountAll, { once: true });
  } else {
    mountAll();
  }
})();

