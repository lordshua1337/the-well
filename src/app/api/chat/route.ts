import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { getSystemPrompt } from "@/lib/system-prompt";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

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
        system: getSystemPrompt(),
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Anthropic API error:", response.status, error);
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
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function getDemoResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("sin") || q.includes("hamartia")) {
    return `Great question. The word commonly translated as "sin" in English comes from the Greek **hamartia** (hamartia).

It's an archery term. It literally means **"missing the mark"** -- you aimed at a target and your arrow went wide. No moral depravity, no permanent stain on your soul. Just: you aimed, you missed, adjust and try again.

This matters because when Paul writes "all have sinned" (Romans 3:23), the original meaning is closer to: "everyone has missed the mark." That's a fundamentally different tone -- coaching rather than condemnation.

The shift from "you are a sinner" to "you missed the mark" changes the entire posture of the text. One shames you. The other invites you to try again.`;
  }

  if (q.includes("repent") || q.includes("metanoia")) {
    return `The word translated "repent" is **metanoia** (metanoia) in Greek.

**Meta** = beyond, after
**Nous** = mind, perception

So metanoia literally means **"to go beyond your current way of thinking"** -- a fundamental shift in perception and understanding.

When Jesus begins his ministry saying "Repent, for the kingdom of heaven is at hand" (Matthew 4:17), the original says something closer to: **"Transform your perception, because the kingdom of heaven is right here."**

He wasn't telling people to feel guilty. He was telling them to see differently. That's a fundamentally different invitation -- one of expansion, not contraction.`;
  }

  if (q.includes("hell") || q.includes("gehenna")) {
    return `There are actually three different Greek words that all got translated as "hell" in English -- and they mean very different things:

**Gehenna** -- This is a real place. The Valley of Hinnom (Ge-Hinnom), a garbage dump south of Jerusalem where trash burned constantly. When Jesus says someone will be "thrown into Gehenna," his audience could literally see this place from the city walls. It's a metaphor for the consequences of destructive living, not a description of eternal supernatural torture.

**Hades** -- The Greek underworld. The realm of the dead. Not a punishment -- just where dead people go. Borrowed from Greek mythology and used loosely in the New Testament.

**Tartarus** -- Used exactly once (2 Peter 2:4), referring to where fallen angels are held. Not about human souls at all.

The modern concept of "hell" as eternal conscious torment comes primarily from medieval theology (Dante, etc.), not from the original texts.`;
  }

  return `That's a great question. To give you the full picture with original Greek references and scholarly context, this would normally connect to the AI companion.

**Demo Mode**: The full AI-powered answer engine is available when the Anthropic API key is configured. In the meantime, here's what I can tell you from the built-in knowledge base:

The Well is built around going back to the original Greek and Aramaic texts to see what was actually written, before centuries of translation and institutional interpretation changed the meaning.

Some key starting points:
- **hamartia** ("sin") actually means "missing the mark" -- an archery term
- **metanoia** ("repent") actually means "transform your perception"
- **Gehenna** ("hell") was literally the garbage dump outside Jerusalem
- **aionios** ("eternal") actually means "of the age" -- age-long, not necessarily infinite

Try asking about any of these specifically, or explore the Word Corrections page for deep dives into each one.`;
}
