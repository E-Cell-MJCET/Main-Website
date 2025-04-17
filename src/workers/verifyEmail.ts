import { supabase } from "@/utils/supabase";

export const verifyEmail = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
    },
  });
  if (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOTP = async (email: string, otp: string) => {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  if (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
