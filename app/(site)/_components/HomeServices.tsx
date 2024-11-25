"use client";
import HeadingTwo from "../../../components/custom/headingtwo";
import More from "../../../components/custom/more";
import NottyDot from "../../../components/custom/NottyDot";

export default function HomeServices() {
  const services = {
    days: {
      Wednesday: [
        {
          time: "7:00 pm",
          name: "Bible Study",
          description: "",
        },
        {
          time: "7:30 pm",
          name: "Prayer Group",
          description: "",
        },
      ],
      Friday: [
        {
          time: "4:30 pm",
          name: "Kids Club (During School Term)",
          description: "",
        },
        {
          time: "7:30 pm",
          name: "Youth Group",
          description: "",
        },
        {
          time: "7:30 pm",
          name: "Friday Night Arabic Service",
          description: "",
          language: "arabic",
        },
      ],
      Sunday: [
        {
          time: "10:00 am",
          name: "Creche",
          description: "",
        },
        {
          time: "10:00 am ",
          name: "Sunday School",
          description: "",
        },
        {
          time: "10:00 am ",
          name: "Morning Service English",
          description: "",
        },
        {
          time: "10:00 am ",
          name: "Morning Service Arabic",
          description: "",
          language: "arabic",
        },
        {
          time: "6:00 pm",
          name: "Evening Service",
          description: "",
        },
        {
          time: "7:00 pm",
          name: "Weekly Fellowship Dinner",
          description: "",
        },
      ],
    },
  };

  const compareDates = (date, day) => {
    const getCurrentDay = () => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const currentDate = new Date();
      const currentDayIndex = currentDate.getDay();
      const currentDay = days[currentDayIndex];
      return currentDay;
    };

    const currentDay = getCurrentDay();
    const currentHour = new Date().getHours();

    const serviceDate = date.toString();
    if (
      serviceDate === "" ||
      serviceDate === null ||
      serviceDate === undefined
    ) {
      return false;
    }

    let checkTime;
    if (serviceDate.includes("pm")) {
      checkTime = parseInt(serviceDate.split(":")[0]) + 12;
    } else {
      checkTime = parseInt(serviceDate.split(":")[0]);
    }

    if (checkTime === currentHour && currentDay === day) {
      return true;
    }

    return false;
  };

  return (
    <section>
      <div className="container mt-10">
        <div className="w-full items-center justify-between pb-10 sm:flex">
          <div>
            <HeadingTwo heading="Weekly Services" />
          </div>
          <div>
            <More title="All Ministries" link="/ministries" />
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between lg:flex-row">
          {Object.entries(services.days).map(([day, sessions]) => (
            <div key={day}>
              <h2 className="mb-3 font-display text-2xl font-semibold text-gray-700">
                {day}
              </h2>

              <ul>
                {sessions.map((session, index, sessions) => (
                  <li key={index} className="relative flex items-center pb-3">
                    <div
                      className={`ml-8 before:absolute before:left-[3.5px] before:top-3 before:h-full ${
                        index !== sessions.length - 1
                          ? "before:w-[0.7px] before:bg-gray-500"
                          : "before:w-0"
                      }`}
                    >
                      {compareDates(session.time, day) ? (
                        <NottyDot />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="8"
                          className="bi bi-circle-fill absolute left-0 top-[5px] fill-gray-500"
                          viewBox="0 0 16 16"
                        >
                          <circle cx="8" cy="8" r="8" />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <p className="font-body font-light text-gray-600">
                        {session.time}
                      </p>
                      <p className="font-body text-sm text-gray-600">
                        {session.name}
                      </p>
                      {session.description && (
                        <p className="mt-2 text-lg text-gray-900">
                          {session.description}
                        </p>
                      )}
                      {session.language === "arabic" ? (
                        <span className="rounded border-[1px] border-black px-1 py-0 text-sm font-light">
                          العربية
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
