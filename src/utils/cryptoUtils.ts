
import CryptoJS from 'crypto-js';

export const aesEncrypt = (text: string, password: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(text, password).toString();
    return encrypted;
  } catch (error) {
    return "Error: AES encryption failed";
  }
};

export const aesDecrypt = (encryptedText: string, password: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, password);
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    return result || "Error: Invalid password or corrupted data";
  } catch (error) {
    return "Error: AES decryption failed";
  }
};

// Simple RSA-like encryption (for demonstration - real RSA would require crypto libraries)
export const generateRSAKeys = () => {
  // This is a simplified demonstration - real RSA implementation would be much more complex
  const p = 61;
  const q = 53;
  const n = p * q; // 3233
  const phi = (p - 1) * (q - 1); // 3120
  const e = 17; // public exponent
  
  // Find private exponent d
  let d = 1;
  while ((d * e) % phi !== 1) {
    d++;
  }
  
  return {
    publicKey: { n, e },
    privateKey: { n, d }
  };
};

export const rsaEncrypt = (text: string): { encrypted: string; keys: any } => {
  try {
    // For demonstration, we'll use Base64 with a simple transformation
    // Real RSA would use proper mathematical operations
    const keys = generateRSAKeys();
    const base64 = btoa(text);
    const encrypted = base64.split('').reverse().join(''); // Simple transformation
    
    return {
      encrypted: `RSA:${encrypted}`,
      keys: {
        public: `n=${keys.publicKey.n}, e=${keys.publicKey.e}`,
        private: `n=${keys.privateKey.n}, d=${keys.privateKey.d}`
      }
    };
  } catch (error) {
    return {
      encrypted: "Error: RSA encryption failed",
      keys: null
    };
  }
};

export const rsaDecrypt = (encryptedText: string): string => {
  try {
    if (!encryptedText.startsWith('RSA:')) {
      return "Error: Invalid RSA format";
    }
    
    const encrypted = encryptedText.substring(4);
    const reversed = encrypted.split('').reverse().join('');
    const decrypted = atob(reversed);
    
    return decrypted;
  } catch (error) {
    return "Error: RSA decryption failed";
  }
};
