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
  SearchContextProvider,
  LoaderContextProvider,
} from "../context";
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
