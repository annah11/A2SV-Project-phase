import { useState } from "react";
interface Props {
  items: string[];
  heading?: string;
  onSelectItem?: (item: string) => void;
  selectedIndex?: number;
  
}

function ListGroup({ items, heading }: Props) {
  // const selectedIndex = 0;
  // const handleClick = (event: MouseEvent) => console.log(event);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div>
      {items.length === 0 ? (
        <>
          <h1>Lists</h1>
          <p>No items found</p>
        </>
      ) : (
        <h1>{heading}</h1>
      )}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
        <li className="list-group-item">this is us</li>
        <li className="list-group-item ">this is them</li>
      </ul>
    </div>
  );
}

export default ListGroup;
