import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Settings, Type, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { textToPdf, downloadBlob } from '@/lib/pdfProcessor';

export default function PDFConverter() {
  const [text, setText] = useState('');
  const [converting, setConverting] = useState(false);
  const [options, setOptions] = useState({
    fontSize: 12,
    fontFamily: 'helvetica',
    pageSize: 'a4',
  });
  const [showOptions, setShowOptions] = useState(false);

  const handleConvert = async () => {
    if (!text.trim()) {
      alert('الرجاء إدخال نص للتحويل');
      return;
    }

    setConverting(true);

    try {
      const pdfBlob = await textToPdf(text, options);
      downloadBlob(pdfBlob, 'converted-document.pdf');
    } catch (error) {
      console.error('Error converting to PDF:', error);
      alert('حدث خطأ أثناء التحويل');
    } finally {
      setConverting(false);
    }
  };

  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              تحويل نص إلى PDF
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            اكتب أو الصق النص الخاص بك وحوّله إلى ملف PDF احترافي
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8"
        >
          {/* Text Area */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-purple-400" />
              <label className="text-white font-semibold">النص المراد تحويله</label>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="اكتب أو الصق النص هنا..."
              rows={12}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
            <div className="mt-2 text-sm text-gray-400">
              عدد الأحرف: {text.length}
            </div>
          </div>

          {/* Options Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>{showOptions ? 'إخفاء الخيارات' : 'عرض الخيارات'}</span>
            </button>
          </div>

          {/* Options Panel */}
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Font Size */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Type className="w-4 h-4" />
                    حجم الخط
                  </label>
                  <select
                    value={options.fontSize}
                    onChange={(e) => setOptions({ ...options, fontSize: parseInt(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                  </select>
                </div>

                {/* Font Family */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <AlignLeft className="w-4 h-4" />
                    نوع الخط
                  </label>
                  <select
                    value={options.fontFamily}
                    onChange={(e) => setOptions({ ...options, fontFamily: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="helvetica">Helvetica</option>
                    <option value="times">Times</option>
                    <option value="courier">Courier</option>
                  </select>
                </div>

                {/* Page Size */}
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <FileText className="w-4 h-4" />
                    حجم الصفحة
                  </label>
                  <select
                    value={options.pageSize}
                    onChange={(e) => setOptions({ ...options, pageSize: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Convert Button */}
          <Button
            onClick={handleConvert}
            disabled={converting || !text.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl font-semibold text-lg group"
          >
            {converting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <Download className="w-5 h-5 inline-block ml-2" />
                تحويل وتحميل PDF
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
