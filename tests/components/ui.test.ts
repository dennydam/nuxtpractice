import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UiButton from '~/components/ui/UiButton.vue'
import UiInput from '~/components/ui/UiInput.vue'
import UiBadge from '~/components/ui/UiBadge.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiAlert from '~/components/ui/UiAlert.vue'
import UiAvatar from '~/components/ui/UiAvatar.vue'

// ─────────────────────────────────────────────
// UiButton
// ─────────────────────────────────────────────
describe('UiButton', () => {
  // slot 傳入的文字是否正確顯示在按鈕內
  it('renders slot content', async () => {
    const wrapper = await mountSuspended(UiButton, { slots: { default: '送出' } })
    expect(wrapper.text()).toContain('送出')
  })

  // loading=true 時應顯示 spinner svg
  it('shows spinner when loading=true', async () => {
    const wrapper = await mountSuspended(UiButton, { props: { loading: true } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  // loading=false 時不應顯示 spinner svg
  it('no spinner when loading=false', async () => {
    const wrapper = await mountSuspended(UiButton, { props: { loading: false } })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  // disabled=true 時 button 元素本身要有 disabled 屬性，讓瀏覽器原生阻擋互動
  it('button is disabled when disabled=true', async () => {
    const wrapper = await mountSuspended(UiButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  // disabled 狀態下點擊不應觸發 click emit（handleClick 內部有守衛）
  it('does not emit click when disabled', async () => {
    const wrapper = await mountSuspended(UiButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  // loading 狀態下點擊同樣不應觸發 click emit
  it('does not emit click when loading', async () => {
    const wrapper = await mountSuspended(UiButton, { props: { loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  // 正常狀態點擊應觸發一次 click emit
  it('emits click when enabled', async () => {
    const wrapper = await mountSuspended(UiButton, { props: { variant: 'primary' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  // block=true 時應套用 w-full 讓按鈕撐滿父容器寬度
  it('applies w-full when block=true', async () => {
    const wrapper = await mountSuspended(UiButton, { props: { block: true } })
    expect(wrapper.classes()).toContain('w-full')
  })

  // block=false（預設）時不應有 w-full
  it('does not apply w-full when block=false', async () => {
    const wrapper = await mountSuspended(UiButton, { props: { block: false } })
    expect(wrapper.classes()).not.toContain('w-full')
  })
})

// ─────────────────────────────────────────────
// UiInput
// ─────────────────────────────────────────────
describe('UiInput', () => {
  it('renders label when provided', async () => {
    const wrapper = await mountSuspended(UiInput, { props: { label: '姓名' } })
    expect(wrapper.find('label').text()).toContain('姓名')
  })

  it('no label element when label not provided', async () => {
    const wrapper = await mountSuspended(UiInput)
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('shows asterisk when required=true', async () => {
    const wrapper = await mountSuspended(UiInput, { props: { label: '姓名', required: true } })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('shows errorMessage when provided', async () => {
    const wrapper = await mountSuspended(UiInput, { props: { errorMessage: '格式錯誤' } })
    expect(wrapper.text()).toContain('格式錯誤')
  })

  it('shows helperText when no error', async () => {
    const wrapper = await mountSuspended(UiInput, { props: { helperText: '最多 50 字' } })
    expect(wrapper.text()).toContain('最多 50 字')
  })

  it('helperText hidden when errorMessage also provided', async () => {
    const wrapper = await mountSuspended(UiInput, {
      props: { helperText: '提示', errorMessage: '錯誤' },
    })
    expect(wrapper.text()).toContain('錯誤')
    expect(wrapper.text()).not.toContain('提示')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = await mountSuspended(UiInput)
    const input = wrapper.find('input')
    await input.setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('input is disabled when disabled=true', async () => {
    const wrapper = await mountSuspended(UiInput, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets correct input type', async () => {
    const wrapper = await mountSuspended(UiInput, { props: { type: 'email' } })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })
})

// ─────────────────────────────────────────────
// UiBadge
// ─────────────────────────────────────────────
describe('UiBadge', () => {
  it('renders slot content', async () => {
    const wrapper = await mountSuspended(UiBadge, { slots: { default: '上線中' } })
    expect(wrapper.text()).toContain('上線中')
  })

  it('shows dot element when dot=true', async () => {
    const wrapper = await mountSuspended(UiBadge, { props: { dot: true } })
    expect(wrapper.find('span.rounded-full').exists()).toBe(true)
  })

  it('no dot element when dot=false', async () => {
    const wrapper = await mountSuspended(UiBadge, { props: { dot: false } })
    expect(wrapper.find('span.rounded-full').exists()).toBe(false)
  })

  it('applies success color classes', async () => {
    const wrapper = await mountSuspended(UiBadge, { props: { variant: 'success' } })
    expect(wrapper.classes().join(' ')).toContain('emerald')
  })

  it('applies danger color classes', async () => {
    const wrapper = await mountSuspended(UiBadge, { props: { variant: 'danger' } })
    expect(wrapper.classes().join(' ')).toContain('red')
  })
})

// ─────────────────────────────────────────────
// UiCard
// ─────────────────────────────────────────────
describe('UiCard', () => {
  it('renders default slot content', async () => {
    const wrapper = await mountSuspended(UiCard, { slots: { default: '卡片內容' } })
    expect(wrapper.text()).toContain('卡片內容')
  })

  it('renders header slot when provided', async () => {
    const wrapper = await mountSuspended(UiCard, { slots: { header: '<h3>標題</h3>' } })
    expect(wrapper.text()).toContain('標題')
  })

  it('renders footer slot when provided', async () => {
    const wrapper = await mountSuspended(UiCard, { slots: { footer: '<span>頁尾</span>' } })
    expect(wrapper.text()).toContain('頁尾')
  })

  it('no header section when header slot not used', async () => {
    const wrapper = await mountSuspended(UiCard, { slots: { default: '內容' } })
    expect(wrapper.find('.border-b').exists()).toBe(false)
  })

  it('no footer section when footer slot not used', async () => {
    const wrapper = await mountSuspended(UiCard, { slots: { default: '內容' } })
    expect(wrapper.find('.border-t').exists()).toBe(false)
  })

  it('applies hover class when hoverable=true', async () => {
    const wrapper = await mountSuspended(UiCard, { props: { hoverable: true } })
    expect(wrapper.classes()).toContain('cursor-pointer')
  })

  it('no hover class when hoverable=false', async () => {
    const wrapper = await mountSuspended(UiCard, { props: { hoverable: false } })
    expect(wrapper.classes()).not.toContain('cursor-pointer')
  })
})

// ─────────────────────────────────────────────
// UiAlert
// ─────────────────────────────────────────────
describe('UiAlert', () => {
  it('renders slot content', async () => {
    const wrapper = await mountSuspended(UiAlert, { slots: { default: '系統將維護' } })
    expect(wrapper.text()).toContain('系統將維護')
  })

  it('renders title when provided', async () => {
    const wrapper = await mountSuspended(UiAlert, { props: { title: '操作成功' } })
    expect(wrapper.text()).toContain('操作成功')
  })

  it('has role=alert for accessibility', async () => {
    const wrapper = await mountSuspended(UiAlert)
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('shows dismiss button when dismissible=true', async () => {
    const wrapper = await mountSuspended(UiAlert, { props: { dismissible: true } })
    expect(wrapper.find('button[aria-label="關閉"]').exists()).toBe(true)
  })

  it('no dismiss button when dismissible=false', async () => {
    const wrapper = await mountSuspended(UiAlert, { props: { dismissible: false } })
    expect(wrapper.find('button[aria-label="關閉"]').exists()).toBe(false)
  })

  it('hides alert after dismiss button click', async () => {
    const wrapper = await mountSuspended(UiAlert, { props: { dismissible: true } })
    await wrapper.find('button[aria-label="關閉"]').trigger('click')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('emits dismiss event when closed', async () => {
    const wrapper = await mountSuspended(UiAlert, { props: { dismissible: true } })
    await wrapper.find('button[aria-label="關閉"]').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })
})

// ─────────────────────────────────────────────
// UiAvatar
// ─────────────────────────────────────────────
describe('UiAvatar', () => {
  it('renders img when src provided', async () => {
    const wrapper = await mountSuspended(UiAvatar, {
      props: { src: 'https://example.com/photo.jpg', name: '王小明' },
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('shows initials when no src', async () => {
    const wrapper = await mountSuspended(UiAvatar, { props: { name: '王小明' } })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('王')
  })

  it('falls back to initials when image errors', async () => {
    const wrapper = await mountSuspended(UiAvatar, {
      props: { src: 'https://broken.example/img.jpg', name: '陳大文' },
    })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toContain('陳')
  })

  it('shows ? when no name provided', async () => {
    const wrapper = await mountSuspended(UiAvatar)
    expect(wrapper.text()).toContain('?')
  })

  it('extracts two-word initials correctly', async () => {
    const wrapper = await mountSuspended(UiAvatar, { props: { name: 'John Doe' } })
    expect(wrapper.text()).toContain('JD')
  })

  it('applies rounded-full for circle shape', async () => {
    const wrapper = await mountSuspended(UiAvatar, { props: { shape: 'circle', name: 'A' } })
    expect(wrapper.classes()).toContain('rounded-full')
  })

  it('applies rounded-lg for square shape', async () => {
    const wrapper = await mountSuspended(UiAvatar, { props: { shape: 'square', name: 'A' } })
    expect(wrapper.classes()).toContain('rounded-lg')
  })
})
