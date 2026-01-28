import { getUserEmail } from "@/util/userUtil";
import CalendarContent from "./CalendarContent";
import { getItemsForUser } from "@/server/items";

const CalendarPage = async () => {

  const email = await getUserEmail();
  if(!email) {
    return <div>You are not logged in</div>;
  }

  const items = (await getItemsForUser()).map( item => ({
    ...item,
    date: new Date(item.date),
  }));

  return (
    <div className="bg-bg-primary w-fit flex-1 mx-auto py-10 content-center">
      <CalendarContent items={items} />
    </div>
  );
};

export default CalendarPage;