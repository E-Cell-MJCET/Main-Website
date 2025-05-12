import { Loader2 } from "lucide-react";

export default function ResultLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <Loader2 className="size-12 animate-spin text-[#7BF1A7]" />
      <p className="font-silkscreen text-lg text-white">Checking results...</p>
      <p className="text-sm text-gray-400">
        Please wait while we search for your registration
      </p>
    </div>
  );
}
