import { Notyf } from "notyf";

class NotifyService {

    private notyf = new Notyf({
        duration: 3000,
        position: { x: "center", y: "top" }
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notyf.error(message);
    }

    private extractErrorMessage(err: any): string {

        // If error is the message string: 
        if (typeof err === "string") return err;

        // If error thrown by axios:
        if (err.response?.data) return err.response.data;

        // Unknown error (JIC = Just in Case)
        return "Some error, please try again";
    }

}

const notifyService = new NotifyService();

export default notifyService;
