import { getUserEmail } from "@/server/users";
import CalendarContent from "./CalendarContent";
import { DataItem, getItemsForUser } from "@/server/items";

const CalendarPage = async () => {

  const email = await getUserEmail();
  if(!email) {
    return <div>You are not logged in</div>;
  }

  const items: DataItem[] = await getItemsForUser();
  
  return (
    <div className="bg-bg-primary w-fit flex-1 mx-auto py-10 content-center">
      <CalendarContent items={items} />
    </div>
  );
};

export default CalendarPage;