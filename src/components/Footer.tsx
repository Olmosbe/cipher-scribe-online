
import React from 'react';
import { Shield, Github, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-emerald-500/20 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-400" />
            <div>
              <h3 className="text-xl font-bold text-emerald-400">{t('title')}</h3>
              <p className="text-slate-300 text-sm">{t('footerText')}</p>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="text-emerald-400 font-semibold mb-3">Security Features</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>Caesar & ROT13 Ciphers</li>
              <li>Base64 Encoding</li>
              <li>AES-256 Encryption</li>
              <li>RSA Algorithm</li>
            </ul>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-emerald-400 font-semibold mb-3">Connect</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <Github className="w-5 h-5 text-slate-300 hover:text-emerald-400 cursor-pointer" />
              <Mail className="w-5 h-5 text-slate-300 hover:text-emerald-400 cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-emerald-500/10 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 CipherScribe. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
