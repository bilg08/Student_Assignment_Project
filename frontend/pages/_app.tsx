import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayOut } from '../components/index';
import { SelectedAdContextProvider, IsAgainGetDatasProvider, CollectionContextProvider, IsUserLoggedContextProvider } from '../context/index';
export default function App({ Component, pageProps }: AppProps) {
  return (
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
  )
}
