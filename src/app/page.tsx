import Image from 'next/image'
import Link from 'next/link'
import Greeting from './components/Greeting'

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4">
        <Greeting></Greeting>
      </div>
    </main>
  )
}
