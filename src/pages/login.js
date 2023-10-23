import { useEffect } from 'react';
import { useMyContext } from '@/store/passportStore';

export default function MyPage() {
  const { providerState, setProviderState, passportState: passportInstance, setPassportState } = useMyContext();
  console.log(passportInstance)

  useEffect(() => {
    async function handleLoginCallback() {
      if (!passportInstance) {
        return
      }
    try {
        console.log("login callback");
        await passportInstance.loginCallback();
    }
    catch (err) {
        console.error("login callback error", err);
    }
    }
    handleLoginCallback()
  }, []);

  return (
    <div>

      {/* Your page content goes here */}
    </div>
  );
}
