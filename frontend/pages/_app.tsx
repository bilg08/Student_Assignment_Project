import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayOut } from '../components/index';
import {CollectionContextProvider} from '../context/isActive'
import {SelectedAdContextProvider} from '../context/index';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CollectionContextProvider>
    <SelectedAdContextProvider>
        <LayOut>
            <Component {...pageProps} />
        </LayOut>
      </SelectedAdContextProvider>
    </CollectionContextProvider>

      
  )
}
