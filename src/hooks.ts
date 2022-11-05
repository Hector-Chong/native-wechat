import {useEffect, useState} from 'react';
import {isWchatInstalled} from '.';

export const useWechatInstalled = () => {
  const [hasInstalledWechat, setHasInstalledWechat] = useState(false);

  useEffect(() => {
    isWchatInstalled().then(setHasInstalledWechat);
  }, []);

  return hasInstalledWechat;
};
