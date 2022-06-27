import {Block, Button} from "konsta/react";
import KonstaContainer from "~/components/KonstaContainer";
import ButtonMui from '@mui/material/Button';

export default function Index() {

    return (
        <>
            <KonstaContainer titulo="Inicio">
                <Block>
                    <p>This is block with text</p>
                    <ButtonMui>Ano</ButtonMui>
                </Block>
                <Block className="space-y-4">
                    <p>Here comes the button</p>
                    <Button>Action</Button>
                </Block>
            </KonstaContainer>
        </>
    );
}
