import React from 'react';
import Image from 'next/image';

interface MemberCardProps {
  title: string;
  colorClass: string;
  image: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ title, colorClass, image }) => {
  return (
    <div className="relative mt-24">
      <div className="absolute -top-24 left-1/2 size-48 -translate-x-1/2">

        <div className="size-full rounded-xl object-cover">
          <Image 
    src={image} 
    alt={title}
    layout="fill"
    objectFit="cover"
    className="rounded-xl"
  />
        </div>
        <div className="flex min-h-[160px] flex-col rounded-xl bg-[#1a2337] p-6">
          <div className={`size-48 ${colorClass} mx-auto -mt-28 mb-4 overflow-hidden rounded-xl`}>
            <Image 
      src={image} 
      alt={title}
      layout="fill"
      objectFit="cover"
      className="rounded-xl"
    />
          </div>
        </div>
        <h3 className="mt-auto text-center text-xl font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default MemberCard;