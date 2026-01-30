
import { DataItem, getItemsForUser } from "@/server/items";
import { getUserEmail } from "@/server/users";
import OverviewTable from "./OverviewTable";
import { DashboardChartCard } from "./DashboardChartCard";

const DashboardPage = async () => {

    const email = await getUserEmail();
    if (!email) {
        return <div>You are not logged in</div>;
    }

    const items: DataItem[] = await getItemsForUser();

    return (
        <div className="bg-bg-primary flex-1 py-10">
            <div className="flex-col xl:flex-row gap-10 flex mx-auto w-3/4">
                <OverviewTable items={items} className="md:block hidden xl:w-2/3 w-full" />
                <DashboardChartCard items={items} className="xl:w-1/2 w-full" />
            </div>
        </div>
    )
}

export default DashboardPage