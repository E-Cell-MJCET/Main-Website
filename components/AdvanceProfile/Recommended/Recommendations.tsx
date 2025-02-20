import { HoverEffect } from "@/components/ui/card-hover-effect";

// Update the component to accept props
export function Recommendations({ testimonials }: { testimonials: Array<{ id: number; title: string; description: string; link: string }> }) {
  return (
    <div className="mx-auto max-w-5xl px-8 pb-20 pt-[55rem] md:pt-[500px] lg:pt-[160px]">
      <div className="z-10 flex flex-col gap-5 text-center">
        <h1 className="text-4xl font-semibold text-[#76b900] md:text-5xl">
          Recommendations
        </h1>
        <h2 className="text-xl font-medium text-[#858585]">
          Real stories from real People. See how entrepreneurs like you transformed their businesses with our solution. 
        </h2>
      </div>
      <HoverEffect items={testimonials} />
    </div>
  );
}

// Example usage where you pass JSON as a parameter
export const projects = [
  {
    id: 1,
    title: "Abid",
    description: "Working with Adnan has been an absolute pleasure. Their ability to create stunning, functional web interfaces combined with their attention to detail has elevated our projects. The passion and professionalism He bring to every task make them an invaluable asset to any team.",
    link: "/testimonial/abid"
  },
  {
    id: 2,
    title: "Aayan",
    description: "Adnan is a brilliant developer who effortlessly blends creativity with functionality. He developed a full-stack solution for our company that not only exceeded expectations but also enhanced user experience. Their commitment to continuous learning and growth is evident in the quality of their work.",
    link: "/testimonial/aayan"
  },
  {
    id: 3,
    title: "Afzal",
    description: "I've had the privilege of working with Adnan on multiple projects. Their deep understanding of both front-end and back-end development has made them a standout developer. The level of detail and user-centric designs He produce are a testament to their expertise and passion for technology.",
    link: "/testimonial/afzal"
  },
  {
    id: 4,
    title: "Safwan",
    description: "What impresses me most about Adnan is their versatility. Whether it's building functional websites or inventing gadgets, their creativity and technical skills always shine through. He have an exceptional ability to turn complex ideas into practical solutions that deliver exceptional value.",
    link: "/testimonial/safwan"
  },
  {
    id: 5,
    title: "Muneeb",
    description: "I've worked closely with Adnan on several projects, and I can confidently say He are one of the most talented developers I've encountered. Their designs are not only visually stunning but also incredibly functional. He have a keen understanding of user experience, and their work always exceeds expectations.",
    link: "/testimonial/muneeb"
  },
  {
    id: 6,
    title: "Neha",
    description: "Adnan brings a unique combination of design, development, and problem-solving skills to the table. Their ability to handle both the technical and creative aspects of a project makes them an invaluable contributor. I'm continuously impressed by their work ethic and the innovation He bring to every project.",
    link: "/testimonial/neha"
  }
];