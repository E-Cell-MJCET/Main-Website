"use client";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { useState, type MouseEvent as ReactMouseEvent, FormEvent } from "react";
import { Mail, MapPin, Instagram } from "lucide-react";
import Confetti from 'react-confetti';
import { z } from 'zod';

import { cn } from "@/lib/utils";

// Zod validation schema
const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .regex(/^[a-zA-Z ]+$/, { message: "Name should only contain letters and spaces" }),
  phone: z.string()
    .refine((val) => {
      const digits = val.replace(/\D/g, '');
      
return digits.length === 10 && /^[6-9]/.test(digits);
    }, { message: "Invalid Indian mobile number (10 digits starting with 6-9)" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message cannot exceed 500 characters" })
});

const CanvasRevealEffect = ({
  animationSpeed = 5,
  containerClassName = "",
  colors = [[59, 130, 246], [139, 92, 246]],
  dotSize = 2,
}: {
  animationSpeed?: number;
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
}) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none", containerClassName)}>
    </div>
  );
};

const CardSpotlight = ({
  children,
  radius = 400,
  color = "rgb(17 17 17)",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-xl border border-neutral-800 bg-black/30 backdrop-blur-sm",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: "linear-gradient(to right, rgb(59 130 246 / 0.2), rgb(139 92 246 / 0.2))",
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 70%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect animationSpeed={5} containerClassName="bg-transparent absolute inset-0 pointer-events-none" dotSize={2} />
        )}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationResult = formSchema.safeParse(formData);
    if (!validationResult.success) {
      const formattedErrors: Record<string, string> = {};
      validationResult.error.issues.forEach(err => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      
return;
    }

    // Clear errors if validation successful
    setErrors({});
    setShowConfetti(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div>
        <label htmlFor="name" className="mb-1 block text-base font-medium text-neutral-200">
          Name
        </label>
        <input 
          type="text" 
          name="name"
          id="name" 
          value={formData.name}
          onChange={handleChange}
          className="block w-full rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-neutral-200 shadow-sm backdrop-blur-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
          placeholder="Sayed Aayan" 
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-base font-medium text-neutral-200">
          Phone
        </label>
        <input 
          type="tel" 
          name="phone"
          id="phone" 
          value={formData.phone}
          onChange={handleChange}
          className="block w-full rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-neutral-200 shadow-sm backdrop-blur-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
          placeholder="8142278334" 
          pattern="[6-9]{1}[0-9]{9}"
          maxLength={10}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        <p className="mt-1 text-sm text-neutral-500">10-digit number starting with 6-9</p>
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-base font-medium text-neutral-200">
          Email
        </label>
        <input 
          type="email" 
          name="email"
          id="email" 
          value={formData.email}
          onChange={handleChange}
          className="block w-full rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-neutral-200 shadow-sm backdrop-blur-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
          placeholder="sayedaayanh@gmail.com" 
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-base font-medium text-neutral-200">
          Message
        </label>
        <textarea 
          id="message" 
          name="message"
          rows={4} 
          value={formData.message}
          onChange={handleChange}
          className="block w-full rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-neutral-200 shadow-sm backdrop-blur-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
          placeholder="Share your thoughts with us..." 
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>
      <button type="submit" className="w-full rounded-md bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Send Message
      </button>
    </form>
  );
};

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-200">Connect with E-Cell MJCET</h2>
      <p className="text-sm text-neutral-400">
        Have an idea, a startup query, or just curious about entrepreneurship? Reach out to us—we're here to help!
      </p>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-neutral-300">
          <MapPin className="size-5 text-blue-500" />
          <span>MJCET Campus, Hyderabad</span>
        </div>
        <div className="flex items-center space-x-3 text-neutral-300">
          <Instagram className="size-5 text-blue-500" />
          <span>@ecellmjcet</span>
        </div>
        <div className="flex items-center space-x-3 text-neutral-300">
          <Mail className="size-5 text-blue-500" />
          <span>ecellmjcet@mjcollege.ac.in</span>
        </div>
      </div>
      <div className="mt-6">
        <iframe 
          className="h-64 w-full rounded-md border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6523161545447!2d78.43982307501106!3d17.42846538346571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9181ad8c26f1%3A0x6c397f5fd4f4c585!2sECELL%20MJCET%20INDIA!5e0!3m2!1sen!2sin!4v1742152603361!5m2!1sen!2sin" 
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 px-3 py-16 pt-40 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <ContactInfo />
          <CardSpotlight className="p-6 lg:p-10">
            <ContactForm />
          </CardSpotlight>
        </div>
      </div>
    </div>
  );
}

export default App;