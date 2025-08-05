<template>
  <view class="bg-gray-100 min-h-screen flex flex-col">
    <!-- 顶部导航栏 -->
    <view class="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <view class="container mx-auto px-4 py-3 flex items-center justify-between">
        <text class="text-xl font-bold text-primary">骑友记账通</text>
        <view class="flex items-center space-x-4">
          <view class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <uni-icons type="notification" size="20" color="#86909C"></uni-icons>
          </view>
          <view class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
            <uni-icons type="gear" size="20" color="#86909C"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <!-- 主内容区 -->
    <view class="flex-1 pt-16 pb-24">
      <!-- 用户信息卡片 -->
      <view class="py-8 px-4">
        <view class="container mx-auto">
          <view class="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-2xl shadow-lg">
            <view class="flex flex-col md:flex-row items-center">
              <view class="relative mb-4 md:mb-0">
                <view class="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <image
                    class="w-full h-full object-cover"
                    :src="userInfo.avatar"
                    mode="aspectFill"
                  />
                </view>
                <view 
                  class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center"
                  @tap="changeAvatar"
                >
                  <uni-icons type="camera" size="12" color="#FFFFFF"></uni-icons>
                </view>
              </view>
              <view class="ml-0 md:ml-6 text-center md:text-left">
                <view class="flex items-center justify-center md:justify-start mb-1">
                  <text class="text-2xl font-bold">{{ userInfo.name }}</text>
                  <view class="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                    <text class="text-white text-xs">{{ userInfo.role }}</text>
                  </view>
                </view>
                <text class="text-blue-100 mb-3 block">{{ userInfo.description }}</text>
                <view class="flex justify-center md:justify-start space-x-4">
                  <view class="text-center">
                    <text class="text-2xl font-bold block">{{ stats.rideCount }}</text>
                    <text class="text-blue-100 text-sm">骑行次数</text>
                  </view>
                  <view class="text-center">
                    <text class="text-2xl font-bold block">{{ stats.totalDistance }}</text>
                    <text class="text-blue-100 text-sm">总里程(km)</text>
                  </view>
                  <view class="text-center">
                    <text class="text-2xl font-bold block">{{ stats.members }}</text>
                    <text class="text-blue-100 text-sm">团员</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 快捷功能区 -->
      <view class="container mx-auto px-4 py-5">
        <view class="bg-white rounded-2xl shadow-sm p-4">
          <view class="grid grid-cols-4 gap-2">
            <view 
              class="flex flex-col items-center p-3 rounded-xl transition-colors"
              v-for="(item, index) in quickActions"
              :key="index"
              @tap="handleQuickAction(item.action)"
            >
              <view 
                class="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                :class="item.bgClass"
              >
                <uni-icons :type="item.icon" size="18" :color="item.color"></uni-icons>
              </view>
              <text class="text-xs text-gray-600">{{ item.label }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 数据统计卡片 -->
      <view class="container mx-auto px-4 mb-5">
        <view class="bg-white rounded-2xl shadow-sm p-5">
          <view class="flex justify-between items-center mb-4">
            <text class="font-bold text-lg">骑行数据</text>
            <view class="text-primary text-sm flex items-center" @tap="viewAllStats">
              <text class="text-primary text-sm">查看全部</text>
              <uni-icons type="right" size="12" color="#165DFF" class="ml-1"></uni-icons>
            </view>
          </view>
          <view class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <view 
              class="bg-gray-50 rounded-xl p-4 text-center"
              v-for="(stat, index) in detailStats"
              :key="index"
            >
              <text class="text-gray-500 text-sm mb-1 block">{{ stat.label }}</text>
              <text class="text-2xl font-bold text-primary block">
                {{ stat.value }}
                <text class="text-sm font-normal text-gray-500">{{ stat.unit }}</text>
              </text>
              <view 
                class="text-xs mt-1 flex items-center justify-center"
                :class="stat.trend === 'up' ? 'text-green-500' : 'text-red-500'"
              >
                <uni-icons 
                  :type="stat.trend === 'up' ? 'up' : 'down'" 
                  size="10" 
                  :color="stat.trend === 'up' ? '#52C41A' : '#FF4D4F'"
                ></uni-icons>
                <text class="ml-1">{{ stat.change }} 较上月</text>
              </view>
            </view>
          </view>
          <!-- 简化的图表区域 -->
          <view class="h-48 bg-gray-50 rounded-xl flex items-center justify-center">
            <text class="text-gray-400">图表区域</text>
          </view>
        </view>
      </view>

      <!-- 功能菜单区 -->
      <view class="container mx-auto px-4 space-y-5">
        <!-- 团长功能区 -->
        <view class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <view class="px-5 py-4 border-b border-gray-100">
            <text class="font-bold text-lg">团长功能</text>
          </view>
          <view>
            <view 
              class="flex items-center justify-between px-5 py-4 border-b border-gray-100 last:border-b-0"
              v-for="(item, index) in leaderFunctions"
              :key="index"
              @tap="handleMenuAction(item.action)"
            >
              <view class="flex items-center">
                <view 
                  class="w-10 h-10 rounded-xl flex items-center justify-center mr-4"
                  :class="item.bgClass"
                >
                  <uni-icons :type="item.icon" size="18" :color="item.color"></uni-icons>
                </view>
                <view>
                  <text class="font-medium block">{{ item.title }}</text>
                  <text class="text-gray-500 text-sm">{{ item.description }}</text>
                </view>
              </view>
              <uni-icons type="right" size="14" color="#86909C"></uni-icons>
            </view>
          </view>
        </view>

        <!-- 个人中心功能区 -->
        <view class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <view class="px-5 py-4 border-b border-gray-100">
            <text class="font-bold text-lg">个人中心</text>
          </view>
          <view>
            <view 
              class="flex items-center justify-between px-5 py-4 border-b border-gray-100 last:border-b-0"
              v-for="(item, index) in personalFunctions"
              :key="index"
              @tap="handleMenuAction(item.action)"
            >
              <view class="flex items-center">
                <view 
                  class="w-10 h-10 rounded-xl flex items-center justify-center mr-4"
                  :class="item.bgClass"
                >
                  <uni-icons :type="item.icon" size="18" :color="item.color"></uni-icons>
                </view>
                <view>
                  <text 
                    class="font-medium block"
                    :class="item.action === 'logout' ? 'text-red-500' : ''"
                  >{{ item.title }}</text>
                  <text class="text-gray-500 text-sm" v-if="item.description">{{ item.description }}</text>
                </view>
              </view>
              <uni-icons type="right" size="14" color="#86909C"></uni-icons>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <view class="grid grid-cols-5">
        <view 
          class="flex flex-col items-center justify-center py-3 transition-colors"
          v-for="(tab, index) in tabList"
          :key="index"
          :class="tab.active ? 'text-primary' : 'text-gray-500'"
          @tap="switchTab(index)"
        >
          <view v-if="tab.isAdd" class="mt-[-15px]">
            <view class="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
              <uni-icons type="plus" size="20" color="#FFFFFF"></uni-icons>
            </view>
          </view>
          <template v-else>
            <uni-icons 
              :type="tab.icon" 
              size="20" 
              :color="tab.active ? '#165DFF' : '#86909C'"
              class="mb-1"
            ></uni-icons>
            <text class="text-xs">{{ tab.label }}</text>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      userInfo: {
        name: '王骑行',
        role: '骑行团长',
        description: '骑行爱好者 | 已加入3个骑行团',
        avatar: 'https://design.gemcoder.com/staticResource/echoAiSystemImages/3230267d074a9fb9fdb3c3f127d726f4.png'
      },
      stats: {
        rideCount: 28,
        totalDistance: 568,
        members: 12
      },
      detailStats: [
        {
          label: '本月里程',
          value: '86.5',
          unit: 'km',
          change: '12%',
          trend: 'up'
        },
        {
          label: '平均速度',
          value: '22.3',
          unit: 'km/h',
          change: '3%',
          trend: 'up'
        },
        {
          label: '最长骑行',
          value: '42.8',
          unit: 'km',
          change: '5%',
          trend: 'down'
        },
        {
          label: '消耗热量',
          value: '3,580',
          unit: 'kcal',
          change: '8%',
          trend: 'up'
        }
      ],
      quickActions: [
        {
          icon: 'wallet',
          label: '我的账单',
          action: 'bills',
          bgClass: 'bg-blue-50',
          color: '#165DFF'
        },
        {
          icon: 'location',
          label: '骑行记录',
          action: 'records',
          bgClass: 'bg-cyan-50',
          color: '#36CFC9'
        },
        {
          icon: 'contact',
          label: '我的团队',
          action: 'team',
          bgClass: 'bg-orange-50',
          color: '#FF7D00'
        },
        {
          icon: 'gift',
          label: '我的福利',
          action: 'benefits',
          bgClass: 'bg-green-50',
          color: '#52C41A'
        }
      ],
      leaderFunctions: [
        {
          icon: 'settings',
          title: '团队管理',
          description: '管理团员和团队设置',
          action: 'teamManage',
          bgClass: 'bg-blue-50',
          color: '#165DFF'
        },
        {
          icon: 'location',
          title: '组织活动',
          description: '创建和管理骑行活动',
          action: 'organizeActivity',
          bgClass: 'bg-cyan-50',
          color: '#36CFC9'
        },
        {
          icon: 'wallet',
          title: '团队记账',
          description: '管理团队共同支出',
          action: 'teamAccounting',
          bgClass: 'bg-orange-50',
          color: '#FF7D00'
        },
        {
          icon: 'medal',
          title: '团队排行榜',
          description: '查看团队成员排名',
          action: 'teamRanking',
          bgClass: 'bg-green-50',
          color: '#52C41A'
        }
      ],
      personalFunctions: [
        {
          icon: 'person',
          title: '个人资料',
          description: '编辑个人信息',
          action: 'profile',
          bgClass: 'bg-blue-50',
          color: '#165DFF'
        },
        {
          icon: 'clock',
          title: '骑行记录',
          description: '查看历史行程',
          action: 'rideHistory',
          bgClass: 'bg-cyan-50',
          color: '#36CFC9'
        },
        {
          icon: 'wallet',
          title: '我的账单',
          description: '查看消费记录',
          action: 'myBills',
          bgClass: 'bg-orange-50',
          color: '#FF7D00'
        },
        {
          icon: 'gear',
          title: '设置',
          description: '账户和应用设置',
          action: 'settings',
          bgClass: 'bg-red-50',
          color: '#FF4D4F'
        },
        {
          icon: 'loop',
          title: '退出登录',
          description: '',
          action: 'logout',
          bgClass: 'bg-gray-100',
          color: '#86909C'
        }
      ],
      tabList: [
        {
          icon: 'home',
          label: '首页',
          active: false
        },
        {
          icon: 'calendar',
          label: '活动',
          active: false
        },
        {
          isAdd: true
        },
        {
          icon: 'wallet',
          label: '记账',
          active: false
        },
        {
          icon: 'person',
          label: '我的',
          active: true
        }
      ]
    }
  },
  methods: {
    changeAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.userInfo.avatar = res.tempFilePaths[0];
        }
      });
    },
    handleQuickAction(action) {
      console.log('Quick action:', action);
      // 根据action跳转到对应页面
      switch (action) {
        case 'bills':
          uni.navigateTo({ url: '/pages/bills/index' });
          break;
        case 'records':
          uni.navigateTo({ url: '/pages/records/index' });
          break;
        case 'team':
          uni.navigateTo({ url: '/pages/team/index' });
          break;
        case 'benefits':
          uni.navigateTo({ url: '/pages/benefits/index' });
          break;
      }
    },
    handleMenuAction(action) {
      console.log('Menu action:', action);
      if (action === 'logout') {
        uni.showModal({
          title: '提示',
          content: '确定要退出登录吗？',
          success: (res) => {
            if (res.confirm) {
              // 执行退出登录逻辑
              uni.reLaunch({ url: '/pages/login/index' });
            }
          }
        });
        return;
      }
      // 根据action跳转到对应页面
    },
    viewAllStats() {
      uni.navigateTo({ url: '/pages/stats/index' });
    },
    switchTab(index) {
      if (this.tabList[index].isAdd) {
        // 处理添加按钮点击
        uni.navigateTo({ url: '/pages/add/index' });
        return;
      }
      
      // 更新tab状态
      this.tabList.forEach((tab, i) => {
        tab.active = i === index;
      });
      
      // 根据tab跳转
      const routes = ['/pages/home/index', '/pages/activity/index', '', '/pages/accounting/index', '/pages/profile/index'];
      if (routes[index]) {
        uni.switchTab({ url: routes[index] });
      }
    }
  }
}
</script>

<style scoped>
/* 由于使用TailwindCSS，这里不需要额外的CSS */
.text-primary {
  color: #165DFF;
}

.bg-primary {
  background-color: #165DFF;
}

.bg-secondary {
  background-color: #36CFC9;
}

.bg-accent {
  background-color: #FF7D00;
}

.border-primary {
  border-color: #165DFF;
}
</style>