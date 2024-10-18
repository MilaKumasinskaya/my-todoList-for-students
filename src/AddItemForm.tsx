import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormProps = {
    addItem: (value: string) => void
};
export const AddItemForm = ({addItem}: AddItemFormProps) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const addTaskTitleHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('enter a task title')
        }
    }

    const addTaskOnEnterTitleHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskTitleHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''} value={itemTitle} onChange={onChangeTaskTitle}
                   onKeyDown={addTaskOnEnterTitleHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
            <Button title={'+'} onClick={addTaskTitleHandler} disabled={!!error}/>
        </div>
    );
};