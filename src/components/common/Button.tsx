import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "navy";
type Size = "md" | "lg" | "sm";

interface Shared {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
}

type AsButton = Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AsAnchor = Shared &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };
type AsLink = Shared & Omit<LinkProps, "className"> & { as: "link" };

export type ButtonProps = AsButton | AsAnchor | AsLink;

function classes(variant: Variant, size: Size, extra?: string) {
  return [styles.btn, styles[variant], styles[`size-${size}`], extra]
    .filter(Boolean)
    .join(" ");
}

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref
) {
  const { variant = "primary", size = "md", withArrow, className, children } = props;
  const cls = classes(variant, size, className);

  if ("as" in props && props.as === "a") {
    const { as: _as, variant: _v, size: _s, withArrow: _w, className: _c, ...rest } = props;
    void _as;
    void _v;
    void _s;
    void _w;
    void _c;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...rest}>
        <span>{children}</span>
        {withArrow && <ArrowUpRight size={16} strokeWidth={2.4} />}
      </a>
    );
  }

  if ("as" in props && props.as === "link") {
    const { as: _as, variant: _v, size: _s, withArrow: _w, className: _c, ...rest } = props;
    void _as;
    void _v;
    void _s;
    void _w;
    void _c;
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...rest}>
        <span>{children}</span>
        {withArrow && <ArrowUpRight size={16} strokeWidth={2.4} />}
      </Link>
    );
  }

  const { as: _as, variant: _v, size: _s, withArrow: _w, className: _c, ...rest } =
    props as AsButton;
  void _as;
  void _v;
  void _s;
  void _w;
  void _c;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} {...rest}>
      <span>{children}</span>
      {withArrow && <ArrowUpRight size={16} strokeWidth={2.4} />}
    </button>
  );
});

export default Button;
