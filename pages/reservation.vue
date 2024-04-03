<template>
  <!-- <span>{{ testString }}</span> -->
  <!-- 
  <div class="container mx-auto">
    <div class="flex flex-wrap">
      <div class="flex text-center">
        <div style="margin: 40px 20px" class="" v-for="(section, index) in timeSections" :key="index">
          <div class="">
            <h4>{{ section.label }}</h4>
            <button
              v-for="(item, i) in section.times"
              :key="i"
              @click="changeTime(section, i)"
              class="button_style"
              :disabled="item.status == 2"
              :class="
                item.status == 0
                  ? 'background-color-status'
                  : item.status == 1
                  ? 'background-color-status1'
                  : item.status == 2
                  ? 'background-color-status2'
                  : ' '
              "
            >
              {{ item.time }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <!-- <VDatePicker v-model="dateChose" /> -->
  <!-- <div class="" style="font-weight: 900; font-family: Avenir, sans-serif">
    <div class="toolbar">
      <div class="btn" @click="preMonth">上一月</div>
      <div class="date">{{ currentYear }}年{{ currentMonth }}月</div>
      <div class="btn" @click="nextMonth">下一月</div>
    </div>
    <div class="container mx-auto">
      <div v-for="(item, index) in header" :key="index" class="grid-item">
        {{ item }}
      </div>
      <div v-for="(item, index) in lastMonthSurplusDayArray" :key="index" class="grid-item">
        {{ item }}
      </div>
      <div
        v-for="(item, index) in currentMonthDayCount"
        @click="selectDate(item)"
        :key="index"
        :class="['grid-item', currentDate === item ? 'very-hot' : 'normal-hot']"
      >
        {{ item }}
      </div>
      <div v-for="(item, index) in nextMonthSurplusDayArray" :key="index" class="grid-item">
        {{ item }}
      </div>
    </div>
  </div> -->

  <ul
    class="flex justify-center flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
  >
    <li class="me-2" @click="goProductPage">
      <a
        href="#"
        class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
      >
        Service
      </a>
    </li>
    <li class="me-2" @click="goTimePage">
      <a
        href="#"
        class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >Time</a
      >
    </li>
    <li class="me-2">
      <a
        href="#"
        class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >Settings</a
      >
    </li>
    <li class="me-2">
      <a
        href="#"
        class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >Contacts</a
      >
    </li>
    <li>
      <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
    </li>
  </ul>

  <!-- <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
            <div class="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
            <div class="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
            <div class="mt-2">
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div class="col-span-full">
            <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
            <div class="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autocomplete="street-address"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
            <div class="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
            <div class="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
            <div class="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autocomplete="postal-code"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form> -->
  <!-- <button @click="testApi">77</button> -->
  <ReservationItem v-if="productPage" @selectItem="selectItem" />
  <ReservationTime v-if="timePage" />

  <!-- <div v-if="pending">Loading ...</div> -->
</template>
<script setup lang="ts">
// import type { analyticsreporting_v4 } from 'googleapis'
import ReservationItem from '@/components/ReservationItem.vue'
import ReservationTime from '@/components/ReservationTime.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// import { getStaffInfoByPage } from '@/api/test'
import { googleTokenLogin } from 'vue3-google-login'
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID }: any = runtimeConfig.public
//頁面
const productPage = ref<boolean>(false)
const timePage = ref<boolean>(false)

//預約相關
const timeSections = ref<any[]>([])
const timeArr = ref<any[]>()

const dateChose = ref()

//calendar
const header = reactive<string[]>([
  'Sun',
  'Mon',
  'Tue',
  'Wen',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
  'Mon',
  'Tue',
  'Wen',
  'Thu',
  'Fri',
  'Sat',
])
// const header = reactive<string[]>(['一', '二', '三', '四', '五', '六', '日'])
// 上个月剩余天数
const lastMonthSurplusDay = ref<number>(0)
const lastMonthSurplusDayArray = ref<number[]>([])
// 下个月剩余天数
const nextMonthSurplusDay = ref<number>(0)
const nextMonthSurplusDayArray = ref<number[]>([])
// 当前月份总天数
const currentMonthDayCount = ref<number>(0)
const currentYear = ref<number>(0)
const currentMonth = ref<number>(0)
const currentDate = ref<number>(0)

