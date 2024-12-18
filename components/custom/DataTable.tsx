import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps {
  caption?: string;
  columns: { key: string; label: string; className?: string }[];
  data: Record<string, any>[];
  footer?: {
    label: string;
    value: string;
    colSpan: number;
    className?: string;
  };
}

export function DataTable({ caption, columns, data, footer }: TableProps) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {footer && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={footer.colSpan}>{footer.label}</TableCell>
            <TableCell className={footer.className}>{footer.value}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
