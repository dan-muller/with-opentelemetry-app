import { fetchGithubStars } from "./actions";

export default async function Page() {
  const stars = await fetchGithubStars();
  return <p>Next.js has {stars} ⭐️</p>;
}
