import DashboardCard from "@/components/layout/DashboardCard";

export default function DashboardPage() {
  return (
    <>
      <h2 className="text-4xl font-bold">Dashboard</h2>

      <p className="mt-2 text-gray-600">
        Welcome to KTS Ticket ERP
      </p>

      <div className="grid grid-cols-4 gap-5 mt-8">
        <DashboardCard title="Today's Issue" value={0} />
        <DashboardCard title="Pending Closing" value={0} />
        <DashboardCard title="Cash Entries" value={0} />
        <DashboardCard
          title="Difference"
          value="Rs. 0"
          valueClassName="text-green-600"
        />
      </div>
    </>
  );
}

