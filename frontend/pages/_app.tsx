import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayOut } from '../components/index';
import { SelectedAdContextProvider, UserContextProvider,IsAgainGetDatasProvider, CollectionContextProvider, IsUserLoggedContextProvider } from '../context/index';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <IsUserLoggedContextProvider>
        <IsAgainGetDatasProvider>
          <CollectionContextProvider>
            <SelectedAdContextProvider>
              <LayOut>
                <Component {...pageProps} />
              </LayOut>
            </SelectedAdContextProvider>
          </CollectionContextProvider>
        </IsAgainGetDatasProvider>
      </IsUserLoggedContextProvider>
  </UserContextProvider>
  );
}
