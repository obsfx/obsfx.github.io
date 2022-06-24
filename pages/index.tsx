import type { NextPage } from "next";
import Head from "../components/Head";
import HomeLayout from "../layouts/home";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <main>
      <Head
        title="Ömercan Balandı"
        description="A passionate software developer based in Izmir, Turkey."
      />
      <MainLayout>
        <HomeLayout />
      </MainLayout>
    </main>
  );
};

export default Home;
