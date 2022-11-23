export type SelectedAdContextType = {
  selectedAd: {
    index: any,
    ad: {
      owner: {
        name: string,
      },
      _id:string,
      advertisingHeader: string,
      createdAt: string,
    detail:string,
    price:string
    }
  };
  setSelectedAd: (_val: any) => void;
}
