import { Container } from "@/app/components/Container";
import { ProductDetails } from "./ProductDetails";
import { ListRating } from "./ListRating";
import { products } from "@/utils/products";
import getProductById from "@/actions/GetProductById";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/GetCurrentUser";

interface IParams{
    productId?:string
}

export default async function Product({params} : {params: IParams}) {
    
    const product = await getProductById(params)
    const user = await getCurrentUser()
 
    return(
        <div className="p-8">
            <Container>
                <ProductDetails product ={product}/>
                <div className="flex flex-col mt-20 gap-4">
                     <AddRating product={product} user={user}/>
                    <ListRating product={product}/>
                </div>
                
            </Container>
        </div>
    )
}