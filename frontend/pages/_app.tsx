import type { AppProps } from "next/app";
import { LayOut } from "../components/index";
import {
  CollectionContextProvider, IsAgainGetDatasProvider, IsUserLoggedContextProvider, LoaderContextProvider, ModalContextProvider, PostStateContextProvider,
  SearchContextProvider, SelectedAdContextProvider,
  UserContextProvider
} from "../context";
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoaderContextProvider>
      <IsAgainGetDatasProvider>
        <SearchContextProvider>
          <ModalContextProvider>
            <UserContextProvider>
              <IsUserLoggedContextProvider>
                <CollectionContextProvider>
                  <SelectedAdContextProvider>
                    <LayOut>
                      <PostStateContextProvider>
                        <Component {...pageProps} />
                      </PostStateContextProvider>
                    </LayOut>
                  </SelectedAdContextProvider>
                </CollectionContextProvider>
              </IsUserLoggedContextProvider>
            </UserContextProvider>
          </ModalContextProvider>
        </SearchContextProvider>
      </IsAgainGetDatasProvider>
    </LoaderContextProvider>
  );
}
