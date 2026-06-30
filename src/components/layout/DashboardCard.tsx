type DashboardCardProps = {
  title: string;
  value: string | number;
  valueClassName?: string;
};

export default function DashboardCard({
  title,
  value,
  valueClassName = "",
}: DashboardCardProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow">
      <p className="text-gray-500">{title}</p>

      <h2 className={`mt-3 text-4xl font-bold ${valueClassName}`}>
        {value}
      </h2>
    </div>
  );
}

