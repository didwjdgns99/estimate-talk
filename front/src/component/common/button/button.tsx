import { cn } from "@/lib/utils";
type ButtonProps = {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-xl px-4 py-3 text-sm font-medium transform",
        variant === "primary"
          ? "bg-primary text-white hover:bg-primary/90"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300",
        disabled &&
          "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
