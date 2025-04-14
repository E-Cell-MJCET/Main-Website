import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackcelerate | E-Cell MJCET",
  description:
    "Hackcelerate is a high-energy hackathon by E-Cell MJCET, where innovation meets execution. It's a space for developers, designers, and problem-solvers to create solutions that can make a difference. Participants can build with the potential to launch real solutions, potentially earning, scaling, and sustaining. The event also offers opportunities to explore how projects can evolve into revenue-generating products or businesses.",
};

export default function HackcelerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
