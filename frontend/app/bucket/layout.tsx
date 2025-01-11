import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type Props = {
  children: React.ReactNode;
};

const BucketLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Token Buckets</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BucketLayout;
