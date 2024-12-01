import StartupRegistrationForm from "@/components/EP/startup-registration-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1930]">
      <div className="container mx-auto max-w-4xl py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">Startup Registration</h1>
        <StartupRegistrationForm />
      </div>
    </main>
  )
}
