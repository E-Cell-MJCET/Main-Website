"use client"
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import blogs from "@/public/assets/blogs.png"
import ecell from "@/public/assets/Logo/logo-big-colour.png"
import team from "@/public/assets/team1.png"
import dean from "@/public/assets/dean.jpeg"
import event from '@/public/assets/team5.jpg'
import hackathon from "@/public/assets/hackathon.jpeg"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function BentoGridDemo() {
    useGSAP(()=>{
      gsap.to(".bent", {
        scale: .9,
        y:80,
        scrollTrigger:{
          trigger: ".bent",
          start: "top 91%",
          end: "top 50%",
          scrub:true,
          markers:true
        }
      });
    },[])
  return (
    <div className="w-screen  pb-10 mb-10 h-max flex justify-center items-center bg-slate-200">
      <BentoGrid className="max-w-4xl bent mb-7 mx-auto">
        {items.map((item, idx) => (
          <BentoGridItem
            key={idx}
            title={item.title}
            description={item.description}
            header={item.header}
            imageSrc={item.imageSrc}
            idx = {idx}
            className={`${idx === 3 || idx === 4 ? "min-h-[20pc] my-3" : ""} ${
              idx === 1 || idx === 2 || idx===4 ? "object-cover" : "object-contain"
            } ${idx === 2 || idx === 5 || idx == 1 ? "md:col-span-2 " : ""} `}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Our Faculty Coordinator",
    description:
      "Prof. Syed Ferhathullah Hussainy, our esteemed dean and faculty coordinator, inspires with his wisdom, guidance, and unwavering dedication to academic excellence.",
    header: <Skeleton />,
    imageSrc: dean,
  },
  {
    title: "Innovate, Inspire, Impact: Explore Our Event",
    description:
      "Our Events is where innovation meets opportunity. From workshops to competitions, we curate experiences that inspire creativity, foster collaboration, and empower future leaders. Join us to explore new ideas, network with industry experts, and take the first step toward turning your entrepreneurial dreams into reality.",
    header: <Skeleton />,
    imageSrc: event,
  },
  {
    title: "The Team",
    description:
      "The E-Cell team at MJCET is a dynamic group of enthusiastic individuals dedicated to fostering entrepreneurship and innovation. They provide a platform for students to explore and develop their business ideas through workshops, mentorship, and events. With a vision to empower future leaders, the team organizes startup incubators, networking sessions, and competitions, promoting a culture of creativity and collaboration. Their efforts aim to inspire students to think beyond the conventional, equipping them with the tools to turn ideas into successful ventures.",
    header: <Skeleton />,
    imageSrc: team,
  },
  {
    title: "Hackathons: Compete, Excel",
    description:
      "We thrive in the hackathon circuit, hosting MJCET's annual flagship event and competing at top platforms. Our proudest achievement? Winning the prestigious IIT Hyderabad Hackathon. Join us as we innovate, compete, and leave our mark!",
    header: <Skeleton />,
    imageSrc:hackathon
  },
  {
    title: "Blogs: Voices of Innovation",
    description:
      "Explore insights, experiences, and stories shared by the vibrant minds of E-Cell MJCET. Our blogs capture the journey of entrepreneurship, innovation, and success, penned by our very own members. Stay inspired!",
    header: <Skeleton />,
    imageSrc: blogs,
  },
  {
    title: "Membership: Empower Your Entrepreneurial Journey",
    description:
      "Join E-Cell MJCET and gain exclusive opportunities to engage with accomplished entrepreneurs through informal chats, Q&A sessions, and mentorship meetings. Participate in insightful seminars where industry leaders share their experiences, strategies, and lessons learned. These interactions provide invaluable knowledge, practical guidance, and the inspiration needed to navigate your entrepreneurial path. As a member, you’ll become part of a vibrant community dedicated to fostering innovation, creativity, and collaboration. Whether you're an aspiring entrepreneur or a curious learner, E-Cell membership offers the perfect platform to grow, connect, and bring your ideas to life.",
    header: <Skeleton />,
    imageSrc: ecell,
  },
];
