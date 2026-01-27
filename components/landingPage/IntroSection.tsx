import SectionContent from "../layout/SectionContent"
import SectionDescription from "../layout/SectionDescription"
import { Button } from "../ui/button"
import LandingPageSection from "./common/LandingPageSection"

const IntroSection = () => {
  return (
    <LandingPageSection>
      <SectionContent gap="gap-6">
        <h1 className="text-6xl font-bold flex gap-2 justify-center lg:flex-row flex-col">
          <span className="text-white">Track smarter.</span>
          <span className="text-primary">Spend better.</span>
        </h1>
        <SectionDescription description="A minimalistic expense tracker that makes daily logging effortless. See where your money goes with calendar views, smart templates, and insightful reports." size="xl" />
      </SectionContent>
    </LandingPageSection>
  )
}

export default IntroSection