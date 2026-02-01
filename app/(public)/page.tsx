import EverythingYouNeedSection from "@/components/landingPage/EverythingYouNeed/EverythingYouNeedSection";
import FrequentlyAskedQuestionsSection from "@/components/landingPage/FrequentlyAskedQuestions/FrequentlyAskedQuestionsSection";
import HowItWorksSection from "@/components/landingPage/HowItWorks/HowItWorksSection";
import IntroSection from "@/components/landingPage/IntroSection";
import ReadyToTrackSmarterSection from "@/components/landingPage/ReadyToTrackSmarter/ReadyToTrackSmarterSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="min-h-dvh bg-bg-primary">
      <IntroSection />
      <HowItWorksSection />
      <EverythingYouNeedSection />
      <ReadyToTrackSmarterSection />
      <FrequentlyAskedQuestionsSection />
    </div>
  );
}
