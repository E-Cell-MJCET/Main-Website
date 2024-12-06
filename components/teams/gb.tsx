import React from "react";
import Image from "next/image";

interface MemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  bgColor: string;
  quote: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  role,
  imageUrl,
  bgColor,
  quote,
}) => {
  return (
    <div className="group relative w-full max-w-sm cursor-pointer sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]">
      <div
        className={`relative overflow-hidden rounded-2xl ${bgColor} transition-all duration-500 ease-out group-hover:scale-[1.02]`}
      >
        <div className="relative aspect-[3/4]">
          <Image
            src={imageUrl}
            alt={name}
            width={1000}
            height={1000}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute bottom-32 p-6 text-center">
              <p className="text-sm italic leading-relaxed text-white">
                &quot;{quote}&quot;
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0">
          <div className="rounded-xl border border-white/10 bg-black/80 p-4 backdrop-blur-sm">
            <h3 className="mb-1 text-xl font-bold text-white">{name}</h3>
            <p className="text-sm uppercase tracking-wider text-gray-300">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const members = [
  {
    name: "Syed Shujauddin",
    role: "Chief Coordinator",
    imageUrl: "/assets/Team/GB/shuja.jpeg",
    bgColor: "bg-gradient-to-br from-purple-600 to-indigo-800",
    quote: "Break boundaries, build legacies",
  },
  {
    name: "Ayesha Fatima",
    role: "Chief Coordinator",
    imageUrl: "/assets/Team/GB/ayesha.jpeg",
    bgColor: "bg-gradient-to-br from-amber-600 to-orange-800",
    quote: "You are not the work you do, you are the person you are.",
  },

  {
    name: "Mohammed Irfan",
    role: "Chief Information Officer",
    imageUrl: "/assets/Team/GB/irfan.jpeg",
    bgColor: "bg-gradient-to-br from-emerald-600 to-teal-800",
    quote: "I see challenges as opportunities to innovate and grow.",
  },
  {
    name: "Maliha Ishaq",
    role: "Chief Operating Officer",
    imageUrl: "/assets/Team/GB/maliha.jpeg",
    bgColor: "bg-gradient-to-br from-rose-600 to-pink-800",
    quote: "Believe and achieve.",
  },
  {
    name: "Abid Nafi",
    role: "Chief Technology Officer",
    imageUrl: "/assets/Team/GB/abid.png",
    bgColor: "bg-gradient-to-br from-blue-600 to-cyan-800",
    quote:
      "Have an attitude that you can do anything, only then you will go and try anything.",
  },
];

const GoverningBody: React.FC = () => {
  const topRow = members.slice(0, 2);
  const bottomRow = members.slice(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Our Governing Body
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Meet the visionary leaders who guide our organization towards
            excellence and innovation.
          </p>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap justify-center gap-8">
            {topRow.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {bottomRow.map((member, index) => (
              <MemberCard key={index + topRow.length} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoverningBody;
