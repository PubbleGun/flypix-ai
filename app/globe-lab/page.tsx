"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./globe-lab.module.css";

type Detection = {
  value: string;
  label: string;
  longitude: number;
  latitude: number;
  color: string;
  offsetX: number;
  offsetY: number;
};

const DETECTIONS: Detection[] = [
  { value: "13,589", label: "vehicles", longitude: 4.48, latitude: 51.92, color: "#3478f6", offsetX: -38, offsetY: -18 },
  { value: "4,208", label: "containers", longitude: 103.82, latitude: 1.26, color: "#10b79a", offsetX: 52, offsetY: -18 },
  { value: "268", label: "crop fields", longitude: -6, latitude: 31.8, color: "#a86fe8", offsetX: -58, offsetY: 22 },
  { value: "91,400", label: "trees", longitude: 21, latitude: 52.2, color: "#35b85a", offsetX: 58, offsetY: -15 },
  { value: "612", label: "storage tanks", longitude: -102.3, latitude: 31.9, color: "#ff9f0a", offsetX: -52, offsetY: -22 },
  { value: "375,000", label: "rooftops", longitude: 55.27, latitude: 25.2, color: "#ff4f56", offsetX: 62, offsetY: 20 },
  { value: "2,140", label: "seabirds", longitude: 174.7, latitude: -41.3, color: "#32b9ee", offsetX: -48, offsetY: -24 },
  { value: "48,300", label: "solar panels", longitude: -70.7, latitude: -30, color: "#f2c94c", offsetX: -55, offsetY: -20 },
  { value: "1,980 ha", label: "fire impact", longitude: 24, latitude: -29, color: "#ff4f56", offsetX: 55, offsetY: 26 },
  { value: "82", label: "road defects", longitude: -74, latitude: 4.7, color: "#e75db4", offsetX: -55, offsetY: 20 },
  { value: "37", label: "vessels", longitude: 121.5, latitude: 31.2, color: "#13b8b2", offsetX: 50, offsetY: -22 },
  { value: "6,712", label: "buildings", longitude: 36.8, latitude: -1.3, color: "#6267e8", offsetX: -52, offsetY: 20 },
  { value: "146", label: "wind turbines", longitude: 9.4, latitude: 56.2, color: "#66d9c2", offsetX: 48, offsetY: -34 },
  { value: "3,840 m²", label: "waste piles", longitude: 7.5, latitude: 9, color: "#9acb45", offsetX: 58, offsetY: 5 },
  { value: "1,276", label: "cattle", longitude: -58.4, latitude: -34.6, color: "#b78662", offsetX: 54, offsetY: 22 },
  { value: "18.4 ha", label: "oil spill", longitude: 110, latitude: -5, color: "#b94a5b", offsetX: 58, offsetY: 24 },
  { value: "734", label: "railcars", longitude: 68, latitude: 48, color: "#f5b942", offsetX: -52, offsetY: -20 },
  { value: "2,635", label: "swimming pools", longitude: -3.7, latitude: 40.4, color: "#22c9d6", offsetX: -55, offsetY: 25 },
  { value: "94", label: "excavators", longitude: 72.8, latitude: 19.1, color: "#446fe8", offsetX: 55, offsetY: -24 },
  { value: "8,905", label: "greenhouses", longitude: 115.9, latitude: -31.9, color: "#55b978", offsetX: -58, offsetY: -22 },
  { value: "312 km", label: "power lines", longitude: -105, latitude: 54, color: "#8b61d6", offsetX: 55, offsetY: -20 },
  { value: "24", label: "mining pits", longitude: 151, latitude: -33, color: "#d16d45", offsetX: 55, offsetY: 20 },
  { value: "17,650", label: "parking spaces", longitude: -87.6, latitude: 41.9, color: "#ec6f91", offsetX: 55, offsetY: 24 },
  { value: "5,420 ha", label: "flood zones", longitude: -47, latitude: -15, color: "#5369d8", offsetX: -55, offsetY: -22 },
];

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform float uRotation;
  uniform vec2 uResolution;

  const float PI = 3.141592653589793;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;
    float radiusSquared = dot(p, p);
    float edge = 1.0 - smoothstep(0.985, 1.0, radiusSquared);
    if (edge <= 0.0) discard;

    float z = sqrt(max(0.0, 1.0 - radiusSquared));
    vec3 normal = normalize(vec3(p.x, p.y, z));
    float longitude = atan(p.x, z) - uRotation;
    float latitude = asin(clamp(p.y, -1.0, 1.0));
    vec2 mapUv = vec2(fract(longitude / (2.0 * PI) + 0.5), 0.5 - latitude / PI);
    float land = texture2D(uMap, mapUv).a;

    vec3 ocean = vec3(0.925, 0.945, 0.937);
    vec3 continent = vec3(0.715, 0.758, 0.744);
    vec3 color = mix(ocean, continent, smoothstep(0.12, 0.72, land));

    vec3 lightDirection = normalize(vec3(-0.48, 0.58, 0.72));
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float softShade = 0.87 + diffuse * 0.13;
    float specular = pow(max(dot(normal, lightDirection), 0.0), 28.0) * 0.18;
    float rim = pow(1.0 - z, 2.5) * 0.055;
    color = color * softShade + vec3(specular) - vec3(rim * 0.35);

    float border = smoothstep(0.965, 0.995, radiusSquared) * 0.07;
    color -= vec3(border * 0.34, border * 0.18, border * 0.22);
    gl_FragColor = vec4(color, edge);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create globe shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Unknown globe shader error";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create globe renderer");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Unable to link globe renderer");
  }
  return program;
}

