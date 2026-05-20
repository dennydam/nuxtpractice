import { tv } from 'tailwind-variants'

export default tv({
  slots: {
    root:   'flex flex-col gap-1.5',
    label:  'text-sm font-medium text-slate-700',
    input: [
      'w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none',
      'transition-colors duration-150 placeholder:text-slate-400',
      'focus:ring-2 focus:ring-offset-0',
    ].join(' '),
    helper: 'text-xs text-slate-500',
    error:  'text-xs text-red-500',
  },
  variants: {
    hasError: {
      true:  { input: 'border-red-400 focus:border-red-400 focus:ring-red-200' },
      false: { input: 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-100' },
    },
    disabled: {
      true:  { input: 'cursor-not-allowed bg-slate-100 text-slate-400' },
      false: { input: 'bg-white' },
    },
  },
  defaultVariants: {
    hasError: false,
    disabled: false,
  },
})
