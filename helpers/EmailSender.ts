import { Resend } from 'resend';

import {OTP_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from './EmailTemplates'

// Message By - Adnan 
// Highly Dangerous to put this thing here since the Repo is private
// and I don't have the Github and cloudflare credentials to setup the env variables
// I put them here !
export const OTP_EMAIL_SENDER = (email:string,OTP:string) => {
    try {
        const resend = new Resend('re_ELCtykFU_6mzvDYo5mARZTYG6mCD5NyMZ');
        
        resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: '🔐 Your OTP for eCell MJCET Account Verification (Valid for 5 Minutes)',
          html: OTP_EMAIL_TEMPLATE.replace('{otp}',OTP)
        });
    } catch (error:any) {
        console.log("Error: ", error)
    }
}
export const Registration_Success_EMAIL_SENDER = (email:string) => {
    try {
        const resend = new Resend('re_5QwjVFf9_HQBkgwG7rNmKw2pWdszuspiX');
        
        resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: '🚀 Unlock Your Personal Portfolio Dashboard at eCell MJCET - Let`s Get Started!',
          html: WELCOME_EMAIL_TEMPLATE
        });
    } catch (error:any) {
        console.log("Error: ", error)
    }
}