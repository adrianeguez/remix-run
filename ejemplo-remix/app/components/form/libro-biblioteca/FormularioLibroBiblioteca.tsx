import {BlockTitle, List, ListInput, useTheme} from "konsta/react";
import {useState} from "react";

export default function FormularioLibroBiblioteca() {
    const [name, setName] = useState({ value: '', changed: false });
    const onNameChange = (e) => {
        setName({ value: e.target.value, changed: true });
    };
    const theme = useTheme();
    const hairlines = theme !== 'material';
    return (
        <>
            <form action="">
                <BlockTitle>Validation + Additional Info</BlockTitle>
                <List hairlines={hairlines}>
                    <ListInput
                        label="Name"
                        type="text"
                        placeholder="Your name"
                        info="Basic string checking"
                        value={name.value}
                        error={
                            name.changed && !name.value.trim() ? 'Please specify your name' : ''
                        }
                        media={<><img className={'icon-small'} src="https://cdn-icons-png.flaticon.com/512/16/16363.png" alt=""/></>}
                        onChange={onNameChange}
                    />
                    <ListInput
                        label="Name"
                        type="text"
                        placeholder="Your name"
                        info="Basic string checking"
                        value={name.value}
                        error={
                            name.changed && !name.value.trim() ? 'Please specify your name' : ''
                        }
                        media={<><img className={'icon-small'} src="https://cdn-icons-png.flaticon.com/512/16/16363.png" alt=""/></>}
                        onChange={onNameChange}
                    />
                </List>
            </form>
        </>
    );
}