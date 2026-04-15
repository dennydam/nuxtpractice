<template>
  <section
    class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Title Area -->
      <div class="text-center mb-10">
        <p class="text-xs uppercase tracking-[0.2em] text-pink-500 mb-3">
          Step 2
        </p>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          Select a date & time
        </h2>
        <p class="max-w-2xl mx-auto text-sm sm:text-base text-slate-500">
          Pick a date from the calendar, then choose an available time slot to
          complete your reservation.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
        <!-- 左側：日期 + 時間卡片 -->
        <UiCard shadow="sm" padding="md" class="space-y-6">
          <!-- 月份切換 -->
          <div class="flex items-center justify-between mb-2">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-pink-200 hover:text-pink-600 hover:bg-pink-50 transition"
              @click="preMonth"
            >
              <svg
                class="h-3.5 w-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Previous</span>
            </button>

            <div class="text-sm font-semibold text-slate-900">
              {{ currentYear }}年 {{ currentMonth }}月
            </div>

            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-pink-200 hover:text-pink-600 hover:bg-pink-50 transition"
              @click="nextMonth"
            >
              <span>Next</span>
              <svg
                class="h-3.5 w-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <!-- 星期標題 -->
          <div
            class="grid grid-cols-7 gap-2 text-[11px] font-semibold tracking-wide text-slate-400 uppercase"
          >
            <div v-for="(item, index) in header" :key="index" class="text-center">
              {{ item }}
            </div>
          </div>

          <!-- 日期格子 -->
          <div class="grid grid-cols-7 gap-2 text-sm">
            <!-- 上一個月補位 -->
            <div
              v-for="(item, index) in lastMonthSurplusDayArray"
              :key="'prev-' + index"
              class="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center mx-auto rounded-full text-xs md:text-sm text-slate-300"
            >
              {{ item }}
            </div>

            <!-- 當月日期 -->
            <button
              v-for="day in currentMonthDayCount"
              :key="'curr-' + day"
              type="button"
              @click="selectDate(day)"
              :class="[
                'flex h-9 w-9 md:h-10 md:w-10 items-center justify-center mx-auto rounded-full text-xs md:text-sm transition',
                currentDate === day
                  ? 'bg-pink-500 text-white font-semibold shadow-sm'
                  : 'text-slate-700 hover:bg-pink-50 hover:text-pink-600'
              ]"
            >
              {{ day }}
            </button>

            <!-- 下一個月補位 -->
            <div
              v-for="(item, index) in nextMonthSurplusDayArray"
              :key="'next-' + index"
              class="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center mx-auto rounded-full text-xs md:text-sm text-slate-300"
            >
              {{ item }}
            </div>
          </div>

          <!-- 時間區塊 -->
          <div class="border-t border-slate-100 pt-5">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-semibold text-slate-900">
                Available start times
              </h3>
            </div>

            <div class="space-y-4">
              <div
                v-for="(section, index) in timeSections"
                :key="index"
                class="space-y-2"
              >
                <h4
                  class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                >
                  {{ section.label }}
                </h4>

                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="(item, i) in section.times"
                    :key="i"
                    type="button"
                    @click="
                      $emit(
                        'selectTime',
                        item,
                        currentYear,
                        currentMonth,
                        currentDate
                      );
                      changeColor(item);
                    "
                    :disabled="item.status === 2"
                    :class="[
                      'inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium border transition',
                      item.status === 0
                        ? 'border-slate-200 text-slate-600 bg-white hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600'
                        : item.status === 1
                        ? 'border-transparent bg-pink-500 text-white shadow-sm'
                        : 'border-slate-100 bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                    ]"
                  >
                    {{ item.time }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </UiCard>

        <!-- 右側：已選服務資訊卡片 -->
        <UiCard shadow="sm" padding="md" class="space-y-5">
          <h3 class="text-sm font-semibold text-slate-900">
            Selected service
          </h3>

          <div class="flex items-center gap-4">
            <img
              class="h-16 w-16 rounded-2xl object-cover"
              src="https://png.pngtree.com/thumb_back/fh260/background/20210907/pngtree-massage-and-health-care-during-the-day-image_811638.jpg"
              alt="Body massage"
            />
            <div class="flex-1">
              <p class="text-sm font-semibold text-slate-900">Body Massage</p>
              <p class="mt-1 text-xs text-slate-500">
                60 mins full body massage for deep relaxation.
              </p>

              <div class="mt-2 flex items-center text-sm font-semibold text-pink-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="mr-1.5 h-4 w-4"
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

          <div class="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-500">
            <div class="flex items-center justify-between">
              <span>Date</span>
              <span v-if="currentDate" class="font-medium text-slate-900">
                {{ currentYear }}-{{ String(currentMonth).padStart(2, '0') }}-{{
                  String(currentDate).padStart(2, '0')
                }}
              </span>
              <span v-else class="text-slate-400">Not selected</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Time</span>
              <span class="text-slate-400">
                Select a time slot
              </span>
            </div>
          </div>
        </UiCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import type { analyticsreporting_v4 } from 'googleapis'
import RerservationItem from '@/components/ReservationItem.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// import { getStaffInfoByPage } from '@/api/test'
import { googleTokenLogin } from 'vue3-google-login'
import type { TimeSlot, TimeSection } from '@/utils/types'

const emit = defineEmits<{
  selectTime: [item: TimeSlot, year: number, month: number, date: number]
  update: [value: string]
  currentDate: [value: string]
  currentMonth: [value: string]
  currentYear: [value: string]
}>()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public
//頁面
const productPage = ref<boolean>(false)
//預約相關
const timeSections = ref<TimeSection[]>([])
const timeArr = ref<TimeSlot[]>([])

const dateChose = ref()

//calendar
const header = reactive<string[]>(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
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


function selectDate(item: number): void {
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

// function changeTime(item, time) {}
function changeColor(item: TimeSlot): void {
  timeSections.value.forEach(section => {
    section.times.forEach(time => {
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
