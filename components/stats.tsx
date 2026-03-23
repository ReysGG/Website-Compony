import { getPublicStats } from "@/lib/queries/public-cache";
import { StatsDisplay } from "./StatsDisplay";

/**
 * Stats — Server Component (data shell)
 * Fetches stats from DB via React cache(), passes to StatsDisplay (Client Component)
 * for animated counters.
 */
export async function Stats() {
  const stats = await getPublicStats();

  if (stats.length === 0) return null;

  return <StatsDisplay stats={stats} />;
}