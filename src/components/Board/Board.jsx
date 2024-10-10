import "./Board.css";
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import Card from "../Card/Card";
import UserIcon from "../UserIcon/UserIcon";
import {
  generateIntials,
  getRandomColor,
  priorities,
  statusIcons,
} from "../../utils/data";

const Board = (props) => {
  const { tickets, users, group, level, userId, order, data } = props;

  // Clone the tickets and limit the number of tickets displayed
  const ticketCopy = [...tickets];
  let limitedTickets = ticketCopy.slice(0, tickets.length);

  // Initialize filtered tickets array
  let ticketsToDisplay = [];

  // Filter tickets based on the group
  if (group === "status") {
    ticketsToDisplay = limitedTickets.filter(
      (ticket) => ticket.status.toLowerCase() === data.title.toLowerCase()
    );
  } else if (group === "priority") {
    ticketsToDisplay = limitedTickets.filter((ticket) => ticket.priority === level);
  } else {
    ticketsToDisplay = limitedTickets.filter((ticket) => ticket.userId === userId);
  }

  // Sort tickets either by priority or title
  if (order === "priority") {
    ticketsToDisplay.sort((a, b) => b.priority - a.priority);
  } else {
    ticketsToDisplay.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Rendering logic for the "user" group
  if (group === "user") {
    return (
      <div className="board">
        <div className="board_top">
          <div className="board_top_name">
            <span>
              <UserIcon
                intials={generateIntials(data?.name)}
                available={data?.available}
                bgColor={getRandomColor()}
              />
            </span>
            <p>{data?.name}</p>
            <span>{ticketsToDisplay.length}</span>
          </div>
          <div className="board_top_options">
            <IoMdAdd />
            <SlOptions />
          </div>
        </div>
        <div className="board_container">
          {ticketsToDisplay.map((ticket) => (
            <Card
              ticket={ticket}
              key={ticket.id}
              icon={priorities[ticket?.priority].icon}
              group={group}
              statusIcon={statusIcons[ticket?.status.toLowerCase()]?.icon}
              statusColor={statusIcons[ticket?.status.toLowerCase()]?.color}
              bgColor={getRandomColor()}
            />
          ))}
        </div>
      </div>
    );
  }

  // Rendering logic for the "priority" group
  if (group === "priority") {
    return (
      <div className="board">
        <div className="board_top">
          <div className="board_top_name">
            <span style={{ color: data.color }}>{data.icon}</span>
            <p>{data.title}</p>
            <span>{ticketsToDisplay.length}</span>
          </div>
          <div className="board_top_options">
            <IoMdAdd />
            <SlOptions />
          </div>
        </div>
        <div className="board_container">
          {ticketsToDisplay.map((ticket) => {
            const assignedUser = users?.find((u) => u.id === ticket.userId);
            return (
              <Card
                ticket={ticket}
                key={ticket.id}
                user={assignedUser}
                group={group}
                statusIcon={statusIcons[ticket?.status.toLowerCase()]?.icon}
                statusColor={statusIcons[ticket?.status.toLowerCase()]?.color}
                bgColor={getRandomColor()}
                icon=""
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Default rendering for non-user and non-priority groups
  return (
    <div className="board">
      <div className="board_top">
        <div className="board_top_name">
          <span style={{ color: data.color }}>{data.icon}</span>
          <p>{data.title}</p>
          <span>{ticketsToDisplay.length}</span>
        </div>
        <div className="board_top_options">
          <IoMdAdd />
          <SlOptions />
        </div>
      </div>
      <div className="board_container">
        {ticketsToDisplay.map((ticket) => {
          const ticketOwner = users?.find((u) => u.id === ticket.userId);
          return (
            <Card
              ticket={ticket}
              key={ticket.id}
              statusIcon=""
              icon={priorities[ticket?.priority]?.icon}
              user={ticketOwner}
              group={group}
              bgColor={getRandomColor()}
              statusColor=""
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
