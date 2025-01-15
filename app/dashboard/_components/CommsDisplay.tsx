import { getComms } from "@/data/services/comms-service";
import Link from "next/link";
import EmailSMS from "./EmailSMS";
import { Card } from "@/components/ui/card";
export default async function CommsDisplay() {
  const { data } = await getComms();

  return (
    <div>
      {data?.data.map((comm) => {
        return (
          <Card key={comm.id} className="my-4 px-3 py-1">
            <Link href={`/dashboard/contacts/comms/${comm.id}`}>
              <div className="flex items-center justify-between py-2">
                <div> {comm.attributes.groupName}</div>

                <EmailSMS users={comm.attributes.users.data} />
              </div>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}

//
