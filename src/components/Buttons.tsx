import * as React from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: boolean;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Single source of truth for buttons.
 * - primary: gold fill
 * - secondary: outline
 * - ghost: link-like
 * `asChild` lets you style a <Link> as a button without wrapper components.
 */
export function Button({
  className,
  variant = "primary",
  asChild = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-[var(--bg)] disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<Variant, string> = {
    primary: "bg-[var(--gold)] text-[var(--bg)] hover:opacity-90",
    secondary:
      "border border-[var(--border)] text-[var(--text)] hover:bg-white/5",
    ghost:
      "text-[var(--muted)] underline decoration-white/20 underline-offset-4 hover:text-[var(--text)]",
  };

  if (asChild && React.isValidElement(props.children)) {
    const child = props.children as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: cn(base, variants[variant], child.props.className, className),
    });
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
