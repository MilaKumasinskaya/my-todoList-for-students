import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";
import Box from "@mui/material/Box";

type Props = {
    addItem: (value: string) => void
};

export const AddItemForm = ({addItem}: Props) => {

    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeItemTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const addItemTitleHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('title is required')
        }
    }

    const addItemOnEnterTitleHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemTitleHandler()
        }
    }

    return (
        <Box sx={{
            p: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            }}>
            <TextField
                sx={{width: '350px'}}
                label="Enter a title"
                variant={'outlined'}
                value={itemTitle}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={onChangeItemTitle}
                onKeyDown={addItemOnEnterTitleHandler}
            />
            <IconButton color="primary" onClick={addItemTitleHandler} disabled={!!error}>
                <AddBox />
            </IconButton>
        </Box>
    );
};