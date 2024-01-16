import { Container } from "../components/Container";
import { FormWrap } from "../components/FormWrap";
import { RegisterForm } from "./RegisterForm";


export default function first() {
    return(
        <Container >
            <FormWrap>
                <RegisterForm/>
            </FormWrap>
        </Container>
    )
}