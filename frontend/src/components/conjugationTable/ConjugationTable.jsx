import React, { useState, useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as SpanishVerbs from 'spanish-verbs';

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('person', {
    header: () => '',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('present', {
    header: () => 'Present',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('preterite', {
    header: () => 'Preterite',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('imperfect', {
    header: () => 'Imperfect',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('future', {
    header: () => 'Future',
    cell: info => info.renderValue(),
  }),
]

const getConjugations = (word) => [
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
    present: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRESENT', 5),
    preterite: SpanishVerbs.getConjugation(word, 'INDICATIVE_PRETERITE', 5),
    imperfect: SpanishVerbs.getConjugation(word, 'INDICATIVE_IMPERFECT', 5),
    future: SpanishVerbs.getConjugation(word, 'INDICATIVE_FUTURE', 5),
  }
];

function ConjugationTable({ word }) {
  const [data, setData] = useState(() => getConjugations(word));

  useEffect(() => {
    setData(getConjugations(word));
  }, [word]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
  )
}
export default ConjugationTable;

