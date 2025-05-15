"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const EMAIL_DOMAINS = [
  "@gmail.com",
  "@yahoo.com",
  "@outlook.com",
  "@hotmail.com",
  "@icloud.com",
  "@protonmail.com",
  "@aol.com",
  "@zoho.com",
  "@mail.com",
];

interface EmailFieldProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
}

export default function EmailField({
  className,
  value = [],
  onChange,
  onBlur,
  ...props
}: EmailFieldProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [emails, setEmails] = React.useState<string[]>(value);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const suggestionsRef = React.useRef<HTMLUListElement>(null);

  // Sync emails with external value
  React.useEffect(() => {
    setEmails(value);
  }, [value]);

  // Update parent component when emails change
  React.useEffect(() => {
    onChange?.(emails);
  }, [emails, onChange]);

  const addEmail = (email: string) => {
    if (!email.trim()) return;

    // Ensure at least one character before '@'
    const atIndex = email.indexOf("@");
    const hasLocalPart = atIndex > 0; // at least one character before '@'
    const hasDotAfterAt = email.indexOf(".", atIndex) > atIndex + 1;

    if (hasLocalPart && hasDotAfterAt && !emails.includes(email)) {
      const newEmails = [...emails, email];
      setEmails(newEmails);
      setInputValue("");
      setSuggestions([]);
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const removeEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const baseEmail = inputValue.split("@")[0];
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          if (baseEmail.length > 0) {
            addEmail(baseEmail + suggestions[highlightedIndex]);
          }
        } else {
          addEmail(inputValue);
        }
      } else if (e.key === "Escape" || e.key === "Tab") {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    } else {
      if (e.key === "Enter") {
        e.preventDefault();
        addEmail(inputValue);
      } else if (
        e.key === "Backspace" &&
        inputValue === "" &&
        emails.length > 0
      ) {
        // Remove the last email when backspace is pressed on empty input
        removeEmail(emails.length - 1);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const atIndex = value.indexOf("@");
    const localPart = atIndex >= 0 ? value.slice(0, atIndex) : value;

    if (localPart.length === 0) {
      // Do not show suggestions if no local part
      setShowSuggestions(false);
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }

    if (value && !value.includes("@")) {
      // Show domain suggestions if we have text without an @ symbol
      setSuggestions(EMAIL_DOMAINS);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else if (value && value.includes("@")) {
      // Filter domain suggestions based on what's after the @ symbol
      const domainPart = value.slice(atIndex + 1);
      const filtered = EMAIL_DOMAINS.filter((d) =>
        d.toLowerCase().startsWith("@" + domainPart.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const baseEmail = inputValue.split("@")[0];
    if (baseEmail.length > 0) {
      addEmail(baseEmail + suggestion);
    }
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    // Small delay to allow suggestion clicks to register
    setTimeout(() => {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      if (inputValue.trim()) {
        addEmail(inputValue);
      }
      onBlur?.();
    }, 150);
  };

  // Scroll highlighted suggestion into view
  React.useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      suggestionsRef.current &&
      suggestionsRef.current.children[highlightedIndex]
    ) {
      const el = suggestionsRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      el.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className={cn(
          "border-input flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border bg-transparent px-1 py-1 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          className
        )}
      >
        {emails.map((email, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-sm bg-white/20 px-2 py-1 text-sm"
          >
            <span>{email}</span>
            <button
              type="button"
              onClick={() => removeEmail(index)}
              className="text-muted-foreground hover:text-[var(--primary)] rounded-full p-0.5"
            >
              <X className="h-3 w-3 text-white" />
              <span className="sr-only">Remove</span>
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          aria-autocomplete="list"
          aria-controls="email-suggestion-list"
          aria-activedescendant={
            highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
          }
          className="h-7 flex-grow min-w-[8rem] bg-transparent outline-none text-sm"
          {...props}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-background shadow-md">
          <ul
            id="email-suggestion-list"
            role="listbox"
            ref={suggestionsRef}
            className="py-1"
          >
            {suggestions.map((suggestion, index) => {
              const isHighlighted = index === highlightedIndex;
              return (
                <li
                  id={`suggestion-${index}`}
                  key={index}
                  role="option"
                  aria-selected={isHighlighted}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "px-3 py-2 text-sm cursor-pointer",
                    isHighlighted ? "bg-white/30" : "hover:bg-white/20"
                  )}
                >
                  {inputValue.split("@")[0]}
                  {suggestion}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
