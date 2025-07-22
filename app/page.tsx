'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isOnline, setIsOnline] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      setDeferredPrompt(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Status Bar */}
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isOnline 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white animate-pulse'
          }`}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </div>
        </div>

        {/* Install Button */}
        {deferredPrompt && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={handleInstallClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
            >
              📱 Install App
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8 animate-pulse">
              Welcome to MyPWA
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Experience the future of web applications with our Progressive Web App. 
              Lightning fast, offline-capable, and installable on any device.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
                <p className="text-gray-300">Optimized performance with Next.js 14 and modern web technologies.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-white mb-3">Installable</h3>
                <p className="text-gray-300">Install directly from your browser and use like a native app.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold text-white mb-3">Offline Ready</h3>
                <p className="text-gray-300">Works seamlessly even when you're disconnected from the internet.</p>
              </div>
            </div>

            <div className="space-y-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-2xl">
                Get Started Now
              </button>
              
              <div className="text-gray-400">
                {isOnline ? (
                  <p>✅ You're online and ready to explore!</p>
                ) : (
                  <p>🔒 You're offline, but the app still works perfectly!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              Why Choose Our PWA?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🚀', title: 'Fast Loading', desc: 'Instant load times' },
                { icon: '📦', title: 'Cached Content', desc: 'Works offline' },
                { icon: '🔔', title: 'Push Notifications', desc: 'Stay engaged' },
                { icon: '🎨', title: 'Modern Design', desc: 'Beautiful UI/UX' },
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/10 mt-16">
          <p className="text-gray-400">
            Built with ❤️ using Next.js 14 • PWA Technology
          </p>
        </footer>
      </div>
    </main>
  );
}