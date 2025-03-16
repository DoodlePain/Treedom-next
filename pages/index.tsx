import MultiStepForm from "@/pages/components/MultiStepForm";

export default function Home() {
  return (
    <div className="flex flex-col md:max-w-[500px] h-screen items-start justify-start md:justify-center mx-auto p-4">
      <div className="md:h-[200px] flex flex-col md:justify-center">
        <h1 className="font-bold text-2xl">Welcome Treedom people! 🌳</h1>
        <p>This is a multi-step form example using Next.js + React</p>
      </div>
      <MultiStepForm />
    </div>
  );
}
