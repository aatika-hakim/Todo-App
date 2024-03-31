import Image from 'next/image'
import Todo from './components/Todo'

export default function Home() {
  return (
    <main className="flex">
      <Todo />
    </main>
  )
}
