
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Lock, Unlock, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [cipherType, setCipherType] = useState("caesar");
  const [key, setKey] = useState("3");
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-emerald-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              CipherScribe
            </h1>
            <Lock className="w-12 h-12 text-emerald-400" />
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Advanced encryption and decryption tools for secure communication. 
            Protect your messages with military-grade ciphers.
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-slate-800/50 border-emerald-500/20 backdrop-blur-sm">
            <CardHeader className="border-b border-emerald-500/20">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-400" />
                <CardTitle className="text-2xl text-emerald-400">Cipher Operations</CardTitle>
              </div>
              <CardDescription className="text-slate-300">
                Choose your cipher method and transform your text
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Cipher Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="cipher-select" className="text-emerald-400 font-medium">
                    Cipher Method
                  </Label>
                  <Select value={cipherType} onValueChange={setCipherType}>
                    <SelectTrigger className="bg-slate-700/50 border-emerald-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-emerald-500/30">
                      <SelectItem value="caesar">Caesar Cipher</SelectItem>
                      <SelectItem value="rot13">ROT13</SelectItem>
                      <SelectItem value="base64">Base64</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {cipherType === "caesar" && (
                  <div>
                    <Label htmlFor="key-input" className="text-emerald-400 font-medium">
                      Shift Value
                    </Label>
                    <Input
                      id="key-input"
                      type="number"
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      className="bg-slate-700/50 border-emerald-500/30 text-white"
                      placeholder="Enter shift value"
                      min="1"
                      max="25"
                    />
                  </div>
                )}

                <div className="flex items-end gap-2">
                  <Button
                    onClick={encrypt}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
                    disabled={!inputText.trim()}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Encrypt
                  </Button>
                  <Button
                    onClick={decrypt}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white flex-1"
                    disabled={!inputText.trim()}
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Decrypt
                  </Button>
                </div>
              </div>

              {/* Text Areas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="input-text" className="text-emerald-400 font-medium mb-2 block">
                    Input Text
                  </Label>
                  <Textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="bg-slate-700/50 border-emerald-500/30 text-white min-h-[200px] resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="output-text" className="text-emerald-400 font-medium">
                      Output Text
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={swapTexts}
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                        disabled={!outputText.trim()}
                      >
                        Swap
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
                    placeholder="Encrypted/Decrypted text will appear here..."
                    className="bg-slate-700/30 border-emerald-500/30 text-white min-h-[200px] resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-slate-800/30 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Caesar Cipher
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  ROT13
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  A special case of Caesar cipher with a shift of 13. Applying ROT13 twice returns the original text.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Base64
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  An encoding scheme that converts binary data into ASCII characters using a 64-character set.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
