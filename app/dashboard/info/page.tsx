import DashHeader from "../_components/DashHeader";
import ContentLayout from "../../../components/common/Layouts/DashboardContentWrapper";

export default function page() {
  return (
    <ContentLayout title="Information Page">
      <div>
        <div>Info, add worker details</div>
        <ul>
          <li>Pastor</li>
          <li>Deacon 1</li>
          <li>Deacon 2</li>
          <li>Deacon 3</li>
          <li>Arabic</li>
          <li>Treasurer</li>
          <li>Secretary</li>
          <li>Communications</li>
          <li>Sunday School</li>
          <li>Youth Group</li>
          <li>Women&apos;s Group</li>
          <li>Men&apos;s Group</li>
          <li>Visitation</li>
          <li>Kid&apos;s Club</li>
        </ul>
      </div>
    </ContentLayout>
  );
}
