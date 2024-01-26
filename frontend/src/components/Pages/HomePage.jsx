import {Container} from "../Utils/Container";
import {UserModals} from "../UserComponents/UserModals";
import { PlayGameButton } from "../GameComponents/PlayGameButton";
import { DogApiButton } from "../DogApiComponents/DogApiButton";

export const HomePage = () => {


return(
    <>
        <Container>
            <UserModals />
            <PlayGameButton />
            <DogApiButton />
        </Container>
    </>
)
}