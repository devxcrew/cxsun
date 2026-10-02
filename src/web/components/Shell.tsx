import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Blocks,
  Package,
  NotebookPen,
  Sun,
  Moon,
  PanelLeftClose,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./Button";
const navigation = [
  { to: "/", title: "Overview", icon: LayoutDashboard },
  { to: "/applications", title: "Applications", icon: Blocks },
  { to: "/workspace", title: "Workspace", icon: NotebookPen },
  { to: "/packages", title: "Technology", icon: Package },
] as const;
export function Shell({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className={`shell ${compact ? "compact" : ""}`}>
      <aside className="sidebar">
        <Link className="brand" to="/">
          <span className="brand-mark">C</span> cxsun<span className="brand-dot">.</span>
        </Link>
        <span className="eyebrow">BASE PLATFORM</span>
        <nav aria-label="Main navigation">
          {navigation.map(({ to, title, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "selected" }}
              activeOptions={{ exact: true }}
            >
              <Icon size={18} />
              <span>{title}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="status-dot" />
          Local workspace<span className="muted">Cxsun · v0.1.0</span>
        </div>
      </aside>
      <div className="workspace">
        <header>
          <span>
            Workspace <span className="muted">/ Base platform</span>
          </span>
          <Button
            variant="secondary"
            aria-label="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}Theme
          </Button>
        </header>
        <main>
          {children}
          <footer>
            Cxsun base application<span>Node.js · Fastify · React · TypeScript</span>
          </footer>
        </main>
      </div>
      <details className="tweak">
        <summary>
          <PanelLeftClose size={14} />
          Display settings
        </summary>
        <label>
          <input
            type="checkbox"
            checked={compact}
            onChange={(event) => setCompact(event.target.checked)}
          />
          Compact spacing
        </label>
      </details>
    </div>
  );
}
