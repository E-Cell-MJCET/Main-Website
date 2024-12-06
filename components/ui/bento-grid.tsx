import Image from "next/image";

import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: any;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid w-screen md:auto-rows-[21rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  idx,
  className,
  title,
  description,
  header,
  imageSrc, // Changed from icon to imageSrc
}: {
  idx: number;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  imageSrc?: any; // Image source URL instead of ReactNode icon
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {imageSrc ? (
        <div className="relative mb-4 h-48 w-full hover:cursor-pointer">
          {" "}
          {/* Define size container */}
          <Image
            src={imageSrc}
            alt="Image"
            layout="fill" // Ensures the image fills the container
            // objectFit="cover" // Ensures the image covers the container
            className={`rounded-lg ${
              idx === 1 || idx === 2 || idx === 3
                ? "object-cover"
                : "object-contain"
            } `} // Optional styling
          />
        </div>
      ) : (
        header
      )}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="my-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
