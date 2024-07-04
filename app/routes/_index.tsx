import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "~/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const db = drizzle(context.cloudflare.env.D1, {
    schema,
    // logger: services.env.ENVIRONMENT !== schema.asEnvironment('production'),
  });
  const courses = await db.query.courses.findMany({
    with: {
      lessons: true,
    },
  });
  return { courses };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix on Cloudflare</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
