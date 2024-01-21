import { Container } from "../components/Container";
import { FormWrap } from "../components/FormWrap";
import { CheckoutClient } from "./CheckoutClient";


export default function CheckoutClientPage ()  {
    return(
        <div className="p-8">

        <Container>
            <FormWrap>
                <CheckoutClient/>
            </FormWrap>
        </Container>

        </div>
    )
    
}