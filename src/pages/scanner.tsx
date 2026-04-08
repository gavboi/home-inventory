import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scanner.css";

type ScannerNavState = {
  action: "add" | "remove";
}

function Scanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const action = (location.state as ScannerNavState | undefined)?.action ?? "add";
  const title = useMemo(() => action === "add" ? "Add Item" : "Remove Item", [action]);

  async function startCamera() {
    setError(null);
    setIsStarting(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsStreaming(true);
    } catch {
      setError("Unable to access camera. Check browser permissions and try again.");
      setIsStreaming(false);
    } finally {
      setIsStarting(false);
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
  }

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <main className="scanner-page">
      <header className="scanner-header">
        <h1>{title} Scanner</h1>
        <button type="button" onClick={() => navigate(-1)}>Back</button>
      </header>

      <section className="scanner-video-shell" aria-live="polite">
        <video ref={videoRef} className="scanner-video" autoPlay muted playsInline />
        {!isStreaming && <p className="scanner-placeholder">Camera preview will appear here.</p>}
      </section>

      <div className="scanner-actions">
        <button
          type="button"
          onClick={startCamera}
          disabled={isStarting || isStreaming}
        >
          {isStarting ? "Starting..." : "Open Camera"}
        </button>
        <button
          type="button"
          onClick={stopCamera}
          disabled={!isStreaming}
        >
          Stop Camera
        </button>
      </div>

      {error && <p className="scanner-error">{error}</p>}
    </main>
  );
}

export default Scanner;
