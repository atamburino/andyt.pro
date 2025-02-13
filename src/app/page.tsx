'use client';

import BlurText from "@/components/shared/BlurText";

export default function Home() {

  const handleAnimationComplete = () => {

    console.log('Animation completed!');
  
  };

  return (
    <div>
      <BlurText
        text="Isn't this so cool?!"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="text-2xl mb-8"
      />
    </div>
  );
}
