import {Block, Button} from "konsta/react";
import KonstaContainer from "~/components/KonstaContainer";

export default function Index() {
    return (
        <>
            <KonstaContainer>
                <Block>
                    <p>This is block with text</p>
                </Block>
                <Block className="space-y-4">
                    <p>Here comes the button</p>
                    <Button>Action</Button>
                </Block>
            </KonstaContainer>
        </>
    );
}
