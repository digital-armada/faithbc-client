import PageHeader from "@/components/ui/PageHeader";

export default function page() {
  return (
    <section className="min-h-screen">
      <div className="container space-y-3 py-8">
        <PageHeader heading="Events" />
        <div>20th December, Friday at 7:00pm - Christmas Carols night</div>
        <div>
          25th December, Wednesday at 10:00am - Combined Christmas Day Service
        </div>
        <div>29th December, Sunday - Youth Camp Meeting</div>
        <div>
          31st December, Tuesday at 3:30pm - Kids News Years Eve Activites
        </div>
        <div>
          31st December, Tuesday at 8:00pm - Youth and Young Adults News Years
          Eve Gathering
        </div>
        <div>13th to 16th January 2025 - Youth Camp</div>
      </div>
    </section>
  );
}

// import Event from "@/features/events/components/Event";
// import { eventsService } from "@/features/events/event-services";
//
// export default async function page() {
//   const { data } = await eventsService.getEvents();
//   const events = data?.data;
//
//   return <Event initialEvents={events} />;
// }
