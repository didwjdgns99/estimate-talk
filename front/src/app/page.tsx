import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-main-text">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-bold">견적톡</h1>
        <p className="mt-3 text-secondary-text">
          소상공인을 위한 간편 견적서 작성 서비스
        </p>
      </section>
    </main>
  );
}
