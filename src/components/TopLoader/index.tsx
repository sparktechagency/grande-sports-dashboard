import NextTopLoader from "nextjs-toploader"

const TopLoader = () => {
  return (
    <NextTopLoader
      color="linear-gradient(to bottom, var(--primary), black)"
      initialPosition={0.2}
      crawlSpeed={200}
      height={5}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px var(--primary),0 0 5px var(--secondary)"
    />
  )
}

export default TopLoader
