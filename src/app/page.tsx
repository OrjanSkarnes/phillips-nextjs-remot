
import styles from './page.module.css'
import TVRemote from "@/app/components/TVRemote";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <TVRemote />
      </div>
    </main>
  )
}
