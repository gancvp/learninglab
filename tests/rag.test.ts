import { describe, expect, it } from "vitest";
import { chunkText, rankChunks } from "@/lib/rag";

describe("rag utilities", () => {
  it("creates chunks from text", () => {
    const chunks = chunkText("Sentence one. Sentence two. Sentence three.", 20);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it("ranks relevant chunks first", () => {
    const chunks = [
      { id: "chunk-1", text: "Gradient descent reduces loss by updating weights." },
      { id: "chunk-2", text: "Transformers use attention across tokens." },
    ];
    const ranked = rankChunks("How does gradient descent update weights?", chunks);
    expect(ranked[0].id).toBe("chunk-1");
  });
});
