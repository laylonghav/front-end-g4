import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Box,
  Command,
  Frame,
  GalleryVerticalEnd,
  Group,
  Inbox,
  Library,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { NavProjects } from "./NavProjects";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "POS",
      url: "/pos",
      icon: Inbox,
    },
    {
      title: "Product",
      url: "/product",
      icon: Box,
    },

    {
      title: "Supplier",
      url: "/supplier",
      icon: Bot,
    },
    {
      title: "Brand",
      url: "/brand",
      icon: Group,
    },
    {
      title: "Category",
      url: "/category",
      icon: Library,
    },
    {
      title: "User",
      url: "/user",
      icon: Bot,
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/",
      icon: Frame,
    },
    {
      name: "User",
      url: "/user",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
