import type { ReactNode } from "react";

export default function PageHeader({
  icon,
  kicker,
  title,
  lead,
  actions,
}: {
  icon?: ReactNode;
  kicker?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {(icon || kicker) && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {icon && (
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                {icon}
              </span>
            )}
            {kicker && (
              <span className="text-sm font-semibold text-primary">{kicker}</span>
            )}
          </div>
        )}
        <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
        {lead && (
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            {lead}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0 flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
