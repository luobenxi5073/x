export interface UserInfo {
  name: string;
  role: string;
  description: string;
  avatar: string;
}

export interface Stats {
  rideCount: number;
  totalDistance: number;
  members: number;
}

export interface DetailStat {
  label: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
}

export interface QuickAction {
  icon: string;
  label: string;
  action: string;
  bgClass: string;
  color: string;
}

export interface MenuFunction {
  icon: string;
  title: string;
  description: string;
  action: string;
  bgClass: string;
  color: string;
}

export interface TabItem {
  icon?: string;
  label?: string;
  active?: boolean;
  isAdd?: boolean;
}

export interface ProfilePageProps {
  userInfo?: UserInfo;
  stats?: Stats;
  detailStats?: DetailStat[];
  quickActions?: QuickAction[];
  leaderFunctions?: MenuFunction[];
  personalFunctions?: MenuFunction[];
  tabList?: TabItem[];
  onQuickAction?: (action: string) => void;
  onMenuAction?: (action: string) => void;
  onTabSwitch?: (index: number) => void;
  onAvatarChange?: () => void;
}