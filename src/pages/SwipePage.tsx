import { useState } from "react";

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  distance: string;
  rating: number;
  price: string;
  imageUrl: string;
};

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Seoul Grill House",
    cuisine: "Korean BBQ",
    distance: "1.2 km away",
    rating: 4.6,
    price: "$$",
    imageUrl:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200",
  },
  {
    id: "2",
    name: "Tokyo Ramen Bar",
    cuisine: "Japanese",
    distance: "850m away",
    rating: 4.4,
    price: "$$",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200",
  },
  {
    id: "3",
    name: "Luigi's Pizza",
    cuisine: "Italian",
    distance: "2.1 km away",
    rating: 4.2,
    price: "$",
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200",
  },
];

export default function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
  const [matchedRestaurant, setMatchedRestaurant] =
    useState<Restaurant | null>(null);

  const currentRestaurant = mockRestaurants[currentIndex];

  function handleSwipe(direction: "like" | "pass") {
    if (!currentRestaurant) return;

    if (direction === "like") {
      setLikedRestaurants((prev) => [...prev, currentRestaurant]);

      if (currentRestaurant.id === "2") {
        setMatchedRestaurant(currentRestaurant);
      }
    }

    setCurrentIndex((prev) => prev + 1);
  }

  function restart() {
    setCurrentIndex(0);
    setLikedRestaurants([]);
    setMatchedRestaurant(null);
  }

  if (matchedRestaurant) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6 font-sans">
        <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
          <h1 className="text-5xl font-black text-red-500">
            It&apos;s a Match!
          </h1>

          <img
            src={matchedRestaurant.imageUrl}
            alt={matchedRestaurant.name}
            className="mt-6 h-72 w-full rounded-2xl object-cover"
          />

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            {matchedRestaurant.name}
          </h2>

          <p className="mt-2 text-slate-600">
            {matchedRestaurant.cuisine} · {matchedRestaurant.price} ·{" "}
            {matchedRestaurant.rating} ★
          </p>

          <button
            onClick={restart}
            className="mt-8 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
          >
            Start Again
          </button>
        </section>
      </main>
    );
  }

  if (!currentRestaurant) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6 font-sans">
        <section className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-4xl font-bold text-slate-900">
            No More Restaurants
          </h1>

          <p className="mt-3 text-slate-500">
            You liked {likedRestaurants.length} places.
          </p>

          <button
            onClick={restart}
            className="mt-6 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
          >
            Restart
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10 font-sans">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-5xl font-black text-slate-900">Swipe</h1>

          <p className="mt-2 text-slate-500">
            Sydney CBD · 2 members
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          <img
            src={currentRestaurant.imageUrl}
            alt={currentRestaurant.name}
            className="h-96 w-full object-cover"
          />

          <div className="p-6">
            <h2 className="text-3xl font-bold text-slate-900">
              {currentRestaurant.name}
            </h2>

            <p className="mt-2 font-medium text-slate-600">
              {currentRestaurant.cuisine} · {currentRestaurant.price} ·{" "}
              {currentRestaurant.rating} ★
            </p>

            <p className="mt-1 text-slate-400">
              {currentRestaurant.distance}
            </p>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSwipe("pass")}
            className="rounded-full border border-slate-300 bg-white px-5 py-4 text-lg font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Pass
          </button>

          <button
            onClick={() => handleSwipe("like")}
            className="rounded-full bg-red-500 px-5 py-4 text-lg font-bold text-white transition hover:bg-red-600"
          >
            Like
          </button>
        </div>
      </div>
    </main>
  );
}