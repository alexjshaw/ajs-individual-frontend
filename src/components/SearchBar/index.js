import {TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from '@mui/material';

const handleSearch = (e) => {
    console.log(e.target.value)
}

const SearchBar = () => {

    return (
        <TextField
                id="outlined-search"
                placeholder="Search"
                type="search"
                size="small"
                onChange={handleSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
                />
    )
}

export default SearchBar