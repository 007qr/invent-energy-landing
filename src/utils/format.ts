export function formatUSPhone(phoneNumberString: string) {
  const raw = String(phoneNumberString ?? "");
  const digitsAll = raw.replace(/\D/g, "");

  const maxDigits = 10;
  const main = digitsAll.slice(0, maxDigits);

  const a = main.slice(0, 3);
  const b = main.slice(3, 6);
  const c = main.slice(6, 10);

  let formatted = "";
  if (main.length === 0) formatted = "";
  else if (main.length <= 3) formatted = `(${a}`;
  else if (main.length <= 6) formatted = `(${a}) ${b}`;
  else formatted = `(${a}) ${b}-${c}`;

  return formatted;
}
const FormatUtils = {
  formatUSPhone,
};

export default FormatUtils;
