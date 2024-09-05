```js
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import * as Icons from 'lucide-react'

// Import the menuList from a separate file
import { menuList } from './menuList'

type Role = 'member' | 'admin' | 'ministry'

interface NavigationProps {
  role: Role
}

export default function Navigation({ role = 'member' }: NavigationProps) {
  const router = useRouter()

  const renderIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons]
    return Icon ? <Icon className="w-4 h-4 mr-2" /> : null
  }

  const renderMenuItem = (item: any) => {
    const roleConfig = item.roles[role]

    if (!roleConfig) return null

    if (typeof roleConfig === 'boolean') {
      return (
        <NavigationMenuItem key={item.text}>
          <Link href={item.link} passHref legacyBehavior>
            <NavigationMenuLink className={`flex items-center px-3 py-2 text-sm ${router.pathname === item.link ? 'bg-accent' : ''}`}>
              {renderIcon(item.icon)}
              {item.text}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )
    }

    if (roleConfig.subItems) {
      return (
        <NavigationMenuItem key={item.text}>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm">
              {renderIcon(item.icon)}
              {item.text}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {roleConfig.subItems.map((subItem: any) => (
                <DropdownMenuItem key={subItem.text}>
                  <Link href={subItem.link} passHref legacyBehavior>
                    <NavigationMenuLink className="w-full">
                      {subItem.text}
                    </NavigationMenuLink>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      )
    }

    return null
  }

  return (
    <NavigationMenu>
      {menuList.map((section) => (
        <div key={section.title} className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">{section.title}</h2>
          <NavigationMenuList>
            {section.items.map(renderMenuItem)}
          </NavigationMenuList>
        </div>
      ))}
    </NavigationMenu>
  )
}

```

# top

```js
[
  {
    title: "Main",
    items:
      Array(7)[
        ({
          icon: {
            $$typeof: Symbol(react.element),
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: { validated: true },
            _debugInfo: null,
          },
          text: "Dashboard",
          link: "/dashboard/home",
        },
        {
          icon: {
            $$typeof: Symbol(react.element),
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: { validated: true },
            _debugInfo: null,
          },
          text: "Sermon Manager",
          link: "/dashboard/sermon-manager",
        },
        {
          icon: {
            $$typeof: Symbol(react.element),
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: { validated: true },
            _debugInfo: null,
          },
          text: "Announcements",
          link: "/dashboard/announcements",
        },
        {
          text: "Contacts",
          link: "/dashboard/contacts",
          icon: {
            $$typeof: Symbol(react.element),
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: { validated: true },
            _debugInfo: null,
          },
          roles: {
            member: { show: false },
            admin: {
              show: true,
              asSubItem: true,
              subItems: [
                { text: "All", link: "/dashboard/contacts/all" },
                { text: "Comms Lists", link: "/dashboard/contacts/comms" },
              ],
            },
            ministry: {
              show: true,
              asSubItem: true,
              subItems: [{ text: "All", link: "/dashboard/contacts/all" }],
            },
          },
          subItems: [
            { text: "All", link: "/dashboard/contacts/all" },
            { text: "Comms Lists", link: "/dashboard/contacts/comms" },
          ],
        },
        {
          text: "Events",
          link: "/dashboard/events",
          icon: {
            $$typeof: Symbol(react.element),
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: { validated: true },
            _debugInfo: null,
          },
          roles: {
            member: { show: true },
            admin: {
              show: true,
              asSubItem: true,
              subItems: [
                { text: "All Events", link: "/dashboard/events" },
                { text: "Create New Event", link: "/dashboard/events/new" },
                { text: "Manage Events", link: "/dashboard/events/manage" },
              ],
            },
            ministry: {
              show: true,
              asSubItem: true,
              subItems: [{ text: "All Events", link: "/dashboard/events" }],
            },
          },
          subItems: [
            { text: "All Events", link: "/dashboard/events" },
            { text: "Create New Event", link: "/dashboard/events/new" },
            { text: "Manage Events", link: "/dashboard/events/manage" },
          ],
        },
        {
          icon: {
            $$typeof: Symbol(react.element),
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: { validated: true },
            _debugInfo: null,
          },
          text: "Prayer Requests",
          link: "/dashboard/prayer-requests",
        },
        {
          icon: {
            $$typeof: Symbol(react.element),
            key: null,
            ref: null,
            props: {},
            _owner: null,
            _store: { validated: true },
            _debugInfo: null,
          },
          text: "Missionaries",
          link: "/dashboard/missionaries",
        })
      ],
  },
  {
    title: "Settings",
    items: [
      {
        icon: {
          $$typeof: Symbol(react.element),
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: { validated: true },
          _debugInfo: null,
        },
        text: "Profile",
        link: "/dashboard/profile",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        icon: {
          $$typeof: Symbol(react.element),
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: { validated: true },
          _debugInfo: null,
        },
        text: "Info",
        link: "/dashboard/info",
      },
      {
        icon: {
          $$typeof: Symbol(react.element),
          key: null,
          ref: null,
          props: {},
          _owner: null,
          _store: { validated: true },
          _debugInfo: null,
        },
        text: "Logout",
        link: "#",
      },
    ],
  },
];
```

# Bottom

```js
[
  {
    groupLabel: "Main",
    menus: [
      {
        href: "/dashboard",
        label: "Dashboard",
        active: true,
        icon: {
          $$typeof: Symbol(react.forward_ref),
          displayName: "LayoutGrid",
        },
        submenus: [],
      },
      {
        href: "/dashboard/announcements",
        label: "Announcements",
        active: false,
        icon: {
          $$typeof: Symbol(react.forward_ref),
          displayName: "Megaphone",
        },
        submenus: [],
      },
    ],
  },
  {
    groupLabel: "Contents",
    menus: [
      {
        href: "",
        label: "Contacts",
        active: false,
        icon: {
          $$typeof: Symbol(react.forward_ref),
          displayName: "Users",
        },
        submenus: [
          {
            href: "/dashboard/contacts/all",
            label: "All Contacts",
            active: false,
          },
          {
            href: "/dashboard/contacts/comms",
            label: "Comms Lists",
            active: false,
          },
        ],
      },
      {
        href: "",
        label: "Events",
        active: false,
        icon: {
          $$typeof: Symbol(react.forward_ref),
          displayName: "Calendar",
        },
        submenus: [
          {
            href: "/dashboard/events",
            label: "All Events",
            active: false,
          },
          {
            href: "/dashboard/events/new",
            label: "Create New Event",
            active: false,
          },
          {
            href: "/dashboard/events/manage",
            label: "Manage Events",
            active: false,
          },
        ],
      },
      {
        href: "/dashboard/prayer-requests",
        label: "Prayer Requests",
        active: false,
        icon: {
          $$typeof: Symbol(react.forward_ref),
          displayName: "HandHeart",
        },
        submenus: [],
      },
      {
        href: "/dashboard/missionaries",
        label: "Missionaries",
        active: false,
        icon: {
          $$typeof: Symbol(react.forward_ref),
          displayName: "Globe",
        },
        submenus: [],
      },
    ],
  },
  {
    groupLabel: "Settings",
    menus: [
      {
        href: "/dashboard/profile",
        label: "Profile",
        active: false,
        icon: {
          $$typeof: Symbol(react.forward_ref),
          displayName: "User",
        },
        submenus: [],
      },
      {
        href: "/dashboard/info",
        label: "Info",
        active: false,
        icon: {
          $$typeof: Symbol(react.forward_ref),
          displayName: "BadgeInfo",
        },
        submenus: [],
      },
    ],
  },
];
```
