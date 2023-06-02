
import styles from './page.module.scss'
import TVRemote from "@/app/components/TVRemote";

export default function Home() {
  return (
    <main className={styles.main}>
        <TVRemote />
    </main>
  )
}