// 闰年
const leapMonthDay = reactive<number[]>([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
// 平年
const normalMonthDay = reactive<number[]>([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])

function selectItem() {
  productPage.value = false
  timePage.value = true
  console.log('selectItem')
}
function goProductPage() {
  timePage.value = false
  productPage.value = true
  console.log('productPage')
}

function goTimePage() {
  productPage.value = false
  timePage.value = true
  console.log('timePage', timePage.value)
}

function selectDate(item: any) {
  currentDate.value = item
  console.log('item', item)
}
// 是否为闰年
function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
// 获取这个月1号的星期数
function getMonthFirstDay(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay()
}
// 计算日期
function calculateDays() {
  // 获取本月第一天星期几(星期几就补多少个空)
  lastMonthSurplusDay.value = getMonthFirstDay(currentYear.value, currentMonth.value)
  // lastMonthSurplusDay.value =
  //   getMonthFirstDay(currentYear.value, currentMonth.value) === 0
  //     ? 6
  //     : getMonthFirstDay(currentYear.value, currentMonth.value) - 1
  // 获取当前月有多少天
  currentMonthDayCount.value = isLeapYear(currentYear.value)
    ? leapMonthDay[currentMonth.value - 1]
    : normalMonthDay[currentMonth.value - 1]
  let prevMonthLastDate = 0
  if (currentMonth.value === 1) {
    // 当前是1月还要用去年的去判断
    prevMonthLastDate = isLeapYear(currentYear.value - 1)
      ? leapMonthDay[leapMonthDay.length - 1]
      : normalMonthDay[normalMonthDay.length - 1]
  } else {
    prevMonthLastDate = isLeapYear(currentYear.value)
      ? leapMonthDay[currentMonth.value - 2]
      : normalMonthDay[currentMonth.value - 2]
  }
  // 获取还需要渲染多少天
  nextMonthSurplusDay.value = 42 - (lastMonthSurplusDay.value + currentMonthDayCount.value)
  const prevtemp = []
  const nexttemp = []
  for (let i = prevMonthLastDate - lastMonthSurplusDay.value + 1; i <= prevMonthLastDate; i++) {
    prevtemp.push(i)
  }
  for (let i = 1; i <= nextMonthSurplusDay.value; i++) {
    nexttemp.push(i)
  }
  lastMonthSurplusDayArray.value = prevtemp
  nextMonthSurplusDayArray.value = nexttemp
}
// 上个月
function preMonth() {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    --currentYear.value
  } else {
    --currentMonth.value
  }
  calculateDays()
}
// 下个月
function nextMonth() {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    ++currentYear.value
  } else {
    ++currentMonth.value
  }
  calculateDays()
}
// 获取当前日期
function getCurrentDate() {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  return {
    year,
    month,
    date,
  }
}
// 初始化日历
function initCalendar() {
  const { year, month, date } = getCurrentDate()
  currentYear.value = year
  currentMonth.value = month
  currentDate.value = date
  calculateDays()
}

timeArr.value = [
  { time: '10:00', status: 3 },
  { time: '11:00', status: 0 },
  { time: '12:00', status: 0 },
  { time: '13:00', status: 1 },
  { time: '14:00', status: 2 },
  { time: '15:00', status: 0 },
  { time: '16:00', status: 3 },
  { time: '17:00', status: 0 },
  { time: '18:00', status: 0 },
  { time: '19:00', status: 0 },
  { time: '20:00', status: 2 },
  { time: '21:00', status: 0 },
  { time: '22:00', status: 0 },
  { time: '23:00', status: 0 },
  { time: '24:00', status: 0 },
]

timeSections.value = [
  {
    label: '早上',
    times: timeArr.value.slice(0, 4),
  },
  {
    label: '中午',
    times: timeArr.value.slice(4, 8),
  },
  {
    label: '晚上',
    times: timeArr.value.slice(8),
  },
]

async function handleGoogleLogin() {
  const accessToken = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID,
  }).then((response) => response?.access_token)
  console.log('accessToken', accessToken)

  if (!accessToken) {
    // 登入失敗
    return
  }
  // getGoogleUserInfo()

  // 在這裡使用 getGoogleUserInfo，並將 data 和 accessToken 傳遞給它
  // await getGoogleUserInfo(data, accessToken as string)

  // userInfo.value = data.value
  const { data, execute, pending } = await useFetch('/api/auth/google-auth-token', {
    method: 'POST',
    body: {
      accessToken,
    },
  })
  console.log('logindata', data.value)
  router.push({ path: '/reservation' })
}
// function mounted() {
//   initCalendar()
// }
onMounted(() => {
  initCalendar()
})
</script>

<style>
.button_style {
  text-align: center;
  float: left;
  font-weight: bold;
  width: 75px;
  margin: 10px 10px;
  border-radius: 50px; /* 将圆角设为50%以创建橢圆效果 */
  padding: 8px 16px; /* 按钮内边距，使按钮内容居中 */
  border: none; /* 去掉按钮的边框 */
  cursor: pointer;
  /* border: 2px solid #c9c6c6; */
}

.background-color-status2 {
  background-color: #e33030;
  color: #fff;
}

.background-color-status1 {
  color: #fff;
  background-color: #2563eb;
}
.background-color-status {
  background-color: #fff;
}

.button_style:hover {
  background-color: #cbcdd0; /* 鼠标悬停时的背景颜色 */
}

.toolbar {
  display: flex;
  width: 70%;
  margin: auto;
  height: 50px;
}

.toolbar .date {
  flex: 1;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 30px;
  border-top: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
}
.toolbar .btn {
  flex: 1;
  color: #1d84f6;
  text-align: center;
  line-height: 30px;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
}
.container {
  width: 100%;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.grid-item {
  width: 100%;
  height: 70px;
  line-height: 50px;
  /* border-bottom: 1px solid #eee; */
  /* border-right: 1px solid #eee; */
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.grid-item:hover {
  background-color: hsl(0, 82%, 59%);
}

.grid-item:nth-child(1n) {
  /* border-right: 1px solid #eee; */
}
.very-hot {
  background-color: #e07e94;
}
</style>
