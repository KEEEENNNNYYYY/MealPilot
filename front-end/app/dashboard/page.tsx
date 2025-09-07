"use client";

import Navbar from "../components/navbar/navbar";

export default function DashboardPage() {
    return (
        <>
            <Navbar />
            <main style={{ padding: "20px" }}>
                <h1>Bienvenue sur le Dashboard</h1>
                <p>Ceci est le contenu de ta page dashboard.</p>
            </main>
        </>
    );
}
