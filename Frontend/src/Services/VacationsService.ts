class DataService {

    // public async getAllVacations(): Promise<VacationsModel[]> {

    //       // Take products from global state:
    //       let products = productsStore.getState().products;

    //       // If we don't have products - get them from backend:
    //       if (products.length === 0) {
  
    //           // Get from REST API products: 
    //           const response = await axios.get<ProductModel[]>(appConfig.productsUrl);
  
    //           // Extract products: 
    //           products = response.data; // data will be ProductModel[]
  
    //           // Update global store: 
    //           productsStore.dispatch({ type: ProductsActionType.FetchProducts, payload: products });
    //       }
  
    //       // Return:
    //       return products;
        
    // }
}

const dataService = new DataService();

export default dataService;
