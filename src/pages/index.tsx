import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { Timeline } from "~/components/timeline";
import Image from "next/image";
import { RotatingImage } from "~/components/rotating-image";

export default function Home() {
  const hello = api.example.hello.useQuery({
    text: "would you like some chicken nuggets?",
  });

  const btn =
    "rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 mt-8";

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ff0b0b] to-[#116675]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Chicken
            <span className="text-[hsl(49,86%,58%)]">
              <span className="animation-delay-100 animate-bounce"> N</span>
              <span className="animation-delay-200 animate-bounce">u</span>
              <span className="animation-delay-300 animate-bounce">g</span>
              <span className="animation-delay-400 animate-bounce">g</span>
              <span className="animation-delay-500 animate-bounce">e</span>
              <span className="animation-delay-600 animate-bounce">t </span>
            </span>
            App
          </h1>
          <div className="">
            <Image
              src="/images/nugget.png"
              width={1919 * 0.4}
              height={838 * 0.4}
              alt="nugget"
            ></Image>
          </div>
          <div className="">
            <h2 className="text-l animate-bounce font-bold tracking-tight text-white sm:text-[4rem]">
              Explore the chicken nugget world!
            </h2>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
        <div className="">
          <p className="tracking-tight text-white sm:text-[1.5rem]">
            Vote in the chicken nugget competition!
          </p>
        </div>
        <Link href="/vote">
          <button className={btn}>Vote</button>
        </Link>
        <RotatingImage />
        <div className="py-32"></div>
        <div className="">
          <h2 className="text-l animate-bounce font-bold tracking-tight text-white sm:text-[5rem]">
            Why are chicken nuggets so good?
          </h2>
        </div>
        <Timeline />
        <div className="py-32"></div>
        <div className="text-center">
          <h2 className="text-l animate-bounce font-bold tracking-tight text-white sm:text-[5rem]">
            What shape should chicken nuggets never be?
          </h2>
          <p className="text-6xl font-bold text-[hsl(49,86%,58%)]">Triangle!</p>
        </div>
        <Image
          src="/images/red-x-nugget.png"
          width={903}
          height={621}
          alt="red-x"
        ></Image>
        <div className="text-center">
          <h2 className="text-l animate-bounce font-bold tracking-tight text-white sm:text-[5rem]">
            Who has the best chicken nuggets?
          </h2>
        </div>
        <Image
          src="/images/kfc-logo.png"
          width={981}
          height={638}
          alt="red-x"
        ></Image>
        <div className="py-32"></div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
