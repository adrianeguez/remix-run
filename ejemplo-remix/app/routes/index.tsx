import {Block, Button} from "konsta/react";

export default function Index() {
    return (
        <>
            <Block>
                <p>This is block with text</p>
            </Block>
            <Block className="space-y-4">
                <p>Here comes the button</p>
                <Button>Action</Button>
            </Block>
        </>
    );
}
