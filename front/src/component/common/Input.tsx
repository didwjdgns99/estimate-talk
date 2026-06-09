import { cn } from "@/lib/utils";

type InputProps = {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  className?: string;
};

export default function Input({
  label,
  errorMessage,
  helperText,
  className,
  id,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={inputId} className="block text-sm mb-2 text-main-text">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={cn(
          "w-full rounded-xl border bg-input-background px-4 py-3 text-sm text-gray-900",
          "placeholder:text-gray-400",
          "outline-none transition",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
          errorMessage &&
            "border-red-400 focus:border-red-500 focus:ring-red-100",
          className,
        )}
        {...props}
      />

      {errorMessage ? (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
