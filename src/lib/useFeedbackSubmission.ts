import { useEffect, useRef, useState } from "react";

type FeedbackInput = { category: string; message: string; email: string };
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const transientError =
  "Couldn’t confirm delivery. Your draft is still here. Try again.";

export function useFeedbackSubmission() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const activeRequest = useRef<AbortController | null>(null);
  const lastRequest = useRef<{ signature: string; id: string } | null>(null);
  const saved = useRef(false);

  useEffect(() => () => {
    const request = activeRequest.current;
    activeRequest.current = null;
    request?.abort();
  }, []);

  function reset() {
    lastRequest.current = null;
    saved.current = false;
    setStatus("idle");
    setErrorMessage("");
  }

  async function submit(input: FeedbackInput): Promise<boolean> {
    if (activeRequest.current || saved.current) return false;
    const message = input.message.trim();
    const email = input.email.trim();
    if (!input.category || !message || message.length > 2000) {
      setStatus("error");
      setErrorMessage(!input.category ? "Choose a category." :
        !message ? "Enter a message." : "Keep your message within 2,000 characters.");
      return false;
    }

    const controller = new AbortController();
    activeRequest.current = controller;
    setStatus("submitting");
    setErrorMessage("");
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    const fail = (message: string) => {
      setStatus("error");
      setErrorMessage(message);
      return false;
    };

    try {
      // List allowed fields explicitly. Leave an empty follow-up email out.
      const draft = { category: input.category, message, ...(email ? { email } : {}) };
      const signature = JSON.stringify(draft);
      if (lastRequest.current?.signature !== signature) {
        lastRequest.current = { signature, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...draft, requestId: lastRequest.current.id }),
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);
      if (activeRequest.current !== controller) return false;
      if (response.status === 429) {
        return fail("Too many reports. Wait a bit and try again. Your draft is still here.");
      }
      if (response.status === 503 && result && typeof result === "object" &&
          "error" in result && result.error === "feedback_disabled") {
        return fail("Feedback is off in this preview. Nothing was sent. Your draft is still here.");
      }
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
        return fail(transientError);
      }
      lastRequest.current = null;
      saved.current = true;
      setStatus("success");
      return true;
    } catch {
      return activeRequest.current === controller ? fail(transientError) : false;
    } finally {
      window.clearTimeout(timeout);
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }

  return { status, errorMessage, submit, reset };
}
