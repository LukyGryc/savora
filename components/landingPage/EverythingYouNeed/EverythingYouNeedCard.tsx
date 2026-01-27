import Icon from "@/components/layout/Icon";
import SectionDescription from "@/components/layout/SectionDescription";
import SectionTitle from "@/components/layout/SectionTitle";


interface EverythingYouNeedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const EverythingYouNeedCard = ({ title, description, icon }: EverythingYouNeedCardProps) => {
  return (
    <div className="border border-white rounded-lg p-6 flex flex-col gap-6 bg-bg-secondary hover:bg-primary/1 transition-all duration-300">
      <Icon icon={icon} />
      <div className="text-start flex flex-col gap-1"> 
        <SectionTitle title={title} size="lg"/>
        <SectionDescription description={description} size="md" />
      </div>
    </div>
  )
}

export default EverythingYouNeedCard