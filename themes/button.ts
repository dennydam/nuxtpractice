import { tv } from 'tailwind-variants'

export default tv({
  base: [
    'inline-flex items-center justify-center font-medium',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed',
  ].join(' '),
  variants: {
    variant: {
      brand:     'bg-[#ffadc4] text-white hover:bg-pink-400 focus:ring-pink-300 disabled:bg-pink-200',
      primary:   'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 disabled:bg-emerald-300',
      secondary: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500 disabled:bg-slate-300',
      outline:   'border border-emerald-600 text-emerald-600 bg-transparent hover:bg-emerald-50 focus:ring-emerald-500 disabled:border-emerald-300 disabled:text-emerald-300',
      ghost:     'text-slate-600 bg-transparent hover:bg-slate-100 focus:ring-slate-400 disabled:text-slate-300',
      danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
      md: 'px-4 py-2 text-sm rounded-lg gap-2',
      lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
    },
    block: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    block: false,
  },
})
