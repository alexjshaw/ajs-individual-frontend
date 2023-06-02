import {TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from '@mui/material';

const SearchBar = ({searchTerm, setSearchTerm}) => {

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

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