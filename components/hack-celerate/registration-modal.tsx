"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Minus,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
  Users,
  User,
  Laptop,
  School,
  Mail,
  Check,
  Loader2,
} from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  teamName: z.string().min(2, { message: "Team name is required" }),
  numberOfParticipants: z
    .string()
    .min(1, { message: "Number of participants is required" }),
  leaderName: z.string().min(2, { message: "Team leader name is required" }),
  college: z.string().min(2, { message: "College name is required" }),
  branch: z.string().min(2, { message: "Branch is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  rollNo: z.string().min(1, { message: "Roll number is required" }),
  mobileNo: z.string().min(10, { message: "Valid mobile number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  otp: z.string().length(6, { message: "OTP must be 6 digits" }).optional(),
  members: z
    .array(
      z.object({
        name: z.string().min(2, { message: "Member name is required" }),
        college: z.string().min(2, { message: "College name is required" }),
        rollNo: z.string().min(1, { message: "Roll number is required" }),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegistrationModal({
  open,
  onOpenChange,
}: RegistrationModalProps) {
  const router = useRouter();
  const [memberCount, setMemberCount] = useState(1);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const totalSteps = 3;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      numberOfParticipants: "1",
      leaderName: "",
      college: "",
      branch: "",
      year: "",
      rollNo: "",
      mobileNo: "",
      email: "",
      otp: "",
      members: [{ name: "", college: "", rollNo: "" }],
    },
  });

  // Reset step when modal opens/closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setEmailVerified(false);
        setShowOtpField(false);
        setSubmissionStatus(null);
        form.reset();
      }, 300);
    }
  }, [open, form]);

  // Function to handle OTP sending
  const handleSendOTP = async () => {
    const email = form.getValues("email");
    const isValid = await form.trigger("email");

    if (!isValid) return;

    setSendingOtp(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setSendingOtp(false);
      setShowOtpField(true);
      // In a real application, you would send the OTP to the user's email
      console.log(`OTP sent to: ${email}`);
    }, 1500);
  };

  // Function to verify OTP
  const verifyOTP = async () => {
    const otp = form.getValues("otp");
    if (!otp || otp.length !== 6) {
      form.setError("otp", { message: "Please enter a valid 6-digit OTP" });
      return;
    }

    setVerifyingOtp(true);

    // Simulate API call to verify OTP
    setTimeout(() => {
      setVerifyingOtp(false);
      setEmailVerified(true);
      setShowOtpField(false);
      // In a real application, you would verify the OTP with your backend
      console.log(`OTP verified: ${otp}`);
    }, 1500);
  };

  function onSubmit(data: FormValues) {
    if (step !== 3) return;

    setIsSubmitting(true);
    console.log("Form data:", data);

    // Simulate sending data to Supabase
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus({
        success: true,
        message:
          "Registration completed successfully! Your team has been registered for HACK-CELERATE.",
      });

      // Close modal after showing success message
      setTimeout(() => {
        onOpenChange(false);
        router.push("/");
      }, 3000);
    }, 2000);
  }

  const addMember = () => {
    if (memberCount < 5) {
      setMemberCount(memberCount + 1);
      const currentMembers = form.getValues().members || [];
      form.setValue("members", [
        ...currentMembers,
        { name: "", college: "", rollNo: "" },
      ]);
    }
  };

  const removeMember = () => {
    if (memberCount > 1) {
      setMemberCount(memberCount - 1);
      const currentMembers = form.getValues().members || [];
      form.setValue(
        "members",
        currentMembers.slice(0, currentMembers.length - 1)
      );
    }
  };

  const nextStep = async () => {
    if (step === 1) {
      const teamFields = ["teamName", "numberOfParticipants"];
      const teamValid = await form.trigger(teamFields as any);
      if (teamValid) setStep(2);
    } else if (step === 2) {
      const leaderFields = [
        "leaderName",
        "college",
        "branch",
        "year",
        "rollNo",
        "mobileNo",
        "email",
      ];

      // Email must be verified before proceeding
      if (!emailVerified) {
        form.setError("email", {
          message: "Please verify your email before proceeding",
        });
        return;
      }

      const leaderValid = await form.trigger(leaderFields as any);
      if (leaderValid) setStep(3);
    } else if (step === 3) {
      form.handleSubmit(onSubmit)();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Prevent scroll propagation to the background
  const handleDialogContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent
        className="max-w-[95vw] border-0 bg-transparent p-0 shadow-none md:max-w-4xl"
        onClick={handleDialogContentClick}
      >
        <div className="relative rounded-xl border-2 border-gray-700 bg-[#282828] shadow-lg">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#282828] text-white transition-all hover:bg-gray-700"
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
              <h2 className="font-silkscreen text-3xl text-white md:text-4xl">
                HACK<span className="text-gray-300">-CELERATE</span>
              </h2>
              <p className="mt-2 font-silkscreen text-gray-300">
                TEAM REGISTRATION
              </p>

              {/* Progress indicator */}
              <div className="mx-auto mt-6 flex max-w-xs items-center justify-between">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 
                        ${
                          step === stepNumber
                            ? "border-white bg-gray-700 text-white"
                            : step > stepNumber
                              ? "border-gray-500 bg-gray-600 text-gray-300"
                              : "border-gray-600 text-gray-500"
                        }`}
                    >
                      {stepNumber === 1 && <Users size={18} />}
                      {stepNumber === 2 && <User size={18} />}
                      {stepNumber === 3 && <School size={18} />}
                    </div>
                    <span
                      className={`mt-1 text-xs ${step >= stepNumber ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {stepNumber === 1
                        ? "Team"
                        : stepNumber === 2
                          ? "Leader"
                          : "Members"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress line */}
              <div className="mx-auto mt-4 h-1 w-full max-w-xs bg-gray-700">
                <div
                  className="h-full bg-gray-400 transition-all duration-300"
                  style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <Form {...form}>
            {/* This div now has the overflow-y-auto class for proper scrolling */}
            <form
              ref={contentRef}
              className="h-[60vh] overflow-y-auto px-6 py-8"
            >
              {/* Submission status message */}
              {submissionStatus && (
                <div
                  className={`mb-6 rounded-md border-2 p-4 text-center ${
                    submissionStatus.success
                      ? "border-green-600 bg-green-900/20 text-green-400"
                      : "border-red-600 bg-red-900/20 text-red-400"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {submissionStatus.success && (
                      <Check className="mr-2 h-5 w-5" />
                    )}
                    <p className="font-medium">{submissionStatus.message}</p>
                  </div>
                </div>
              )}

              {/* Step 1: Team Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-silkscreen text-xl text-white">
                      Team Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Tell us about your team
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Team Name
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="Enter your team name"
                                {...field}
                                className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                              />
                            </FormControl>
                            <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="numberOfParticipants"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Number of Participants
                          </FormLabel>
                          <div className="relative">
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setMemberCount(Number.parseInt(value));
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500">
                                  <SelectValue placeholder="Select number" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-gray-700 bg-[#323232]">
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <SelectItem
                                    key={num}
                                    value={num.toString()}
                                    className="text-white"
                                  >
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600"
                    >
                      <span>NEXT</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Team Leader Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-silkscreen text-xl text-white">
                      Team Leader Details
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Information about the team leader
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="leaderName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Name
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="Enter your name"
                                {...field}
                                className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                              />
                            </FormControl>
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    {/* Email field with verification */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Email
                            {emailVerified && (
                              <span className="ml-2 rounded bg-green-900/50 px-2 py-0.5 text-xs text-green-400">
                                Verified
                              </span>
                            )}
                          </FormLabel>
                          <div className="relative flex gap-2">
                            <div className="relative flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Enter your email"
                                  {...field}
                                  disabled={emailVerified}
                                  className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500 disabled:opacity-80"
                                />
                              </FormControl>
                              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                              {emailVerified && (
                                <Check className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-400" />
                              )}
                            </div>
                            {!emailVerified && (
                              <button
                                type="button"
                                onClick={handleSendOTP}
                                disabled={sendingOtp || showOtpField}
                                className="rounded bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                {sendingOtp ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : showOtpField ? (
                                  "Resend"
                                ) : (
                                  "Verify"
                                )}
                              </button>
                            )}
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    {/* OTP verification field - shows only when needed */}
                    {showOtpField && !emailVerified && (
                      <div className="col-span-1 md:col-span-2">
                        <FormField
                          control={form.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="font-silkscreen text-gray-300">
                                Enter OTP sent to your email
                              </FormLabel>
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter 6-digit OTP"
                                      {...field}
                                      className="border-2 border-gray-600 bg-[#323232] pl-3 text-center text-white focus:border-gray-500"
                                      maxLength={6}
                                    />
                                  </FormControl>
                                </div>
                                <button
                                  type="button"
                                  onClick={verifyOTP}
                                  disabled={verifyingOtp}
                                  className="rounded bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                  {verifyingOtp ? (
                                    <div className="flex items-center">
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Verifying
                                    </div>
                                  ) : (
                                    "Verify OTP"
                                  )}
                                </button>
                              </div>
                              <FormMessage className="text-red-400" />
                              <p className="text-xs text-gray-400">
                                Please check your email inbox for the OTP. It
                                may take a minute to arrive.
                              </p>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="mobileNo"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Mobile Number
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="Enter your mobile number"
                                {...field}
                                className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                              />
                            </FormControl>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              #
                            </div>
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="college"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            College
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="Enter your college name"
                                {...field}
                                className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                              />
                            </FormControl>
                            <School className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="branch"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Branch
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="Enter your branch"
                                {...field}
                                className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                              />
                            </FormControl>
                            <Laptop className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Year
                          </FormLabel>
                          <div className="relative">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500">
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-gray-700 bg-[#323232]">
                                {["1", "2", "3", "4"].map((year) => (
                                  <SelectItem
                                    key={year}
                                    value={year}
                                    className="text-white"
                                  >
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              Y
                            </div>
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rollNo"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Roll Number
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                placeholder="Enter your roll number"
                                {...field}
                                className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                              />
                            </FormControl>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              ID
                            </div>
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center space-x-2 rounded-lg border-2 border-gray-600 bg-transparent px-6 py-3 font-silkscreen text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700"
                    >
                      <ChevronLeft size={18} />
                      <span>BACK</span>
                    </button>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600"
                    >
                      <span>NEXT</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Team Members */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-silkscreen text-xl text-white">
                      Team Members
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Add your team members (up to 5)
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-silkscreen text-gray-300">
                        Members:
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={removeMember}
                          disabled={memberCount <= 1}
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-600 text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-silkscreen text-lg text-white">
                          {memberCount}
                        </span>
                        <button
                          type="button"
                          onClick={addMember}
                          disabled={memberCount >= 5}
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-600 text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {Array.from({ length: memberCount }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-lg border-2 border-gray-600 bg-[#323232]/50 p-4 transition-all hover:border-gray-500"
                      >
                        <h4 className="mb-4 font-silkscreen text-lg text-gray-300">
                          <span className="mr-2 inline-block rounded bg-gray-600 px-2 py-0.5 text-sm text-white">
                            {index + 1}
                          </span>
                          Member {index + 1}
                        </h4>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <FormField
                            control={form.control}
                            name={`members.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="font-silkscreen text-gray-300">
                                  Name
                                </FormLabel>
                                <div className="relative">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter name"
                                      {...field}
                                      className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                                    />
                                  </FormControl>
                                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                </div>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`members.${index}.college`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="font-silkscreen text-gray-300">
                                  College
                                </FormLabel>
                                <div className="relative">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter college name"
                                      {...field}
                                      className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                                    />
                                  </FormControl>
                                  <School className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                </div>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`members.${index}.rollNo`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="font-silkscreen text-gray-300">
                                  Roll Number
                                </FormLabel>
                                <div className="relative">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter roll number"
                                      {...field}
                                      className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500"
                                    />
                                  </FormControl>
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    ID
                                  </div>
                                </div>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center space-x-2 rounded-lg border-2 border-gray-600 bg-transparent px-6 py-3 font-silkscreen text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700"
                    >
                      <ChevronLeft size={18} />
                      <span>BACK</span>
                    </button>

                    <button
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-2 h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>SUBMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT</span>
                          <ChevronRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
