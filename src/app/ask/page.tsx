"use client";

import { useState, useRef, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Loader2,
  Droplets,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "What does 'sin' actually mean in Greek?",
  "What did Jesus actually say about hell?",
  "What is the Gospel of Thomas?",
  "What does 'repent' really mean?",
  "Did Jesus actually say to be perfect?",
  "What is the 'living water' Jesus talked about?",
  "What does 'pneuma' mean -- spirit or breath?",
  "Why was the Gospel of Thomas excluded?",
  "What does 'forgive' actually mean in Greek?",
  "What did Jesus mean by the 'Kingdom of God'?",
];

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-accent text-white rounded-br-md"
            : "bg-surface border border-border rounded-bl-md"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-2">
            <Droplets className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent font-medium">The Well</span>
          </div>
        )}
        <div
          className={`text-sm leading-relaxed whitespace-pre-wrap ${
            isUser ? "text-white" : "text-text-primary"
          }`}
        >
          {message.content.split("**").map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className={isUser ? "text-white" : "text-accent-dark"}>
                {part}
              </strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-surface border border-border rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Droplets className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs text-accent font-medium">The Well</span>
        </div>
        <div className="flex items-center gap-1">
          <Loader2 className="w-4 h-4 text-text-muted animate-spin" />
          <span className="text-xs text-text-muted">
            Going back to the source...
          </span>
        </div>
      </div>
    </div>
  );
}

function AskPageContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const topic = searchParams.get("topic");
    if (topic) {
      setInput(`Tell me about ${topic}`);
      inputRef.current?.focus();
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.content,
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Something went wrong connecting to the source. Try again in a moment.",
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Header */}
      <div className="border-b border-border-light bg-background/80 backdrop-blur-sm px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-text-muted hover:text-text-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base font-serif font-semibold">
                Ask The Well
              </h1>
              <p className="text-xs text-text-muted">
                Questions answered from the original texts
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={resetChat}
              className="text-text-muted hover:text-text-secondary p-1.5 rounded-lg hover:bg-surface transition-colors"
              title="Start over"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <Droplets className="w-10 h-10 text-accent mb-4 animate-pulse-glow rounded-full" />
              <h2 className="text-xl font-serif mb-2">
                What do you want to know?
              </h2>
              <p className="text-text-muted text-sm text-center max-w-sm mb-8">
                Ask about any verse, word, or teaching. Get answers based on
                the original Greek and Aramaic -- not filtered through
                centuries of institutional interpretation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-sm bg-surface border border-border rounded-lg px-3 py-2.5 text-text-secondary hover:border-accent/30 hover:text-text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message thread */
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border-light bg-background/80 backdrop-blur-sm px-4 py-3">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex items-end gap-2"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about any verse, word, or teaching..."
            rows={1}
            className="flex-1 resize-none bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors"
            style={{ maxHeight: "120px" }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-accent text-white p-2.5 rounded-xl hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense>
      <AskPageContent />
    </Suspense>
  );
}
