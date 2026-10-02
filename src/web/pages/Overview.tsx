import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { servicesSchema } from "../../contracts/platform";
import { readApi } from "../lib/api";
import { Button } from "../components/Button";
import { PageHeading } from "../components/PageHeading";
export function Overview() {
  const services = useQuery({
    queryKey: ["services"],
    queryFn: ({ signal }) => readApi("/api/services", servicesSchema, signal),
  });
  return (
    <>
      <PageHeading
        title="Your platform starts here."
        description="A common home for your business applications."
        action={
          <Button disabled={services.isFetching} onClick={() => void services.refetch()}>
            <RefreshCw size={16} />
            Refresh status
          </Button>
        }
      />
      <div className="connection" role="status">
        <span className={`status-dot ${services.isError ? "offline" : ""}`} />
        <div>
          <strong>
            {services.isPending
              ? "Connecting to server"
              : services.isError
                ? "Server unavailable"
                : "Fastify server connected"}
          </strong>
          <p>
            {services.error?.message ??
              "React frontend and validated TypeScript APIs are running together."}
          </p>
        </div>
      </div>
      <section>
        <div className="section-heading">
          <h2>Platform services</h2>
          <span className="muted">Live configuration</span>
        </div>
        {services.data?.map((service) => (
          <article key={service.name} className="module">
            <div>
              <h3>{service.name}</h3>
              <p>{service.detail}</p>
            </div>
            <span className={`badge ${service.status === "running" ? "active" : ""}`}>
              {service.status}
            </span>
          </article>
        ))}
      </section>
      <section className="foundation">
        <div>
          <span className="eyebrow">THE FOUNDATION</span>
          <h2>One platform. Clear ownership.</h2>
          <p>
            The complete technology set is installed. Cxsun hosts the application shell; each
            business app owns its workflows.
          </p>
        </div>
        <dl>
          <div>
            <dt>Runtime</dt>
            <dd>Node.js 26.10</dd>
          </div>
          <div>
            <dt>Package manager</dt>
            <dd>npm 12.2</dd>
          </div>
          <div>
            <dt>Language</dt>
            <dd>TypeScript 7</dd>
          </div>
          <div>
            <dt>UI</dt>
            <dd>React · Radix · Tailwind</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
