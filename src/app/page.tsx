import DiscoveryContainer from "@/components/discovery/discovery-container";
import { DashboardCommandCenter } from "@/components/dashboard-command-center";

export default function HomePage() {
  return (
    <>
      <DashboardCommandCenter />
      <DiscoveryContainer />
    </>
  );
}
