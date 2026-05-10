import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Session = {
  id: string;
  location: string;
  cuisine: string;
  members: string[];
};

type DashboardPageProps = {
  currentUser?: string;
  onStartSwipe?: (session: Session) => void;
};

export default function DashboardPage({
  currentUser = "Kevin",
  onStartSwipe,
}: DashboardPageProps) {
  const [location, setLocation] = useState("Sydney CBD");
  const [cuisine, setCuisine] = useState("Any");
  const [joinCode, setJoinCode] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  function createSession() {
    const newSession: Session = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      location,
      cuisine,
      members: [currentUser],
    };

    setSession(newSession);
  }

  function joinSession() {
    if (!joinCode.trim()) {
      alert("Enter a session code");
      return;
    }

    const joinedSession: Session = {
      id: joinCode.toUpperCase(),
      location,
      cuisine,
      members: [currentUser, "Friend"],
    };

    setSession(joinedSession);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 font-sans">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-5xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-lg text-slate-500">
            Welcome back, {currentUser}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Create Session
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2 font-semibold text-slate-700">
                Location
                <input
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>

              <label className="grid gap-2 font-semibold text-slate-700">
                Cuisine Preference
                <select
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                >
                  <option>Any</option>
                  <option>Korean</option>
                  <option>Japanese</option>
                  <option>Chinese</option>
                  <option>Thai</option>
                  <option>Italian</option>
                  <option>Fast Food</option>
                </select>
              </label>

              <button
                onClick={createSession}
                className="mt-2 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
              >
                Create Session
              </button>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Join Session
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2 font-semibold text-slate-700">
                Session Code
                <input
                  className="rounded-xl border border-slate-300 px-4 py-3 uppercase outline-none focus:border-red-500"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="ABC123"
                />
              </label>

              <button
                onClick={joinSession}
                className="mt-2 rounded-xl border border-red-500 bg-white px-5 py-3 font-bold text-red-500 transition hover:bg-red-50"
              >
                Join Session
              </button>
            </div>
          </section>
        </div>

        {session && (
          <section className="mt-8 rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900">
              Active Session
            </h2>

            <div className="mt-5 space-y-2 text-slate-700">
              <p>
                <span className="font-bold">Code:</span> {session.id}
              </p>

              <p>
                <span className="font-bold">Location:</span>{" "}
                {session.location}
              </p>

              <p>
                <span className="font-bold">Cuisine:</span>{" "}
                {session.cuisine}
              </p>

              <p>
                <span className="font-bold">Members:</span>{" "}
                {session.members.join(", ")}
              </p>
            </div>

            <button
              onClick={() => navigate("/swipe")}
              className="mt-6 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
            >
              Start Swiping
            </button>
          </section>
        )}
      </div>
    </main>
  );
}