import {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (value: string) => void
    isDone?: boolean
};

export const EditableSpan = ({value, onChange, isDone}: EditableSpanPropsType) => {

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
                <input value={text}
                       onChange={onChangeTextHandler}
                       onBlur={editModeHandler}
                       onKeyUp={addTextOnEnterHandler}
                       autoFocus/>
            ) : (
                <span onDoubleClick={editModeHandler} className={isDone ? 'isDone' : ''}>{value}</span>
            )}
        </>
    );
};