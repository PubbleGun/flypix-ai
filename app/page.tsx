"use client";

/* eslint-disable @next/next/no-img-element -- The supplied FlyPix assets are part of the design source. */

import { useEffect, useRef, useState } from "react";

type Detection = {
  value: string;
  label: string;
  longitude: number;
  latitude: number;
  color: string;
  offsetX: number;
  offsetY: number;
};

const detections: Detection[] = [
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

const industries = [
  ["Construction", "asset-02.webp", "asset-03.webp"],
  ["Port operations", "asset-04.webp", "asset-05.webp"],
  ["Agriculture", "asset-06.webp", "asset-07.webp"],
  ["Forestry", "asset-08.webp", "asset-09.webp"],
  ["Urban development", "asset-10.webp", "asset-11.webp"],
  ["Animal monitoring", "asset-12.webp", "asset-13.webp"],
  ["Infrastructure", "asset-14.webp", "asset-15.webp"],
  ["Ecotechnology", "asset-16.webp", "asset-17.webp"],
];

const testimonials = [
  { quote: "We were impressed by the dedicated, easy-to-work-with team, their expertise, and the quick application of the technology to a novel use case.", name: "Hannes Olbrich", role: "Head of Investor Office", company: "acitoflux, Germany", image: "asset-20.webp" },
  { quote: "FlyPix AI helped us go from idea to proof of concept in record time. We tested geospatial insights on real property data within days.", name: "Ali Tehranchi", role: "CEO", company: "Bayscenary, USA", image: "asset-21.webp" },
  { quote: "What surprised us most was how effortless it was to start using FlyPix AI. The platform is robust, easy to navigate, and reliable.", name: "Krishna Mohan", role: "Business Head", company: "Stesalit Systems Ltd., India", image: "asset-22.webp" },
  { quote: "FlyPix AI made it remarkably easy to turn drone imagery into actionable results within minutes, without complex setups.", name: "Jordan Bates", role: "Researcher", company: "University of Liège, Belgium", image: "asset-23.webp" },
  { quote: "Working with FlyPix AI has significantly elevated the impact of our clean-up missions. We are proud to collaborate with a team that shares our commitment to environmental responsibility.", name: "Robin Engelhard", role: "Chairman", company: "Second Life e.V., Germany", image: "asset-24.webp" },
  { quote: "FlyPix AI helped us automate land-use classification with incredible precision and speed, saving months of manual work.", name: "Rohit Singh", role: "Director", company: "Intent to Solution, India", image: "asset-25.webp" },
];

const news = [
  { tag: "Company", date: "May 19, 2025", image: "asset-26.webp", title: "FlyPix AI joins AWS GenAI Launchpad in Berlin", copy: "From proof of concept to a production-ready geospatial AI workflow." },
  { tag: "Events", date: "May 18, 2025", image: "asset-27.webp", title: "FlyPix AI showcases innovation at Block im Park", copy: "Practical GeoAI applications for teams working with complex imagery." },
  { tag: "Insurance", date: "May 14, 2025", image: "asset-28.webp", title: "Selected for InsureLab Germany’s Batch #25", copy: "Advancing geospatial intelligence for risk assessment and insurance." },
  { tag: "Research", date: "May 6, 2025", image: "asset-29.webp", title: "Foundation model breakthroughs at the ESA/NASA workshop", copy: "Exploring the next generation of foundation models for Earth observation." },
];

const vertexShader = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() { vUv = aPosition * 0.5 + 0.5; gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const fragmentShader = `
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
    float specular = pow(max(dot(normal, lightDirection), 0.0), 28.0) * 0.18;
    float rim = pow(1.0 - z, 2.5) * 0.055;
    color = color * (0.87 + diffuse * 0.13) + vec3(specular) - vec3(rim * 0.35);
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
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Globe shader error");
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create globe renderer");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Unable to link globe renderer");
  return program;
}

function Brand() {
  return <img className="brand-lockup" src="/assets/source/flypix-header.svg" alt="FlyPix AI" />;
}

function SourceIcon({ type }: { type: "satellite" | "aircraft" | "drone" }) {
  return <img className="source-svg" src={`/assets/source/${type}.svg`} alt="" aria-hidden="true" />;
}

function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rotationRef = useRef(-0.08);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const globe = globeRef.current;
    if (!canvas || !stage || !globe) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "high-performance" });
    if (!gl) return;
    let program: WebGLProgram;
    try { program = createProgram(gl); } catch { return; }

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const rotationLocation = gl.getUniformLocation(program, "uRotation");
    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const mapLocation = gl.getUniformLocation(program, "uMap");
    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    if (!buffer || !texture) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(mapLocation, 0);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA,
    );

    let ready = false;
    let hovering = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartRotation = rotationRef.current;
    let frame = 0;
    let previousTime = performance.now();

    const updateMarkers = () => {
      const rect = globe.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const radius = rect.width * 0.47;
      const centerX = rect.left - stageRect.left + rect.width / 2;
      const centerY = rect.top - stageRect.top + rect.height / 2;
      detections.forEach((detection, index) => {
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
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; gl.viewport(0, 0, width, height); }
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
      if (!hovering && !dragging && ready && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) rotationRef.current += (5 * Math.PI / 180) * (delta / 1000);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const image = new Image();
    image.onload = () => {
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 2048;
      textureCanvas.height = 1024;
      const context = textureCanvas.getContext("2d");
      if (!context) return;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(image, 0, 0, textureCanvas.width, textureCanvas.height);
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
      stage.classList.add("is-ready");
    };
    image.src = "/world-map.svg";

    const pointerIsOnGlobe = (event: PointerEvent) => {
      const rect = globe.getBoundingClientRect();
      const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
      return distance <= rect.width / 2 || Boolean((event.target as HTMLElement | null)?.closest("[data-detection-marker]"));
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      stage.style.setProperty("--cursor-x", `${event.clientX - rect.left}px`);
      stage.style.setProperty("--cursor-y", `${event.clientY - rect.top}px`);
      if (!dragging) hovering = event.pointerType !== "touch" && pointerIsOnGlobe(event);
      if (dragging) { rotationRef.current = dragStartRotation + (event.clientX - dragStartX) * 0.0085; draw(); }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!pointerIsOnGlobe(event)) return;
      dragging = true;
      dragStartX = event.clientX;
      dragStartRotation = rotationRef.current;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("is-dragging");
    };
    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      stage.classList.remove("is-dragging");
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      hovering = event.pointerType !== "touch" && pointerIsOnGlobe(event);
    };
    const onPointerLeave = () => { hovering = false; dragging = false; stage.classList.remove("is-dragging"); };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      rotationRef.current += event.key === "ArrowLeft" ? -0.14 : 0.14;
      draw();
    };
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("keydown", onKeyDown);
    const observer = new ResizeObserver(resize);
    observer.observe(globe);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("keydown", onKeyDown);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="hero-globe-stage" ref={stageRef} tabIndex={0} aria-label="Interactive rotating globe showing color-coded FlyPix AI detections">
      <div className="hero-pixel-field" aria-hidden="true" />
      <div className="hero-globe-glow" aria-hidden="true" />
      <div className="hero-globe-shell" ref={globeRef}>
        <canvas ref={canvasRef} className="hero-globe-canvas" aria-hidden="true" />
        <div className="hero-globe-glass" aria-hidden="true" />
      </div>
      {detections.map((detection, index) => (
        <div
          className="detection-marker"
          ref={(node) => { markerRefs.current[index] = node; }}
          key={`${detection.value}-${detection.label}`}
          data-detection-marker
          data-lon={detection.longitude}
          data-lat={detection.latitude}
          data-offset-x={detection.offsetX}
          data-offset-y={detection.offsetY}
          tabIndex={0}
          aria-label={`${detection.value} ${detection.label}`}
        >
          <span className="detection-surface">
            <span className="detection-dot" style={{ background: detection.color }} />
            <b>{detection.value}</b><span>{detection.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function BeforeAfter() {
  const [position, setPosition] = useState(52);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const update = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (rect) setPosition(Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100)));
  };
  return (
    <div
      className="comparison"
      ref={frameRef}
      onPointerDown={(event) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); update(event.clientX); }}
      onPointerMove={(event) => { if (dragging.current) update(event.clientX); }}
      onPointerUp={(event) => { dragging.current = false; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onKeyDown={(event) => { if (event.key === "ArrowLeft") setPosition((value) => Math.max(3, value - 3)); if (event.key === "ArrowRight") setPosition((value) => Math.min(97, value + 3)); }}
      tabIndex={0}
      role="slider"
      aria-label="Compare buildings detected before and after a destructive event"
      aria-valuemin={3}
      aria-valuemax={97}
      aria-valuenow={Math.round(position)}
    >
      <img src="/assets/claude/asset-19.webp" alt="Buildings remaining after a destructive event" />
      <div className="comparison-top" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src="/assets/claude/asset-18.webp" alt="Buildings detected before a destructive event" />
      </div>
      <span className="comparison-label before">Before · 412 buildings</span>
      <span className="comparison-label after">After · 267 buildings</span>
      <div className="comparison-line" style={{ left: `${position}%` }}><button type="button" aria-hidden="true"><i /><i /></button></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const sectionIndexes = new Map<Element, number>();
    nodes.forEach((node) => {
      const section = node.closest("section") ?? node.parentElement ?? node;
      const index = sectionIndexes.get(section) ?? 0;
      node.style.setProperty("--reveal-delay", `${Math.min(index * 100, 400)}ms`);
      sectionIndexes.set(section, index + 1);
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      onPointerMove={(event) => {
        event.currentTarget.style.setProperty("--site-cursor-x", `${event.clientX}px`);
        event.currentTarget.style.setProperty("--site-cursor-y", `${event.clientY}px`);
      }}
    >
      <div className="site-pixel-field" aria-hidden="true" />
      <header className="site-header">
        <a href="#" className="brand" aria-label="FlyPix AI home"><Brand /></a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a>
          <a href="https://flypix.ai/pricing/">Pricing</a>
          <a href="#industries" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#news" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
        </nav>
        <div className="header-actions">
          <a className="pill-button compact" href="https://app.flypix.ai/">Log in</a>
          <button type="button" className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><i /><i /></button>
        </div>
      </header>

      <section className="hero" id="hero" data-section="hero">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">Geospatial AI platform</p>
          <h1>Detect and count anything from the sky</h1>
          <p className="lead">Turn satellite, aerial, and drone imagery into mapped, measurable results — and teach the AI to spot the objects you define, with no code.</p>
          <div className="hero-actions"><a className="pill-button" href="https://app.flypix.ai/">Try Now</a><a className="pill-button secondary" href="#contact">Contact us</a></div>
        </div>

        <HeroGlobe />

        <aside className="hero-data" data-reveal>
          <div className="data-group">
            <p className="data-title">Analyzes imagery</p>
            <div className="source-item"><SourceIcon type="satellite" /><span>Satellite</span><b>1 pix / 0.3–10 m²</b></div>
            <div className="source-item"><SourceIcon type="aircraft" /><span>Aircraft</span><b>1 pix / 10 cm²</b></div>
            <div className="source-item"><SourceIcon type="drone" /><span>Drone</span><b>1 pix / 1 cm²</b></div>
          </div>
          <div className="data-group capabilities"><p className="data-title">Capabilities</p><p>Train your own AI</p><p>Compare over time</p><p>Get exact coordinates</p></div>
        </aside>

        <div className="hero-word" aria-hidden="true">FLYPIX AI</div>
        <div className="hero-metrics">
          <article data-reveal><strong>99.7%</strong><p>Less manual review. Detection and inspection run on their own.</p></article>
          <article data-reveal><strong>No code</strong><p>Train your own model and analyze large-scale imagery with ease.</p></article>
          <article className="metric-spacer" aria-hidden="true" />
          <article data-reveal><strong>10,000+</strong><p>Teams worldwide rely on FlyPix every day.</p><a href="#testimonials">See reviews</a></article>
        </div>
      </section>

      <section className="platform-section ruled-section" id="platform" data-section="platform">
        <div className="section-number">FlyPix / Platform</div>
        <div className="platform-frame" data-reveal><img src="/assets/source/workspace.png" alt="FlyPix AI workspace with geospatial imagery and analysis tools" /><span>Interactive workspace</span></div>
        <div className="platform-bottom">
          <div className="platform-title" data-reveal><p className="eyebrow">One workspace</p><h2>Every object,<br />on the map.</h2></div>
          <div className="platform-action" data-reveal><p>Detected objects, counts, and areas land on a map your team can explore, correct, compare, and export — without leaving the browser.</p><a className="pill-button" href="https://app.flypix.ai/">Try Now</a></div>
        </div>
      </section>

      <section className="partner-strip" id="partners" data-section="partners" aria-label="FlyPix AI partners">
        <p>Supported by</p>
        <div className="partner-viewport">
          <div className="partner-track">
            {[0, 1].map((set) => <div className="partner-set" aria-hidden={set === 1} key={set}><img src="/assets/source/esa.svg" alt={set ? "" : "ESA"} /><img src="/assets/source/nvidia.svg" alt={set ? "" : "NVIDIA"} /><img src="/assets/source/google.svg" alt={set ? "" : "Google"} /><img src="/assets/source/ecmwf.svg" alt={set ? "" : "ECMWF"} /><img src="/assets/source/ibm.svg" alt={set ? "" : "IBM"} /></div>)}
          </div>
        </div>
      </section>

      <section className="industries-section ruled-section" id="industries" data-section="use-cases">
        <div className="section-number">FlyPix / Use cases</div>
        <div className="split-heading" data-reveal><div><p className="eyebrow">One platform, any objects</p><h2>Built for every kind of scene.</h2></div><p>From ports and construction sites to forests and farms, train a model for the objects that matter to your operation. Hover over a scene to reveal its detections.</p></div>
        <div className="carousel-controls"><button type="button" aria-label="Previous industries" onClick={() => industriesRef.current?.scrollBy({ left: -372, behavior: "smooth" })}>←</button><button type="button" aria-label="Next industries" onClick={() => industriesRef.current?.scrollBy({ left: 372, behavior: "smooth" })}>→</button></div>
        <div className="industry-carousel" ref={industriesRef}>
          {industries.map(([name, raw, detected], index) => <article className="industry-card" key={name}><img className="raw-image" src={`/assets/claude/${raw}`} alt={`${name} aerial imagery`} /><img className="detected-image" src={`/assets/claude/${detected}`} alt={`${name} AI detections`} /><div className="industry-caption"><span>0{index + 1}</span><strong>{name}</strong><em>Raw / AI</em></div></article>)}
          <article className="industry-card industry-cta"><span>09</span><div><p className="eyebrow">Your industry</p><h3>Train AI for any scene.</h3><a className="pill-button light" href="https://app.flypix.ai/">Try Now</a></div></article>
        </div>
      </section>

      <section className="comparison-section ruled-section" id="change-intelligence" data-section="change-intelligence">
        <div className="section-number">FlyPix / Change intelligence</div>
        <div data-reveal><BeforeAfter /></div>
        <div className="comparison-copy" data-reveal><p className="eyebrow">See the full picture</p><h2>Measure change,<br />not just pixels.</h2><p>Run the same model across captures from different dates. FlyPix counts what remained, identifies what disappeared, and measures the affected area after a fire, flood, or construction event.</p><div className="comparison-points"><p><span>01</span>Before: 412 buildings · 86.4 ha</p><p><span>02</span>After: 267 buildings · 59.1 ha</p><p><span>03</span>Damage: 145 buildings · 27.3 ha</p></div></div>
      </section>

      <section className="speed-section ruled-section" id="automated-review" data-section="automated-review">
        <div className="section-number">FlyPix / Automated review</div>
        <div className="speed-visuals" data-reveal>
          <article><div className="speed-image"><video src="/assets/figma/91176b20c94d1dc4286779dce0561ca16a27b5ce.mp4" autoPlay muted loop playsInline aria-label="Manual annotation workflow" /></div><h3>Manual annotate</h3><p>Time spent: <strong>997 sec</strong></p></article>
          <article><div className="speed-image"><video src="/assets/figma/6f93840aa60896f452d8ac14ea38eab3cc715fe1.mp4" autoPlay muted loop playsInline aria-label="AI-assisted annotation workflow" /></div><h3>AI annotate</h3><p>Time spent: <strong>3 sec</strong></p></article>
        </div>
        <div className="speed-copy" data-reveal><p className="eyebrow">From hours to seconds</p><h2>Save 99.7% of your review time.</h2><p>AI pre-annotates every visible object across the scene. Your team verifies the result instead of tracing each object by hand.</p></div>
      </section>

      <section className="workflow-section" id="workflow" data-section="workflow">
        <div className="workflow-heading" data-reveal><p className="eyebrow">One connected workflow</p><h2>From imagery<br />to action.</h2><p>Bring your data, define what matters, train a model, and move verified results into the tools your team already uses.</p></div>
        <div className="workflow-steps">{[["01", "Upload", "Satellite, aerial, or drone imagery"], ["02", "Define", "Label the objects and patterns that matter"], ["03", "Train", "Create a reusable model without code"], ["04", "Analyze", "Detect, count, measure, and compare"], ["05", "Export", "Share layers, coordinates, and reports"]].map(([number, title, copy]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="model-section ruled-section" id="custom-models" data-section="custom-models">
        <div className="section-number">FlyPix / Custom models</div>
        <div className="model-copy" data-reveal><p className="eyebrow">Train your own model</p><h2>Create the AI<br />you need.</h2><p>Outline a few examples and FlyPix highlights the rest. Accept or reject detections in bulk, name your class, and train a reusable model — no programming required.</p><div className="token-list"><span>#TrainingMode</span><span>#CustomAIModels</span><span>#Annotations</span></div><a className="pill-button model-cta" href="https://app.flypix.ai/">Try Now</a></div>
        <div className="model-visual" data-reveal><img src="/assets/figma/3f2a215fe584044f7ab412ea4c19d4488a88193d.png" alt="FlyPix AI model training interface" /></div>
      </section>

      <section className="testimonials-section ruled-section" id="testimonials" data-section="customer-stories">
        <div className="section-number">FlyPix / Customer stories</div>
        <div className="testimonial-heading" data-reveal><p className="eyebrow">Trusted in the field</p><h2>What teams are saying.</h2><p>Teams use FlyPix to test new ideas quickly, scale geospatial analysis, and turn complex imagery into decisions.</p></div>
        <div className="testimonial-grid">{testimonials.map((item, index) => <article key={item.name} data-reveal><span className="quote-index">0{index + 1}</span><blockquote>“{item.quote}”</blockquote><div className="person"><img src={`/assets/claude/${item.image}`} alt="" /><div><strong>{item.name}</strong><span>{item.role}</span><small>{item.company}</small></div></div></article>)}</div>
      </section>

      <section className="news-section ruled-section" id="news" data-section="resources">
        <div className="section-number">FlyPix / Resources</div>
        <div className="news-heading" data-reveal><p className="eyebrow">From the blog</p><h2>Latest news.</h2><a className="text-link" href="https://flypix.ai/blog/">View all articles ↗</a></div>
        <div className="news-grid">{news.map((item, index) => <a href="https://flypix.ai/blog/" className="news-card" key={item.title} data-reveal><div className="news-image"><img src={`/assets/claude/${item.image}`} alt="" /></div><div className="news-content"><span>{item.tag} · 0{index + 1} · {item.date}</span><h3>{item.title}</h3><p>{item.copy}</p><b aria-hidden="true">Read article ↗</b></div></a>)}</div>
      </section>

      <section className="final-cta" id="contact" data-section="final-cta" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--cta-x", `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty("--cta-y", `${event.clientY - rect.top}px`); }}>
        <div className="cta-top"><span>FLYPIX / OPERATIONAL EARTH INTELLIGENCE</span><span>LIVE SYSTEM · 2026</span></div>
        <div className="cta-copy" data-reveal><p className="eyebrow">Start your first analysis</p><h2>See the whole picture.<br />Act on what matters.</h2><p>Upload a scene and see what FlyPix AI finds, or talk to our team about a custom geospatial workflow.</p><div className="hero-actions"><a className="pill-button dark" href="https://app.flypix.ai/">Try Now ↗</a><a className="pill-button light" href="mailto:info@flypix.ai">Talk to an expert</a></div></div>
        <div className="cta-system" aria-hidden="true"><i className="cta-ring ring-one" /><i className="cta-ring ring-two" /><i className="cta-ring ring-three" /><b className="cta-node node-one" /><b className="cta-node node-two" /><b className="cta-node node-three" /><strong>EARTH<br />DATA<br />ONLINE</strong></div>
        <div className="cta-bottom"><span>OBJECTS · AREAS · CHANGE</span><span>MOVE · ADJUST · EXPLORE</span></div>
      </section>

      <footer id="footer" data-section="footer">
        <div className="footer-brand"><a href="#" className="brand"><Brand /></a><p>AI-powered geospatial analysis for satellite, aerial, and drone imagery.</p><address>Robert-Bosch-Str. 7<br />64293 Darmstadt, Germany</address><a href="mailto:info@flypix.ai">info@flypix.ai</a></div>
        <div className="footer-column"><h3>Platform</h3><a href="#platform">About</a><a href="#industries">Services</a><a href="https://flypix.ai/pricing/">Pricing</a><a href="https://flypix.ai/career/">Career</a><h3>Plans</h3><a href="https://flypix.ai/pricing/">Basic</a><a href="https://flypix.ai/pricing/">Starter</a><a href="https://flypix.ai/pricing/">Professional</a></div>
        <div className="footer-column"><h3>Industries</h3><a href="#industries">Government</a><a href="#industries">Construction</a><a href="#industries">Renewable energy</a><a href="#industries">Agriculture & farming</a><a href="#industries">Risk management</a><a href="#industries">Oil & gas</a><a href="#industries">Port operations</a><a href="#industries">Mining</a></div>
        <div className="footer-column"><h3>Partners</h3><a href="https://flypix.ai/">ESA BIC Hessen</a><a href="https://flypix.ai/">NVIDIA Inception</a><a href="https://flypix.ai/">Google for Startups</a><a href="https://flypix.ai/">IBM for Startups</a><h3>Terms</h3><a href="https://flypix.ai/privacy-policy/">Data privacy</a><a href="https://flypix.ai/privacy-policy/">Privacy policy</a><a href="https://flypix.ai/imprint/">Imprint</a></div>
        <div className="footer-column"><h3>Resources</h3><a href="#news">News</a><a href="https://flypix.ai/blog/">Blog</a><a href="https://flypix.ai/how-credits-work/">How credits work</a><a href="https://flypix.ai/faq/">FAQs</a><a href="https://app.flypix.ai/">FlyPix Sandbox</a><h3>Contact us</h3><a href="mailto:info@flypix.ai">info@flypix.ai</a><a href="tel:+4961512776497">+49 6151 2776497</a></div>
        <div className="footer-word" aria-hidden="true">FLYPIX AI</div>
        <div className="footer-bottom"><span>© 2026 FlyPix AI GmbH · All Rights Reserved</span><a href="#">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
