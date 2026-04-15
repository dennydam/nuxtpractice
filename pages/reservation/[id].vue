
<template>
  <ul class="flex justify-center flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-6">
    <li class="me-2">
      <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        @click.prevent="navigateTo('/reservation')">
        ← Back to Service
      </a>
    </li>
  </ul>

  <ReservationTime @selectTime="handleSelectTime" />

  <div class="time-container mx-auto flex justify-between my-4 border-t pt-4">
    <div class="text-sm text-gray-500">
      <p v-if="appointmentTime">Selected: {{ appointmentTime }}</p>
      <p v-else>Please select a time slot above.</p>
    </div>

    <UiButton
      variant="brand"
      class="ml-auto mb-2"
      :disabled="!appointmentTime"
      :loading="isLoading"
      @click="addAppointment"
    >
      Book Now
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useLoadingStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import ReservationTime from '@/components/ReservationTime.vue';

interface TimeSlot {
  time: string;
}

interface Profile {
  id: string;
}

function isProfile(v: unknown): v is Profile {
  return typeof v === 'object' && v !== null && 'id' in v && typeof (v as any).id === 'string';
}

function parseProfileCookie(): Profile | null {
  const profileCookie = useCookie('profile');
  const raw = typeof profileCookie.value === 'string'
    ? JSON.parse(profileCookie.value)
    : profileCookie.value;
  return isProfile(raw) ? raw : null;
}

const route = useRoute();
const { $notify } = useNuxtApp();

const userStore = useUserStore();
const loadingStore = useLoadingStore();
const { isLoading } = storeToRefs(loadingStore);

const appointmentTime = ref<string>('');
const currentServiceId = route.params.id;

function handleSelectTime(item: TimeSlot, currentYear: number, currentMonth: number, currentDate: number) {
  const paddedMonth = currentMonth.toString().padStart(2, '0');
  const paddedDate = currentDate.toString().padStart(2, '0');
  appointmentTime.value = `${currentYear}-${paddedMonth}-${paddedDate} ${item.time}`;
}

async function addAppointment() {
  const profile = parseProfileCookie();
  if (!profile) {
    $notify({ type: 'error', title: 'Error', text: 'User not logged in' });
    return;
  }

  try {
    loadingStore.startLoading();

    const { error } = await useFetch('/api/appointment/', {
      method: 'POST',
      body: {
        userId: profile.id,
        treatment: `Service Product ${currentServiceId}`, // TODO: 換成真實服務名稱
        appointmentTime: appointmentTime.value,
      },
    });

    if (error.value) {
      $notify({ type: 'error', title: '預約失敗', text: '預約時間衝突或系統錯誤' });
    } else {
      await userStore.getAppointment();
      $notify({ type: 'success', title: '預約成功', text: '您的預約已送出' });
      navigateTo('/reservation');
    }
  } catch (err) {
    console.error('An error occurred:', err);
    $notify({ type: 'error', text: 'System Error' });
  } finally {
    loadingStore.stopLoading();
  }
}
</script>
