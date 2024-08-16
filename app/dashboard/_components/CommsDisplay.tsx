import { getComms } from "@/data/services/comms-service";
import Link from "next/link";
import EmailSMS from "./EmailSMS";
export default async function CommsDisplay() {
  const { data } = await getComms();
  console.log(data);

  return (
    <div>
      {data?.data.map((comm) => {
        return (
          <Link href={`/dashboard/contacts/comms/${comm.id}`} key={comm.id}>
            <div className="flex items-center justify-between py-2">
              <div> {comm.attributes.groupName}</div>

              <EmailSMS users={comm.attributes.users.data} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

//
