import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { buildEnhancedSystemPrompt } from "@/lib/ai/context-builder";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;
    const tutorContext: string = body.tutorContext ?? "";

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    // Validate message format
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user" || !lastMessage.content.trim()) {
      return NextResponse.json(
        { error: "Last message must be a non-empty user message" },
        { status: 400 }
      );
    }

    // If no API key, return a demo response
    if (!config.anthropic.apiKey) {
      const demoResponse = getDemoResponse(lastMessage.content);
      return NextResponse.json({ content: demoResponse });
    }

    // Build unified system prompt with RAG context + learner state
    const systemPrompt = buildEnhancedSystemPrompt(
      lastMessage.content,
      tutorContext || undefined,
    );

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.anthropic.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: systemPrompt,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.warn("[api/chat] Anthropic API error:", { status: response.status, body: error.slice(0, 200) });
      return NextResponse.json(
        { error: "Failed to get response" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content =
      data.content?.[0]?.type === "text"
        ? data.content[0].text
        : "I wasn't able to form a response. Try rephrasing your question.";

    return NextResponse.json({ content });
  } catch (error) {
    console.warn("[api/chat] unhandled error:", { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getDemoResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("sin") || q.includes("hamartia")) {
    return `The word they translated as "sin" is **hamartia** in Greek. It's an archery term -- it literally means **"missing the mark."** You aimed at a target and your arrow went wide. No moral depravity, no permanent stain. Just: you aimed, you missed, adjust and try again.

So when Paul writes "all have sinned" (Romans 3:23), the original is closer to: "everyone has missed the mark." That's coaching, not condemnation.

What changes for you when you hear it that way -- as an invitation to adjust your aim rather than a verdict on your soul?`;
  }

  if (q.includes("repent") || q.includes("metanoia")) {
    return `The word translated "repent" is **metanoia** in Greek. **Meta** = beyond. **Nous** = mind, perception. So it literally means **"to go beyond your current way of thinking"** -- a fundamental shift in how you see.

When Jesus begins his ministry saying "Repent, for the kingdom of heaven is at hand" -- what the original actually says is closer to: **"Transform your perception, because the kingdom of heaven is right here."**

He wasn't telling people to feel guilty. He was telling them to see differently. That's expansion, not contraction.

What would it look like to hear that as an invitation rather than a command?`;
  }

  if (q.includes("hell") || q.includes("gehenna")) {
    return `There are three different Greek words that all got translated as "hell" -- and they mean very different things:

**Gehenna** -- A real place. The Valley of Hinnom, a garbage dump south of Jerusalem where trash burned constantly. Jesus' audience could literally see it from the city walls. It's a metaphor for the consequences of destructive living, not a description of eternal torture.

**Hades** -- The Greek underworld. The realm of the dead. Not punishment -- just where dead people go.

**Tartarus** -- Used exactly once (2 Peter 2:4), about fallen angels. Not about human souls at all.

The modern concept of "hell" as eternal conscious torment comes primarily from medieval theology -- Dante, not Jesus.

What does it change for you knowing that Jesus was pointing at a garbage dump, not an eternal torture chamber?`;
  }

  return `That's a meaningful question. To give you the full answer with original Greek context, this connects to the AI companion which needs an API key to run.

**What I can share from the knowledge base:**

The Well is built around one idea: going back to the original Greek and Aramaic to see what was actually written, before centuries of translation and institutional interpretation changed the meaning.

Some places to start:
- **hamartia** ("sin") actually means "missing the mark" -- an archery term
- **metanoia** ("repent") actually means "transform your perception"
- **Gehenna** ("hell") was literally the garbage dump outside Jerusalem
- **aionios** ("eternal") actually means "of the age" -- not necessarily infinite

Try asking about any of these, or explore the Word Cards for a guided story through the most important changes.`;
}
