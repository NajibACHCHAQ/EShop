import { Container } from "@/app/components/Container";
import { ProductDetails } from "./ProductDetails";
import { ListRating } from "../ListRating";
import { products } from "@/utils/products";
import getProductById from "@/actions/GetProductById";

interface IParams{
    productId?:string
}

export default async function Product({params} : {params: IParams}) {
    
    const product = await getProductById(params)
 
    return(
        <div className="p-8">
            <Container>
                <ProductDetails product ={product}/>
                <div className="flex flex-col mt-20 gap-4">
                    <div>Add Rating</div>  
                    <ListRating product={product}/>
                </div>
                
            </Container>
        </div>
    )
}