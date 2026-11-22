import { useEffect, useRef, useState } from "react";

type FeedbackInput = { category: string; message: string; email: string };
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const transientError =
  "We couldn’t confirm your feedback was sent. Your draft is still here. Try again in a moment.";

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
    if (!message || message.length > 2000) {
      setStatus("error");
      setErrorMessage("Enter a message of up to 2,000 characters. Your draft is still here.");
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
      // List allowed fields explicitly so the original Full Name field is never transmitted.
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
        return fail("Too many reports from this connection. Your draft is still here. Wait a little before trying again.");
      }
      if (response.status === 503 && result && typeof result === "object" &&
          "error" in result && result.error === "feedback_disabled") {
        return fail("Feedback is turned off in this preview. Nothing was sent, and your draft is still here.");
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
