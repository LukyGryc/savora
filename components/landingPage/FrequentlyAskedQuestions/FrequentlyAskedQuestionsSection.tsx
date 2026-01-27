import SectionContent from "@/components/layout/SectionContent"
import LandingPageSection from "../common/LandingPageSection"
import SectionHeader from "@/components/layout/SectionHeader"
import SectionTitle from "@/components/layout/SectionTitle"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const frequentlyAskedQuestions = [
  {
    id: "1",
    question: "What is Savora?",
    answer: "Savora is a platform that helps you track your spending and save money.",
  },
  {
    id: "2",
    question: "How do templates work?",
    answer: "Templates let you save groups of expenses that you log regularly (like groceries, commute costs, or subscriptions). Apply a template to quickly add multiple items at once.",
  },
  {
    id: "3",
    question: "Can I exclude certain expenses from reports?",
    answer: "Absolutely. Each expense has an 'Include in reports' toggle. Excluded items still appear in your daily view but won't affect your analytics or totals.",
  },
  {
    id: "4",
    question: "Can I export my data?",
    answer: "Yes, you can export your expense data as CSV for spreadsheets or PDF for sharing and printing.",
  },
  {
    id: "5",
    question: "Can I set a budget for my expenses?",
    answer: "Yes, you can set a budget for your expenses in the 'Budgets' section. You can set a budget for a specific category or for a specific period of time.",
  }
];

const FrequentlyAskedQuestionsSection = () => {
  return (
    <LandingPageSection>
      <SectionContent>
        <SectionHeader>
          <SectionTitle title="Frequently Asked Questions" />
        </SectionHeader>
        <Accordion type="multiple" className="text-white w-full lg:w-2/3 mx-auto text-start">
          {frequentlyAskedQuestions.map(({ id, question, answer }) => (
            <AccordionItem key={id} value={id} className="border-b px-4 last:border-b-0">
              <AccordionTrigger className="cursor-pointer">{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionContent>
    </LandingPageSection >
  )
}

export default FrequentlyAskedQuestionsSection