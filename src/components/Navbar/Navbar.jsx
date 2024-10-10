import "./Navbar.css";
import { MdOutlineTune } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";

// Options for grouping and ordering
const groupingOptions = [
  { label: "Status", value: "status" },
  { label: "User", value: "user" },
  { label: "Priority", value: "priority" },
];

const sortingOptions = [
  { label: "Priority", value: "priority" },
  { label: "Title", value: "title" },
];

const Navbar = ({ group, order, onGroupchange, onOrderChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Variable renaming for clarity
  const [currentGroup, setCurrentGroup] = useState(group);
  const [currentOrder, setCurrentOrder] = useState(order);

  // Handle the change in group selection
  const handleGroupSelect = (event) => {
    const updatedGroup = event.target.value;
    setCurrentGroup(updatedGroup);
    onGroupchange(updatedGroup);
  };

  // Handle the change in order selection
  const handleOrderSelect = (event) => {
    const updatedOrder = event.target.value;
    setCurrentOrder(updatedOrder);
    onOrderChange(updatedOrder);
  };

  return (
    <div className="nav">
      {/* Button to toggle the dropdown */}
      <div
        className="expand_button"
        onClick={() => setDropdownOpen((prevState) => !prevState)}
      >
        <MdOutlineTune />
        <span>Display</span>
        <FaAngleDown />
      </div>

      {/* Dropdown menu for grouping and sorting options */}
      {isDropdownOpen && (
        <div className="dropdown">
          <div className="dropdown_section">
            <p>Grouping</p>
            <select
              name="group"
              id="groupBy"
              value={currentGroup}
              onChange={handleGroupSelect}
            >
              {groupingOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option> // Minor renaming: 'opt' -> 'option', 'idx' -> 'index'
              ))}
            </select>
          </div>
          <div className="dropdown_section">
            <p>Ordering</p>
            <select
              name="order"
              id="orderBy"
              value={currentOrder}
              onChange={handleOrderSelect}
            >
              {sortingOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option> // Minor renaming: 'opt' -> 'option', 'idx' -> 'index'
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
