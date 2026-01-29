
import { DataItem, getItemsForUser } from "@/server/items";
import { getUserEmail } from "@/server/users";
import OverviewTable from "./OverviewTable";

const DashboardPage = async () => {

    const email = await getUserEmail();
    if (!email) {
        return <div>You are not logged in</div>;
    }

    const items: DataItem[] = await getItemsForUser();

    return (
        <div className="w-fit flex-col lg:flex-row gap-10 flex flex-1">
            <OverviewTable items={items} />
        </div>
    )
}

export default DashboardPage