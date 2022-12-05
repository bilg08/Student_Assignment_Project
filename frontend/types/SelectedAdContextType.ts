export type SelectedAdContextType = {
  selectedAd: {
    index: any,
    ad: {
      owner: {
        name: string,
      },
      _id:string,
      photo:string,
      advertisingHeader: string,
      createdAt: string,
    detail:string,
      price: string,
      group: string,
    subject:string
    }
  };
  setSelectedAd: (_val: any) => void;
}
