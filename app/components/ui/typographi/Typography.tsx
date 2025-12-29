import { TypographyVariant } from "@/app/types/types";
import classNames from "classnames";

type TypographyProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  className?: string;
};

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-medium",
  subtitle: "text-xl text-gray-700",
  body: "text-base text-gray-800",
  caption: "text-sm text-gray-500",
  header: "text-xl font-bold"
};

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  className = "",
}) => {
  return (
    <div className={classNames(variantClasses[variant], className)}>
      {children}
    </div>
  );
};

export default Typography
