import DashHeader from "./DashHeader";
import CreateNew from "./missions/CreateNew";
import MissionsCreate from "./MissionsCreate";
import MissionsMap from "./MissionsMap";

export default function Missions({ missionaries }) {
  return (
    <div>
      <div className="mb-10">
        <CreateNew />
      </div>
      <MissionsMap missionaries={missionaries} />
      <div className="grid grid-cols-12 gap-4">
        {missionaries.map((mission) => {
          return (
            <article className="relative col-span-12 mt-4 flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 shadow-md md:col-span-6 lg:col-span-4">
              <img
                src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
                alt="University of Southern California"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                {mission.name}
              </h3>
              <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                {mission.location}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
