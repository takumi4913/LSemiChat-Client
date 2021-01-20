import Link from 'next/link'
import Layout from '../components/layout/layout'

export default function Home() {

  return (
    <Layout requiredAuth={false}>
      Home
    </Layout>
  )
}