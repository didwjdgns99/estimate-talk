import { cn } from "@/lib/utils";
import EstimateMenu from "@/component/common/estimateMenu/estimateMenu";

type BotCardProps = {
  estimateId: string;
  estimateTitle: string;
  estimateCompany: string;
  estimateDate: string;
  estimagePrice: string;
  className?: string;
  onClick?: () => void;
  onDeleted: (estimateId: string) => void;
};

export default function BotCard({
  estimateId,
  estimateTitle,
  estimateCompany,
  estimateDate,
  estimagePrice,
  className,
  onClick,
  onDeleted,
}: BotCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col md:flex md:flex-row justify-between md:items-end px-4 py-6 bg-white rounded-lg shadow border border-gray-200 cursor-pointer hover:border-primary transition",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold text-main-text">{estimateTitle}</p>
        <div className="flex flex-col md:flex md:flex-row md:gap-2">
          <span className="text-sm text-secondary-text">{estimateCompany}</span>
          <span className="hidden md:text-sm md:text-secondary-text md:block">
            •
          </span>
          <span className="text-sm text-secondary-text">{estimateDate}</span>
        </div>
      </div>
      <p className="text-md font-bold md:text-2xl text-primary">
        {estimagePrice}
      </p>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-3 "
      >
        <EstimateMenu estimateId={estimateId} onDeleted={onDeleted} />
      </div>
    </div>
  );
}
