import type { OllamaSettings } from "@/lib/types";

export async function callOllama(
  prompt: string,
  settings: OllamaSettings,
  system?: string,
) {
  const response = await fetch(`${settings.baseUrl}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: settings.model,
      prompt,
      system,
      stream: false,
      options: {
        temperature: settings.temperature,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed with status ${response.status}`);
  }

  return response.json() as Promise<{ response: string }>;
}
