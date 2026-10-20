import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      className="w-full font-body"
      ref={containerRef}
    >
      <div className="container-base">
        <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4 text-text-primary flex items-center gap-4">
          <span className="w-2 h-10 bg-accent rounded-full"></span>
          Linha do tempo
        </h2>
        <p className="text-text-secondary text-sm lg:text-base max-w-2xl mb-12">
          Minha jornada de aprendizado e desenvolvimento profissional.</p>
      </div>

      <div ref={ref} className="relative container-base pb-12 lg:pb-20 max-lg:pl-0">
        <ol>
          {data.map((item, index) => (
            <li
              key={index}
              className="flex justify-start pt-10 lg:pt-32 gap-4 lg:gap-10 relative z-20"
            >
              <div className="sticky top-24 lg:top-32 self-start flex-shrink-0 w-6 lg:w-max h-fit z-20 lg:pl-[9px]">
                <div className="relative">
                  <div className="absolute left-0 lg:left-0 top-0 lg:top-0 h-10 w-10 rounded-full bg-black flex items-center justify-center z-0">
                    <div className="h-4 w-4 rounded-full bg-glass-secondary border border-accent/30 p-2 shadow-[0_0_12px_rgba(97,218,251,0.3)]" />
                  </div>
                
                  <h3 className="font-heading text-xl lg:text-3xl xl:text-4xl font-bold text-text-secondary ml-10 lg:ml-14 max-lg:w-max max-lg:px-4 max-lg:py-2 max-lg:rounded-2xl max-lg:backdrop-blur-lg max-lg:border max-lg:border-glass max-lg:[background:var(--glass-primary)] lg:min-w-[141px]">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="flex-1 pb-14 lg:pb-12 pt-14 lg:pt-0">
                {item.content}
              </div>
            </li>
          ))}
        </ol>
        
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-5 lg:left-[6.75rem] top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent from-[0%] via-glass-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] z-10"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 30,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-accent via-accent/80 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_20px_rgba(97,218,251,0.6)]"
          />
        </div>
      </div>
    </div>
  );
};
