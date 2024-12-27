import React from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const PreviousEvents = () => {
  const events = [
    {
      title: "Beyond The Bench",
      date: "December 03, 2024",
      description:
        "Get ready to ignite your passion for sports at BEYOND THE BENCH, an exciting event by E-Cell that blends the thrill of sports with creative challenges and engaging activities. Whether you're a die-hard fan or just curious to explore, this is your chance to dive into trivia, surprises, and unforgettable moments while connecting with fellow enthusiasts. Don't miss out on the perfect mix of strategy, fun, and teamwork.",
      image: "/assets/events/btb.png", // replace with actual image URL
      link: "#",
    },
    {
      title: "Market Mayhem",
      date: "October 29",
      description:
        "Round 1. Guess the Price: Estimate the prices of various products Round 2. Guess the Brand Using Emojis: Identify brands based on emoji clues. Round 3. Debate: Teams engage in a marketing-related debate. Round 4. Surprise Round: A mystery challenge revealed on the spot. Participants: Duo: ₹60 Teams of up to 4 members: ₹100 Free for E-cell members",
      image: "/assets/events/market-mayhem.png", // replace with actual image URL
      link: "#",
    },
    {
      title: "Game of Investors",
      date: "July 11",
      description:
        "Join the Ultimate Investment Challenge! Dive into the world of strategic investing with E-Cell’s “Game of Investors.” Discover the excitement of competitive finance as you invest in dynamic companies and make strategic decisions over 10 thrilling rounds. Boost your chances of winning fantastic rewards and the title of Best Investor!",
      image: "/assets/events/goi.jpg", // replace with actual image URL
      link: "#",
    },
    {
      title: "IPL Auction 2024",
      date: "April 27",
      description:
        '"IPL Auction 2024, hosted by the Entrepreneurship Cell MJCET, saw over 80 students forming teams of up to 5 members. Each team was assigned one of the 16 IPL teams with a budget of 100 crores to select 11 players. The winner was determined based on the total player ratings. It was an exciting and competitive event.',
      image: "/assets/events/ipl.jpg", // replace with actual image URL
      link: "#",
    },
    {
      title: "Build your own business",
      date: "February 12",
      description:
        "A 90-minute program packed with insights on brand building. From domain ownership to effective marketing strategies. we have got you covered. No coding expertise required.",
      image: "/assets/events/byob.png", // replace with actual image URL
      link: "#",
    },
    {
      title: "Hack Revolution",
      date: "December 17",
      description:
        "Hack Revolution, a 15-hour coding event by ACES in collaboration with CSI and E-Cell at MJCET, brings together teams of 4-6 for networking, skill-building, and a prize pool of ₹3,00,000, plus internship opportunities.",
      image: "/assets/events/hackrev.jpeg", // replace with actual image URL
      link: "#",
    },
    {
      title: "DataForge Fusion",
      date: "November 25",
      description:
        "Explore DataForge Fusion: a workshop on Data Engineering & Analysis. Join Imaduddin Mohammed, Senior Cloud Engineer at PwC Australia, as we delve into the depths of data analysis. Dive into hands-on sessions, unlocking the power of data engineering and analysis with practical experiences and cutting-edge tools.",
      image: "/assets/events/dataforge.jpeg", // replace with actual image URL
      link: "#",
    },
    {
      title: "FLUTTER FIESTA",
      date: "November 18",
      description:
        "An interactive workshop, dive into App Development with Flutter! Discover the latest in mobile app technology as you learn to create your own Flutter app. Gain hands-on experience and boost your chances of winning the Hackathons ₹3,00,000 prize pool!",
      image: "/assets/events/flutter.jpeg", // replace with actual image URL
      link: "#",
    },
    {
      title: "Battle of Brands",
      date: "November 16",
      description:
        "A thrilling 3-round event! Round 1 kicks off with PICTIONARY, where teams race to draw and guess brand logos. Round 2 features Battle of Facts, a showdown defending given brands. The surprise Round 3 offers cash prizes! Assemble your team of 2 or 4 for a chance to win from the ₹2000 prize pool.",
      image: "/assets/events/bob.jpg", // replace with actual image URL
      link: "#",
    },
    {
      title: "Stack Sprit",
      date: "November 10-11",
      description:
        "A Web Development Adventure, our first pre-hackathon workshop! Dive into the world of web development over two days with guest speaker Syed Zohaib, Software Engineer at Apple, Hyderabad. Learn HTML, CSS, JavaScript, and Vue.js basics while building a web page and web app. Ready to kickstart your journey as a web developer? Join us!",
      image: "/assets/events/stack.jpg", // replace with actual image URL
      link: "#",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-wrap items-center justify-between gap-6 p-5">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-black-200 my-10 h-[600px]  max-w-sm rounded-lg border border-[#0b5db0] p-[3px] transition duration-300 hover:scale-105 hover:border-[#ff403c]"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={300}
              height={200}
              className="h-[190px] w-full object-cover"
            />
            <div className="flex h-[410px] flex-col justify-between p-4 text-left">
              <div>
                <h2 className="mb-2 text-xl font-bold text-white">
                  {event.title}
                </h2>
                <p className="mb-2 text-sm text-gray-500">{event.date}</p>
                <p className="mb-4 text-ellipsis text-white ">
                  {event.description}
                </p>
              </div>
              <a
                href={event.link}
                className="mb-2 mt-10 flex flex-row items-center justify-between rounded-md bg-purple-400 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
              >
                Learn more <FaArrowRightLong />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousEvents;
