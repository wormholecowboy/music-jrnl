// import { List } from '@mui/material';
import React, { useState } from 'react';

const List2 = () => {
  const [items, setItems] = useState([
    { id: 1, color: 'bg-red-500', left: 0, text: 'phrase 1' },
    { id: 2, color: 'bg-blue-500', left: 100, text: 'phrase 2' },
    { id: 3, color: 'bg-green-500', left: 200, text: 'phrase 3' },
  ]);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData('text/plain');
    const sourceIndex = items.findIndex((item) => item.id === parseInt(itemId));
    const sourceItem = items[sourceIndex];
    const targetItem = items[targetIndex];

    const newItems = [...items];
    newItems[sourceIndex] = { ...targetItem, left: sourceItem.left };
    newItems[targetIndex] = { ...sourceItem, left: targetItem.left };
    setItems(newItems);
  };

  return (
    <div className="relative w-full h-16 flex items-center">
      {items.map((item, index) => (
        <>
          <div
            key={item.id}
            className={`h-12 w-32 min-h-12 rounded-md cursor-move self-center ${item.color}`}
            // style={{ left: `${item.left}px` }}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, item)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
          />
          <p className="text-white text-center">{item.text}</p>
        </>
      ))}
    </div>
  );
};
export default List2;

// export default DragAndDropList;
