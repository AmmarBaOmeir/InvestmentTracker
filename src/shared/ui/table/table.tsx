import type { ReactNode } from "react";
import { cn } from "@/shared/lib";
import s from "./table.module.css";

export interface ColumnDef<T> {
  key: string;
  header?: ReactNode;
  render: (item: T, index: number) => ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T, index: number) => string | number;
  header?: {
    title?: ReactNode;
    search?: ReactNode;
    filter?: ReactNode;
    trailing?: ReactNode;
  };
  hideHeaderRow?: boolean;
  isFilterApplied?: boolean;
  emptyState?: {
    emptyStateNoDataText?: ReactNode;
    emptyStateNoDataDescription?: ReactNode;
    emptyStateNoResultsText?: ReactNode;
    emptyStateNoResultsDescription?: ReactNode;
  };
  footer?: ReactNode;
  onRowClick?: (item: T, index: number) => void;
  tableCss?: string;
  bodyCss?: string;
  containerClass?: string;
}

export function Table<T>({
  data,
  columns,
  keyExtractor,
  header,
  hideHeaderRow = false,
  isFilterApplied = false,
  emptyState = {
    emptyStateNoDataText: "No data available",
    emptyStateNoDataDescription:
      "There are no records to display at this time.",
    emptyStateNoResultsText: "No results found",
    emptyStateNoResultsDescription: "Try adjusting your search or filters.",
  },
  footer,
  onRowClick,
  tableCss,
  bodyCss,
  containerClass,
}: TableProps<T>) {
  const isEmpty = !data || data.length === 0;

  return (
    <div className={cn(s.container, containerClass)}>
      {header && (
        <div className={s.headerContainer}>
          <div className={s.headerLeft}>
            {header.title && <span id="header_title">{header.title}</span>}
            {header.search && <span id="header_search">{header.search}</span>}
          </div>
          <div className={s.headerRight}>
            {header.filter && <span id="header_filter">{header.filter}</span>}
            {header.trailing && (
              <span id="header_trailing">{header.trailing}</span>
            )}
          </div>
        </div>
      )}

      <div className={s.tableWrapper}>
        <table className={cn(s.table, tableCss)}>
          {!hideHeaderRow && (
            <thead className={s.thead}>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      s.th,
                      col.align === "center" && s.alignCenter,
                      col.align === "right" && s.alignRight,
                    )}
                    style={{ width: col.width }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          {!isEmpty && (
            <tbody className={cn(s.tbody, bodyCss)}>
              {data.map((item, index) => {
                const clk = !!onRowClick;
                return (
                  <tr
                    key={keyExtractor(item, index)}
                    className={cn(s.tr, clk && s.trClickable)}
                    onClick={() => onRowClick?.(item, index)}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          s.td,
                          col.align === "center" && s.alignCenter,
                          col.align === "right" && s.alignRight,
                        )}
                        style={{
                          ...(col.width && { width: col.width }),
                        }}
                      >
                        {col.render(item, index)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {isEmpty && (
          <div className={s.emptyState}>
            <div className={s.emptyStateTitle}>
              {isFilterApplied
                ? emptyState.emptyStateNoResultsText
                : emptyState.emptyStateNoDataText}
            </div>
            <div className={s.emptyStateDesc}>
              {isFilterApplied
                ? emptyState.emptyStateNoResultsDescription
                : emptyState.emptyStateNoDataDescription}
            </div>
          </div>
        )}
      </div>
      {footer && <div className={s.footer}>{footer}</div>}
    </div>
  );
}
