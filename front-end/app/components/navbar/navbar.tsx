import Image from "next/image";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Image src="/logo.png" alt="MealPilot" width={80} height={60} className="logo" />
            <Image src="/loupe.png" alt="search" width={32} height={22} className="logo" />

        </nav>
    );
}
