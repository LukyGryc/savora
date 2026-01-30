
import { DataItem, getItemsForUser } from "@/server/items";
import { getUserEmail } from "@/server/users";
import OverviewTable from "./OverviewTable";
import { ChartExample } from "./BarChart";

const DashboardPage = async () => {

    const email = await getUserEmail();
    if (!email) {
        return <div>You are not logged in</div>;
    }

    const items: DataItem[] = await getItemsForUser();

    return (
        <div className="bg-bg-primary w-fit flex-1 py-10">
            <div className="w-fit flex-col lg:flex-row gap-10 flex mx-auto">
                <OverviewTable items={items} />
                <ChartExample items={items} />
            </div>
        </div>
    )
}

export default DashboardPage