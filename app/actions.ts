import { trace } from "@opentelemetry/api";

export async function fetchGithubStars() {
  console.log("fetchGithubStars");
  return trace.getTracer("fetchGithubStars").startActiveSpan(
    "fetchGithubStars",
    {
      attributes: {
        "custom.attribute": "custom value",
        "custom.number": 42,
        "time": new Date().toISOString(),
      },
    },
    async (span) => {
      span.setAttributes( {
        "custom.attribute.1": "custom value",
        "custom.number.1": 42,
        "time.1": new Date().toISOString(),
      })
      try {
        const res = await fetch("https://api.github.com/repos/vercel/next.js", {
          next: {
            revalidate: 0,
          },
        });
        const data = await res.json();
        return data.stargazers_count;
      } finally {
        span.end();
      }
    },
  );
}
