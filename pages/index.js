import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [startupInput, setStartupInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startup: startupInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setStartupInput("");
  }

  return (
    <div>
      <Head>
        <title>Startup Name Generator | OpenAI</title>
        <link rel="icon" href="/shuttle.png" />
      </Head>

      <main className={styles.main}>
        <img src="/shuttle.png" className={styles.icon} />
        <h3>Name my Genz startup</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="startup"
            placeholder="Enter a startup domain"
            value={startupInput}
            onChange={(e) => setStartupInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
        <iframe
          width="336"
          height="189"
          src="https://www.youtube.com/embed/3K1a4quAD7w"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </main>
      <footer className={styles.footer}>
        Made by <a href="https://alisolanki.com">Ali Solanki</a>
      </footer>
    </div>
  );
}
