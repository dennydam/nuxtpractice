<template>
  <!-- <span>{{ testString }}</span> -->

  <!-- <VDatePicker v-model="dateChose" /> -->
  <div class="" style="font-weight: 900; font-family: Avenir, sans-serif">
    <div class="toolbar">
      <button class="btn" @click="preMonth">上一月</button>
      <div class="date">{{ currentYear }}年{{ currentMonth }}月</div>
      <button class="btn hover" @click="nextMonth">下一月</button>
    </div>
    <div class="container mx-auto calendar">
      <div v-for="(item, index) in header" :key="index" class="grid-item">
        {{ item }}
      </div>
      <div
        v-for="(item, index) in lastMonthSurplusDayArray"
        :key="index"
        class="grid-item"
      >
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
      <div
        v-for="(item, index) in nextMonthSurplusDayArray"
        :key="index"
        class="grid-item"
      >
        {{ item }}
      </div>
    </div>
    <div class="mt-5 flex mx-auto time-container  " style="">
      <div class="mx-auto calendar mr-5" style="height:150px;width:250px">
        <div class="p-3">
          <span>Body Massage</span>
          <div class="my-3 flex justify-items-center items-center">
            <img
              class="round-image"
              style="width:50px;height:50px"
              src="https://png.pngtree.com/thumb_back/fh260/background/20210907/pngtree-massage-and-health-care-during-the-day-image_811638.jpg"
            />
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="ml-2 h-8 w-10 "
              >
                <path
                  d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z"
                />
                <path
                  fill-rule="evenodd"
                  d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>$100</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto calendar  flex">
        <div class="flex flex-wrap">
          <span class="mt-3"> Available start times</span>
          <div class="flex text-center">
            <div
              style="margin: 40px 20px"
              class=""
              v-for="(section, index) in timeSections"
              :key="index"
            >
              <div class="">
                <h4>{{ section.label }}</h4>
                <button
                  v-for="(item, i) in section.times"
                  :key="i"
                  @click="
                    $emit(
                      'selectTime',
                      item,
                      currentYear,
                      currentMonth,
                      currentDate
                    ),
                      changeColor(item, i)
                  "
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
      </div>
    </div>
  </div>
  <div>
    <!-- <button
      @click="$emit('testEmit', currentMonth)"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      emittest
    </button> -->
  </div>

  <!-- <div v-if="pending">Loading ...</div> -->
</template>
<script setup lang="ts">
// import type { analyticsreporting_v4 } from 'googleapis'
import RerservationItem from '@/components/ReservationItem.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// import { getStaffInfoByPage } from '@/api/test'
import { googleTokenLogin } from 'vue3-google-login'
const emit = defineEmits<{
  (e: 'selectTime', id: number): void
  (e: 'update', value: string): void
  (e: 'currentDate', value: string): void
  (e: 'currentMonth', value: string): void
  (e: 'currentYear', value: string): void
}>()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID }: any = runtimeConfig.public
//頁面
const productPage = ref<boolean>(false)
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
  'Sat'
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
const leapMonthDay = reactive<number[]>([
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
])
// 平年
const normalMonthDay = reactive<number[]>([
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
])
function goProductPage() {
  productPage.value = !productPage.value
}

function selectDate(item: any) {
  currentDate.value = item
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
  lastMonthSurplusDay.value = getMonthFirstDay(
    currentYear.value,
    currentMonth.value
  )
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
  nextMonthSurplusDay.value =
    42 - (lastMonthSurplusDay.value + currentMonthDayCount.value)
  const prevtemp = []
  const nexttemp = []
  for (
    let i = prevMonthLastDate - lastMonthSurplusDay.value + 1;
    i <= prevMonthLastDate;
    i++
  ) {
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
    date
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
  { time: '24:00', status: 0 }
]

timeSections.value = [
  {
    label: 'morning',
    times: timeArr.value.slice(0, 4)
  },
  {
    label: 'afternoon',
    times: timeArr.value.slice(4, 8)
  },
  {
    label: 'evening',
    times: timeArr.value.slice(8)
  }
]

function changeTime(item, time) {}
function changeColor(item) {
  timeSections.value.forEach(item => {
    item.times.forEach(time => {
      time.status = 0
    })
  })
  item.status = 1
}

async function handleGoogleLogin() {
  const accessToken = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then(response => response?.access_token)
  // console.log('accessToken', accessToken)

  if (!accessToken) {
    // 登入失敗
    return
  }

  const { data, execute, pending } = await useFetch(
    '/api/auth/google-auth-token',
    {
      method: 'POST',
      body: {
        accessToken
      }
    }
  )
  router.push({ path: '/reservation' })
}

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

@media (min-width: 768px) {
  .time-container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {
  .time-container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {
  .time-container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {
  .time-container {
    max-width: 1536px;
  }
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
.calendar {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}
.round-image {
  border-radius: 50%;
}
</style>
