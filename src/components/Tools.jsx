import { motion } from 'framer-motion';
import {
  FileText,
  FilePlus,
  Scissors,
  Minimize2,
  FileSignature,
  FileType,
  Combine,
  Download,
} from 'lucide-react';

export default function Tools() {
  const tools = [
    {
      icon: FileText,
      title: 'تحويل نص إلى PDF',
      description: 'حوّل النصوص والملفات النصية إلى PDF منسق بشكل احترافي',
      color: 'from-purple-500 to-pink-500',
      delay: 0.1,
    },
    {
      icon: FileType,
      title: 'تحويل Word إلى PDF',
      description: 'حوّل ملفات Word و Markdown إلى PDF بجودة عالية',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.2,
    },
    {
      icon: Combine,
      title: 'دمج ملفات PDF',
      description: 'ادمج عدة ملفات PDF في ملف واحد بسهولة',
      color: 'from-green-500 to-emerald-500',
      delay: 0.3,
    },
    {
      icon: Scissors,
      title: 'تقسيم PDF',
      description: 'قسّم ملف PDF إلى صفحات منفصلة أو مجموعات',
      color: 'from-orange-500 to-red-500',
      delay: 0.4,
    },
    {
      icon: Minimize2,
      title: 'ضغط PDF',
      description: 'قلل حجم ملفات PDF مع الحفاظ على الجودة',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.5,
    },
    {
      icon: FileSignature,
      title: 'توقيع إلكتروني',
      description: 'أضف توقيعك الإلكتروني على ملفات PDF بأمان',
      color: 'from-pink-500 to-rose-500',
      delay: 0.6,
    },
    {
      icon: FilePlus,
      title: 'إضافة صفحات',
      description: 'أضف صفحات جديدة أو أرقام صفحات لملفات PDF',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.7,
    },
    {
      icon: Download,
      title: 'تحميل وحفظ',
      description: 'حمّل ملفاتك المعالجة بصيغة PDF عالية الجودة',
      color: 'from-teal-500 to-green-500',
      delay: 0.8,
    },
  ];

  return (
    <section id="الأدوات" className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              أدوات قوية
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            مجموعة شاملة من الأدوات الاحترافية لمعالجة ملفات PDF بكل سهولة
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: tool.delay, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Icon */}
              <div className="relative mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-block p-4 rounded-xl bg-gradient-to-br ${tool.color}`}
                >
                  <tool.icon className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2 relative">
                {tool.title}
              </h3>
              <p className="text-gray-400 text-sm relative">{tool.description}</p>

              {/* Hover Effect Line */}
              <div className={`h-1 w-0 bg-gradient-to-r ${tool.color} group-hover:w-full transition-all duration-500 rounded-full mt-4`} />

              {/* Corner Decoration */}
              <motion.div
                className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${tool.color} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg shadow-purple-500/50"
          >
            جرّب جميع الأدوات مجاناً
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
