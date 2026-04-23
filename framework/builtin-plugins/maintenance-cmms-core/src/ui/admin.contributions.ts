import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "maintenance",
      label: "Maintenance",
      icon: "wrench",
      description: "Preventive maintenance, asset work orders, and downtime tracking.",
      permission: "maintenance.plans.read",
      homePath: "/admin/business/maintenance",
      quickActions: ["maintenance-cmms-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "maintenance",
      group: "control-room",
      items: [
        {
          id: "maintenance-cmms-core.overview",
          label: "Control Room",
          icon: "wrench",
          to: "/admin/business/maintenance",
          permission: "maintenance.plans.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "maintenance-cmms-core.page",
      kind: "dashboard",
      route: "/admin/business/maintenance",
      label: "Maintenance Control Room",
      workspace: "maintenance",
      group: "control-room",
      permission: "maintenance.plans.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "maintenance-cmms-core.open.control-room",
      label: "Open Maintenance & CMMS Core",
      permission: "maintenance.plans.read",
      href: "/admin/business/maintenance",
      keywords: ["maintenance & cmms core","maintenance","business"]
    })
  ]
};
