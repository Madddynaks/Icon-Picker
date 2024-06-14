import React, { useState, useEffect } from 'react';
import * as Icons from 'react-feather';
import { ChevronLeft, ChevronRight, X } from 'react-feather';

const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = '500px',
  pickerWidth = '500px',
  onSelect,
  onClose // Prop to handle modal close
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [iconsPerPage, setIconsPerPage] = useState([]);

  useEffect(() => {
    const iconNames = Object.keys(Icons).filter(icon => icon !== 'default');
    const icons = iconNames.map(iconName => Icons[iconName]);

    const start = currentPage * rowsInOnePage * columnsInOnePage;
    const end = start + rowsInOnePage * columnsInOnePage;
    setIconsPerPage(icons.slice(start, end));
  }, [currentPage, rowsInOnePage, columnsInOnePage]);

  const totalPages = Math.ceil(Object.keys(Icons).length / (rowsInOnePage * columnsInOnePage));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div
        className="relative bg-white shadow-md rounded-lg"
        style={{ height: pickerHeight, width: pickerWidth }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-900"
        >
          <X />
        </button>

        <div
          className="grid gap-2 p-4"
          style={{
            gridTemplateRows: `repeat(${rowsInOnePage}, 1fr)`,
            gridTemplateColumns: `repeat(${columnsInOnePage}, 1fr)`,
            height: `calc(${pickerHeight} - 70px)`, // Adjusting grid height to exclude padding and pagination
          }}
        >
          {iconsPerPage.map((Icon, index) => (
            <button
              key={index}
              className="flex items-center justify-center border border-gray-300 hover:bg-gray-100 p-2"
              style={{ height: iconHeight, width: iconWidth }}
              onClick={() => onSelect(<Icon />)}
            >
              <Icon />
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4 px-4 pb-4">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span className="mx-2">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconPicker;
