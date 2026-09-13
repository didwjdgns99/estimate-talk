import { cn } from "@/lib/utils";

type BotCardProps = {
  estimateTitle: string;
  estimateCompany: string;
  estimateDate: string;
  estimagePrice: string;
  className?: string;
  onClick?: () => void;
};

export default function BotCard({
  estimateTitle,
  estimateCompany,
  estimateDate,
  estimagePrice,
  className,
  onClick,
}: BotCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex justify-between items-center px-4 py-6 bg-white rounded-lg shadow border border-gray-200 cursor-pointer hover:border-primary transition",
        className,
      )}
    >
      <div className="flex flex-col  gap-2">
        <p className="text-xl font-bold text-main-text">{estimateTitle}</p>
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
