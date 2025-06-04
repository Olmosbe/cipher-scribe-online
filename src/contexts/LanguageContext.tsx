
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'uz' | 'ru' | 'de' | 'tr' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: "CipherScribe",
    subtitle: "Advanced encryption and decryption tools for secure communication. Protect your messages with military-grade ciphers.",
    cipherOperations: "Cipher Operations",
    chooseCipherMethod: "Choose your cipher method and transform your text",
    cipherMethod: "Cipher Method",
    shiftValue: "Shift Value",
    enterShiftValue: "Enter shift value",
    password: "Password",
    enterPassword: "Enter password",
    encrypt: "Encrypt",
    decrypt: "Decrypt",
    inputText: "Input Text",
    outputText: "Output Text",
    enterTextHere: "Enter your text here...",
    encryptedText: "Encrypted/Decrypted text will appear here...",
    swap: "Swap",
    caesarTitle: "Caesar Cipher",
    caesarDesc: "A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.",
    rot13Title: "ROT13",
    rot13Desc: "A special case of Caesar cipher with a shift of 13. Applying ROT13 twice returns the original text.",
    base64Title: "Base64",
    base64Desc: "An encoding scheme that converts binary data into ASCII characters using a 64-character set.",
    aesTitle: "AES-256",
    aesDesc: "Advanced Encryption Standard with 256-bit keys for high-security encryption.",
    rsaTitle: "RSA",
    rsaDesc: "Asymmetric encryption using public-private key pairs for secure communication.",
    language: "Language",
    darkMode: "Dark Mode",
    footerText: "Built with modern encryption technologies for secure communication.",
    allRightsReserved: "All rights reserved."
  },
  uz: {
    title: "CipherScribe",
    subtitle: "Xavfsiz aloqa uchun ilg'or shifrlash va shifrni ochish vositalari. Xabarlaringizni harbiy darajadagi shifrlar bilan himoya qiling.",
    cipherOperations: "Shifrlash Operatsiyalari",
    chooseCipherMethod: "Shifrlash usulini tanlang va matnni o'zgartiring",
    cipherMethod: "Shifrlash Usuli",
    shiftValue: "Siljish Qiymati",
    enterShiftValue: "Siljish qiymatini kiriting",
    password: "Parol",
    enterPassword: "Parolni kiriting",
    encrypt: "Shifrlash",
    decrypt: "Shifrni Ochish",
    inputText: "Kirish Matni",
    outputText: "Chiqish Matni",
    enterTextHere: "Matnni shu yerga kiriting...",
    encryptedText: "Shifrlangan/Ochilgan matn shu yerda paydo bo'ladi...",
    swap: "Almashtirish",
    caesarTitle: "Caesar Shifri",
    caesarDesc: "Har bir harf alifboda belgilangan pozitsiyaga siljitilgan almashtiruv shifri.",
    rot13Title: "ROT13",
    rot13Desc: "13 ga siljigan Caesar shifrining maxsus turi. ROT13 ni ikki marta qo'llash asl matnni qaytaradi.",
    base64Title: "Base64",
    base64Desc: "Ikkilik ma'lumotlarni 64 ta belgili to'plam yordamida ASCII belgilarga aylantiruvchi kodlash sxemasi.",
    aesTitle: "AES-256",
    aesDesc: "Yuqori xavfsizlikdagi shifrlash uchun 256-bitli kalitlar bilan Advanced Encryption Standard.",
    rsaTitle: "RSA",
    rsaDesc: "Xavfsiz aloqa uchun ochiq-yopiq kalit juftlaridan foydalanadigan asimmetrik shifrlash.",
    language: "Til",
    darkMode: "Qorong'u Rejim",
    footerText: "Xavfsiz aloqa uchun zamonaviy shifrlash texnologiyalari bilan qurilgan.",
    allRightsReserved: "Barcha huquqlar himoyalangan."
  },
  ru: {
    title: "CipherScribe",
    subtitle: "Передовые инструменты шифрования и дешифрования для безопасной связи. Защитите свои сообщения с помощью военных шифров.",
    cipherOperations: "Операции Шифрования",
    chooseCipherMethod: "Выберите метод шифрования и преобразуйте текст",
    cipherMethod: "Метод Шифрования",
    shiftValue: "Значение Сдвига",
    enterShiftValue: "Введите значение сдвига",
    password: "Пароль",
    enterPassword: "Введите пароль",
    encrypt: "Зашифровать",
    decrypt: "Расшифровать",
    inputText: "Входной Текст",
    outputText: "Выходной Текст",
    enterTextHere: "Введите текст здесь...",
    encryptedText: "Зашифрованный/расшифрованный текст появится здесь...",
    swap: "Поменять",
    caesarTitle: "Шифр Цезаря",
    caesarDesc: "Шифр замещения, где каждая буква сдвигается на фиксированное количество позиций в алфавите.",
    rot13Title: "ROT13",
    rot13Desc: "Специальный случай шифра Цезаря со сдвигом на 13. Двойное применение ROT13 возвращает исходный текст.",
    base64Title: "Base64",
    base64Desc: "Схема кодирования, которая преобразует двоичные данные в ASCII символы используя набор из 64 символов.",
    aesTitle: "AES-256",
    aesDesc: "Advanced Encryption Standard с 256-битными ключами для высокозащищенного шифрования.",
    rsaTitle: "RSA",
    rsaDesc: "Асимметричное шифрование с использованием пар открытый-закрытый ключ для безопасной связи.",
    language: "Язык",
    darkMode: "Темный Режим",
    footerText: "Создано с использованием современных технологий шифрования для безопасной связи.",
    allRightsReserved: "Все права защищены."
  },
  de: {
    title: "CipherScribe",
    subtitle: "Fortschrittliche Verschlüsselungs- und Entschlüsselungstools für sichere Kommunikation. Schützen Sie Ihre Nachrichten mit militärischen Chiffren.",
    cipherOperations: "Chiffrier-Operationen",
    chooseCipherMethod: "Wählen Sie Ihre Chiffriermethode und transformieren Sie Ihren Text",
    cipherMethod: "Chiffrier-Methode",
    shiftValue: "Verschiebungswert",
    enterShiftValue: "Verschiebungswert eingeben",
    password: "Passwort",
    enterPassword: "Passwort eingeben",
    encrypt: "Verschlüsseln",
    decrypt: "Entschlüsseln",
    inputText: "Eingabetext",
    outputText: "Ausgabetext",
    enterTextHere: "Text hier eingeben...",
    encryptedText: "Verschlüsselter/entschlüsselter Text erscheint hier...",
    swap: "Tauschen",
    caesarTitle: "Caesar-Chiffre",
    caesarDesc: "Eine Substitutionschiffre, bei der jeder Buchstabe um eine feste Anzahl von Positionen im Alphabet verschoben wird.",
    rot13Title: "ROT13",
    rot13Desc: "Ein Spezialfall der Caesar-Chiffre mit einer Verschiebung um 13. Zweimalige Anwendung von ROT13 gibt den ursprünglichen Text zurück.",
    base64Title: "Base64",
    base64Desc: "Ein Kodierungsschema, das Binärdaten in ASCII-Zeichen mit einem 64-Zeichen-Satz umwandelt.",
    aesTitle: "AES-256",
    aesDesc: "Advanced Encryption Standard mit 256-Bit-Schlüsseln für hochsichere Verschlüsselung.",
    rsaTitle: "RSA",
    rsaDesc: "Asymmetrische Verschlüsselung mit öffentlich-privaten Schlüsselpaaren für sichere Kommunikation.",
    language: "Sprache",
    darkMode: "Dunkler Modus",
    footerText: "Erstellt mit modernen Verschlüsselungstechnologien für sichere Kommunikation.",
    allRightsReserved: "Alle Rechte vorbehalten."
  },
  tr: {
    title: "CipherScribe",
    subtitle: "Güvenli iletişim için gelişmiş şifreleme ve şifre çözme araçları. Mesajlarınızı askeri seviye şifrelerle koruyun.",
    cipherOperations: "Şifreleme İşlemleri",
    chooseCipherMethod: "Şifreleme yönteminizi seçin ve metninizi dönüştürün",
    cipherMethod: "Şifreleme Yöntemi",
    shiftValue: "Kaydırma Değeri",
    enterShiftValue: "Kaydırma değerini girin",
    password: "Şifre",
    enterPassword: "Şifreyi girin",
    encrypt: "Şifrele",
    decrypt: "Şifre Çöz",
    inputText: "Giriş Metni",
    outputText: "Çıkış Metni",
    enterTextHere: "Metninizi buraya girin...",
    encryptedText: "Şifrelenmiş/çözülmüş metin burada görünecek...",
    swap: "Değiştir",
    caesarTitle: "Caesar Şifresi",
    caesarDesc: "Her harfin alfabede sabit sayıda pozisyon kaydırıldığı bir değiştirme şifresi.",
    rot13Title: "ROT13",
    rot13Desc: "13 kaydırmalı Caesar şifresinin özel durumu. ROT13'ü iki kez uygulamak orijinal metni döndürür.",
    base64Title: "Base64",
    base64Desc: "İkili verileri 64 karakterlik bir set kullanarak ASCII karakterlere dönüştüren kodlama şeması.",
    aesTitle: "AES-256",
    aesDesc: "Yüksek güvenlikli şifreleme için 256-bit anahtarlarla Advanced Encryption Standard.",
    rsaTitle: "RSA",
    rsaDesc: "Güvenli iletişim için açık-özel anahtar çiftleri kullanan asimetrik şifreleme.",
    language: "Dil",
    darkMode: "Karanlık Mod",
    footerText: "Güvenli iletişim için modern şifreleme teknolojileriyle oluşturulmuştur.",
    allRightsReserved: "Tüm hakları saklıdır."
  },
  ko: {
    title: "CipherScribe",
    subtitle: "안전한 통신을 위한 고급 암호화 및 복호화 도구. 군사급 암호로 메시지를 보호하세요.",
    cipherOperations: "암호 작업",
    chooseCipherMethod: "암호화 방법을 선택하고 텍스트를 변환하세요",
    cipherMethod: "암호화 방법",
    shiftValue: "시프트 값",
    enterShiftValue: "시프트 값을 입력하세요",
    password: "비밀번호",
    enterPassword: "비밀번호를 입력하세요",
    encrypt: "암호화",
    decrypt: "복호화",
    inputText: "입력 텍스트",
    outputText: "출력 텍스트",
    enterTextHere: "여기에 텍스트를 입력하세요...",
    encryptedText: "암호화/복호화된 텍스트가 여기에 나타납니다...",
    swap: "교환",
    caesarTitle: "시저 암호",
    caesarDesc: "각 문자가 알파벳에서 고정된 위치만큼 이동하는 치환 암호입니다.",
    rot13Title: "ROT13",
    rot13Desc: "13만큼 시프트하는 시저 암호의 특별한 경우. ROT13을 두 번 적용하면 원본 텍스트가 반환됩니다.",
    base64Title: "Base64",
    base64Desc: "64개 문자 세트를 사용하여 이진 데이터를 ASCII 문자로 변환하는 인코딩 체계.",
    aesTitle: "AES-256",
    aesDesc: "고보안 암호화를 위한 256비트 키를 가진 Advanced Encryption Standard.",
    rsaTitle: "RSA",
    rsaDesc: "안전한 통신을 위해 공개-개인 키 쌍을 사용하는 비대칭 암호화.",
    language: "언어",
    darkMode: "다크 모드",
    footerText: "안전한 통신을 위한 현대적 암호화 기술로 구축되었습니다.",
    allRightsReserved: "모든 권리가 보호됩니다."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
