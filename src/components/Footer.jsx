import { motion } from 'framer-motion';
import { FileText, Heart, Mail } from 'lucide-react';
import { FaGithub, FaInstagram, FaSnapchatGhost } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/abdelhamed-nada',
      color: 'hover:text-gray-400',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/abdelhamed__nada',
      color: 'hover:text-pink-400',
      gradient: 'from-purple-500 via-pink-500 to-orange-500',
    },
    {
      name: 'Snapchat',
      icon: FaSnapchatGhost,
      url: 'https://snapchat.com/t/oHEGou7l',
      color: 'hover:text-yellow-400',
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10"
          style={{ backgroundSize: '200% 200%' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg blur-md opacity-75"
                />
                <div className="relative bg-black p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                PDF Master
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              معالج PDF الاحترافي - أداتك المثالية لتحويل ومعالجة ملفات PDF بسهولة وأمان تام
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              {['الرئيسية', 'الأدوات', 'حول', 'تواصل'].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link}`}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Developer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">المطور</h3>
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4"
              >
                <p className="text-white font-semibold mb-2">Abdelhamed Nada</p>
                <p className="text-gray-400 text-sm mb-3">
                  مطور ويب محترف متخصص في بناء تطبيقات ويب حديثة وفعالة
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-gray-400 ${social.color} transition-colors`}
                      title={social.name}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <span>© 2025 PDF Master. جميع الحقوق محفوظة.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>صُنع بـ</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>بواسطة</span>
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Abdelhamed Nada
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a
              href="mailto:contact@pdfmaster.com"
              className="hover:text-white transition-colors"
            >
              للتواصل والاستفسارات
            </a>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50" />
      </div>
    </footer>
  );
}
