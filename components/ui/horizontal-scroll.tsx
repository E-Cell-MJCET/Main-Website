import { FC, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

interface Props {
  images: any[];
}

const HorizontalScrollCarousel: FC<Props> = ({ images }) => {
  const targetRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress || 0, [0, 1], ["1%", "-90%"]);

  if (!Array.isArray(images) || images.length === 0) {
    console.error("Invalid images array");
    return null;
  }

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {images.map((src, idx) => (
            <Card src={src} key={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card: FC<{ src: string }> = ({ src }) => (
  <div className="card">
    <Image src={src} alt="Image" width={200} height={300} />
  </div>
);

export default HorizontalScrollCarousel;
