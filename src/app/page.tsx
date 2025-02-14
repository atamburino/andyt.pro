'use client';

import BlurText from "@/components/shared/BlurText";
import Header from "@/components/ui/Header";
import Iridescence from "@/components/shared/Iridescence";

export default function Home() {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <Iridescence
              color={[1, 1, 1]}
              mouseReact={false}
              amplitude={0.1}
              speed={1.0}
            />
          </div>
          <BlurText
            text="Isn't this so cool?!"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl text-white"
          />
        </div>
      </div>
    </>
  );
}
