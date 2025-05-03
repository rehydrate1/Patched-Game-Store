import Dashboard from './Dashboard'
import Header from "@/components/UI/Header/Header";



export const metadata = {
    title: "Patched",
    description: "Patched - цифровой магазин игр",
}


export default function Home() {
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}
