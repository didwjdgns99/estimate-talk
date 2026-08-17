import CustomorDetail from "./customorDetail";

export default function EstimateDetail() {
  return (
    <section className="max-w-5xl mx-auto flex flex-col rounded-2xl overflow-hidden">
      <div className="bg-primary/15 flex justify-center w-full py-10 ">
        <h2 className="text-4xl font-bold text-black/70">견 적 서</h2>
      </div>
      <CustomorDetail />
    </section>
  );
}
