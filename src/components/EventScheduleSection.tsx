// components/EventSchedule.tsx
import { FC, JSX } from "react";
import {
  faChurch,
  faCameraRetro,
  faChampagneGlasses,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EventItem {
  icon: JSX.Element;
  title: string;
  time: string;
  location: string;
  address: string;
  coordinates: string;
}

const events: EventItem[] = [
  {
    icon: <FontAwesomeIcon icon={faChurch} className="text-white text-5xl" />,
    title: "Ceremony",
    time: "04:00 PM – 06:00 PM",
    location: "Sky Garden Cafe",
    address: "Lazuri Hotel Tagaytay",
    coordinates: "14.087788, 120.898223",
  },
  {
    icon: <FontAwesomeIcon icon={faCameraRetro} className="text-white text-5xl" />,
    title: "Photoshoot",
    time: "06:00 PM – 07:00 PM",
    location: "Sky Garden Cafe",
    address: "Lazuri Hotel Tagaytay",
    coordinates: "14.087788, 120.898223",
  },
  {
    icon: <FontAwesomeIcon icon={faChampagneGlasses} className="text-white text-5xl" />,
    title: "Reception",
    time: "07:00 PM – 09:00 PM",
    location: "Sky Garden Cafe",
    address: "Lazuri Hotel Tagaytay",
    coordinates: "14.087788, 120.898223",
  },
];

const EventSchedule: FC = () => {
  return (
    <div className="bg-[#C08081] py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white">
        {events.map((event, idx) => (
          <div key={idx} className="px-6 py-10 text-center space-y-4">
            <div className="text-white">{event.icon}</div>
            <h3 className="text-3xl font-semibold">{event.title}</h3>
            <p className="text-base">{event.time}</p>
            <div className="text-base leading-5 space-y-1">
              <p className="font-bold">{event.location}</p>
              <p>{event.address}</p>
              <p>{event.coordinates}</p>
            </div>
            <button className="mt-4 border border-white px-6 py-2 text-sm font-semibold hover:bg-white hover:text-[#89aab0] transition duration-200">
              LEARN MORE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSchedule;
