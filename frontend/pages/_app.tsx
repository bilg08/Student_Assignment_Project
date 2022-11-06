import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayOut } from '../components/index';
import {SelectedAdContextProvider,IsAgainGetDatasProvider,CollectionContextProvider} from '../context/index';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <IsAgainGetDatasProvider>
      <CollectionContextProvider>
    <SelectedAdContextProvider>
        <LayOut>
            <Component {...pageProps} />
        </LayOut>
      </SelectedAdContextProvider>
    </CollectionContextProvider>
    </IsAgainGetDatasProvider>
  )
}
