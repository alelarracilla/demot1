const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function trackComponentInteraction({
  name,
  variant,
  action,
}: {
  name: string;
  variant?: string;
  action: string;
}) {
  try {
    await fetch(`${API_URL}/components/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, variant, action }),
    });
  } catch (error) {
    console.warn("Tracking failed", error);
  }
}
