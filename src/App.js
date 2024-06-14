import React, { useState } from 'react';
import IconPicker from './IconPicker';

const App = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setIsPickerOpen(false);
  };

  return (
    <div className="p-20">
      <div
        className="w-24 h-24 border bg-blue-500 text-white hover:bg-black transition-all duration-500 ease-in-out border-gray-300 flex items-center justify-center cursor-pointer"
        onClick={() => setIsPickerOpen(true)}
      >
        {selectedIcon ? (
          React.cloneElement(selectedIcon, { size: 48 })
        ) : (
          <span>Pick Icon</span>
        )}
      </div>
      {isPickerOpen && (
        <IconPicker
          rowsInOnePage={4}
          columnsInOnePage={4}
          iconHeight="100%"
          iconWidth="100%"
          pickerHeight="500px"
          pickerWidth="500px"
          onSelect={handleIconSelect}
          onClose={() => setIsPickerOpen(false)} // Close the picker
        />
      )}
    </div>
  );
};

export default App;
