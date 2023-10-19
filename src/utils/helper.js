function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(d) {
  if (!d) return 'NIL';
  const date = new Date(d);
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

export function formatPaymentMode (mode) {
  switch (mode) {
    case "CASH":
      return "Cash"
    case "BANK_TRANSFER":
      return "Bank Transfer"
    default:
      return mode;
  }
}

export function formatNumber(num, isDecimal = false) {
  if (num !== undefined && num !== null) {
    let formattedNumber = Number(num);

    if (isDecimal) {
      formattedNumber = formattedNumber.toFixed(2)
    }

    return formattedNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return "NIL"
};
const getLocalItem = (item) => localStorage.getItem(item);

const setLocalItem = (item, value) => localStorage.setItem(item, value);

const clearLocalItem = (item) => localStorage.clear(item);

export const getLocalAccessToken = () => getLocalItem('plt_ng_access_token');
export const getLocalRefreshToken = () => getLocalItem('plt_ng_refresh_token');
export const getLocalUser = () => getLocalItem('plt_ng_user');

export const setLocalAccessToken = (value) => setLocalItem('plt_ng_access_token', value);
export const setLocalRefreshToken = (value) => setLocalItem('plt_ng_refresh_token', value);
export const setLocalUser = (value) => setLocalItem('plt_ng_user', value);

export const clearLocalAccessToken = () => clearLocalItem('plt_ng_access_token');
export const clearLocalRefreshToken = () => clearLocalItem('plt_ng_refresh_token');
export const clearLocalUser = () => clearLocalItem('plt_ng_user');

export const getParentId = (adminLevels, currentOrder) => {
  const t = adminLevels.filter((level) => {
    if (currentOrder === 1) {
      return true;
    }
    return level.levelOrder === currentOrder - 1;
  })[0];

  return t?.id;
};

export const logout = () => {
  clearLocalAccessToken();
  clearLocalRefreshToken();
  clearLocalUser();

  window.location.reload();
};

export const stringToHslColor = (text = '', s = 50, l = 80) => {
  const str = text.replace(' ', '');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const calculateOffset = (page, pageSize) => {
  const offSet = (page - 1) * pageSize;
  return offSet;
}

export const thousandFormatter = (num) => new Intl.NumberFormat().format(num);
