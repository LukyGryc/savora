import SectionTitle from "@/components/layout/SectionTitle"
import LandingPageSection from "../common/LandingPageSection"
import SectionDescription from "@/components/layout/SectionDescription"
import SectionHeader from "@/components/layout/SectionHeader"
import { Button } from "@/components/ui/button"
import SectionContent from "@/components/layout/SectionContent"
import Link from "next/link"

const ReadyToTrackSmarterSection = () => {
  return (
    <LandingPageSection bgColor="bg-bg-secondary">
      <SectionContent gap="gap-6">
        <SectionHeader>
          <SectionTitle title="Ready to track smarter?" />
          <SectionDescription description="Start building better spending habits today." />
        </SectionHeader>
        <Button asChild variant="primary" className="w-fit mx-auto text-lg">
          <Link href="/signup">Get Started</Link>
        </Button>
      </SectionContent>
    </LandingPageSection>
  )
}

export default ReadyToTrackSmarterSection