import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LayOut } from "../components/index";
import {
	ModalContextProvider,
	SelectedAdContextProvider,
	UserContextProvider,
	IsAgainGetDatasProvider,
	CollectionContextProvider,
	IsUserLoggedContextProvider,
	PostStateContextProvider,
	SearchContextProvider
} from "../context/index";
export default function App({ Component, pageProps }: AppProps) {
	return (
    <SearchContextProvider>
      <ModalContextProvider>
        <UserContextProvider>
          <IsUserLoggedContextProvider>
            <IsAgainGetDatasProvider>
              <CollectionContextProvider>
                <SelectedAdContextProvider>
                  <LayOut>
                    <PostStateContextProvider>
                      <Component {...pageProps} />
                    </PostStateContextProvider>
                  </LayOut>
                </SelectedAdContextProvider>
              </CollectionContextProvider>
            </IsAgainGetDatasProvider>
          </IsUserLoggedContextProvider>
        </UserContextProvider>
      </ModalContextProvider>
    </SearchContextProvider>
  );
}
