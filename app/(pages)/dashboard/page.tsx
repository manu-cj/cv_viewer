"use client";
import CvForm from "@/app/components/dashboard/CvForm";
import CounterViewByDay from "@/app/components/dashboard/CounterViewByDay";
import CounterView from "@/app/components/dashboard/CounterView";
import CounterPrint from "@/app/components/dashboard/CounterPrint";
import CounterDownload from "@/app/components/dashboard/CounterDownload";
import ViewsLog from "@/app/components/dashboard/ViewsLog";
import DownloadLog from "@/app/components/dashboard/DownloadLog";
import FileList from "@/app/components/dashboard/FileList";
import PrintLog from "@/app/components/dashboard/PrintLog";

const Page = () => {

  return (
    <>
<div className="w-full flex flex-col items-center bg-gray-900 py-8 p-4 lg:p-8 rounded-lg shadow-lg space-y-10">
  {/* Section des compteurs avec disposition flex */}
  <div className="flex flex-wrap justify-around items-center w-full gap-6 py-8">
    <CounterViewByDay />
    <CounterView />
    <CounterPrint />
    <CounterDownload />
  </div>

  {/* Section du formulaire pour télécharger un CV */}
  <div className="w-full">
    <CvForm />
  </div>

  {/* Section pour afficher les fichiers téléchargés */}
  <div className="w-full">
    <FileList />
  </div>

  {/* Section des logs de vues et de téléchargements avec disposition flex */}
  <div className="flex flex-wrap justify-between items-start w-full gap-6">
    <ViewsLog />
    <DownloadLog />
    <PrintLog/>
  </div>
</div>
    </>  
  );
};

export default Page;
