import type { ApplicationModule } from "../contracts/platform.js";

export const modules: ApplicationModule[] = [
  {
    id: "cxsun",
    name: "Cxsun",
    description: "Application shell and server startup",
    status: "active",
  },
  {
    id: "crm",
    name: "CRM",
    description: "Customers, contacts, and sales opportunities",
    status: "planned",
  },
  {
    id: "billing",
    name: "Billing",
    description: "Invoices and customer receivables",
    status: "planned",
  },
  {
    id: "accounts",
    name: "Accounts",
    description: "Ledger and accounting workflows",
    status: "planned",
  },
  {
    id: "ecommerce",
    name: "Ecommerce",
    description: "Storefront and order management",
    status: "planned",
  },
];
