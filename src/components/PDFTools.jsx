import { useState } from 'react';
import { motion } from 'framer-motion';
import { Combine, Scissors, Minimize2, RotateCw, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import FileUploader from './FileUploader';
import { mergePdfs, splitPdf, compressPdf, rotatePdf, addPageNumbers, downloadBlob } from '@/lib/pdfProcessor';

export default function PDFTools() {
  const [activeTab, setActiveTab] = useState('merge');
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

  const tools = [
    { id: 'merge', name: 'دمج PDF', icon: Combine, color: 'from-green-500 to-emerald-500' },
    { id: 'split', name: 'تقسيم PDF', icon: Scissors, color: 'from-orange-500 to-red-500' },
    { id: 'compress', name: 'ضغط PDF', icon: Minimize2, color: 'from-yellow-500 to-orange-500' },
    { id: 'rotate', name: 'تدوير PDF', icon: RotateCw, color: 'from-blue-500 to-cyan-500' },
    { id: 'numbers', name: 'ترقيم الصفحات', icon: Hash, color: 'from-purple-500 to-pink-500' },
  ];

  const handleFileSelect = (file) => {
    if (activeTab === 'merge') {
      setFiles([...files, file]);
    } else {
      setFiles([file]);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      alert('الرجاء رفع ملف PDF أولاً');
      return;
    }

    setProcessing(true);

    try {
      let result;
      let filename;

      switch (activeTab) {
        case 'merge':
          if (files.length < 2) {
            alert('يجب رفع ملفين على الأقل للدمج');
            setProcessing(false);
            return;
          }
          result = await mergePdfs(files);
          filename = 'merged-document.pdf';
          downloadBlob(result, filename);
          break;

        case 'split':
          const splitResults = await splitPdf(files[0]);
          splitResults.forEach((item) => {
            downloadBlob(item.blob, `page-${item.pageNumber}.pdf`);
          });
          alert(`تم تقسيم الملف إلى ${splitResults.length} صفحة`);
          break;

        case 'compress':
          result = await compressPdf(files[0]);
          filename = 'compressed-document.pdf';
          downloadBlob(result, filename);
          break;

        case 'rotate':
          result = await rotatePdf(files[0], 90);
          filename = 'rotated-document.pdf';
          downloadBlob(result, filename);
          break;

        case 'numbers':
          result = await addPageNumbers(files[0]);
          filename = 'numbered-document.pdf';
          downloadBlob(result, filename);
          break;

        default:
          break;
      }

      setFiles([]);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('حدث خطأ أثناء المعالجة');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              أدوات معالجة PDF
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            أدوات متقدمة لمعالجة ملفات PDF بكل احترافية
          </p>
        </motion.div>

        {/* Tool Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(tool.id);
                setFiles([]);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tool.id
                  ? `bg-gradient-to-r ${tool.color} text-white shadow-lg`
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <tool.icon className="w-5 h-5" />
              {tool.name}
            </motion.button>
          ))}
        </div>

        {/* Tool Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
        >
          {/* Instructions */}
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-white font-semibold mb-2">التعليمات:</h3>
            <p className="text-gray-400 text-sm">
              {activeTab === 'merge' && 'ارفع ملفين أو أكثر من ملفات PDF لدمجها في ملف واحد'}
              {activeTab === 'split' && 'ارفع ملف PDF لتقسيمه إلى صفحات منفصلة'}
              {activeTab === 'compress' && 'ارفع ملف PDF لضغطه وتقليل حجمه'}
              {activeTab === 'rotate' && 'ارفع ملف PDF لتدوير صفحاته 90 درجة'}
              {activeTab === 'numbers' && 'ارفع ملف PDF لإضافة أرقام الصفحات'}
            </p>
          </div>

          {/* File Uploader */}
          <FileUploader
            onFileSelect={handleFileSelect}
            acceptedFileTypes={{
              'application/pdf': ['.pdf'],
            }}
          />

          {/* Files List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">
                الملفات المرفوعة ({files.length})
              </h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3"
                  >
                    <span className="text-white text-sm">{file.name}</span>
                    <button
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process Button */}
          <Button
            onClick={handleProcess}
            disabled={processing || files.length === 0}
            className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl font-semibold text-lg"
          >
            {processing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'معالجة وتحميل'
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
