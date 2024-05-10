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
        class="inline-block p-4 rounded-t-lg cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >Settings</a
      >
    </li>
    <li class="me-2">
      <a
        href="#"
        class="inline-block p-4 rounded-t-lg cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >Contacts</a
      >
    </li>
    <li>
      <a
        class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500"
        >Disabled</a
      >
    </li>
  </ul>

  <ReservationItem v-if="productPage" @selectItem="selectItem" />

  <ReservationTime v-if="timePage" @selectTime="selectTime" />
  <div
    v-if="timePage"
    class="time-container mx-auto  flex justify-between my-2"
  >
    <button
      type="button"
      class="bg-[#ffadc4] text-white  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-auto"
      @click="addAppointment"
    >
      Book Now
    </button>
  </div>
  <!-- <div v-if="pending">Loading ...</div> -->
</template>
<script setup lang="ts">
// import type { analyticsreporting_v4 } from 'googleapis'
import ReservationItem from '@/components/ReservationItem.vue'
import ReservationTime from '@/components/ReservationTime.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
// import { Appointment } from '@/utils/types'
// const userAppointmentData = ref<Appointment[]>([])

// import { getStaffInfoByPage } from '@/api/test'
import { googleTokenLogin } from 'vue3-google-login'
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID }: any = runtimeConfig.public
//頁面
const productPage = ref<boolean>(false)
const timePage = ref<boolean>(false)

//預約相關
const appointmentItem = ref<any>()
const appointmentTime = ref<any>()
const timeSections = ref<any[]>([])
const timeArr = ref<any[]>()

//選擇產品
function selectItem(item) {
  console.log('item.value', item)
  appointmentItem.value = item
  productPage.value = false
  timePage.value = true
  console.log('selectItem')
}
//選擇時間
function selectTime(time, currentYear, currentMonth, currentDate) {
  console.log('選擇時間', time)
  console.log('YEar', currentYear)

  console.log('YEar', currentYear.toString())
  console.log('Mohth', currentMonth)

  const paddedMonth = currentMonth.toString().padStart(2, '0')
  console.log('Month:', paddedMonth) // 输出 '04'
  const paddedDate = currentDate.toString().padStart(2, '0')

  console.log('Date', currentDate)

  appointmentTime.value =
    currentYear.toString() +
    '-' +
    paddedMonth +
    '-' +
    paddedDate +
    ' ' +
    time.time
}

//確認預約
async function addAppointment() {
  // 獲取當前日期
  const currentDate = new Date()

  // 獲取年、月、日
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 因為 getMonth() 返回的月份從 0 開始，所以需要加 1
  const day = String(currentDate.getDate()).padStart(2, '0')
  const dateString = `${year}-${month}-${day}`

  const treatment = appointmentItem.value.title
  // const reservationTime = dateString + 'T' + appointmentTime.value.time
  const reservationTime = appointmentTime.value

  console.log('今日日期', reservationTime) // 例如：2024-04-30
  const userStore = useUserStore()

  console.log('userState', userStore.profile.id)
  const userId = userStore.profile.id

  try {
    const { data } = await useFetch('/api/appointment/', {
      method: 'POST',
      mode: 'cors',
      body: {
        userId: userId,
        treatment: treatment,
        appointmentTime: reservationTime
      },
      onResponse({ request, response, options }) {
        console.log('onResponse', response)
        if (response.status == 400) {
          console.log('抓')
          $notify({
            type: 'success',
            title: 'Notification Title',
            text: 'Notification Text'
          })
        } else if (response.status == 200) {
          $notify({
            type: 'success',
            title: '預約成功',
            text: '預約成功'
          })
        }
      }
    })
    // console.log('statusCode', pending.value)
  } catch (error) {
    console.error('An error occurred:', error)
  }
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

// function selectDate(item: any) {
//   // currentDate.value = item
//   // console.log('item', item)
//   console.log('Date', item)
// }

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

async function handleGoogleLogin() {
  const accessToken = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then(response => response?.access_token)
  console.log('accessToken', accessToken)

  if (!accessToken) {
    // 登入失敗
    return
  }
  // getGoogleUserInfo()

  // 在這裡使用 getGoogleUserInfo，並將 data 和 accessToken 傳遞給它
  // await getGoogleUserInfo(data, accessToken as string)

  // userInfo.value = data.value
  const { data, execute, pending } = await useFetch(
    '/api/auth/google-auth-token',
    {
      method: 'POST',
      body: {
        accessToken
      }
    }
  )
  console.log('logindata', data.value)
  router.push({ path: '/reservation' })
}
// function mounted() {
//   initCalendar()
// }
onBeforeMount(async () => {
  // initCalendar()
  const userStore = useUserStore()

  console.log('userState', userStore.profile.id)
  const userId = userStore.profile.id

  // const { data: response, error } = useAsyncData(async () => {
  //   try {
  //     const { data } = await useFetch('/api/userappointment/', {
  //       method: 'POST',
  //       body: {
  //         userId: userId
  //       }
  //     })
  //     userAppointmentData.value = data.value.data
  //     console.log('會員預約資料data', data.value.data[0])
  //   } catch (error) {
  //     console.error('An error occurred:', error)
  //     return null
  //   }
  // })
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
