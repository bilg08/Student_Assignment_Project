import type { AppProps } from "next/app";
import { LayOut } from "../components/index";
import {
	CollectionContextProvider,
	IsAgainGetDatasProvider,
	IsUserLoggedContextProvider,
	LoaderContextProvider,
	ModalContextProvider,
	SidebarContextProvider,
	SearchContextProvider,
	SelectedAdContextProvider,
	UserContextProvider,
} from "../context";
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<IsUserLoggedContextProvider>
			<LoaderContextProvider>
				<IsAgainGetDatasProvider>
					<SearchContextProvider>
						<ModalContextProvider>
							<UserContextProvider>
								<CollectionContextProvider>
									<SelectedAdContextProvider>
										<LayOut>
											<SidebarContextProvider>
												<Component {...pageProps} />
											</SidebarContextProvider>
										</LayOut>
									</SelectedAdContextProvider>
								</CollectionContextProvider>
							</UserContextProvider>
						</ModalContextProvider>
					</SearchContextProvider>
				</IsAgainGetDatasProvider>
			</LoaderContextProvider>
		</IsUserLoggedContextProvider>
	);
}
