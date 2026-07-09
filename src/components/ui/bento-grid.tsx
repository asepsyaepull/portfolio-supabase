import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[25rem] grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className={cn(
        "row-span-1 rounded-3xl group/bento transition-all duration-300 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08),0px_10px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08),0px_10px_20px_-5px_rgba(0,0,0,0.3)] p-4 bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.05] justify-between flex flex-col space-y-4 overflow-hidden relative hover:border-lime-500/50 dark:hover:border-lime-500/50",
        className
      )}
    >
      <div className="flex-1 w-full h-full">
        {header}
      </div>
      <motion.div 
        variants={variants}
        className="z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 dark:border-white/5 transition-colors duration-300"
      >
        <div className="flex items-center gap-2">
            {icon}
            <div className="font-sans font-bold text-zinc-900 dark:text-zinc-100 mb-2 mt-2 transition-colors">
                {title}
            </div>
        </div>
        <div className="font-sans font-normal text-zinc-600 dark:text-zinc-400 text-xs transition-colors">
          {description}
        </div>
      </motion.div>
    </motion.div>
  );
};

