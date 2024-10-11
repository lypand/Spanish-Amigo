import React, { useState, useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import * as SpanishVerbs from 'spanish-verbs';

// Define the type for the conjugation data
interface Conjugation {
  person: string;
  present: string;
  preterite: string;
  imperfect: string;
  future: string;
}

const columnHelper = createColumnHelper<Conjugation>();

const columns: any = [
  columnHelper.accessor('person', {
    header: 'Person',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('present', {
    header: 'Present',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('preterite', {
    header: 'Preterite',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('imperfect', {
    header: 'Imperfect',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('future', {
    header: 'Future',
    cell: info => info.getValue(),
  }),
];

// Define the function to get conjugations with typing
const getConjugations = (word: string): Conjugation[] => [
  {
    person: 'Yo',
    present: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRESENT', 0),
    preterite: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRETERITE', 0),
    imperfect: SpanishVerbs.getConjugation(word, 'INDICATIVE_IMPERFECT', 0),
    future: SpanishVerbs.getConjugation(word, 'INDICATIVE_FUTURE', 0),
  },
  {
    person: 'Tu',
    present: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRESENT', 1),
    preterite: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRETERITE', 1),
    imperfect: SpanishVerbs.getConjugation(word, 'INDICATIVE_IMPERFECT', 1),
    future: SpanishVerbs.getConjugation(word, 'INDICATIVE_FUTURE', 1),
  },
  {
    person: 'El/Ella/Ud.',
    present: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRESENT', 2),
    preterite: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRETERITE', 2),
    imperfect: SpanishVerbs.getConjugation(word, 'INDICATIVE_IMPERFECT', 2),
    future: SpanishVerbs.getConjugation(word, 'INDICATIVE_FUTURE', 2),
  },
  {
    person: 'Nosotros',
    present: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRESENT', 3),
    preterite: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRETERITE', 3),
    imperfect: SpanishVerbs.getConjugation(word, 'INDICATIVE_IMPERFECT', 3),
    future: SpanishVerbs.getConjugation(word, 'INDICATIVE_FUTURE', 3),
  },
  {
    person: 'Ellos/Ellas/Uds',
    present: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRESENT', 4),
    preterite: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRETERITE', 4),
    imperfect: SpanishVerbs.getConjugation(word, 'INDICATIVE_IMPERFECT', 4),
    future: SpanishVerbs.getConjugation(word, 'INDICATIVE_FUTURE', 4),
  }
];

// Define the props interface
interface ConjugationTableProps {
  word: string;
}

const ConjugationTable: React.FC<ConjugationTableProps> = ({ word }) => {
  const [data, setData] = useState<Conjugation[]>(() => getConjugations(word));

  useEffect(() => {
    setData(getConjugations(word));
  }, [word]);

  const table = useReactTable<Conjugation>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const displayConjugations = data.length > 2 && data[1].present !== data[2].present;

  return (
    <div className="p-2">
      {displayConjugations && (
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ConjugationTable;
