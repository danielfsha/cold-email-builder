import Image from "next/image";

import EmailForm from "@/components/EmailForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-rubik)]">
      <Image src="/v21-logo.svg" width={100} height={100} alt="logo" />
      <EmailForm />
    </div>
  );
}
