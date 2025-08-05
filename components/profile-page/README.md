# ProfilePage 个人中心页面组件

一个适用于UniApp的骑友记账通个人中心页面组件，使用TailwindCSS进行样式设计。

## 功能特性

- 📱 响应式设计，适配移动端
- 🎨 使用TailwindCSS，支持主题色定制
- 🔧 高度可配置，支持自定义数据和事件处理
- 📊 包含用户信息、统计数据、功能菜单等完整模块
- 🎯 使用uni-icons图标库，统一图标风格

## 组件结构

```
profile-page/
├── ProfilePage.vue    # 主组件文件
├── interface.ts       # TypeScript接口定义
├── index.ts          # 组件导出
└── README.md         # 使用说明
```

## 使用示例

### 基础用法

```vue
<template>
  <ProfilePage 
    :userInfo="userInfo"
    :stats="stats"
    @quickAction="handleQuickAction"
    @menuAction="handleMenuAction"
  />
</template>

<script>
import { ProfilePage } from '@/components/profile-page';

export default {
  components: {
    ProfilePage
  },
  data() {
    return {
      userInfo: {
        name: '王骑行',
        role: '骑行团长',
        description: '骑行爱好者 | 已加入3个骑行团',
        avatar: 'https://example.com/avatar.jpg'
      },
      stats: {
        rideCount: 28,
        totalDistance: 568,
        members: 12
      }
    }
  },
  methods: {
    handleQuickAction(action) {
      console.log('快捷操作:', action);
    },
    handleMenuAction(action) {
      console.log('菜单操作:', action);
    }
  }
}
</script>
```

## Props

### UserInfo

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| name | string | 用户姓名 | - |
| role | string | 用户角色 | - |
| description | string | 用户描述 | - |
| avatar | string | 头像URL | - |

### Stats

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| rideCount | number | 骑行次数 | - |
| totalDistance | number | 总里程 | - |
| members | number | 团员数量 | - |

## 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| quickAction | 快捷功能点击 | action: string |
| menuAction | 菜单功能点击 | action: string |
| tabSwitch | 底部tab切换 | index: number |
| avatarChange | 头像更换 | - |

## 主要功能模块

### 1. 用户信息卡片
- 渐变背景设计
- 用户头像、姓名、角色展示
- 骑行统计数据展示
- 支持头像更换功能

### 2. 快捷功能区
- 我的账单
- 骑行记录  
- 我的团队
- 我的福利

### 3. 数据统计卡片
- 本月里程、平均速度等详细数据
- 趋势对比显示
- 图表展示区域

### 4. 功能菜单
- 团长功能：团队管理、组织活动、团队记账、排行榜
- 个人中心：个人资料、骑行记录、账单、设置等

### 5. 底部导航栏
- 5个Tab页面导航
- 中央添加按钮特殊设计
- 当前页面高亮显示

## 样式说明

组件使用TailwindCSS构建，主要颜色变量：

```css
.text-primary { color: #165DFF; }  /* 主色调 */
.bg-primary { background-color: #165DFF; }
.bg-secondary { background-color: #36CFC9; }  /* 次要色 */
.bg-accent { background-color: #FF7D00; }     /* 强调色 */
```

## 依赖要求

- UniApp框架
- TailwindCSS
- uni-icons图标库

## 注意事项

1. 确保项目已正确配置TailwindCSS
2. 需要安装uni-icons插件
3. 图标名称请参考uni-icons文档
4. 部分样式可能需要根据实际项目调整

## 浏览器兼容性

支持所有UniApp支持的平台：
- H5
- 小程序（微信、支付宝、百度等）
- App（iOS、Android）