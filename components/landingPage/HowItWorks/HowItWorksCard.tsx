import Icon from "@/components/layout/Icon";
import SectionDescription from "@/components/layout/SectionDescription";
import SectionTitle from "@/components/layout/SectionTitle";

interface HowItWorksCardProps {
  title: string;
  description: string;
  index: number;
}

const HowItWorksCard = ({ title, description, index }: HowItWorksCardProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Icon icon={index} />
      <SectionTitle title={title} size="lg"/>
      <SectionDescription description={description} />
    </div>
  )
}

export default HowItWorksCard