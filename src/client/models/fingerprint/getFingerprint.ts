import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  return fp.get();
};
