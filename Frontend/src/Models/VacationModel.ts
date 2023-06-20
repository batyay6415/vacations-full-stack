class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: File;
    public imageName: string;
  
    public imageUrl: string; // Image full url
    public isFollowing: boolean;
    public followersCount: number;

}

export default VacationModel;