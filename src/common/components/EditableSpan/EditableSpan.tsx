import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = {
    value: string
    onChange: (value: string) => void
    isDone?: boolean
};

export const EditableSpan = ({value, onChange, isDone}: Props) => {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(value)

    const editModeHandler = () => {
        if (!editMode) {
            setEditMode(true)
        } else {
            setEditMode(false)
            onChange(text)
        }
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const addTextOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editModeHandler()
        }
    }

    return (
        <>
            {editMode ? (
                <TextField
                    variant={'standard'}
                    value={text}
                    size={"small"}
                    onChange={onChangeTextHandler}
                    onBlur={editModeHandler}
                    onKeyUp={addTextOnEnterHandler}
                    autoFocus/>
            ) : (
                <Typography  onDoubleClick={editModeHandler} sx={isDone ? {opacity: '0.5',
                    textDecoration: 'line-through',
                    textDecorationColor: 'blue'} : {} }>{value}</Typography >
            )}
        </>
    );
};