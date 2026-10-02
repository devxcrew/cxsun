import { useQuery } from "@tanstack/react-query";
import { platformSchema } from "../../contracts/platform";
import { readApi } from "../lib/api";
import { PageHeading } from "../components/PageHeading";
export function Applications() {
  const platform = useQuery({
    queryKey: ["platform"],
    queryFn: ({ signal }) => readApi("/api/platform", platformSchema, signal),
  });
  return (
    <>
      <PageHeading
        title="Applications"
        description="Business apps connect through public module contracts."
      />
      {platform.isPending && <p role="status">Loading applications…</p>}
      {platform.isError && <p role="alert">{platform.error.message}</p>}
      <section>
        {platform.data?.modules.map((module) => (
          <article className="module" key={module.id}>
            <span className="module-symbol">{module.name.slice(0, 2).toUpperCase()}</span>
            <div>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
            </div>
            <span className={`badge ${module.status === "active" ? "active" : ""}`}>
              {module.status}
            </span>
          </article>
        ))}
      </section>
      <p>Planned apps are catalog entries. Their business modules are not installed.</p>
    </>
  );
}
