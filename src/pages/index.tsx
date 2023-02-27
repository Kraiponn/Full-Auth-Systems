import { useSession, signIn, signOut } from "next-auth/react";
import Image, { ImageLoaderProps } from "next/image";

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        {session ? (
          <div className="flex flex-col gap-1 item-center">
            <h1 className="text-red-500 text-4xl bg-yellow-300 mb-3">
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
              className="bg-blue-600 py-2 px-9 rounded-md text-white hover:bg-blue-800"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-600 py-2 px-9 rounded-md text-white hover:bg-blue-800"
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
}
