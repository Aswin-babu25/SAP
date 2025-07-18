import React from "react";

const dummyEvents = [
  {
    id: 1,
    title: "Tech Conference",
    description: "Annual meetup of tech enthusiasts",
    date: "2025-08-15",
    category: "Technology",
    image: "https://img.freepik.com/premium-photo/tech-conference-networking-sharing-innovative-ideas_875722-30625.jpg",
  },
  {
    id: 2,
    title: "Design Workshop",
    description: "UI/UX fundamentals and prototyping",
    date: "2025-08-20",
    category: "Design",
    image: "https://www.designworkshop.com/img/home_join2.jpg",
  },
];

export default function MyEvents() {
  return (
    <div className="ml-64 p-6 bg-white dark:bg-black min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">My Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            <img
              src={event.image}
              alt="event cover"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-indigo-700">
                {event.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {event.description}
              </p>
              <span className="inline-block text-sm text-white bg-indigo-500 px-3 py-1 rounded-full">
                {event.category}
              </span>
              <p className="text-sm text-gray-500 mt-2">📅 {event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
