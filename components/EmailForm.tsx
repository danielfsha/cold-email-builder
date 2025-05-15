"use client";

import { useState, ChangeEvent, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EmailField from "@/components/EmailField";
import { cn } from "@/lib/utils";
import { Stars } from "lucide-react";

export default function EmailForm() {
  // Assuming recipient is a string (email address), not an array
  const [recipient, setRecipient] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("email sent");

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: recipient,
        subject: subject,
        body: body,
      }),
    });

    console.log(response);

    setSubject("");
    setRecipient([]);
    setBody("");
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  return (
    <form
      onSubmit={sendEmail}
      className="flex flex-col items-center justify-center space-y-4 w-full max-w-md m-4"
    >
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex items-center justify-between">
          <h1>To</h1>
        </div>

        <EmailField
          id="emails"
          placeholder="Type email and press Enter"
          className={`${cn(recipient.length == 0 && "px-3")} w-full`}
          value={recipient}
          onChange={setRecipient}
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <div className="flex items-center justify-between">
          <h1>Subject</h1>
          <Button variant="secondary" size="sm" type="button">
            <Stars />
            generate
          </Button>
        </div>
        <Input
          className="border-[.6px] border-[#989898] px-3 py-1 rounded-sm"
          placeholder="enter subject"
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <div className="flex items-center justify-between">
          <h1>Email</h1>
          <Button variant="secondary" size="sm" type="button">
            <Stars />
            generate
          </Button>
        </div>
        <Textarea
          className="border-[.6px] border-[#989898] px-3 py-1 rounded-sm"
          placeholder="enter email"
          value={body}
          onChange={handleBodyChange}
        />
      </div>

      <Button
        type="submit"
        variant="default"
        className="w-full py-2 rounded-sm mt-4"
      >
        Send email
      </Button>
    </form>
  );
}
