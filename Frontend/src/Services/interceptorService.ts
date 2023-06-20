import axios, { AxiosRequestHeaders } from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {
  // Create interceptor:
  public create(): void {
    // Register to any request:
    axios.interceptors.request.use((requestObject) => {
      // If we have a token:
      if (authStore.getState().token) {
        // Add authorization header, containing the token:
        
        requestObject.headers = {
          // The needed header format:
          Authorization: `Bearer ${authStore.getState().token}`,
          ...requestObject.headers // Make sure to spread the existing headers to preserve them
        } as AxiosRequestHeaders;
      }
      // Return the updated request object:
      return requestObject;
    });
  }
}

const interceptorService = new InterceptorService();

export default interceptorService;

