"use client";

import { useState, Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Search, X, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResultLoader from "@/components/ui/result-loader";
import { Separator } from "@/components/ui/separator";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

interface TeamMember {
  name: string;
  email: string;
}

interface TeamResult {
  found: boolean;
  selected: boolean;
  teamName?: string;
  teamLeaderName?: string;
  teamType?: string;
  teamMembers?: TeamMember[];
}

export default function ResultsModal({
  open,
  onOpenChange,
}: ResultsModalProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<TeamResult | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSearching(true);
    try {
      const searchResult = await checkResultFromSupabase(data.email);
      setResult(searchResult);
    } catch (error) {
      console.error("Error checking result:", error);
      toast.error("Error checking results. Please try again.");
      setResult({
        found: false,
        selected: false,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setResult(null);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent
        title="Hackcelerate Results"
        className=" max-h-[90vh] max-w-[95vw] overflow-scroll border-0 bg-transparent p-0 shadow-none md:max-w-xl"
        style={{
          overflow: "scroll",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>
          {`
      .custom-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}
        </style>
        <DialogTitle>Hackcelerate</DialogTitle>
        <div className="relative rounded-xl border-2 border-gray-700 bg-[#282828] shadow-lg">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-[#282828] text-white transition-all hover:bg-gray-700"
          >
            <X size={18} />
          </button>
          {/* Header */}
          <div className="relative bg-[#323232] px-6 py-8 text-center">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
                {[...Array(72)].map((_, i) => (
                  <div key={i} className="border border-gray-600/10" />
                ))}
              </div>
            </div>
            <div className="relative">
              <h2 className="font-silkscreen text-3xl text-[#7BF1A7] md:text-4xl">
                HACK
                <span className="font-silkscreen text-gray-300">CELERATE</span>
              </h2>
              <p className="mt-2 font-silkscreen text-gray-300">
                CHECK YOUR RESULTS
              </p>
            </div>
          </div>
          <div className="px-6 py-8">
            <Suspense fallback={<ResultLoader />}>
              {!result ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="font-silkscreen text-xl text-white">
                        Enter your email
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Check if you&#39;ve been selected for the hackathon
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Email Address
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                {...field}
                                className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                              />
                            </FormControl>
                            <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isSearching}
                      className="w-full rounded-xl bg-white/10 px-6 py-3 
                        font-silkscreen text-lg text-[#E0F7FF] 
                        shadow-[4px_4px_#E0F7FF] transition-all duration-200 ease-in-out 
                        hover:shadow-[8px_8px_#E0F7FF] 
                        active:translate-y-1 
                        active:shadow-[2px_2px_#E0F7FF]"
                    >
                      {isSearching ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="mr-2 size-5 animate-spin" />
                          Searching...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Search className="mr-2 size-5" />
                          Check Results
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    {result.found ? (
                      <>
                        <div className="flex flex-col items-center">
                          <CheckCircle className="size-16 text-[#7BF1A7]" />
                          <h3 className="mt-4 font-silkscreen text-2xl text-[#7BF1A7]">
                            Congratulations!
                          </h3>
                          <p className="mt-2 text-lg text-white">
                            You have been selected for HACK-CELERATE! 🚀
                            <span className="block font-mono text-sm text-gray-400">
                              &quot;Your team leader has been contacted,
                              deadline to confirm is 14th May,11:59pm&quot;
                            </span>
                          </p>
                        </div>
                        {result.teamName && (
                          <div className="mt-6 w-full rounded-lg border-2 border-gray-600 bg-[#323232]/50 p-4">
                            <h4 className="mb-2 font-silkscreen text-lg text-[#7BF1A7]">
                              Team Details
                            </h4>
                            <div className="space-y-2 text-left">
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Team Name:
                                </span>
                                <span className="font-medium text-white">
                                  {result.teamName}
                                </span>
                              </div>
                              <Separator className="bg-gray-700" />
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Team Leader:
                                </span>
                                <span className="font-medium text-white">
                                  {result.teamLeaderName}
                                </span>
                              </div>
                              {result.teamMembers &&
                                result.teamMembers.length > 0 && (
                                  <>
                                    <Separator className="bg-gray-700" />
                                    <div>
                                      <span className="text-gray-400">
                                        Team Members:
                                      </span>
                                      <ul className="mt-2 space-y-1">
                                        {result.teamMembers.map(
                                          (member, index) => (
                                            <li
                                              key={index}
                                              className="text-sm text-white"
                                            >
                                              {member.name} ({member.email})
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  </>
                                )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <XCircle className="size-16 text-yellow-400" />
                        <h3 className="mt-4 font-silkscreen text-2xl text-white">
                          Thank You for Your Interest
                        </h3>
                        <p className="mt-2 text-lg text-gray-300">
                          We appreciate your enthusiasm for HACK-CELERATE.
                          Unfortunately, we couldn&apos;t find your email in our
                          selection list.
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                          We received many outstanding applications and had
                          limited spots available. We hope you&apos;ll
                          participate in our future events!
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={resetSearch}
                    className="w-full rounded-xl bg-white/10 px-6 py-3 
                      font-silkscreen text-lg text-[#E0F7FF] 
                      shadow-[4px_4px_#E0F7FF] transition-all duration-200 ease-in-out 
                      hover:shadow-[8px_8px_#E0F7FF] 
                      active:translate-y-1 
                      active:shadow-[2px_2px_#E0F7FF]"
                  >
                    Search Again
                  </Button>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Function to check results using Supabase
async function checkResultFromSupabase(email: string): Promise<TeamResult> {
  // List of emails to reject
  const rejectedEmails = [
    "crjaiyaduvanshi@gmail.com",
    "roopmantisso@gmail.com",
    "saitmahmood2@gmail.com",
    "assaaabssaasa@gmail.com",
  ];

  // Check if the email is in the rejected list

  try {
    // First check if the email is in the hackcelerate table (as team leader)
    const { data: leaderData, error: leaderError } = await supabase
      .from("hackcelerate")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();
    // console.log("Leader email:", email);
    // console.log("Leader Data:", leaderData);
    console.log("Leader Error:", leaderError);
    if (rejectedEmails.includes(email)) {
      return {
        found: false,
        selected: false,
      };
    }

    if (leaderData) {
      // Found as team leader - automatically means they are selected
      const teamMembers: TeamMember[] = [];

      // Add team members if they exist
      for (let i = 1; i <= 5; i++) {
        const name = leaderData[`tm${i}_name`];
        const memberEmail = leaderData[`tm${i}_email`];

        if (name && memberEmail) {
          teamMembers.push({ name, email: memberEmail });
        }
      }
      console.log("Team Members:", teamMembers);

      return {
        found: true,
        selected: true, // If they exist in DB, they are selected
        teamName: leaderData.team_name,
        teamLeaderName: leaderData.team_leader_name,
        teamType: leaderData.team_type,
        teamMembers,
      };
    }

    // If not found at all
    return {
      found: false,
      selected: false,
    };
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
}
