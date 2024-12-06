import HorizontalScrollCarousel from "@/components/ui/horizontal-scroll";
import team1 from "@/public/assets/team1.png";
import team from "@/public/assets/GB.jpg";
import team3 from "@/public/assets/team3.png";
import team4 from "@/public/assets/dean.jpeg";
import team5 from "@/public/assets/team5.jpg";
import team2 from "@/public/assets/team6.png";
import team7 from "@/public/assets/team7.jpg";

const HorizontalScrollDemo = () => {
  const images = [team7, team, team2, team4, team5, team1, team3];

  return (
    <div className="relative w-full bg-gray-400 dark:bg-gray-700">
      <div className="h-48"></div>
      <HorizontalScrollCarousel images={images} />
      <div className="h-48"></div>
    </div>
  );
};

export default HorizontalScrollDemo;
