import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import CreateNew from "../missionaries/_components/CreateNew";
import MissionsMap from "./MissionsMap";
import Image from "next/image";

export default async function Missions({ missionaries }) {
  const { data: user } = await getUserMeLoader();

  return (
    <div>
      {user.role.type === "admin" && (
        <div className="mb-10">
          <CreateNew />
        </div>
      )}
      <MissionsMap missionaries={missionaries} />
      <div className="grid grid-cols-12 gap-4">
        {missionaries.map((mission, index) => {
          return (
            <article
              key={index}
              className="relative col-span-12 mt-4 flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 shadow-md md:col-span-6 lg:col-span-4"
            >
              <Image
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
