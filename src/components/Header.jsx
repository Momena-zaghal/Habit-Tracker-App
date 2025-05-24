import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <header
      style={{
        padding: "1rem 2rem",
        backgroundColor: "#fcdbc2",
        color: "white",
        textAlign: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ margin: 0 }}>🌟 Habit Tracker</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/"
          style={{
            backgroundColor: "#FFF",
            color: "#333",
            padding: "6px 10px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          🏠 Home
        </Link>
        {location.pathname.startsWith("/track") && (
          <Link
            to="/all"
            style={{
              backgroundColor: "#FFF",
              color: "#333",
              padding: "6px 10px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            📋 All Habits
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;