export default function GlobeLabPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rotationRef = useRef(-0.08);
  const speedRef = useRef(5);
  const manualPauseRef = useRef(false);
  const [speed, setSpeed] = useState(5);
  const [markerCount, setMarkerCount] = useState(DETECTIONS.length);
  const [pixelField, setPixelField] = useState(true);
  const [manualPause, setManualPause] = useState(false);
  const [status, setStatus] = useState<"loading" | "rotating" | "paused" | "dragging" | "error">("loading");

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    manualPauseRef.current = manualPause;
  }, [manualPause]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const globe = globeRef.current;
    if (!canvas || !stage || !globe) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      queueMicrotask(() => setStatus("error"));
      return;
    }

    let program: WebGLProgram;
    try {
      program = createProgram(gl);
    } catch {
      queueMicrotask(() => setStatus("error"));
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const rotationLocation = gl.getUniformLocation(program, "uRotation");
    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const mapLocation = gl.getUniformLocation(program, "uMap");
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    if (!buffer || !texture) {
      queueMicrotask(() => setStatus("error"));
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(mapLocation, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let ready = false;
    let hovering = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartRotation = rotationRef.current;
    let animationFrame = 0;
    let previousTime = performance.now();

    const updateMarkers = () => {
      const rect = globe.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const radius = rect.width * 0.47;
      const centerX = rect.left - stageRect.left + rect.width / 2;
      const centerY = rect.top - stageRect.top + rect.height / 2;

      DETECTIONS.forEach((detection, index) => {
        const marker = markerRefs.current[index];
        if (!marker) return;
        const longitude = detection.longitude * Math.PI / 180 + rotationRef.current;
        const latitude = detection.latitude * Math.PI / 180;
        const cosLatitude = Math.cos(latitude);
        const x = cosLatitude * Math.sin(longitude);
        const y = Math.sin(latitude);
        const z = cosLatitude * Math.cos(longitude);
        const visibility = Math.max(0, Math.min(1, (z - 0.06) / 0.18));
        marker.style.left = `${centerX + x * radius}px`;
        marker.style.top = `${centerY - y * radius}px`;
        marker.style.opacity = `${visibility}`;
        marker.style.zIndex = z > 0.5 ? "8" : "5";
        marker.style.transform = `translate(-50%, -50%) translate(${detection.offsetX}px, ${detection.offsetY}px) scale(${0.94 + visibility * 0.06})`;
        marker.style.pointerEvents = visibility > 0.9 ? "auto" : "none";
      });
    };

    const resize = () => {
      const rect = globe.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, width, height);
      updateMarkers();
    };

    const draw = () => {
      if (!ready) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform1f(rotationLocation, rotationRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      updateMarkers();
    };

    const tick = (time: number) => {
      const delta = Math.min(50, time - previousTime);
      previousTime = time;
      const paused = manualPauseRef.current || hovering || dragging;
      if (!paused && ready && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        rotationRef.current += (speedRef.current * Math.PI / 180) * (delta / 1000);
      }
      draw();
      animationFrame = requestAnimationFrame(tick);
    };

    const mapImage = new Image();
    mapImage.onload = () => {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 2048;
      textureCanvas.height = 1024;
      const textureContext = textureCanvas.getContext("2d");
      if (!textureContext) {
        setStatus("error");
        return;
      }
      textureContext.clearRect(0, 0, textureCanvas.width, textureCanvas.height);
      textureContext.imageSmoothingEnabled = true;
      textureContext.imageSmoothingQuality = "high";
      textureContext.drawImage(mapImage, 0, 0, textureCanvas.width, textureCanvas.height);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.generateMipmap(gl.TEXTURE_2D);
      ready = true;
      resize();
      draw();
      setStatus("rotating");
    };
    mapImage.onerror = () => setStatus("error");
    mapImage.src = "/world-map.svg";

    const pointerIsOnGlobe = (event: PointerEvent) => {
      const rect = globe.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const isInsideGlobe = Math.hypot(distanceX, distanceY) <= rect.width / 2;
      const target = event.target as HTMLElement | null;
      return isInsideGlobe || Boolean(target?.closest("[data-detection-marker]"));
    };
    const onPointerLeave = () => {
      hovering = false;
      dragging = false;
      stage.classList.remove(styles.dragging);
      if (!manualPauseRef.current) setStatus("rotating");
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!pointerIsOnGlobe(event)) return;
      dragging = true;
      dragStartX = event.clientX;
      dragStartRotation = rotationRef.current;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add(styles.dragging);
      setStatus("dragging");
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
      stage.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
      const nextHovering = event.pointerType !== "touch" && pointerIsOnGlobe(event);
      if (nextHovering !== hovering && !dragging) {
        hovering = nextHovering;
        if (!manualPauseRef.current) setStatus(hovering ? "paused" : "rotating");
      }
      if (!dragging) return;
      rotationRef.current = dragStartRotation + (event.clientX - dragStartX) * 0.0085;
      draw();
    };
    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      stage.classList.remove(styles.dragging);
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      if (event.pointerType === "touch") {
        hovering = false;
        setStatus(manualPauseRef.current ? "paused" : "rotating");
      } else {
        hovering = pointerIsOnGlobe(event);
        setStatus(hovering ? "paused" : "rotating");
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      rotationRef.current += event.key === "ArrowLeft" ? -0.14 : 0.14;
      draw();
    };

    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("keydown", onKeyDown);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(globe);
    resize();
    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("keydown", onKeyDown);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  const togglePause = () => {
    setManualPause((current) => {
      const next = !current;
      setStatus(next ? "paused" : "rotating");
      return next;
    });
  };

  const resetView = () => {
    rotationRef.current = -0.08;
    setManualPause(false);
    setStatus("rotating");
  };

  return (
    <main className={styles.lab}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Back to FlyPix AI home">
          <Image src="/assets/source/flypix-header.svg" alt="FlyPix AI" width={160} height={44} priority />
        </Link>
        <div className={styles.labTitle}><span>Experimental component</span><strong>Globe Lab / 01</strong></div>
        <div className={styles.liveState}><i data-state={status} />{status}</div>
      </header>

      <section className={styles.workspace}>
        <div
          className={`${styles.stage} ${pixelField ? styles.pixelFieldOn : ""}`}
          ref={stageRef}
          tabIndex={0}
          role="img"
          aria-label="Interactive rotating globe showing color-coded FlyPix AI detections"
        >
          <div className={styles.coordinateLabel}>50.1109° N&nbsp;&nbsp;8.6821° E</div>
          <div className={styles.pixelField} aria-hidden="true" />
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.globe} ref={globeRef}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.glass} aria-hidden="true" />
          </div>

          {DETECTIONS.map((detection, index) => (
            <div
              className={`${styles.marker} ${index >= markerCount ? styles.markerHidden : ""}`}
              ref={(node) => { markerRefs.current[index] = node; }}
              key={`${detection.value}-${detection.label}`}
              data-detection-marker
              tabIndex={index < markerCount ? 0 : -1}
              aria-label={`${detection.value} ${detection.label}`}
            >
              <span className={styles.markerSurface}>
                <span className={styles.markerDot} style={{ background: detection.color }} />
                <b>{detection.value}</b>
                <span>{detection.label}</span>
              </span>
            </div>
          ))}

          {status === "loading" && <div className={styles.loading}>Preparing Earth data…</div>}
          {status === "error" && <div className={styles.error}>Globe renderer is unavailable in this browser.</div>}
        </div>

        <aside className={styles.controls}>
          <div className={styles.controlHeader}>
            <p>Globe controls</p>
            <span>Prototype</span>
          </div>

          <label className={styles.rangeControl}>
            <span><b>Rotation</b><output>{speed.toFixed(1)}° / sec</output></span>
            <input
              type="range"
              min="0.5"
              max="7"
              step="0.1"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
            />
          </label>

          <label className={styles.rangeControl}>
            <span><b>Detections</b><output>{markerCount} object classes</output></span>
            <input
              type="range"
              min="4"
              max={DETECTIONS.length}
              step="1"
              value={markerCount}
              onChange={(event) => setMarkerCount(Number(event.target.value))}
            />
          </label>

          <div className={styles.switchRow}>
            <div><b>Pixel field</b><span>Cursor-reactive background</span></div>
            <button
              type="button"
              className={pixelField ? styles.switchOn : ""}
              aria-pressed={pixelField}
              aria-label="Toggle pixel field"
              onClick={() => setPixelField((value) => !value)}
            ><i /></button>
          </div>

          <div className={styles.legend}>
            <p>Object classes</p>
            <div><span style={{ background: "#3478f6" }} />Vehicles</div>
            <div><span style={{ background: "#13b8b2" }} />Maritime</div>
            <div><span style={{ background: "#35b85a" }} />Vegetation</div>
            <div><span style={{ background: "#ff9f0a" }} />Infrastructure</div>
            <div><span style={{ background: "#a86fe8" }} />Agriculture</div>
            <div><span style={{ background: "#ff4f56" }} />Impact</div>
            <div><span style={{ background: "#e75db4" }} />Mobility</div>
            <div><span style={{ background: "#6267e8" }} />Urban</div>
          </div>

          <div className={styles.controlActions}>
            <button type="button" onClick={togglePause}>{manualPause ? "Resume" : "Pause"}</button>
            <button type="button" onClick={resetView}>Reset view</button>
          </div>

          <p className={styles.note}>This isolated component does not change the current landing page.</p>
        </aside>
      </section>
    </main>
  );
}
