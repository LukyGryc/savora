import SectionTitle from "@/components/layout/SectionTitle"
import LandingPageSection from "../common/LandingPageSection"
import SectionDescription from "@/components/layout/SectionDescription"
import { ArrowRightLeft, Calendar, ChartColumn, Download, FileSpreadsheet, TrendingUp } from "lucide-react"
import EverythingYouNeedCard from "./EverythingYouNeedCard"
import SectionHeader from "@/components/layout/SectionHeader"
import SectionContent from "@/components/layout/SectionContent"

const everythingYouNeedCards = [
  {
    title: "Calendar-Based Tracking",
    description: "Visual daily overview makes it easy to log and review expenses by date.",
    icon: <Calendar />,
  },
  {
    title: "Quick Templates",
    description: "Save recurring expense groups and apply them with one click.",
    icon: <ArrowRightLeft />,
  },
  {
    title: "Include/Exclude Analytics",
    description: "Toggle expenses in or out of reports for flexible analysis.",
    icon: <TrendingUp />,
  },
  {
    title: "Monthly Comparisons",
    description: "Compare spending patterns across different months.",
    icon: <ChartColumn />,
  },
  {
    title: "Table & Chart Views",
    description: "Visualize your data your way with flexible report formats.",
    icon: <FileSpreadsheet />,
  },
  {
    title: "Export Data",
    description: "Download your data as CSV or PDF anytime you need.",
    icon: <Download />,
  },
]

const EverythingYouNeedSection = () => {
  return (
    <LandingPageSection maxWidth="1600px">
      <SectionContent gap="gap-16">
        <SectionHeader>
          <SectionTitle title="Everything you need" />
          <SectionDescription description="Simple tools designed to make expense tracking a habit, not a chore." />
        </SectionHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 md:gap-8 gap-16">
          {everythingYouNeedCards.map((card) => (
            <EverythingYouNeedCard key={card.title} {...card} />
          ))}
        </div>
      </SectionContent>
    </LandingPageSection>
  )
}

export default EverythingYouNeedSection