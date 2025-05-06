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
  File as FileIcon,
  School,
  Mail,
  Check,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team } from "@/types/TeamTypes";
import { verifyEmail, verifyOTP } from "@/src/workers/verifyEmail";
import resgiterNewTeam from "@/src/workers/register";

import RegistrationSuccessEnhanced from "./registration-success-enhanced";

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegistrationModal({
  open,
  onOpenChange,
}: RegistrationModalProps) {
  const [memberCount, setMemberCount] = useState(1);
  const [step, setStep] = useState(1);
  const [isTeam, setIsTeam] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const contentRef = useRef<HTMLFormElement>(null);

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
    mobileNo: z
      .string()
      .min(10, { message: "Valid mobile number is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    otp: z.string().length(6, { message: "OTP must be 6 digits" }).optional(),
    abstract: z
      .custom<File>()
      .refine((file) => file instanceof File, {
        message: "Abstract is required",
      })
      .refine(
        (file) => {
          if (!file) return false;

          return [
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.ms-powerpoint",
          ].includes(file.type);
        },
        {
          message: "Only .ppt and .pptx files are allowed",
        }
      )
      .refine(
        (file) => {
          if (!file) return false;

          return file.size <= 10 * 1024 * 1024; // 10MB limit
        },
        {
          message: "File size must be less than 10MB",
        }
      ),
    team_type: z.string().min(1, { message: "Team type is required" }),
    members: z
      .array(
        z.object({
          name: z.string().min(2, { message: "Member name is required" }),
          college: z.string().min(2, { message: "College name is required" }),
          rollNo: z.string().min(1, { message: "Roll number is required" }),
          phoneNo: z
            .string()
            .min(10, { message: "Valid mobile number is required" }),
          email: z.string().email({ message: "Valid email is required" }),
        })
      )
      .refine((val) => {
        if (!isTeam) return true;

        return val && val.length > 0;
      }, "Team members are required for team registration"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      numberOfParticipants: "",
      leaderName: "",
      college: "",
      branch: "",
      year: "",
      rollNo: "",
      mobileNo: "",
      email: "",
      otp: "",
      team_type: "",
      abstract: undefined,
      members: [
        {
          name: "",
          college: "",
          rollNo: "",
          phoneNo: "",
          email: "",
        },
      ],
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
        setIsTeam(true);
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
    await verifyEmail(email).then(() => {
      setSendingOtp(false);
      setShowOtpField(true);
      // In a real application, you would send the OTP to the user's email
      console.log(`OTP sent to: ${email}`);
    });
  };

  // Function to verify OTP
  const handleVerifyOTP = async () => {
    const otp = form.getValues("otp");
    if (!otp || otp.length !== 6) {
      form.setError("otp", { message: "Please enter a valid 6-digit OTP" });

      return;
    }

    setVerifyingOtp(true);

    await verifyOTP(form.getValues("email"), otp).then(() => {
      setVerifyingOtp(false);
      setEmailVerified(true);
      setShowOtpField(false);
      // In a real application, you would verify the OTP with your backend
      // console.log(`OTP verified: ${otp}`);
    });
  };

  const nextStep = async () => {
    if (step === 1) {
      setStep(2);
    }
    if (step === 2) {
      const teamFields = ["teamName", "team_type"];
      const teamValid = await form.trigger(teamFields as any);
      if (teamValid) setStep(3);
    } else if (step === 3) {
      const leaderFields = [
        "leaderName",
        "college",
        "branch",
        "year",
        "rollNo",
        "mobileNo",
        "email",
        "abstract",
      ];

      // Email must be verified before proceeding
      if (!emailVerified) {
        form.setError("email", {
          message: "Please verify your email before proceeding",
        });

        return;
      }
      const leaderValid = await form.trigger(leaderFields as any);

      if (!isTeam && leaderValid) {
        const data = form.getValues();
        setIsSubmitting(true);

        const teamData: Omit<Team, "id" | "created_at"> = {
          team_name: data.teamName,
          no_of_participants: 1,
          team_leader_name: data.leaderName,
          college: data.college,
          branch: data.branch,
          year: parseInt(data.year),
          roll_no: data.rollNo,
          phone_no: data.mobileNo,
          email: data.email,
          abstract: data.abstract!,
          email_verified: emailVerified,
          team_type: "solo",
          team_members: [],
        };

        await resgiterNewTeam(teamData)
          .then(async () => {
            setIsSubmitting(false);

            setStep(5);
            await fetch("/api/email-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: data.email,
                subject: "✅🎉Hackcelerate Registration Successfull🎉✅",
                html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hackcelerate Submission Confirmation</title>
  <style>
    body {
      font-family: 'Silkscreen', sans-serif;
      background-color: #121212;
      color: #e5ffe9; /* brighter greenish-white */
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #1a1a1a;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    h1 {
      font-size: 2.5rem;
      color: #7BF1A7;
      text-align: center;
      text-shadow: -4px -4px 0 #3A6695, -8px -8px 0 #3A6695;
    }
    p {
      font-size: 1.15rem;
      line-height: 1.8;
      text-align: center;
      color: #e5ffe9;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cta-button {
      display: inline-block;
      background-color: #7BF1A7;
      color: #121212;
      padding: 12px 24px;
      font-size: 1.2rem;
      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      margin: 20px auto;
      box-shadow: 4px 4px 0 #3A6695;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .cta-button:hover {
      transform: scale(1.05);
      box-shadow: 8px 8px 0 #3A6695;
    }
    .footer {
      text-align: center;
      font-size: 0.95rem;
      color: #B3FFE2;
      margin-top: 30px;
    }
    a {
      color: #7BF1A7;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Hackcelerate Submission Confirmed!</h1>
    <p>Dear <strong>${data.leaderName}</strong> – Team <strong>${data.teamName}</strong>,</p>
    <p>Thank you for being a part of <strong>Hackcelerate</strong>! We're excited to have your team onboard with your incredible ideas.</p>
    <p>✅🎉Your submission has been successfully received.🎉✅</p>
    <p>If shortlisted we will contact the team leader, till then, Stay tuned for upcoming updates — this is just the beginning!</p>
    <div class="btn">
    <a href="https://www.instagram.com/ecellmjcet" class="cta-button" target="_blank" rel="noopener noreferrer">
      Follow Us on Instagram
    </a>
     </div>
    <div class="footer">
      <p>🔔 Don’t miss out! Follow <a href="https://www.instagram.com/ecellmjcet" target="_blank">@ecellmjcet</a> for all updates.</p>
    </div>
  </div>
</body>
</html>
`,
              }),
            });
            setSubmissionStatus({
              success: true,
              message:
                "Registration completed successfully! You have been registered for HACK-CELERATE.",
            });
          })
          .catch(() => {
            setSubmissionStatus({
              success: false,
              message:
                "Registration failed check the error message, Please try again Or contact us.",
            });
            setIsSubmitting(false);
          });
      } else if (leaderValid) {
        setStep(4);
      }
    } else if (step === 4) {
      // Validate team members data
      const isValid = await form.trigger("members");
      if (!isValid) return;

      const data = form.getValues();
      setIsSubmitting(true);
      const participants = memberCount + 1; //members + team ka leader (1)
      const teamData: Omit<Team, "id" | "created_at"> = {
        team_name: data.teamName,
        no_of_participants: participants,
        team_leader_name: data.leaderName,
        college: data.college,
        branch: data.branch,
        year: parseInt(data.year),
        roll_no: data.rollNo,
        phone_no: data.mobileNo,
        email: data.email,
        abstract: data.abstract!,
        email_verified: emailVerified,
        team_type: "team",
        team_members:
          data.members?.map((m) => ({
            name: m.name,
            roll_no: m.rollNo,
            phone_no: m.phoneNo,
            email: m.email,
            college: m.college,
          })) || [],
      };

      await resgiterNewTeam(teamData)
        .then(async () => {
          setIsSubmitting(false);
          setStep(5);
          await fetch("/api/email-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: data.email,
              subject: "✅🎉Hackcelerate Registration Successful🎉✅",
              html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hackcelerate Submission Confirmation</title>
  <style>
    body {
      font-family: 'Silkscreen', sans-serif;
      background-color: #121212;
      color: #e5ffe9; /* brighter greenish-white */
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #1a1a1a;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    h1 {
      font-size: 2.5rem;
      color: #7BF1A7;
      text-align: center;
      text-shadow: -4px -4px 0 #3A6695, -8px -8px 0 #3A6695;
    }
    p {
      font-size: 1.15rem;
      line-height: 1.8;
      text-align: center;
      color: #e5ffe9;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cta-button {
      display: inline-block;
      background-color: #7BF1A7;
      color: #121212;
      padding: 12px 24px;
      font-size: 1.2rem;
      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      margin: 20px auto;
      box-shadow: 4px 4px 0 #3A6695;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .cta-button:hover {
      transform: scale(1.05);
      box-shadow: 8px 8px 0 #3A6695;
    }
    .footer {
      text-align: center;
      font-size: 0.95rem;
      color: #B3FFE2;
      margin-top: 30px;
    }
    a {
      color: #7BF1A7;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Hackcelerate Submission Confirmed!</h1>
    <p>Dear <strong>${data.leaderName}</strong> – Team <strong>${data.teamName}</strong>,</p>
    <p>Thank you for being a part of <strong>Hackcelerate</strong>! We're excited to have your team onboard with your incredible ideas.</p>
    <p>✅🎉Your submission has been successfully received.🎉✅</p>
    <p>If shortlisted we will contact the team leader, till then, Stay tuned for upcoming updates — this is just the beginning!</p>
    <div class="btn">
    <a href="https://www.instagram.com/ecellmjcet" class="cta-button" target="_blank" rel="noopener noreferrer">
      Follow Us on Instagram
    </a>
     </div>
    <div class="footer">
      <p>🔔 Don’t miss out! Follow <a href="https://www.instagram.com/ecellmjcet" target="_blank">@ecellmjcet</a> for all updates.</p>
    </div>
  </div>
</body>
</html>
`,
            }),
          });
          setSubmissionStatus({
            success: true,
            message:
              "Registration completed successfully! Your team has been registered for HackCelerate.",
          });
        })
        .catch(() => {
          alert("Something went wrong try again!");
          setIsSubmitting(false);
          setSubmissionStatus({
            success: false,
            message:
              "Registration failed check the error message, Please try again Or contact us.",
          });
        });
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const addMember = () => {
    if (memberCount < 5) {
      setMemberCount(memberCount + 1);
      const currentMembers = form.getValues().members || [];
      form.setValue("members", [
        ...currentMembers,
        { name: "", college: "", rollNo: "", phoneNo: "", email: "" },
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent
        title="Hackcelerate Registration"
        className="max-w-[95vw] border-0 bg-transparent p-0 shadow-none md:max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
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
                HACK<span className="text-gray-300">CELERATE</span>
              </h2>
              <p className="mt-2 font-silkscreen text-gray-300">
                TEAM REGISTRATION
              </p>
              {/* Progress indicator */}
              {isTeam ? (
                <div className="mx-auto mt-6 flex max-w-xs items-center justify-between">
                  {[1, 2, 3, 4, 5].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`flex size-10 items-center justify-center rounded-full border-2 transition-all duration-300
        ${
          step === stepNumber
            ? "border-white bg-gray-700 text-white"
            : step > stepNumber
              ? "border-gray-500 bg-gray-600 text-gray-300"
              : "border-gray-600 text-gray-500"
        }`}
                      >
                        {stepNumber === 1 && <FileIcon size={18} />}
                        {stepNumber === 2 && <FaTasks size={18} />}
                        {stepNumber === 3 && <User size={18} />}
                        {stepNumber === 4 && <Users size={18} />}
                        {stepNumber === 5 && <CheckCircle size={18} />}
                      </div>
                      <span
                        className={`mt-1 text-xs transition-colors duration-300 ${
                          step >= stepNumber ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {stepNumber === 1
                          ? "Guidelines"
                          : stepNumber === 2
                            ? "Team"
                            : stepNumber === 3
                              ? "Leader"
                              : stepNumber === 4
                                ? "Members"
                                : "Confirm"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mx-auto mt-6 flex max-w-xs items-center justify-between">
                  {[1, 2, 3, 5].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`flex size-10 items-center justify-center rounded-full border-2 transition-all duration-300
        ${
          step === stepNumber
            ? "border-white bg-gray-700 text-white"
            : step > stepNumber
              ? "border-gray-500 bg-gray-600 text-gray-300"
              : "border-gray-600 text-gray-500"
        }`}
                      >
                        {stepNumber === 1 && <FileIcon size={18} />}
                        {stepNumber === 2 && <FaTasks size={18} />}
                        {stepNumber === 3 && <User size={18} />}
                        {stepNumber === 5 && <CheckCircle size={18} />}
                      </div>
                      <span
                        className={`mt-1 text-xs ${
                          step >= stepNumber ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        {stepNumber === 1
                          ? "Guidelines"
                          : stepNumber === 2
                            ? "Team"
                            : stepNumber === 3
                              ? "Leader"
                              : "Confirm"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {/* Progress line */}
              <div className="mx-auto mt-4 h-1 w-full max-w-xs bg-gray-700">
                <div
                  className="h-full rounded-full bg-[#7BF1A7] transition-all duration-300"
                  style={{
                    width: `${((step - 1) / 4) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <Form {...form}>
            {/* This div now has the overflow-y-auto class for proper scrolling */}
            <form
              ref={contentRef}
              onScroll={(e) => e.stopPropagation()}
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
                      <Check className="mr-2 size-5" />
                    )}
                    <p className="font-medium">{submissionStatus.message}</p>
                  </div>
                </div>
              )}
              {/* Step 1: Guidelines */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-silkscreen text-xl text-white">
                      Guidelines & Instructions
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      Please read carefully before proceeding
                    </p>
                  </div>
                  <div className="space-y-8">
                    <div className="rounded-lg border-2 border-gray-600 bg-[#323232]/50 p-4">
                      <h4 className="mb-4 font-silkscreen text-lg text-[#7BF1A7]">
                        Abstract Submission Guidelines
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            1.
                          </span>
                          <span>
                            <strong>Originality is Key:</strong> Submissions
                            must present a fresh idea or solution—no reused or
                            previously showcased work.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            2.
                          </span>
                          <span>
                            <strong>Focus on Problem Solving:</strong> Clearly
                            explain how your idea addresses a real-world problem
                            with cost-effective, scalable solutions.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            3.
                          </span>
                          <span>
                            <strong>No Code in Abstract:</strong> This is the
                            ideation phase. Refrain from including any form of
                            code.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            4.
                          </span>
                          <span>
                            <strong>Workflow Visualization (optional):</strong>{" "}
                            Include a simple algorithm or flowchart outlining
                            your solution.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            5.
                          </span>
                          <span>
                            <strong>Tech Stack Transparency:</strong> Mention
                            the tools, languages, platforms, or frameworks you
                            plan to use.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border-2 border-gray-600 bg-[#323232]/50 p-4">
                      <h4 className="mb-4 font-silkscreen text-lg text-[#7BF1A7]">
                        Team Specifications
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>Teams must consist of 1 to 6 members.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>
                            Cross-disciplinary teams welcome from any college or
                            background.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>
                            Grand Finale will be held at Microsoft IDC,
                            Hyderabad Campus.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>
                            Travel and accommodation arrangements will be
                            discussed for finalists.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg border-2 border-gray-600 bg-[#323232]/50 p-4">
                      <h4 className="mb-4 font-silkscreen text-lg text-[#7BF1A7]">
                        Registration Guidelines
                      </h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>One idea/abstract per team.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>
                            Participants can only be part of one team.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>
                            Official PPT template must be used for submission.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>
                            Hardware participants kindly contact the organisers
                            before submission.
                          </span>
                        </li>
{/*                         <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>
                            Upon shortlisting for online round of Hackcelerate,
                            teams will be charged Rs.70 per member and Rs. 100
                            for solo participants.
                          </span>
                        </li> */}
                        <li className="flex items-start">
                          <span className="mr-2 mt-1 shrink-0 text-[#7BF1A7]">
                            •
                          </span>
                          <span>
                            Registration period: 17th April - 11th May 2025.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-around">
                    <Link
                      href={"https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"}
                      type="button"
                      className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600"
                    >
                      Need Help ?
                    </Link>
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
              {/* Step 2: Team Info */}
              {step === 2 && (
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
                            <Users className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="team_type"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Type of Team
                          </FormLabel>
                          <div className="relative">
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setIsTeam(value === "team");
                              }}
                            >
                              <FormControl>
                                <SelectTrigger className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500">
                                  <SelectValue placeholder="Select team type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-gray-700 bg-[#323232]">
                                <SelectItem value="solo" className="text-white">
                                  Solo
                                </SelectItem>
                                <SelectItem value="team" className="text-white">
                                  Team
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Users className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-8 flex justify-around">
                    <Link
                      href={"https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"}
                      type="button"
                      className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600"
                    >
                      Need Help ?
                    </Link>
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
              {/* Step 3: Team Leader Info */}
              {step === 3 && (
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
                            <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
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
                              <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                              {emailVerified && (
                                <Check className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-green-400" />
                              )}
                            </div>
                            {!emailVerified && (
                              <button
                                type="button"
                                onClick={handleSendOTP}
                                disabled={sendingOtp}
                                className="rounded bg-gray-700 px-3 py-2 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                {sendingOtp ? (
                                  <Loader2 className="size-4 animate-spin" />
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
                                  onClick={handleVerifyOTP}
                                  disabled={verifyingOtp}
                                  className="rounded bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                  {verifyingOtp ? (
                                    <div className="flex items-center">
                                      <Loader2 className="mr-2 size-4 animate-spin" />
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
                            <School className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
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
                            <Laptop className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
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
                    <FormField
                      control={form.control}
                      name="abstract"
                      render={({
                        // eslint-disable-next-line no-unused-vars
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="font-silkscreen text-gray-300">
                            Abstract (PPTX)
                          </FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                accept=".pptx, .ppt"
                                type="file"
                                {...fieldProps}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    onChange(file);
                                  }
                                }}
                                className="border-2 border-gray-600 bg-[#323232] pl-10 text-white focus:border-gray-500 dark:text-white"
                              />
                            </FormControl>
                            <FileIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                          <div className="text-sm text-gray-400">
                            Max file size: 10MB. Allowed formats: .ppt, .pptx
                          </div>
                          <Link
                            href={
                              "https://drive.google.com/drive/folders/1nf3CylHOaykjmq5VRlnnNYFPTfFjAimk?usp=sharing"
                            }
                            target="_blank"
                            className="font-block text-xl text-white underline"
                          >
                            Download the template
                          </Link>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  {isTeam ? (
                    <>
                      <div className="mt-8 hidden flex-col items-center gap-4 md:flex md:flex-row md:justify-around">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center space-x-2 rounded-lg border-2 border-gray-600 bg-transparent px-6 py-3 font-silkscreen text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700"
                        >
                          <ChevronLeft size={18} />
                          <span>BACK</span>
                        </button>
                        <Link
                          href="https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"
                          type="button"
                          className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600"
                        >
                          Need Help ?
                        </Link>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={isSubmitting}
                          className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="mr-2 size-5 animate-spin text-white"
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
                      <div className="mt-8 flex flex-col items-center gap-4 md:hidden md:flex-row md:justify-around">
                        <div className="flex w-full items-center justify-between">
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
                            disabled={isSubmitting}
                            className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="mr-2 size-5 animate-spin text-white"
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
                        <Link
                          href="https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"
                          type="button"
                          className=" w-full space-x-2  rounded-lg bg-gray-700 px-6 py-3 text-center font-silkscreen text-white transition-all hover:bg-gray-600"
                        >
                          Need Help ?
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-8 hidden flex-col items-center gap-4 md:flex md:flex-row md:justify-around">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center space-x-2 rounded-lg border-2 border-gray-600 bg-transparent px-6 py-3 font-silkscreen text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700"
                        >
                          <ChevronLeft size={18} />
                          <span>BACK</span>
                        </button>
                        <Link
                          href="https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"
                          type="button"
                          className="flex items-center space-x-2 rounded-lg bg-slate-800 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600"
                        >
                          Need Help ?
                        </Link>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={isSubmitting}
                          className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="mr-2 size-5 animate-spin text-white"
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
                      <div className="mt-8 flex flex-col items-center gap-4 md:hidden md:flex-row md:justify-around">
                        <div className="flex w-full items-center justify-between">
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
                            disabled={isSubmitting}
                            className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="mr-2 size-5 animate-spin text-white"
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
                        <Link
                          href="https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"
                          type="button"
                          className=" w-full space-x-2  rounded-lg bg-gray-700 px-6 py-3 text-center font-silkscreen text-white transition-all hover:bg-gray-600"
                        >
                          Need Help ?
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
              {/* Step 4: Team Members */}
              {step === 4 && (
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
                          className="flex size-8 items-center justify-center rounded-full border-2 border-gray-600 text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                          className="flex size-8 items-center justify-center rounded-full border-2 border-gray-600 text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                                  <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
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
                                  <School className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
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
                          <FormField
                            control={form.control}
                            name={`members.${index}.phoneNo`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="font-silkscreen text-gray-300">
                                  Phone Number
                                </FormLabel>
                                <div className="relative">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter phone number"
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
                            name={`members.${index}.email`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="font-silkscreen text-gray-300">
                                  Email
                                </FormLabel>
                                <div className="relative">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter email"
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
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="center mt-8 hidden gap-4 md:flex md:flex-row md:justify-around">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center space-x-2 rounded-lg border-2 border-gray-600 bg-transparent px-6 py-3 font-silkscreen text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700"
                    >
                      <ChevronLeft size={18} />
                      <span>BACK</span>
                    </button>
                    <Link
                      href="https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"
                      type="button"
                      className="space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600"
                    >
                      Need Help ?
                    </Link>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-2 size-5 animate-spin text-white"
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
                  <div className="mt-8 flex flex-col items-center gap-4 md:hidden md:flex-row md:justify-around">
                    <div className="flex w-full items-center justify-between">
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
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="mr-2 size-5 animate-spin text-white"
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
                    <Link
                      href="https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"
                      type="button"
                      className=" w-full space-x-2  rounded-lg bg-gray-700 px-6 py-3 text-center font-silkscreen text-white transition-all hover:bg-gray-600"
                    >
                      Need Help ?
                    </Link>
                  </div>
                </div>
              )}
              {/* Sted 5: Registration Done */}
              {step === 5 && <RegistrationSuccessEnhanced />}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
