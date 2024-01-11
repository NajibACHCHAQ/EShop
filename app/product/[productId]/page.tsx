import { Container } from "@/app/components/Container";
import { product } from "@/utils/product";
import { ProductDetails } from "./ProductDetails";

interface IParams{
    productId?:string
}

export default function Product({params} : {params: IParams}) {
    console.log('params',params);
 
    return(
        <div className="p-8">
            <Container>
                <ProductDetails product ={product}/>
            </Container>
        </div>
    )
}