import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, Lock, Unlock, Shield, Zap, Moon, Sun, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { aesEncrypt, aesDecrypt, rsaEncrypt, rsaDecrypt } from "@/utils/cryptoUtils";
import Footer from "@/components/Footer";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [cipherType, setCipherType] = useState("caesar");
  const [key, setKey] = useState("3");
  const [password, setPassword] = useState("");
  const [rsaKeys, setRsaKeys] = useState<any>(null);
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  const caesarCipher = (text: string, shift: number, decode: boolean = false) => {
    if (decode) shift = -shift;
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift + 26) % 26) + start);
    });
  };

  const rot13 = (text: string) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  const base64Encode = (text: string) => {
    try {
      return btoa(text);
    } catch {
      return "Invalid input for Base64 encoding";
    }
  };

  const base64Decode = (text: string) => {
    try {
      return atob(text);
    } catch {
      return "Invalid Base64 input";
    }
  };

  const encrypt = () => {
    let result = "";
    const shift = parseInt(key) || 0;

    switch (cipherType) {
      case "caesar":
        result = caesarCipher(inputText, shift);
        break;
      case "rot13":
        result = rot13(inputText);
        break;
      case "base64":
        result = base64Encode(inputText);
        break;
      case "aes":
        if (!password) {
          toast({
            title: "Error",
            description: "Password is required for AES encryption",
            variant: "destructive",
          });
          return;
        }
        result = aesEncrypt(inputText, password);
        break;
      case "rsa":
        const rsaResult = rsaEncrypt(inputText);
        result = rsaResult.encrypted;
        setRsaKeys(rsaResult.keys);
        if (rsaResult.keys) {
          toast({
            title: "RSA Keys Generated",
            description: `Public: ${rsaResult.keys.public}`,
          });
        }
        break;
      default:
        result = inputText;
    }
    setOutputText(result);
  };

  const decrypt = () => {
    let result = "";
    const shift = parseInt(key) || 0;

    switch (cipherType) {
      case "caesar":
        result = caesarCipher(inputText, shift, true);
        break;
      case "rot13":
        result = rot13(inputText);
        break;
      case "base64":
        result = base64Decode(inputText);
        break;
      case "aes":
        if (!password) {
          toast({
            title: "Error",
            description: "Password is required for AES decryption",
            variant: "destructive",
          });
          return;
        }
        result = aesDecrypt(inputText, password);
        break;
      case "rsa":
        result = rsaDecrypt(inputText);
        break;
      default:
        result = inputText;
    }
    setOutputText(result);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const swapTexts = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white"
    : "min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-emerald-100 text-slate-900";

  return (
    <div className={themeClasses}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with controls */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger className={`w-48 ${isDarkMode ? 'bg-slate-700/50 border-emerald-500/30 text-white' : 'bg-white border-emerald-500/30 text-slate-900'}`}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className={isDarkMode ? 'bg-slate-800 border-emerald-500/30' : 'bg-white border-emerald-500/30'}>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sun className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-emerald-600'}`} />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <Moon className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-slate-400'}`} />
              </div>
              <Label className={`text-sm font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {t('darkMode')}
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-emerald-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <Lock className="w-12 h-12 text-emerald-400" />
          </div>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {t('subtitle')}
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <Card className={`${isDarkMode ? 'bg-slate-800/50 border-emerald-500/20' : 'bg-white/80 border-emerald-500/30'} backdrop-blur-sm`}>
            <CardHeader className="border-b border-emerald-500/20">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-400" />
                <CardTitle className="text-2xl text-emerald-400">{t('cipherOperations')}</CardTitle>
              </div>
              <CardDescription className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                {t('chooseCipherMethod')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Cipher Selection */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <Label htmlFor="cipher-select" className="text-emerald-400 font-medium">
                    {t('cipherMethod')}
                  </Label>
                  <Select value={cipherType} onValueChange={setCipherType}>
                    <SelectTrigger className={`${isDarkMode ? 'bg-slate-700/50 border-emerald-500/30 text-white' : 'bg-white border-emerald-500/30 text-slate-900'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-slate-800 border-emerald-500/30' : 'bg-white border-emerald-500/30'}>
                      <SelectItem value="caesar">Caesar Cipher</SelectItem>
                      <SelectItem value="rot13">ROT13</SelectItem>
                      <SelectItem value="base64">Base64</SelectItem>
                      <SelectItem value="aes">AES-256</SelectItem>
                      <SelectItem value="rsa">RSA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {cipherType === "caesar" && (
                  <div>
                    <Label htmlFor="key-input" className="text-emerald-400 font-medium">
                      {t('shiftValue')}
                    </Label>
                    <Input
                      id="key-input"
                      type="number"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className={`${isDarkMode ? 'bg-slate-700/50 border-emerald-500/30 text-white' : 'bg-white border-emerald-500/30 text-slate-900'}`}
                      placeholder={t('enterShiftValue')}
                      min="1"
                      max="25"
                    />
                  </div>
                )}

                {cipherType === "aes" && (
                  <div>
                    <Label htmlFor="password-input" className="text-emerald-400 font-medium">
                      {t('password')}
                    </Label>
                    <Input
                      id="password-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${isDarkMode ? 'bg-slate-700/50 border-emerald-500/30 text-white' : 'bg-white border-emerald-500/30 text-slate-900'}`}
                      placeholder={t('enterPassword')}
                    />
                  </div>
                )}

                <div className="flex items-end gap-2 md:col-span-2">
                  <Button
                    onClick={encrypt}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
                    disabled={!inputText.trim()}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    {t('encrypt')}
                  </Button>
                  <Button
                    onClick={decrypt}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white flex-1"
                    disabled={!inputText.trim()}
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    {t('decrypt')}
                  </Button>
                </div>
              </div>

              {/* RSA Keys Display */}
              {rsaKeys && (
                <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/30' : 'bg-slate-100'}`}>
                  <h4 className="text-emerald-400 font-medium mb-2">RSA Keys:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Public Key:</strong> {rsaKeys.public}
                    </div>
                    <div>
                      <strong>Private Key:</strong> {rsaKeys.private}
                    </div>
                  </div>
                </div>
              )}

              {/* Text Areas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="input-text" className="text-emerald-400 font-medium mb-2 block">
                    {t('inputText')}
                  </Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('enterTextHere')}
                    className={`${isDarkMode ? 'bg-slate-700/50 border-emerald-500/30 text-white' : 'bg-white border-emerald-500/30 text-slate-900'} min-h-[200px] resize-none`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="output-text" className="text-emerald-400 font-medium">
                      {t('outputText')}
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={swapTexts}
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                        disabled={!outputText.trim()}
                      >
                        {t('swap')}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(outputText)}
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                        disabled={!outputText.trim()}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="output-text"
                    value={outputText}
                    readOnly
                    placeholder={t('encryptedText')}
                    className={`${isDarkMode ? 'bg-slate-700/30 border-emerald-500/30 text-white' : 'bg-slate-50 border-emerald-500/30 text-slate-900'} min-h-[200px] resize-none`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
            <Card className={`${isDarkMode ? 'bg-slate-800/30 border-emerald-500/20' : 'bg-white/60 border-emerald-500/30'} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" />
                  {t('caesarTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-xs`}>
                  {t('caesarDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? 'bg-slate-800/30 border-emerald-500/20' : 'bg-white/60 border-emerald-500/30'} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4" />
                  {t('rot13Title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-xs`}>
                  {t('rot13Desc')}
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? 'bg-slate-800/30 border-emerald-500/20' : 'bg-white/60 border-emerald-500/30'} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm">
                  <Lock className="w-4 h-4" />
                  {t('base64Title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-xs`}>
                  {t('base64Desc')}
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? 'bg-slate-800/30 border-emerald-500/20' : 'bg-white/60 border-emerald-500/30'} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" />
                  {t('aesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-xs`}>
                  {t('aesDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className={`${isDarkMode ? 'bg-slate-800/30 border-emerald-500/20' : 'bg-white/60 border-emerald-500/30'} backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2 text-sm">
                  <Lock className="w-4 h-4" />
                  {t('rsaTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} text-xs`}>
                  {t('rsaDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
