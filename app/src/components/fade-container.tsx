import { Transition } from '@headlessui/react'

interface FadeContainerProps {
  show: boolean
  children: React.ReactNode
}
export default function FadeContainer({ children, show }: FadeContainerProps) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-200 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  )
}
