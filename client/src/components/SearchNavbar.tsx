import React from 'react';

interface NavbarProps {
  title: string;
  name?: string;
  year?: string;
  month?: string;
  day?: string;
  onSearchChange?: (field: string, value: string) => void;
}

const years = ['2023', '2024', '2025'];
const months = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12',
];
const days = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, '0')
);

const SearchNavbar: React.FC<NavbarProps> = ({
  title,
  name,
  year,
  month,
  day,
  onSearchChange,
}) => {
  return (
    <nav className="bg-white dark:bg-gray-900 px-4 py-3 shadow-md mt-2 rounded-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search by type"
            value={name}
            onChange={(e) => onSearchChange?.('name', e.target.value)}
            className="px-3 py-2 border rounded-md text-sm w-[260px]"
          />

          <select
            value={year}
            onChange={(e) => onSearchChange?.('year', e.target.value)}
            className="px-2 py-2 border rounded-md text-sm w-[100px]"
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => onSearchChange?.('month', e.target.value)}
            className="px-2 py-2 border rounded-md text-sm w-[100px]"
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={day}
            onChange={(e) => onSearchChange?.('day', e.target.value)}
            className="px-2 py-2 border rounded-md text-sm  w-[100px]"
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default SearchNavbar;

