import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Footer from './components/Footer';
import Login from './components/Login';
import PDFConverter from './components/PDFConverter';
import PDFTools from './components/PDFTools';
import { getCurrentUser, logout, isAuthenticated } from './lib/auth';
import { Button } from '@/components/ui/button.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Login Modal */}
      {showLogin && !user && (
        <Login onSuccess={handleLoginSuccess} />
      )}

      {/* User Info Bar */}
      {user && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-20 left-4 right-4 md:left-auto md:right-4 z-40 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-3 flex items-center justify-between gap-3 max-w-xs"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user.name}</p>
              <p className="text-gray-400 text-xs">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            size="sm"
            variant="ghost"
            className="text-red-400 hover:text-red-300"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      <Header onLoginClick={handleLoginClick} user={user} />
      <Hero onGetStarted={handleLoginClick} />

      {/* Main Content - Only show if logged in */}
      {user ? (
        <>
          <PDFConverter />
          <PDFTools />
        </>
      ) : (
        <section className="relative py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  سجل دخولك للبدء
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                قم بتسجيل الدخول أو إنشاء حساب جديد للوصول إلى جميع أدوات معالجة PDF
              </p>
              <Button
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6"
              >
                تسجيل الدخول الآن
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      <Tools />

      {/* About Section */}
      <section id="حول" className="relative py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                لماذا PDF Master؟
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'سريع وفعال',
                  description: 'معالجة فورية لملفاتك دون انتظار أو تأخير',
                  gradient: 'from-yellow-500 to-orange-500',
                },
                {
                  title: 'آمن ومشفر',
                  description: 'حماية كاملة لملفاتك مع تشفير من الدرجة العسكرية',
                  gradient: 'from-green-500 to-emerald-500',
                },
                {
                  title: 'سهل الاستخدام',
                  description: 'واجهة بسيطة وسلسة تناسب الجميع',
                  gradient: 'from-blue-500 to-cyan-500',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="تواصل" className="relative py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                تواصل معنا
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              هل لديك سؤال أو استفسار؟ نحن هنا لمساعدتك
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8"
            >
              <p className="text-gray-300 mb-6">
                للتواصل والاستفسارات، يمكنك التواصل مع المطور مباشرة عبر وسائل التواصل الاجتماعي
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://instagram.com/abdelhamed__nada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                >
                  Instagram
                </a>
                <a
                  href="https://snapchat.com/t/oHEGou7l"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full text-black font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                >
                  Snapchat
                </a>
                <a
                  href="https://github.com/abdelhamed-nada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-gray-500/50 transition-all"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
