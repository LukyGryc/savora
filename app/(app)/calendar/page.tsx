import { getUserEmail } from "@/server/users";
import CalendarContent from "./CalendarContent";
import { getItemsForUser } from "@/server/items";

const CalendarPage = async () => {

  const email = await getUserEmail();
  if(!email) {
    return <div>You are not logged in</div>;
  }

  //Just testing the type from tutorial, could very much be DataItem[], but this at least saves me import, also this doesn't have to be typed at all since it infers the type from the function
  const items: Awaited<ReturnType<typeof getItemsForUser>> = await getItemsForUser();
  
  return (
    <div className="bg-bg-primary flex-1 mx-auto py-10">
      <CalendarContent items={items} />
    </div>
  );
};

export default CalendarPage;