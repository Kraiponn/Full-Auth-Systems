import { useSession, signIn, signOut } from "next-auth/react";
import Image, { ImageLoaderProps } from "next/image";

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

export default function Home() {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        {session ? (
          <div className="flex flex-col gap-1 item-center">
            <h1 className="mb-3 text-4xl text-red-500 bg-yellow-300">
              {session?.user?.name}
            </h1>

            <div className="relative">
              <Image
                src={session?.user?.image as string}
                alt={session?.user?.name as string}
                width={0}
                height={0}
                sizes="100vw"
                priority
                className="w-[128px] h-32 rounded-full m-auto mb-5"
              />
            </div>

            <h4>{session?.user?.email}</h4>

            <button
              onClick={() => signOut()}
              className="py-2 text-white bg-blue-600 rounded-md px-9 hover:bg-blue-800"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="py-2 text-white bg-blue-600 rounded-md px-9 hover:bg-blue-800"
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
}
