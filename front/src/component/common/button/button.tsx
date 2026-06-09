import { cn } from "@/lib/utils";
type ButtonProps = {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-xl px-4 py-3 text-sm font-medium transform",
        variant === "primary"
          ? "bg-primary text-white hover:bg-primary/90"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
