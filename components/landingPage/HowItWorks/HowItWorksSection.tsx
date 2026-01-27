import SectionTitle from "@/components/layout/SectionTitle"
import HowItWorksCard from "./HowItWorksCard"
import SectionDescription from "@/components/layout/SectionDescription"
import LandingPageSection from "../common/LandingPageSection"
import SectionHeader from "@/components/layout/SectionHeader"
import SectionContent from "@/components/layout/SectionContent"

const howItWorksCards = [
  {
    title: "Track",
    description: "Log expenses daily using the calendar view or quick templates.",
  },
  {
    title: "Categorize",
    description: "Organize spending with customizable categories.",
  },
  {
    title: "Understand",
    description: "Get insights with charts, comparisons, and detailed reports.",
  },
]

const HowItWorksSection = () => {
  return (
    <LandingPageSection bgColor="bg-bg-secondary">
      <SectionContent gap="gap-16">

        <SectionHeader>
          <SectionTitle title="How it works" />
          <SectionDescription description="Three simple steps to take control of your spending" />
        </SectionHeader>

        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-16">
          {howItWorksCards.map((card, index) => (
            <HowItWorksCard key={card.title} {...card} index={index + 1} />
          ))}
        </div>
      </SectionContent>
    </LandingPageSection>
  )
}

export default HowItWorksSection