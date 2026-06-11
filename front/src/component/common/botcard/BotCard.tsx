import { cn } from "@/lib/utils";

type BotCardProps = {
  estimateTitle: string;
  estimateCompany: string;
  estimateDate: string;
  estimagePrice: string;
  className?: string;
};

export default function BotCard({
  estimateTitle,
  estimateCompany,
  estimateDate,
  estimagePrice,
  className,
}: BotCardProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center p-4 bg-white rounded-lg shadow",
        className,
      )}
    >
      <div className="flex flex-col  gap-2">
        <p className="text-2xl font-bold text-main-text">{estimateTitle}</p>
        <div className="flex gap-2">
          <span className="text-sm text-secondary-text">{estimateCompany}</span>
          <span className="text-sm text-secondary-text">•</span>
          <span className="text-sm text-secondary-text">{estimateDate}</span>
        </div>
      </div>
      <p className="font-bold text-2xl text-primary">{estimagePrice}</p>
    </div>
  );
}
