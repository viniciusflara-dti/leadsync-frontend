import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatCurrency (amount: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(amount)
}

export function formatDate (date: string): string {
  const timestamp = Date.parse(date)
  const currentDate = new Date(timestamp)

  const formattedDate = currentDate.toLocaleString('en-US', {
    month: 'long', // Full month name (e.g., January)
    day: 'numeric', // Day of the month (e.g., 4)
    hour: 'numeric', // Hour (e.g., 2)
    minute: 'numeric', // Minute (e.g., 37)
    hour12: true // Use 12-hour format (e.g., pm)
  })

  return formattedDate.replace('at', ' @')
}

export function getAvatarLetters (inputString: string): string {
  const words = inputString.split(' ')
  const firstLetters = words.map((word) => word.charAt(0))
  return firstLetters.join('')
}
