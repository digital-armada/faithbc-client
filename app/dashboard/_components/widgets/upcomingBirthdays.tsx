import { format } from "date-fns";
import WidgetHeadings from "../WidgetHeadings";

export default function UpcomingBirthdays({ birthdayList, className }) {
  if (!birthdayList || birthdayList.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">No upcoming birthdays</p>
      </div>
    );
  }

  const sortedBirthdays = birthdayList
    .map((user) => ({
      id: user.id,
      name:
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : "Unknown",
      dateOfBirth: user.dateOfBirth,
    }))
    .sort((a, b) => {
      const dayA = new Date(a.dateOfBirth).getDate();
      const dayB = new Date(b.dateOfBirth).getDate();
      return dayA - dayB;
    });

  return (
    <div className={className}>
      <WidgetHeadings heading="Upcoming Bithday's" />
      <ul role="list" className="divide-y divide-gray-100 rounded-md">
        {sortedBirthdays.map((person) => (
          <li
            key={person.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              {/* <img
                alt=""
                src={person.imageUrl}
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
              /> */}
              <div className="flex min-w-0 items-center">
                <p className="mr-4 text-xs leading-5 text-gray-500">
                  {format(person.dateOfBirth, "EEE do")}
                </p>
                <p className="text-sm font-semibold leading-3 text-gray-900">
                  {person.name}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
}
