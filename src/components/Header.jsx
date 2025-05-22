import { Link } from "react-router-dom";

function Header() {
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

      <Link
        to="/"
        state={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
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
    </header>
  );
}
export default Header;
