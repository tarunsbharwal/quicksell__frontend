import "./Card.css";
import { FaCircle } from "react-icons/fa";
import UserIcon from "../UserIcon/UserIcon";

const Card = ({ ticket, user, icon, statusIcon, statusColor, bgColor }) => {
 
  const userInitials = user?.name
    .split(" ")
    .map((part) => part[0])
    .join(""); 

  const renderedStatusIcon = statusIcon ? (
    <span style={{ color: statusColor }}>{statusIcon}</span>
  ) : null;

  return (
    <div className="card">
      <div className="card_header">
        {/* Display ticket ID */}
        <p className="card_id">{ticket?.id}</p>
        {/* Conditionally display UserIcon if user exists */}
        {user && (
          <UserIcon
            intials={userInitials}
            available={user?.available}
            bgColor={bgColor}
          />
        )}
      </div>
      <div className="card_info">
        {/* Show the status icon if available */}
        {renderedStatusIcon}
        <p>{ticket?.title}</p>
      </div>
      <div className="card_footer">
        {/* Render the icon if available */}
        {icon && (
          <div>
            {icon}
          </div>
        )}
        <div className="card_tag">
          <FaCircle />
          {/* Display each tag associated with the ticket */}
          {ticket?.tag.map((tag, idx) => (
            <p key={idx}>{tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Card;
