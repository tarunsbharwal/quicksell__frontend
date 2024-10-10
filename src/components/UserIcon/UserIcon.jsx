import "./UserIcon.css";
import { FaCircle } from "react-icons/fa6";

const UserIcon = ({ initials, available, bgColor }) => {
  console.log("User Availability:", available);
  console.log("Background Color:", bgColor);

  const statusDotStyle = {
    color: available ? "#50B053" : "#C4C4C4",
  };

  return (
    <div className="user">
      {/* Render user initials with a background color dynamically set */}
      <div className="user_icon" style={{ backgroundColor: bgColor }}>
        {initials}
      </div>
      {/* Render status dot with color based on availability */}
      <div className="status_dot" style={statusDotStyle}>
        <FaCircle />
      </div>
    </div>
  );
};

export default UserIcon;
