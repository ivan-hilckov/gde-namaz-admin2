export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Где намаз?",
  description: "Где намаз?",
  navItems: [
    {
      label: "Цели пожертвований",
      href: "/donation-goals",
    },
  ],
  navMenuItems: [
    {
      label: "Цели пожертвований",
      href: "/donation-goals",
    },
    {
      label: "Выйти",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
