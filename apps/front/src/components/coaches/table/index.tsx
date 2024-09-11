import { Employee } from "@seminar/common";
import SelectTable from "../../table/select";
import CoachesTableActions from "./actions";
import { coachesColumns } from "./columns";
import { useReactTable } from "@tanstack/react-table";

export interface CoachesTableProps {
  coaches: Employee[];
  setCoaches: (coaches: Employee[]) => void;
  isLastPage: boolean;
  handleNextPage: (table: ReturnType<typeof useReactTable<Employee>>) => void;
  handlePreviousPage: (table: ReturnType<typeof useReactTable<Employee>>) => void;
  maxRows: number;
}

export default function CoachesTable(
  { coaches, setCoaches, isLastPage, handleNextPage, handlePreviousPage, maxRows }: CoachesTableProps
) {
  return (
    <SelectTable
      data={coaches}
      columns={coachesColumns}
      filterSearchColumn='email'
      filterSearchPlaceholder='Filter emails...'
      actionComponent={({ table }) => <CoachesTableActions table={table} setCoaches={setCoaches} />}
      isLastPage={isLastPage}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      maxRows={maxRows}
    />
  )
}
