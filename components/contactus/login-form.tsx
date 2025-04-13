"use client";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import {
  useState,
  useRef,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Mail, MapPin, Instagram } from "lucide-react";
import confetti from "canvas-confetti";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";

import { cn } from "@/lib/utils";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase environment variables not configured!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

function Squares({
  direction = "right",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const numSquaresX = useRef<number>();
  const numSquaresY = useRef<number>();
  const gridOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.style.background = "#060606";

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      ctx.lineWidth = 0.5;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);
          if (
            hoveredSquare &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2
      );
      gradient.addColorStop(0, "rgba(6, 6, 6, 0)");
      gradient.addColorStop(1, "#060606");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
      }
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );
      setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY });
    };

    const handleMouseLeave = () => {
      setHoveredSquare(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [
    direction,
    speed,
    borderColor,
    hoverFillColor,
    hoveredSquare,
    squareSize,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`block size-full border-none ${className}`}
    />
  );
}

const CanvasRevealEffect = ({
  containerClassName = "",
}: {
  animationSpeed?: number;
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
}) => {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", containerClassName)}
    />
  );
};

const CardSpotlight = ({
  children,
  radius = 400,
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
          background:
            "linear-gradient(to right, rgb(59 130 246 / 0.2), rgb(139 92 246 / 0.2))",
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
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
          />
        )}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z ]+$/, "Name should only contain letters and spaces"),
  phone: z
    .string()
    .refine(
      (val) => /^[6-9]\d{9}$/.test(val.replace(/\D/g, "")),
      "Invalid phone number"
    ),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

const ContactForm = () => {
  const fireSideCannons = () => {
    const end = Date.now() + 1.5 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await supabase.from("contact-form").insert([
          {
            name: value.name,
            phone: value.phone,
            email: value.email,
            message: value.message,
          },
        ]);
        if (error) {
          toast.error("Submission failed", {
            description: error.message,
            action: {
              label: "Retry",
              onClick: () => form.handleSubmit(),
            },
          });
        } else {
          fireSideCannons();
          toast.success("Message sent successfully!", {
            description: "We'll get back to you soon",
          });
          form.reset();
        }
      } catch {
        toast.error("Unexpected error occurred", {
          description: "Please try again later",
        });
      }
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        const result = formSchema.safeParse(value);
        if (!result.success) {
          const flattened = result.error.flatten().fieldErrors;

          return {
            fields: {
              name: flattened.name ? flattened.name[0] : undefined,
              phone: flattened.phone ? flattened.phone[0] : undefined,
              email: flattened.email ? flattened.email[0] : undefined,
              message: flattened.message ? flattened.message[0] : undefined,
            },
          };
        }

        return null;
      },
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field name="name">
        {(field) => (
          <div>
            <label className="mb-1 block text-base font-medium text-neutral-200">
              Name
            </label>
            <input
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="block w-full rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-neutral-200 shadow-sm backdrop-blur-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {field.state.meta.errors?.length ? (
              <p className="mt-1 text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>
      <form.Field name="phone">
        {(field) => (
          <div>
            <label className="mb-1 block text-base font-medium text-neutral-200">
              Phone
            </label>
            <input
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              type="tel"
              placeholder="eg. 81422 78334"
              pattern="[6-9]{1}[0-9]{9}"
              maxLength={10}
              className="block w-full rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-neutral-200 shadow-sm backdrop-blur-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {field.state.meta.errors?.length ? (
              <p className="mt-1 text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
            <p className="mt-1 text-sm text-neutral-500">
              10-digit number starting with 6-9
            </p>
          </div>
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <div>
            <label className="mb-1 block text-base font-medium text-neutral-200">
              Email
            </label>
            <input
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              type="email"
              placeholder="your.email@example.com"
              className="block w-full rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-neutral-200 shadow-sm backdrop-blur-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {field.state.meta.errors?.length ? (
              <p className="mt-1 text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>
      <form.Field name="message">
        {(field) => (
          <div>
            <label className="mb-1 block text-base font-medium text-neutral-200">
              Message
            </label>
            <textarea
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={4}
              placeholder="Enter your message or inquiry"
              className="block w-full rounded-md border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-neutral-200 shadow-sm backdrop-blur-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {field.state.meta.errors?.length ? (
              <p className="mt-1 text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Send Message
      </button>
    </form>
  );
};

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-200">
        Connect with E-Cell MJCET
      </h2>
      <p className="text-sm text-neutral-400">
        Have an idea, a startup query, or just curious about entrepreneurship?
        Reach out to us—we&apos;re here to help!
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

/* ------------------ Main App Component ------------------ */
function App() {
  return (
    <div className="relative min-h-screen bg-neutral-950 px-3 py-16 pt-40 md:px-6">
      <div className="absolute inset-0 overflow-hidden">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl">
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
