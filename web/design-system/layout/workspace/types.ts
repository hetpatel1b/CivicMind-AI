import { LucideIcon } from "lucide-react"

export interface NavItem {
  name: string
  href: string
  icon: LucideIcon
  disabled?: boolean
  badge?: string
  onClick?: () => void
  children?: Omit<NavItem, "icon" | "children">[]
}

export interface NavGroup {
  label: string
  items: NavItem[]
}
