import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 pt-24 px-4">
      <SignIn />
    </section>
  );
}
