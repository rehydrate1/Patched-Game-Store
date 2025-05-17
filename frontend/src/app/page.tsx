import Dashboard from './Dashboard'
import MainHeader from "@/components/UI/Headers/MainHeader/MainHeader";
import ShopHeader from "@/components/UI/Headers/ShopHeader/ShopHeader";



export const metadata = {
    title: "Patched",
    description: "Patched - цифровой магазин игр",
}


export default function Home() {
  return (
    <>
      <MainHeader />
        <ShopHeader />
      <Dashboard />
    </>
  );
}
