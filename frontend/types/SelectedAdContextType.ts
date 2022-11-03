export type SelectedAdContextType = {
  selectedAd: {
    index: any,
    ad: {
      owner: {
        name:String
      },
      advertisingHeader: String,
      createdAt: String,
    detail:String
    }
  };
  setSelectedAd: (_val: any) => void;
}
