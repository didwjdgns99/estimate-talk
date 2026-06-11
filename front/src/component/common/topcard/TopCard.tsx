import { cn } from "@/lib/utils";

type TopCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
};

export default function TopCard({
  title,
  value = 3,
  icon,
  className,
}: TopCardProps) {
  return (
    <div
      className={cn(
        "bg-white p-4 rounded-lg shadow flex justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <span className="text-lg font-semibold">{title}</span>
        <div className="text-2xl font-bold">{value}</div>
      </div>
      {icon}
    </div>
  );
}
